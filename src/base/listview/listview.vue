<template>
  <scroll class="listview" :data="data" ref="listView" 
    :listenScroll="listenScroll"
    :probeType="probeType"
    @scroll="scroll"
  >
    <ul>
      <li v-for="(group,index) in data" class="list-group" 
      ref="listGroup" :key="index"
      >
        <h2 class="list-group-title">{{group.title}}</h2>
        <uL>
          <li v-for="(item,index) in group.items" 
          @click="selectItem(item)"
          class="list-group-item" 
          :key="index"
          >
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </uL>
      </li>
    </ul>
    <div class="list-shortcut" 
      @touchstart="onShortcutTouchStart"
      @touchmove.stop.prevent="onShortcutTouchMove"
    >
      <ul>
        <!-- touchmove.stop.prevent阻止事件冒泡 -->
        <li v-for="(item,index) in shortcutList" :key="index" 
        class="item" 
        :class="{'current':currentIndex===index}"
        :data-index="index"
        >
          {{item}}
        </li>
      </ul>
    </div>
    <!-- 固定title -->
    <div class="list-fixed" v-if="fixedTitle" ref="fixed">
      <h1 class="fixed-title">{{fixedTitle}}</h1>
    </div>
  </scroll>
</template>

<script>
import Scroll from "base/scroll/scroll";
import { getData } from "common/js/dom";
/* 定义锚点高度 */
const ANCHOR_HEIGHT = 18;
/* title的高度 */
const TITLE_HEIGHT = 30;
export default {
  created() {
    this.touch = {};
    this.listenScroll = true;
    this.listHeight = [];
    this.probeType = 3;
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0, //设置高亮用的
      diff: -1 // 控制title区块上限的高度
    };
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  /* 计算属性 */
  computed: {
    shortcutList() {
      return this.data.map(group => {
        return group.title.substr(0, 1);
      });
    },
    // 控制顶部title的位置以及title更新
    fixedTitle() {
      // 如果滚动到顶部超出就return一个空以及隐藏固定title显示原始的
      if (this.scrollY > 0) {
        return;
      }
      // 判断如果为空就不取值
      return this.data[this.currentIndex]
        ? this.data[this.currentIndex].title
        : "";
    }
  },
  methods: {
    selectItem(item){
      /* 暴力事件 */
      this.$emit('select',item)
    },
    onShortcutTouchStart(e) {
      /* e.target--dom元素 */
      let anchorIndex = getData(e.target, "index");
      /* 获取当前dom元素位置 */
      let firstTouch = e.touches[0];
      /* 记录点击之后的Y坐标 */
      this.touch.y1 = firstTouch.pageY;
      /* 记录当前点击的索引 */
      this.touch.anchorIndex = anchorIndex;
      /* 点击跳转到指定索引位置 */
      this._scrollTo(anchorIndex);
    },
    onShortcutTouchMove(e) {
      /* 获取当前dom元素位置 */
      let firstTouch = e.touches[0];
      /* 记录移动之后的Y坐标 */
      this.touch.y2 = firstTouch.pageY;
      let delta = ((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT) | 0;
      /* 此时this.touch.anchorIndex设置的索引是字符串，需要转成数值 */
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta;
      /* 移动跳转到指定索引位置 */
      this._scrollTo(anchorIndex);
    },
    scroll(pos) {
      this.scrollY = pos.y;
    },
    _scrollTo(index) {
      /* 点击上下区块部分index为null，判断如果是null就不执行 */
      if (!index && index !== 0) {
        return;
      }
      /* 移动到上下边界外面的时候index会出现负数或者增加，强制等于第一个跟最后一个 */
      if (index < 0) {
        index = 0;
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2;
      }
      this.scrollY = -this.listHeight[index];
      /* scrollToElement第一个参数是当前dom对象，第二个参数是动画时间 */
      this.$refs.listView.scrollToElement(this.$refs.listGroup[index], 400);
    },
    /* 计算高度的方法 */
    _calculateHeight() {
      this.listHeight = [];
      /* 获取每一个li元素 */
      const list = this.$refs.listGroup;
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        /* 把所有li元素的高度追加到数组中 */
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    }
  },
  watch: {
    /* 监听到data的数据变化了执行 */
    data() {
      setTimeout(() => {
        this._calculateHeight();
      }, 20);
    },
    scrollY(newY) {
      const listHeight = this.listHeight;
      // 当滚动到顶部 newY>0
      if (newY > 0) {
        this.currentIndex = 0;
        return;
      }
      // 在中间部分滚动
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i];
        let height2 = listHeight[i + 1];
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i;
          this.diff = height2 + newY;
          return;
        }
      }
      // 当滚动到底部，且-newY大于最后一个元素的上限
      this.currentIndex = listHeight.length - 2;
    },
    diff(newVal) {
      let fixedTop =
        newVal > 0 && newVal < TITLE_HEIGHT ? newVal - TITLE_HEIGHT : 0;
      if (this.fixedTop === fixedTop) {
        return;
      }
      this.fixedTop = fixedTop;
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`;
    }
  },
  components: {
    Scroll
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.listview {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;

  .list-group {
    padding-bottom: 30px;

    .list-group-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }

    .list-group-item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }

  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;

    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;

      &.current {
        color: $color-theme;
      }
    }
  }

  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }

  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>

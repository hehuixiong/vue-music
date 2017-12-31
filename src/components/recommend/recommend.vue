<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <slider>
            <div v-for="(item,index) in recommends" :key="index">
              <a :href="item.linkUrl">
                <!-- needsclick解决scroll点击跳转的冲突 -->
                <img class="needsclick" @load="loadImage" :src="item.picUrl" />
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li class="item" v-for="(item,index) in discList" :key="index"> 
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl" />
              </div>
              <div class="text">
                <h2 class="name">{{item.name}}</h2>
                <p class="desc">{{item.creator}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import Loading from "base/loading/loading";
import Scroll from "base/scroll/scroll";
import Slider from "base/slider/slider";
import { getRecommend, getDiscList } from "api/recommend";
import { ERR_OK } from "api/config";
export default {
  components: {
    Slider,
    Scroll,
    Loading
  },
  data() {
    return {
      recommends: [],
      discList: []
    };
  },
  created() {
    this._getRecommend();
    setTimeout(() => {
      this._getDiscList();
    }, 500);
  },
  methods: {
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider;
        }
      });
    },
    _getDiscList() {
      // getDiscList().then(res => {
      //   if (res.code === ERR_OK) {
      //     this.recommends = res.data.list;
      //   }
      // });
      this.discList = [
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        },
        {
          name: "戴安娜",
          imgurl:
            "http://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bstweS9UnibWjg1dZ0HaKhcCu2bia9zAA0sz8A/600?n=1",
          creator: "寒冬宅家必备！温暖你只需一首歌"
        }
      ];
    },
    loadImage() {
      /* 这样判断只执行一次 */
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh();
        this.checkLoaded = true;
      }
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }

      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;

          .name {
            margin-bottom: 10px;
            color: $color-text;
          }

          .desc {
            color: $color-text-d;
          }
        }
      }
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>

import {
  playMode
} from 'common/js/config'
const state = {
  /* 播放管理 */
  singer: {},
  playing: false, //展开和收起播放控制
  fullScreen: false, //全屏播放控制
  playList: [], //播放列表
  sequenceList: [], //顺序列表
  /* 设置播放 */
  mode: playMode.sequence,
  currentIndex: -1, //维护播放
}
export default state

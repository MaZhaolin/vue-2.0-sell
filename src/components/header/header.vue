<template>
  <div class="header">
   <div class="content-wrapper">
     <div class="avator">
       <img width="64" height="64" :src="seller.avatar" >
     </div>
     <div class="content">
       <div class="title">
         <span class="brand"></span>
         <span class="name">{{seller.name}}</span>
       </div>
       <div class="description">
         {{seller.description}}/{{seller.deliveryTime}}分钟送达
       </div>
       <div v-if="seller.supports" class="support">
         <icon :size=1 :type="seller.supports[0].type"></icon>
         <span class="text">{{seller.supports[0].description}}</span>
       </div>
     </div>
     <div v-if="seller.supports" class="support-count" @click="showDetail">
       <span class="count">{{seller.supports.length}}个</span>
       <i class="icon-keyboard_arrow_right"></i>
     </div>
   </div>
   <div class="bulletin-wrapper" @click="showDetail">
     <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
     <i class="icon-keyboard_arrow_right"></i>
   </div>
   <div class="background">
     <img :src="seller.avatar" width="100%" height="100%" alt="">
   </div>
    <transition name="fade">
     <div v-show='detailShow' class="detail" >
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size=2 :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="support-item" v-for="item in seller.supports">
              <icon :size=2 :type="item.type"></icon>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close">
        <i class="icon-close" @click="hideDetail"></i>
      </div>
     </div>
  </transition>
  </div>
</template>

<script>
  import star from 'components/star/star'
  import icon from 'components/icon/icon'

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        detailShow: false
      }
    },
    methods: {
      showDetail () {
        this.detailShow = true
      },
      hideDetail () {
        this.detailShow = false
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    components: {
      star,
      icon
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin"
.header
  color: #fff
  position: relative
  overflow: hidden
  background: rgba(7, 17, 27, .5)
  .content-wrapper
    padding: 24px 12px 18px 24px
    font-size: 0
    position: relative
    .avator
      display: inline-block
      vertical-align: top
      img
        border-radius: 2px
    .content
      display: inline-block;
      margin-left: 16px;
      font-size 14px;
      .title
        margin: 2px 0 8px 0
        .brand
          display: inline-block
          width: 30px
          height: 18px
          bg-image('brand')
          background-size: 30px 18px
          background-reapeat: no-repeat
          vertical-align: top
        .name
          margin-left: 6px
          font-size: 16px
          line-height: 18px
          font-weight: bold
      .description
        margin-bottom: 10px
        line-height: 12px
        font-size: 12px
      .support
        .text
          vertical-align: top
          line-height: 12px
          font-size: 10px
    .support-count
      position: absolute
      right: 12px
      bottom: 14px
      padding: 0 8px;
      line-height: 24px
      height: 24px
      border-radius: 14px
      background: rgba(0, 0, 0, .2)
      text-align: center
      .count
        font-size: 10px
      .icon-keyboard_arrow_right
        font-size: 10px
  .bulletin-wrapper
    position: relative
    height: 28px
    line-height: 28px
    padding: 0 22px 0 12px
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    background: rgba(7, 17, 27, .2)
    .bulletin-title
      display: inline-block
      vertical-align: top
      margin-top: 8 px
      width: 22px
      height: 12px
      bg-image('bulletin')
      background-size:22px 12px
    .bulletin-text
      vertical-align: top
      margin: 0 4px
      font-size: 10px
      font-weight: 200
    .icon-keyboard_arrow_right
      position: absolute
      font-size: 15px
      right: 12px
      bottom: 8px;
  .background
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: -1
    -webkit-filter: blur(10px)
  .detail
    position: fixed
    z-index: 100
    top: 0;
    width: 100%
    height: 100%
    overflow: auto
    transition:all .5s
    background: rgba(7, 17, 27, .8)
    backdrop-filter:blur(10px)
    &.fade-enter-active, &.fade-leave
      opacity: 1
      background: rgba(7, 17, 27, .8)
    &.fade-enter, &.fade-leave-active
      opacity: 0
      background: rgba(7, 17, 27, 0)
    .detail-wrapper
      width: 100%
      min-height: 100%
      .detail-main
        margin-top: 64px
        padding-bottom: 64px
        .name
          line-height: 16px
          text-align: center
          font-size: 16px
          font-weight: 700
        .star-wrapper
          margin-top: 18px
          padding: 2px 0
          text-align:center
        .title
          display:flex
          width: 80%
          margin: 30px auto 24px auto
          .line
            flex: 1
            position: relative
            top: -6px
            border-bottom: 1px solid rgba(255, 255, 255, .2)
          .text
            padding: 0 12px
            font-size: 14px
            font-weight: 700
        .supports
          width: 80%
          margin: 0 auto
          .support-item
            padding: 0 12px
            margin-bottom: 12px
            font-size: 0
            &:last-child
              margin-bottom: 0
            .text
              font-size: 12px
              line-height: 12px
        .bulletin
          width: 80%
          margin: 0 auto
          .content
            padding: 0 12px
            line-height: 24px
            font-size: 12px
    .detail-close
      position: relative
      width: 32px
      height: 32px
      margin: -64px auto 0
      clear: both
      font-size: 32px
</style>


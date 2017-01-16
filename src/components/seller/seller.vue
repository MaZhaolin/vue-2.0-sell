<template>
  <div class="seller" ref="seller">
    <div class="seller-wrapper">
      <div class="overview">
        <div class="overview-top border-1px">
          <div class="title">{{seller.name}}</div>
          <star :size="2" :score="seller.score"></star>
          <span class="rating">({{seller.ratingCount}})</span>
          <span class="sell">月售{{seller.sellCount}}单</span>
          <div class="favorite" :class="{'on': favorite}"  @click="toggleFavorite">
            <i class="icon-favorite"></i>
            <span class="desc">收藏</span>
          </div>
        </div>
        <ul class="overview-bottom">
          <li class="item">
            <div class="desc">起送价</div>
            <div class="content">
              {{seller.minPrice}}<span class="unit">元</span>
            </div>
          </li>
          <li class="item">
            <div class="desc">卖家配送</div>
            <div class="content">
              {{seller.deliveryPrice}}<span class="unit">元</span>
            </div>
          </li>
          <li class="item">
            <div class="desc">平均配送时间</div>
            <div class="content">
              {{seller.deliveryTime}}<span class="unit">分钟</span>
            </div>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="bulletin">
        <h2 class="title">公告与活动</h2>
        <div class="text">{{seller.bulletin}}</div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item border-1px" v-for="item in seller.supports">
            <icon :size=4 :type="item.type"></icon>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics-wrapper">
        <h2 class="title">商家实景</h2>
        <div class="pics" ref="pics">
          <ul class="pic-wrapper" ref="picWrapper">
            <li v-for="item in seller.pics" class="item">
              <img :src="item" width="120" height="90"  alt="">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="infos">
        <h2 class="title">商家信息</h2>
        <ul class="infos-wrapper">
          <li v-for="item in seller.infos" class="item border-1px">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import star from 'components/star/star'
  import icon from 'components/icon/icon'
  import split from 'components/split/split'
  import {saveLocal, getLocal} from '../../common/js/store'

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        favorite: (() => {
          return getLocal('favorite', false)
        })()
      }
    },
    created () {
      this.$nextTick(() => {
        this._initScroll()
        this._initPicsSCroll()
      })
    },
    methods: {
      _initScroll () {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      },
      _initPicsSCroll () {
        let picsWidth = 120
        let margin = 6
        let width = (picsWidth + margin) * this.seller.pics.length - margin
        this.$refs.picWrapper.style.width = width + 'px'
        if (!this.picsScroll) {
          this.picsScroll = new BScroll(this.$refs.pics, {
            scrollX: true,
            eventPassthrough: 'vertical'
          })
        } else {
          this.picsScroll.refresh()
        }
      },
      toggleFavorite (event) {
        if (!event._constructed) {
          return
        }
        this.favorite = !this.favorite
        saveLocal('favorite', this.favorite)
      }
    },
    components: {
      split,
      icon,
      star
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"
  .seller
    position: absolute
    top: 170px
    left: 0
    bottom: 0
    width: 100%
    overflow: hidden
    .seller-wrapper
      .title
        font-size: 14px
        color: rgb(7, 17, 27)
        line-height: 14px
      .overview
        padding: 18px
        .overview-top
          padding-bottom: 18px
          font-size: 0
          border-1px(rgba(7, 17, 27, .1))
          .title
            margin-bottom: 8px
          .star
            display: inline-block
            vertical-align: top
            margin-right: 8px
          .rating, .sell
            font-size: 10px
            line-height: 18px
            color: rgb(77, 85, 93)
          .rating
            margin-right: 12px
          .favorite
            position: absolute
            top:0
            right: 0;
            .icon-favorite
              display: block
              margin-bottom: 4px
              font-size:24px
              line-height: 24px
              color: rgba(77, 85, 93, .3)
            &.on
              .icon-favorite
                color: rgb(240, 20, 20)
            .desc
              color: rgb(77, 85, 93)
              font-size:10px
              line-height: 10px
        .overview-bottom
          padding-top: 18px
          display: flex
          .item
            flex: 1
            text-align: center
            .desc
              margin-bottom: 4px
              font-size: 10px
              line-height: 10px
              color: rgb(147, 153, 159)
            .content
              font-size: 24px
              line-height: 24px
              font-weight: 200
              .unit
                font-size: 10px
          .item ~ .item
            border-left:1px solid rgba(7, 17, 27, .1)
      .bulletin
        padding: 18px
        .text
          padding: 8px 12px 16px
          font-size: 12px
          line-height: 24px
          color: rgb(240, 20, 20)
        .supports
          .support-item
            padding: 16px 12px 16px 16px
            border-top-1px(rgba(7, 17, 27, .1))
            &:last-child
              padding-bottom: 0
            .text
              color: rgb(7, 17, 27)
              font-size: 12px
              line-height: 16px
      .pics-wrapper
        padding: 18px
        .title
          margin-bottom: 12px
        .pics
          width: 100%;
          overflow: hidden
          white-space: nowrap
          .item
            display:inline-block
            margin-right: 6px
            width: 120px
            height: 90px
      .infos
        padding: 18px
        .title
          margin-bottom: 12px
        .item
          padding: 16px 12px
          font-size:12px
          line-height: 16px
          color: rgb(7, 17, 27)
          border-top-1px(rgba(7, 17, 27, .1))
</style>

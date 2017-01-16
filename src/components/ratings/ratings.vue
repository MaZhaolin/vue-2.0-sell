<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="score-wrapper">
        <div class="content-left">
          <div class="score">{{seller.score}}</div>
          <div class="desc">综合评分</div>
          <div class="rankRate">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="content-right">
          <ul>
            <li>
              <span class="desc">服务态度</span>
              <star :score="seller.serviceScore" :size="2"></star>
              <span class="score">{{seller.serviceScore}}</span>
            </li>
            <li>
              <span class="desc">商品评价</span>
              <star :score="seller.foodScore" :size="2"></star>
              <span class="score">{{seller.foodScore}}</span>
            </li>
            <li>
              <span class="desc">送达时间</span>
              <span class="content">{{seller.deliveryTime}}分钟</span>
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <ratingselect :ratings="ratings" ref="ratingselect" @ratingTypeSelect="ratingTypeSelect" @contentToggle="contentToggle" :default-select-type="selectType" :default-only-content="onlyContent"  ></ratingselect>
      <div class="ratings-list">
        <ul>
          <li v-for="rating in ratings" class="rating" v-show="needShow(rating.rateType, rating.text)">
            <div class="head">
              <img class="avator" :src="rating.avatar" width="28" height="28" alt="">
              <span class="username">{{rating.username}}</span>
              <star :score="rating.score" :size="1"></star>
              <span class="delivery-time" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              <span class="rateTime">{{rating.rateTime | formatDate}}</span>
            </div>
            <div class="content">
              <p class="text">{{rating.text}}</p>
              <span :class="{'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down': rating.rateType === 1}"></span>
                <span class="recommend" v-for="item in rating.recommend">{{item}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import star from 'components/star/star'
  import split from 'components/split/split'
  import ratingselect from 'components/ratingselect/ratingselect'
  import shopcart from 'components/shopcart/shopcart'
  import BScroll from 'better-scroll'
  import {formatDate} from '../../common/js/date'

  const ERR_OK = 0
  // const POSITIVE = 0
  // const NEGATIVE = 1
  const ALL = 2

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true
      }
    },
    created () {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.ratings = response.data
          this.$nextTick(() => {
            this._initScroll()
          })
        }
      })
    },
    methods: {
      _initScroll () {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.ratings, {
            click: true
          })
        }
      },
      needShow (type, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return type === this.selectType
        }
      },
      contentToggle (onlyContent) {
        this.onlyContent = onlyContent
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      ratingTypeSelect (selectType) {
        this.selectType = selectType
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      }
    },
    components: {
      star,
      split,
      ratingselect,
      shopcart
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"
  .ratings
    position: absolute;
    top: 174px
    bottom:0
    left: 0
    width: 100%
    overflow:hidden
    .score-wrapper
      padding: 18px
      display: flex
      .content-left
        flex: 0 0 137px
        border-right:1px solid #eee
        text-align: center
        .score
          margin-bottom:6px
          font-size:24px
          color: rgb(255, 153, 0)
          line-height: 28px
        .desc
          font-size:12px
          color: rgb(7 , 17, 27)
          line-height: 12px
        .rankRate
          font-size: 10px
          color: rgb(147, 153, 159)
          padding: 8px 0 6px
      .content-right
        flex: 1
        padding:0 24px
        font-size: 0
        li
          margin-bottom:8px
          .star
            display: inline-block
            margin-right:12px
          .desc
            vertical-align: top
            display: inline-block
            margin-right:12px
            font-size: 12px
            color: rgb(7 , 17, 27)
            line-height: 18px
          .score
            vertical-align: top
            font-size: 12px
            color: rgb(255, 153, 0)
            line-height: 18px
          .content
            line-height: 18px
            font-size: 12px
            color: rgb(147, 153, 159)
    .ratings-list
      color: rgb(7, 17, 27)
      .rating
        padding: 18px 0
        margin: 0 18px
        border-1px(rgba(7, 17, 27, .1))
        .head
          position: relative
          margin-bottom: 6px
          font-size: 0
          .avator
            border-radius: 50%
            position: absolute
            top: 0
            left: 0
          .username
            display: block
            font-size: 10px
            line-height: 12px
            margin-bottom: 6px
            margin-left: 40px
          .star
            display:inline-block
            margin-left: 40px
            margin-right: 6px
            vertical-align: bottom
            vertical-align: top
          .delivery-time
            font-size: 10px
            color: rgb(147, 153, 159)
          .rateTime
            position: absolute
            right: 0
            top:0
            font-size: 10px
            line-height: 24px
            font-weight: 200
            color: rgb(147, 153, 159)
        .content
          margin-left: 40px
          font-size: 0
          .text
            margin-bottom: 8px
            font-size: 12px
            line-height: 18px
          .recommend
            display: inline-block
            margin-left: 6px
            padding: 0 6px
            font-size: 9px
            line-height: 16px
            border: 1px solid rgba(7, 17, 27, .1)
            border-radius: 1px
            color: rgb(147, 153, 159)
            margin-bottom:2px
          .icon-thumb_down,.icon-thumb_up
              margin-right: 4px
              line-height: 24px
              font-size: 12px
          .icon-thumb_up
            color: rgb(0, 160, 220)
          .icon-thumb_down
            color: rgb(147, 153, 159)
</style>

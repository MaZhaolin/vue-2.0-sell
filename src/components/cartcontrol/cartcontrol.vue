<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count > 0" @click.stop.prevent="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div ref="cartBtn" class="cart-add" @click.stop.prevent="addCart">
      <span class="icon-add_circle"></span>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart (event) {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
        this.$emit('cartadd', event.target)
      },
      decreaseCart (event) {
        if (!event._constructed) {
          return
        }
        if (this.food.count) {
          this.food.count--
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      font-size:24px
      color:rgb(0, 160, 255)
      transition: all .4s linear
      .inner
        padding: 6px;
        transition: all .4s linear
      &.move-enter, &.move-leave-active
        opacity: 0
        transform: translate3D(20px, 0, 0)
        .inner
          transform: rotate(180deg)
    .cart-count
      display: inline-block
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
      vertical-align: top
    .cart-add
      display: inline-block
      padding: 6px;
      font-size:24px
      color:rgb(0, 160, 255)
</style>

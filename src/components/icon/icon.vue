<template>
  <span class="icon" :class="[sizeClass, classMap[type]]"></span>
</template>

<script>
  export default {
    props: {
      size: {
        type: Number
      },
      type: {
        type: Number
      }
    },
    data () {
      return {
        classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      }
    },
    computed: {
      sizeClass () {
        return 'icon-' + this.size
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"
  .icon
    display:inline-block
    vertical-align: top
    &.icon-1
      margin-right: 4px
      width: 12px
      height: 12px
      background-size: 12px 12px
      background-reapeat: no-repeat
      &.decrease
        bg-image('decrease_1')
      &.discount
        bg-image('discount_1')
      &.guarantee
        bg-image('guarantee_1')
      &.invoice
        bg-image('invoice_1')
      &.special
        bg-image('special_1')
    &.icon-2
      margin-right: 6px
      width: 16px
      height: 16px
      background-size: 16px 16px
      background-reapeat: no-repeat
      &.decrease
        bg-image('decrease_2')
      &.discount
        bg-image('discount_2')
      &.guarantee
        bg-image('guarantee_2')
      &.invoice
        bg-image('invoice_2')
      &.special
        bg-image('special_2')
    &.icon-3
      margin-right: 4px
      width: 12px
      height: 12px
      background-size: 12px 12px
      background-reapeat: no-repeat
      &.decrease
        bg-image('decrease_3')
      &.discount
        bg-image('discount_3')
      &.guarantee
        bg-image('guarantee_3')
      &.invoice
        bg-image('invoice_3')
      &.special
        bg-image('special_3')
    &.icon-4
      margin-right: 6px
      width: 16px
      height: 16px
      background-size: 16px 16px
      background-reapeat: no-repeat
      &.decrease
        bg-image('decrease_4')
      &.discount
        bg-image('discount_4')
      &.guarantee
        bg-image('guarantee_4')
      &.invoice
        bg-image('invoice_4')
      &.special
        bg-image('special_4')
</style>

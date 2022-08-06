<template>
  <div>
    <button :style="{ background: bgc, color }">
      <!-- 接收按钮内容 -->
      <slot />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    bgc: {
      type: String,
      default: 'linear-gradient(135deg, #ff9743, #ff5e20)'
    },
    color: {
      type: String,
      default: '#fff'
    }
  },
  data() {
    return {}
  },

  created() {},

  methods: {}
}
</script>

<style lang="less" scoped>
button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px !important;
  height: 36px;
  margin-right: 10px;
  border-radius: 10px;
  border: none;
  font-size: 14px;
  border-radius: 4px;
  white-space: nowrap;
  cursor: pointer;
}
// .zz-btn {
//   display: flex;
//   padding: 0 10px;
//   justify-content: space-evenly;
// }
</style>

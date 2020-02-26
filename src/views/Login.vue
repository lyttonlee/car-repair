<template>
  <div class="page">
    <div class="login">
      <h2>登录系统</h2>
      <el-input class="input" placeholder="用户名"></el-input>
      <el-input class="input" placeholder="密码"></el-input>
      <div></div>
      <el-button type="success" @click="login">登录</el-button>
      <SelectLine ref="selectLine" />
    </div>
  </div>
</template>

<script>
import SelectLine from '../components/SelectLine'
export default {
  components: {
    SelectLine
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    login () {
      this.$refs['selectLine'].visible = true
    },
  }
}
</script>
<style lang="less" scoped>
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  .login {
    width: 400px;
    height: 300px;
    border-radius: 20px;
    background: rgb(61, 61, 61);
    box-shadow: 1px 0 2px rgb(34, 33, 33);
    .input {
      width: 80%;
      margin: 10px 0;
    }
  }
}
</style>

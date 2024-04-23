<template>
  <div class="login">
    <div class="center">
      <h3>ELADMlN 后台管理系统</h3>
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        :rules="rules"
        class="from"
        :size="formSize"
        status-icon
      >
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" prefix-icon="UserFilled" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="ruleForm.password" prefix-icon="Lock" />
        </el-form-item>
        <el-form-item prop="verify">
          <div class="verify">
            <el-input v-model="ruleForm.verify" prefix-icon="CircleCheckFilled" placeholder="验证码" />
            <div class="verifycode">
              <img src="https://eladmin.vip/demo/static/img/background.4a692a58.jpeg" alt="" class="img" />
            </div>
          </div>
        </el-form-item>
        <el-form-item prop="type">
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox value="记住我" name="type"> 记住我 </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)" class="btn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
//引入表单需要的
import type { ComponentSize, FormInstance, FormRules } from "element-plus"
const formSize = ref<ComponentSize>("default")
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  username: "Hello",
  password: "",
  verify: "",
  type: false
})
const rules = reactive<FormRules<RuleForm>>({
  username: [{ required: true, message: "请输入账号", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 12, message: "Length should be 6 to 12", trigger: "blur" }
  ],
  verify: [{ required: true, message: "请输入验证码", trigger: "blur" }]
})
//登录
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!")
    } else {
      console.log("error submit!", fields)
    }
  })
}
</script>
<style lang="scss">
.login {
  width: 100vw;
  height: 100vh;
  background-image: url("https://eladmin.vip/demo/static/img/background.4a692a58.jpeg");
  background-size: 100% 100%;

  .center {
    width: 385px;
    height: 350px;
    background-color: #fff;
    border-radius: 5px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    h3 {
      color: #707070;
      font-weight: 700;
      font-size: 20px;
      margin: 20px 0 25px 0;
      text-align: center;
    }

    .from {
      width: 95%;

      .el-input {
        height: 38px;
        margin-left: 5%;
      }

      .verify {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .el-input {
          width: 50%;
        }

        .verifycode {
          width: 40%;
          height: 30px;

          .img {
            width: 140px;
            height: 100%;
          }
        }
      }

      .el-form-item__error {
        margin-left: 5%;
      }

      .el-checkbox-group {
        margin-left: 5%;
      }
      .btn {
        width: 95%;
        margin-left: 5%;
      }
    }
  }
}
</style>

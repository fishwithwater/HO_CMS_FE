<template>
    <div class="container">
        <div class="title">新建轮播模版</div>
        <div class="wrap">
            <el-row>
                <el-col
                        :lg="16"
                        :md="20"
                        :sm="24"
                        :xs="24">
                    <el-form
                            :model="form"
                            status-icon
                            ref="form"
                            label-width="100px"
                            @submit.native.prevent>
                        <el-form-item label="模板" prop="name">
                            <el-input v-model="form.name" placeholder="请填写模板"></el-input>
                        </el-form-item>
                        <el-form-item label="模板名" prop="displayName">
                            <el-input v-model="form.displayName" placeholder="请填写模板名"></el-input>
                        </el-form-item>
                        <el-form-item class="submit">
                            <el-button type="primary" @click="submitForm('form')">保 存</el-button>
                            <el-button @click="resetForm('form')">重 置</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>

    </div>
</template>

<script>
  import SwiperTemplate from '@/lin/models/swiper-template'

  export default {
    data() {
      return {
        form: {
          name: '',
          displayName: ''
        },
      }
    },
    methods: {
      async submitForm(formName) {
        try {
          const res = await SwiperTemplate.add(this.form)
          if (res.error_code === 0) {
            this.$message.success(`${res.msg}`)
            this.resetForm(formName)
          }
        } catch (error) {
          console.log(error)
        }
      },
      // 重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
    },
  }
</script>

<style lang="scss" scoped>

    .container {
        .title {
            height: 59px;
            line-height: 59px;
            color: $parent-title-color;
            font-size: 16px;
            font-weight: 500;
            text-indent: 40px;
            border-bottom: 1px solid #dae1ec;
        }

        .wrap {
            padding: 20px;
        }

        .submit {
            float: left;
        }
    }
</style>

<template>
    <div class="container">
        <div class="title">
            <span>修改轮播模版</span>
            <span class="back" @click="back">
        <i class="iconfont icon-fanhui"></i> 返回
      </span>
        </div>
        <el-divider></el-divider>
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
                            v-loading="loading"
                            @submit.native.prevent>
                        <el-form-item label="模版" prop="name">
                            <el-input v-model="form.name" placeholder="请填写模版"></el-input>
                        </el-form-item>
                        <el-form-item label="模版名称" prop="displayName">
                            <el-input v-model="form.displayName" placeholder="请填写模版名称"></el-input>
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
    props: {
      editSwiperTemplateId: {
        type: Number,
      },
    },
    data() {
      return {
        loading: false,
        form: {
          name: '',
          displayName: ''
        },
      }
    },
    async mounted() {
      this.loading = true
      this.form = await SwiperTemplate.get(this.editSwiperTemplateId)
      this.loading = false
    },
    methods: {
      async submitForm() {
        const res = await SwiperTemplate.edit(this.editSwiperTemplateId, this.form)
        if (res.error_code === 0) {
          this.$message.success(`${res.msg}`)
          this.$emit('editClose')
        }
      },
      // 重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      back() {
        this.$emit('editClose')
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

            .back {
                float: right;
                margin-right: 40px;
                cursor: pointer;
            }
        }

        .wrap {
            padding: 20px;
        }

        .submit {
            float: left;
        }
    }
</style>

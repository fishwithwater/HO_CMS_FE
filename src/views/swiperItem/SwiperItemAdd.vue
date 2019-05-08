<template>
    <div class="container">
        <div class="title">
            <span>新增轮播模版</span>
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
                        <el-form-item label="日期" prop="date">
                            <el-date-picker
                                    v-model="form.date"
                                    align="right"
                                    type="date"
                                    placeholder="选择日期"
                                    :picker-options="pickerOptions"
                                    @change="chooseDate"
                            >
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="星期" prop="dayOfWeek">
                            <el-input readonly v-model="form.dayOfWeek" placeholder="请选择日期"></el-input>
                        </el-form-item>
                        <el-form-item label="农历" prop="traditionalCalendar">
                            <el-input v-model="form.traditionalCalendar" placeholder="请填写农历"></el-input>
                        </el-form-item>
                        <el-form-item label="内容" prop="content">
                            <el-input type="textarea" :rows="4" v-model="form.content" placeholder="请输入内容"></el-input>
                        </el-form-item>
                        <el-form-item label="页脚" prop="footer">
                            <el-input v-model="form.footer" placeholder="请填写页脚"></el-input>
                        </el-form-item>
                        <el-form-item label="图片" prop="img">
                            <el-input v-model="form.img" placeholder="请选择图片"></el-input>
                        </el-form-item>
                        <el-form-item label="资源" prop="url">
                            <el-input v-model="form.url" placeholder="请选择资源"></el-input>
                        </el-form-item>
                        <el-form-item label="模板" prop="templateId">
                            <el-select v-model="form.templateId" filterable placeholder="请选择模板">
                                <el-option
                                        v-for="item in swiperTemplateList"
                                        :key="item.id"
                                        :label="item.displayName"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="作者" prop="authorId">
                            <el-select v-model="form.authorId" filterable placeholder="请选择作者">
                                <el-option
                                        v-for="item in authorList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="刊号" prop="month">
                            <el-input v-model="form.month" placeholder="请选择刊号"></el-input>
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
  import SwiperItem from '@/lin/models/swiper-item'
  import SwiperTemplate from '@/lin/models/swiper-template'

  const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  export default {
    data() {
      return {
        loading: false,
        form: {
          date: '',
          dayOfWeek: '',
          traditionalCalendar: '',
          content: '',
          footer: '',
          img: '',
          url: '',
          templateId: '',
          authorId: 0,
          month: ''
        },
        swiperTemplateList: [],
        authorList: [{id: 0, name: '官方'}],
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
      }
    },
    async mounted() {
      this.loading = true
      this.swiperTemplateList = await SwiperTemplate.getAll()
      this.loading = false
    },
    methods: {
      async submitForm() {
        const res = await SwiperItem.add(this.form)
        if (res.error_code === 0) {
          this.$message.success(`${res.msg}`)
          this.resetForm(formName)
        }
      },
      chooseDate(e) {
        if (e) {
          this.form.dayOfWeek = week[e.getDay()]
          let month = e.getMonth() + 1
          this.form.month = e.getFullYear() + (month <= 9 ? '0' + month : month)
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

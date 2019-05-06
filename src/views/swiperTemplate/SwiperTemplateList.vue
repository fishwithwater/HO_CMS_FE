<template>
    <div>
        <div v-if="!showEdit">
            <!-- 列表页面 -->
            <div class="container">
                <div class="header">
                    <div class="title">轮播模版列表</div>
                </div>
                <!-- 表格 -->
                <lin-table
                        :tableColumn="tableColumn"
                        :tableData="tableData"
                        :operate="operate"
                        @handleEdit="handleEdit"
                        @handleDelete="handleDelete"
                        v-loading="loading"></lin-table>
            </div>
            <!-- 分页 -->
            <div class="pagination">
                <el-pagination
                        :background="true"
                        :page-size="pageCount"
                        :current-page="currentPage"
                        v-if="refreshPagination"
                        layout="prev, pager, next, jumper"
                        :total="total_nums">
                </el-pagination>
            </div>
        </div>
        <!-- 编辑页面 -->
        <swiper-template-edit v-else @editClose="editClose" :editSwiperTemplateId="editSwiperTemplateId"></swiper-template-edit>

    </div>
</template>

<script>
  import LinTable from '@/components/base/table/lin-table'
  import SwiperTemplate from '@/lin/models/swiper-template'
  import SwiperTemplateEdit from './SwiperTemplateEdit'

  export default {
    components: {
      LinTable,
      SwiperTemplateEdit
    },
    data() {
      return {
        refreshPagination: true, // 页数增加的时候，因为缓存的缘故，需要刷新Pagination组件
        total_nums: 0, // 分组内的用户总数
        currentPage: 1, // 默认获取第一页的数据
        pageCount: 10, // 每页10条数据
        tableData: [], // 表格数据
        operate: [],
        tableColumn: [{prop: 'id', label: '编号'}, {prop: 'name', label: '模板'}, {prop: 'displayName', label: '模板名称'}], // 表头数据
        loading: false,
        showEdit: false,
        editSwiperTemplateId: 0
      }
    },
    methods: {
      async getSwiperTemplateList() {
        let res
        const currentPage = this.currentPage - 1
        try {
          this.loading = true
          res = await SwiperTemplate.getList({count: this.pageCount, page: currentPage})
          this.loading = false
          this.tableData = [...res.collection]
          this.total_nums = res.total_nums
        } catch (e) {
          this.loading = false
          console.log(e)
        }
      },
      handleEdit(val) {
        this.showEdit = true
        this.editSwiperTemplateId = val.row.id
      },
      handleDelete(val) {
        this.$confirm('此操作将永久删除该轮播模版, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(async () => {
          const res = await SwiperTemplate.delete(val.row.id)
          if (res.error_code === 0) {
            this.getSwiperTemplateList()
            this.$message({
              type: 'success',
              message: `${res.msg}`,
            })
          }
        })
      },
      editClose() {
        this.showEdit = false
        this.getSwiperTemplateList()
      },
    },
    created() {
      this.operate = [{name: '编辑', func: 'handleEdit', type: 'primary',auth:'修改轮播模版'}, {
        name: '删除', func: 'handleDelete', type: 'danger', auth: '删除轮播模版',
      }]
      this.getSwiperTemplateList()
    }
  }
</script>

<style lang="scss" scoped>
    .container {
        padding: 0 30px;

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .title {
                height: 59px;
                line-height: 59px;
                color: $parent-title-color;
                font-size: 16px;
                font-family: PingFangSC-Medium;
                font-weight: 500;
            }
        }

        .pagination {
            display: flex;
            justify-content: flex-end;
            margin: 20px;
        }
    }
</style>
<template>
    <div>
        <div v-if="!showEdit">
            <!-- 列表页面 -->
            <div class="container">
                <div class="header">
                    <div class="title">轮播项列表</div>
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
        <swiper-item-edit v-else @editClose="editClose" :editSwiperItemId="editSwiperItemId"></swiper-item-edit>

    </div>
</template>

<script>
  import LinTable from '@/components/base/table/lin-table'
  import SwiperItem from '@/lin/models/swiper-item'
  import SwiperItemEdit from './SwiperItemEdit'

  export default {
    components: {
      LinTable,
      SwiperItemEdit
    },
    data() {
      return {
        refreshPagination: true, // 页数增加的时候，因为缓存的缘故，需要刷新Pagination组件
        total_nums: 0, // 分组内的用户总数
        currentPage: 1, // 默认获取第一页的数据
        pageCount: 10, // 每页10条数据
        tableData: [], // 表格数据
        operate: [],
        tableColumn: [{prop: 'id', label: '编号',width:'60'},
          {prop: 'date', label: '日期',width:'100'},
          {prop: 'dayOfWeek', label: '星期',width:'60'},
          {prop: 'traditionalCalendar', label: '农历',width:'120'},
          {prop: 'content', label: '内容',
            formatter:(row,column,cellValue,index)=>{
                return cellValue.substring(0,20)+'...'
            }
          },
          {prop: 'footer', label: '页脚'},
          {prop: 'img', label: '图片'},
          {prop: 'url', label: '资源'},
          {prop: 'template.name', label: '模板'},
          {prop: 'template.displayName', label: '模板名称'},
          {prop: 'authorId', label: '作者',
            formatter:(row,column,cellValue,index)=>{
              return '官方'
            }},
          {prop: 'month', label: '刊号'},
        ], // 表头数据
        loading: false,
        showEdit: false,
        editSwiperItemId: 0
      }
    },
    methods: {
      async getSwiperItemList() {
        let res
        const currentPage = this.currentPage - 1
        try {
          this.loading = true
          res = await SwiperItem.getList({count: this.pageCount, page: currentPage})
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
        this.editSwiperItemId = val.row.id
      },
      handleDelete(val) {
        this.$confirm('此操作将永久删除该轮播项, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(async () => {
          const res = await SwiperItem.delete(val.row.id)
          if (res.error_code === 0) {
            this.getSwiperItemList()
            this.$message({
              type: 'success',
              message: `${res.msg}`,
            })
          }
        })
      },
      editClose() {
        this.showEdit = false
        this.getSwiperItemList()
      },
    },
    created() {
      this.operate = [{name: '编辑', func: 'handleEdit', type: 'primary',auth:'修改轮播项'}, {
        name: '删除', func: 'handleDelete', type: 'danger', auth: '删除轮播项',
      }]
      this.getSwiperItemList()
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
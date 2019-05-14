<template>
    <div>
        <div v-if="!showEdit">
            <!-- 列表页面 -->
            <div class="container">
                <div class="header">
                    <div class="title">微信用户列表</div>
                </div>
                <!-- 表格 -->
                <lin-table
                        :tableColumn="tableColumn"
                        :tableData="tableData"
                        :operate="operate"
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
        <!--        &lt;!&ndash; 编辑页面 &ndash;&gt;-->
        <!--        <swiper-template-edit v-else @editClose="editClose" :editWxUserId="editWxUserId"></swiper-template-edit>-->

    </div>
</template>

<script>
  import LinTable from '@/components/base/table/lin-table'
  import WxUser from '@/lin/models/wxuser'
  // import WxUserEdit from './WxUserEdit'

  export default {
    components: {
      LinTable
    },
    data() {
      return {
        refreshPagination: true, // 页数增加的时候，因为缓存的缘故，需要刷新Pagination组件
        total_nums: 0, // 分组内的用户总数
        currentPage: 1, // 默认获取第一页的数据
        pageCount: 10, // 每页10条数据
        tableData: [], // 表格数据
        operate: [],
        tableColumn: [
          {prop: 'id', label: '编号'},
          {prop: 'nickName', label: '昵称'},
          {
            prop: 'gender', label: '性别',
            formatter: (row, column, cellValue, index) => {
              if (cellValue === '1') {
                return '男'
              } else if (cellValue === '2') {
                return '女'
              } else {
                return '未知'
              }
            }
          },
          {prop: 'openId', label: 'OpenId'},
          {
            prop: 'avatarUrl', label: '头像',
            formatter: (row, column, cellValue, index) => {
              return `<img
      style="width: 30px; height: 30px"
      src="${row.avatarUrl}"></img>`
            },
            formatterNode: true
          },
          {prop: 'city', label: '城市'},
          {prop: 'province', label: '省份'},
          {prop: 'country', label: '国家'},
        ], // 表头数据
        loading: false,
        showEdit:
          false,
        // editWxUserId: 0
      }
    }
    ,
    methods: {
      async getWxUserList() {
        let res
        const currentPage = this.currentPage - 1
        try {
          this.loading = true
          res = await WxUser.getList({count: this.pageCount, page: currentPage})
          this.loading = false
          this.tableData = [...res.collection]
          this.total_nums = res.total_nums
        } catch (e) {
          this.loading = false
          console.log(e)
        }
      }
      ,
      // handleEdit(val) {
      //   this.showEdit = true
      //   this.editWxUserId = val.row.id
      // },
      handleDelete(val) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(async () => {
          const res = await WxUser.delete(val.row.id)
          if (res.error_code === 0) {
            this.getWxUserList()
            this.$message({
              type: 'success',
              message: `${res.msg}`,
            })
          }
        })
      }
      ,
      // editClose() {
      //   this.showEdit = false
      //   this.getWxUserList()
      // },
    }
    ,
    created() {
      this.operate = [
        // {name: '编辑', func: 'handleEdit', type: 'primary', auth: '修改轮播模版'},
        {
          name: '删除', func: 'handleDelete', type: 'danger', auth: '删除轮播模版',
        }]
      this.getWxUserList()
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
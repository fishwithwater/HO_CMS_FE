<template>
    <div>
        <!-- 列表页面 -->
        <div class="container">
            <div class="header">
                <div class="title">轮播模版列表</div>
            </div>
            <!-- 表格 -->
            <lin-table
                    :tableColumn="tableColumn"
                    :tableData="tableData"
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

        <!-- 编辑页面 -->
        <!--        <book-edit v-else @editClose="editClose" :editBookID="editBookID"></book-edit>-->

    </div>
</template>

<script>
  import LinTable from '@/components/base/table/lin-table'
  import SwiperTemplate from '@/lin/models/swiper-template'

  export default {
    components: {
      LinTable,
    },
    data() {
      return {
        refreshPagination: true, // 页数增加的时候，因为缓存的缘故，需要刷新Pagination组件
        total_nums: 0, // 分组内的用户总数
        currentPage: 1, // 默认获取第一页的数据
        pageCount: 10, // 每页10条数据
        tableData: [], // 表格数据
        tableColumn: [{prop: 'id', label: '编号'}, {prop: 'name', label: '模板'}, {prop: 'displayName', label: '模板名称'}], // 表头数据
        loading: false,
      }
    },
    methods: {
      async getSwiperTemplateList() {
        let res
        const currentPage = this.currentPage - 1
        try {
          this.loading = true
          res = await SwiperTemplate.getList({count: this.pageCount, page: currentPage})
          console.log(res)
          this.loading = false
          this.tableData = [...res.collection]
          this.total_nums = res.total_nums
        } catch (e) {
          this.loading = false
          console.log(e)
        }
      },
    },
    created() {
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
const swiperTemplateRouter = {
  route: null,
  name: null,
  title: '轮播模版',
  type: 'tab', // 类型: folder, tab, view
  icon: 'el-icon-document-copy',
  filePath: 'views/swiperTemplate', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      title: '轮播模板列表',
      type: 'view',
      name: 'SwiperTemplateList',
      route: '/swiper-item/list',
      filePath: 'views/swiperTemplate/SwiperTemplateList.vue',
      inNav: true,
      icon: 'el-icon-document-copy',
    },
    {
      title:'新增轮播模版',
      type:'view',
      name:'SwiperTemplateAdd',
      route:'/swiper-item/add',
      filePath:'views/swiperTemplate/SwiperTemplateAdd.vue',
      inNav:false,
      icon:'iconfont icon-add',
      right:['创建轮播模版']
    }
  ],
}

export default swiperTemplateRouter

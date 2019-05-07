const swiperTemplateRouter = {
  route: null,
  name: null,
  title: '首页轮播',
  type: 'folder', // 类型: folder, tab, view
  icon: 'el-icon-document-copy',
  filePath: 'views/', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      title:'轮播项列表',
      type:'tab',
      name:null,
      route:null,
      filePath:'views/swiperItem/',
      inNav:true,
      icon:'el-icon-date',
      children:[{
        title:'轮播项列表',
        type:'view',
        name:'SwiperItemList',
        route:'/swiper-item/list',
        filePath:'views/swiperItem/SwiperItemList.vue',
        inNav:true,
        icon:'el-icon-date'
      }]
    },
    {
      title: '轮播模板列表',
      type: 'tab',
      name: null,
      route: null,
      filePath: 'views/swiperTemplate/',
      inNav: true,
      icon: 'el-icon-document-copy',
      children:[{
        title: '轮播模板列表',
        type: 'view',
        name: 'SwiperTemplateList',
        route: '/swiper-template/list',
        filePath: 'views/swiperTemplate/SwiperTemplateList.vue',
        inNav: true,
        icon: 'el-icon-document-copy',
      },
        {
          title:'新增轮播模版',
          type:'view',
          name:'SwiperTemplateAdd',
          route:'/swiper-template/add',
          filePath:'views/swiperTemplate/SwiperTemplateAdd.vue',
          inNav:false,
          icon:'iconfont icon-add',
          right:['创建轮播模版']
        }]
    }
  ],
}

export default swiperTemplateRouter

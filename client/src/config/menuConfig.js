const menuList = [
  {
    title: '首页', // 菜单标题名称
    key: '/home', // 对应的path
    icon: 'home', // 图标名称
    isPublic: true, // 公开的
  },
  {
    title: 'CRUD',
    key: '/products',
    icon: 'appstore',
    children: [
      // 子菜单列表
      {
        title: '增删改查',
        key: '/category',
        icon: 'bars',
      },
      {
        title: '富文本',
        key: '/product',
        icon: 'tool',
      },
      {
        title: 'tabs',
        key: '/order',
        icon: 'windows',
      },
    ],
  },

  {
    title: '用户管理',
    key: '/user',
    icon: 'user',
  },
  {
    title: '角色管理',
    key: '/role',
    icon: 'safety',
  },
  {
    title: '虚拟dom',
    key: '/virtualDom',
    icon: 'safety',
  },

  {
    title: '图表可视化',
    key: '/charts',
    icon: 'area-chart',
    children: [
      {
        title: '柱形图',
        key: '/charts/bar',
        icon: 'bar-chart',
      },
      {
        title: '折线图',
        key: '/charts/line',
        icon: 'line-chart',
      },
      {
        title: '饼图',
        key: '/charts/pie',
        icon: 'pie-chart',
      },
      {
        title: '地图',
        key: '/charts/map',
        icon: 'radar-chart',
      },
    ],
  },

  {
    title: '组件拖拽',
    key: '/drag',
    icon: 'drag',
    children: [
      {
        title: '元素拖拽',
        key: '/drag/native',
        icon: 'drag',
      },
      {
        title: 'Rxjs拖拽',
        key: '/drag/rxjs',
        icon: 'drag',
      },
      {
        title: '自定义组件',
        key: '/drag/form-design',
        icon: 'form',
      },
    ],
  },
  {
    title: 'Hooks',
    key: '/hooks',
    icon: 'smile',
    children: [
      {
        title: '切片上传',
        key: '/hooks/slice',
        icon: 'cloud-upload',
      },
      {
        title: '实践',
        key: '/hooks/test',
        icon: 'loading',
      },
    ],
  },
  {
    title: '长列表渲染',
    key: '/bigTable',
    icon: 'table',
  },
  {
    title: 'GitHub',
    key: '/github',
    icon: 'github',
  },
];

export default menuList;

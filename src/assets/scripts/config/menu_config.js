const menus = [{
    name: '首页',
    img: require('../../../assets/images/menu/icon_wangge_default.png'),
    path: 'FirstPage'
}, {
    name: '网格管理',
    img: require('../../../assets/images/menu/icon_wangge_default.png'),
    path: 'GridManage'
}, {
    name: '矛盾化解',
    img: require('../../../assets/images/menu/icon_maodun_default.png'),
    path: 'ContradictionResolution',
    children: [{
        name: '矛盾登记',
        path: 'CaseRegister'
    }, {
        name: '案件受理',
        path: 'CaseAcceptance'
    }]
}, {
    name: '案件查询',
    img: require('../../../assets/images/menu/menu_query.png'),
    path: 'Question',
    children: [{
        name: '个人案件查询',
        path: 'PersonalQuestion'
    }, {
        name: '部门案件查询',
        path: 'DepartmentQuestion'
    }, {
        name: '综合案件查询',
        path: 'MultipleQuestion'
    }]
}, {
    name: '案件统计',
    img: require('../../../assets/images/menu/menu_query.png'),
    path: 'Statistics',
    children: [{
        name: '个人案件统计',
        path: 'PersonalStatistics'
    }, {
        name: '部门案件统计',
        path: 'DeptStatistics'
    }, {
        name: '部门综合统计',
        path: 'DeptMultiStatistics'
    }, {
        name: '角色案件统计',
        path: 'RoleStatistics'
    }, {
        name: '综合案件统计',
        path: 'MultiStatistics'
    }]
}, {
    name: '综治资源',
    img: require('../../../assets/images/menu/icon_ziyuan_default.png'),
    path: 'ComprehensiveResources',
    children: [{
        name: '人房管理',
        path: 'PeopleRoomManage'
    }, {
        name: '重点人群',
        path: 'KeyPopulation'
    }, {
        name: '排查整治',
        path: 'SafeProduction'
    }, {
        name: '两新组织',
        path: 'TwoNewOrganizations'
    }, {
        name: '校园周边',
        path: 'CampusPerimeter'
    }]
}]

export default menus

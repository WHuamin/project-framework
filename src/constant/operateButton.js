const villageBtns = Object.freeze([
  {
    name: 'edit',
    title: '编辑',
    showCondition: {
      isCreateUser: 1
    }
  },
  {
    name: 'audit',
    title: '审核',
    showCondition: {
      isCreateUser: 0,
      examineStatus: 0
    }
  },
  {
    name: 'device',
    title: '设备管理',
    showCondition: {
      examineStatus: 1
    }
  },
  {
    name: 'album',
    title: '相册管理'
  },
  {
    name: 'delete',
    title: '删除',
    showCondition: {
      isCreateUser: 1,
      examineStatus: 2
    }
  }
]);
// 角色页面操作按钮
const roleBtns = Object.freeze([
  {
    name: 'edit',
    title: '编辑',
    showCondition: {
      isCreateUser: 1
    }
  },
  {
    name: 'delete',
    title: '删除',
    showCondition: {
      isCreateUser: 1,
      examineStatus: 2
    }
  },
  {
    name: 'permission',
    title: '设置权限',
    showCondition: {
      examineStatus: 1
    }
  }
]);

const operateButtons = {
  village: villageBtns,
  role: roleBtns
};

export function operateBtns(data, name) {
  const result = [];
  const btns = operateButtons[name];
  btns.forEach(({ showCondition, ...btnInfo }) => {
    let isCan = true;
    if (showCondition) {
      for (const i in showCondition) {
        if (showCondition[i] !== data[i]) {
          isCan = false;
          break;
        }
      }
    }
    if (isCan) {
      result.push(btnInfo);
    }
  });
  return result;
}

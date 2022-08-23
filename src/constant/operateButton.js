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
    name: 'photo',
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
const operateButtons = {
  village: villageBtns
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

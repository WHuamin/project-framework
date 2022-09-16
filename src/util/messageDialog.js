import { ElMessage, ElMessageBox } from 'element-plus';
// import { h } from 'vue';

const InitConfirmMsg = {
  type: 'Warning',
  confirmButtonText: '确 定',
  cancelButtonText: '取 消'
};

const InitCustomMsg = {
  showCancelButton: true,
  confirmButtonText: 'OK',
  cancelButtonText: 'Cancel'
};

export function confirmMsg(text, title, config = {}) {
  return ElMessageBox.confirm(text, title, { ...InitConfirmMsg, ...config });
}

export function tipMsg(message, type = 'success') {
  return ElMessage({
    type,
    message
  });
}

export function customMsg(title, messageNode, config = {}) {
  return ElMessageBox({
    ...InitCustomMsg,
    ...config,
    title,
    message: messageNode,
    // message: h('p', null, [
    //   h('span', null, 'Message can be '),
    //   h('i', { style: 'color: teal' }, 'VNode')
    // ]),
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true;
        instance.confirmButtonText = 'Loading...';
        setTimeout(() => {
          done();
          instance.confirmButtonLoading = false;
        }, 3000);
      } else {
        done();
      }
    }
  });
}

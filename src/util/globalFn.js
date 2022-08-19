import { ElLoading } from 'element-plus';
// 全屏loading
export function openFullScreen(text = '加载中...') {
  return ElLoading.service({
    lock: true, // 是否锁定屏幕的滚动
    text,
    background: 'rgba(0, 0, 0, 0.2)'
  });
}

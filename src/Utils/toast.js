function showToast(title = '', type = 'success', fn, timeout = 2000) {
  uni.showToast({
    title: title,
    icon: type,
    duration: timeout,
    mask: true,
    complete() {
      if (fn) {
        setTimeout(() => {
          fn()
        }, timeout)
      }
    }
  })
}
function showModal(title = '', content = '', showCancel = false, successFn, failFn) {
  uni.showModal({
    title: title,
    content: content,
    mask: true,
    showCancel: showCancel,
    success() {
      successFn && successFn()
    },
    fail() {
      failFn && failFn()
    }
  })
}

export {
  showToast,
  showModal
}
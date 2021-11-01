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

export {
  showToast
}
function getAuthorize(scope, cb, fb) {
  if (!scope) return
  uni.authorize({
    scope: scope,
    success: res => {
      cb && cb(res)
    },
    fail: res => {
      fb && fb(res)
    }
  })
}

// 页面跳转
function jumpPage(url, isRedirect) {
  let jumpFn = isRedirect ? uni.redirectTo : uni.navigateTo
  // TODO: 加入判定，如果不是登录就提示登录
  jumpFn({
    url: url,
  })
}

// 本地存储
function setStorage(name, data) {
  uni.setStorageSync(name, data)
}

function getStorage(name) {
  let data = uni.getStorageSync(name)
  return data
}

export default {
  getAuthorize,
  jumpPage,
  setStorage,
  getStorage,
}
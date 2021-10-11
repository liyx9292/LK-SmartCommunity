import { default as Constants } from './constants'

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
  let userInfo = getStorage(Constants.USER_INFO)
  console.log(userInfo)
  if (!userInfo || !userInfo.nickName) {
    uni.navigateTo({ url: '/pages/common/auth'})
    return
  }
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

// 登录
function login() {
  let loginCode = getStorage(Constants.LOGIN_CODE)
  checkSession()
  .then(res => {
    if (!res) {
      uni.login({
        provider: 'weixin',
        success(loginRes) {
          setStorage(Constants.LOGIN_CODE, loginRes.code)
          loginCode = loginRes.code
        }
      })
    }
    getUserInfo()
  })
  .then(userInfo => {})
  .catch(reject => reject)
}

// 检查登录状态
function checkSession() {
  return new Promise((resolve, reject) => {
    uni.checkSession({
      success() {
        resolve(true)
      },
      fail() {
        resolve(false)
      }
    })
  })
}

// 获取用户信息
function getUserInfo() {
  return new Promise((resolve, reject) => {
    uni.getUserInfo({
      provider: 'weixin',
      success(userRes) {
        setStorage(Constants.USER_INFO, userRes.userInfo)
        resolve(userRes)
      },
      fail(res) {
        reject(res)
      }
    })
  })
}

export default {
  getAuthorize,
  jumpPage,
  setStorage,
  getStorage,
  login,
}
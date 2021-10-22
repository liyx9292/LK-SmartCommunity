import { default as Constants } from './constants'
import services from './services'
const request = services.request

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
  let token = getStorage(Constants.TOKEN)
  if (!userInfo || !userInfo.nickName || !token) {
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
    if (!res || !loginCode) {
      uni.login({
        provider: 'weixin',
        success(loginRes) {
          setStorage(Constants.LOGIN_CODE, loginRes.code)
          loginCode = loginRes.code
          return getUserInfo()
        }
      })
    } else {
      console.log(123)
      return getUserInfo()
    }
  })
  .then(userInfo => {
    let params = {
      code: loginCode,
      encrypted_data: userInfo.encryptedData,
      user_info: userInfo.rawData,
      iv: userInfo.iv,
      signature: userInfo.signature,
    }
    return requestLogin(params)
    // TODO: 暂时不登录
  })
  .then(res => {
    // 请求登录
    setStorage(Constants.TOKEN, res.token)
  })
  .catch(reject => reject)
}

function requestLogin(loginData) {
  return request('/login.html', loginData, 'POST')
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
        console.log('登录失败了')
        reject(res)
      }
    })
  })
}

// 保存历史记录
function saveHistory(data, historyName = Constants.TAG_HISTORIES, maxLength = 8) {
  let tags = this.utils.getStorage(historyName) || []
  let isFindIndex = tags.findIndex(item => item === data)
  if (tags.length >= maxLength && isFindIndex === -1) {
    tags.splice(tags.length - 1, 1)
  } else if (isFindIndex>= 0) {
    tags.splice(isFindIndex, 1)
  }
  tags.unshift(data)
  setStorage(historyName, tags)
}

export default {
  getAuthorize,
  jumpPage,
  setStorage,
  getStorage,
  login,
  saveHistory,
}
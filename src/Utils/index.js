import { default as Constants } from './constants'
import services from './services'
import { showToast, showModal } from './toast'
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

function cleanStorage(name) {
  uni.removeStorageSync(name)
}

// 登录
async function login(userInfo, isAuth) {
  let loginCode = getStorage(Constants.LOGIN_CODE)
  try {
    let checkRes = await checkSession()
    if (!checkRes || !loginCode) {
      let msg = 'loginCode没有'
      if (!checkRes) msg = 'session失效'
      throw msg
    }
    if (!userInfo) {
      userInfo = getStorage(Constants.USER_LOGIN_DATA)
      if (!userInfo) throw '没有userData'
    }
    let params = {
      code: loginCode,
      encrypted_data: userInfo.encryptedData,
      user_info: userInfo.rawData,
      iv: userInfo.iv,
      signature: userInfo.signature,
    }
    let getToken = await requestLogin(params)
    setStorage(Constants.TOKEN, getToken.token)
    setStorage(Constants.USER_INFO, getToken.userinfo)
    return true
  } catch(err) {
    console.log('--登录失败--')
    uni.clearStorage()
    console.log(err)
  }
}

function wxLogin() {
  return new Promise((resolve, reject) => {
    uni.login({
      provider: 'weixin',
      success(loginRes) {
        setStorage(Constants.LOGIN_CODE, loginRes.code)
        resolve(loginRes.code)
      },
      fail(rej) {
        console.log(rej)
      }
    })
  })
}

function requestLogin(loginData) {
  return request('/login.html', loginData, 'POST')
}

function requestUserInfo() {
    request('/getUserInfo.html', '', 'get')
    .then(res => {
      setStorage(Constants.USER_INFO, res.userInfo)
    })
    .catch(rej => {
      uni.cleanStorage()
    })
}

// 检查登录状态
function checkSession() {
  return new Promise((resolve, reject) => {
    uni.checkSession({
      success(res) {
        console.log('---session成功----')
        resolve(true)
      },
      fail() {
        console.log('---session失败----')
        resolve(false)
      }
    })
  })
}

// 获取用户信息
function getUserInfo() {
  return new Promise((resolve, reject) => {
    uni.getUserInfo({
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
  let tags = getStorage(historyName) || []
  let isFindIndex = tags.findIndex(item => item === data)
  if (tags.length >= maxLength && isFindIndex === -1) {
    tags.splice(tags.length - 1, 1)
  } else if (isFindIndex>= 0) {
    tags.splice(isFindIndex, 1)
  }
  tags.unshift(data)
  setStorage(historyName, tags)
  return tags
}

export default {
  getAuthorize,
  jumpPage,
  setStorage,
  getStorage,
  cleanStorage,
  login,
  saveHistory,
  showToast,
  showModal,
  wxLogin,
  checkSession,
  requestUserInfo,
}
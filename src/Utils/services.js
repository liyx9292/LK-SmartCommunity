import config from '../config'
import utils from './index'
import constants from './constants'

function request(url, params, method = 'get') {
  method = method.toUpperCase();
  uni.showLoading({
    title: '加载中',
    mask: true,
  })
  let token = utils.getStorage(constants.TOKEN) || ''
  let requestData = {
    ...params,
    token: token,
  }
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${config.baseUrl}${url}`, //仅为示例，并非真实接口地址。
      method: method,
      data: requestData,
      header: {},
      success: res => {
        uni.hideLoading()
        if (res.statusCode === 200 && res.data && res.data.code === 200) {
          resolve(res.data.data)
        } else if (res.statusCode === 500) {
          uni.showToast({
            title: '请求错误',
            icon: 'error',
            duration: 2000
          })
          reject(res)
        } 
        else {
          reject(res)
        }
      },
      fail: res => {
        uni.hideLoading()
        reject(res)
      },
    });
  })
}

export default {
  request,
}
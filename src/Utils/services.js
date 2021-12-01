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
  // let token1 = utils.getStorage('token') || ''
  // console.log(token1)
  // debugger
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

function get(url, data) {
  return request(url, data)
}

function post(url, data) {
  return request(url, data, 'post')
}

function uploadImg(filePath) {
  let token = utils.getStorage(constants.TOKEN) || ''
  let formData = {
    token: token,
  }
  uni.showLoading({
    title: '上传中',
    mask: true,
  })
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: `${config.baseUrl}/uploadimg.html`,
      formData: formData,
      filePath: filePath,
      name: 'imgs',
      success(res) {
        if (res.statusCode === 200) {
          let data = JSON.parse(res.data)
          if (data.code == 200) {
            resolve(data.data)
          } else {
            reject(res)
          }
        } else {
          uni.showToast({
            title: '上传错误',
            icon: 'error',
            duration: 2000
          })
          reject(res)
        }
      },
      fail(rej) {
        reject(rej)
      }
    })
  })
}

export default {
  request,
  get,
  post,
  uploadImg,
}
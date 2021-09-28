function request(url, params, method = 'get') {
  method = method.toUpperCase();
  return new Promise((resolve, reject) => {
    uni.request({
      url: url, //仅为示例，并非真实接口地址。
      method: method,
      data: params,
      success: res => {
        if (res.statusCode === 200) {
          resolve(res)
        } else {
          reject(res)
        }
      },
      fail: res => {
        reject(res)
      }
    });
  })
}

export default {
  request,
}
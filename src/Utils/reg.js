function showErr(msg) {
  uni.showToast({
    title: msg,
    mask: true,
    icon: 'error'
  })
}

function validateTel(num) {
  let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  let result = reg.test(num)
  if (!result) {
    showErr('手机号不正确')
  }
  return result
}

export default {
  validateTel
}
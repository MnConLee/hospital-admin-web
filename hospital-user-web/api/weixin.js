import request from '@/utils/request'

const api_name = `/api/ucenter/wx`

export default {
  //生成微信支付二维码
  createNative(orderId) {
    return request({
    url: `api/order/weixin/createNative/${orderId}`,
    method: 'get'
    })
},

  getLoginParam() {
    return request({
      url: `${api_name}/getLoginParam`,
      method: `get`
    })
  }
}

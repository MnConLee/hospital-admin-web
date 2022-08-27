import request from '@/utils/request'

const api_name = `/api/user`

//用户登录
export default {
  login(userInfo) {
    return request({
      url: `${api_name}/login`,
      method: `post`,
      data: userInfo
    })
  },

  getUserInfo() {
    return request({
      url: `${api_name}/auth/getUserInfo`,
      method: `get`
    })
  },

  saveUserAuah(userAuah) {
    return request({
      url: `${api_name}/auth/userAuah`,
      method: 'post',
      data: userAuah
    })
  }
}

import request from '@/utils/request'

const api_name = `/api/user/cases`
export default{
    //病例列表
    findList(page, limit) {
        return request({
            url: `${api_name}/getAll/${page}/${limit}`,
            method: `get`
        })
    },
    //通过orderId查询病例信息
    findCasesByOrderId(orderId){
      return request({
        url: `${api_name}/getCasesByOrderId/${orderId}`,
        method: `get`
    })
    }
}

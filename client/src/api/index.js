/**
 * @param 应用接口
 */
import request from '../utils/axios'

export const reqLogin=data=>request('/login','POST',data)
export const reqAddUser=data=>request('/manage/user/add','POST',data)
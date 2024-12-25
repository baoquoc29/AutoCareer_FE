import {baseService} from "../BaseService";

export class UserService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super()
    };
    login = (username,password) => {
        return this.post('api/accounts/login',{username,password})
    }
    logout = (token)=> {
        return this.post('api/accounts/logout', {token})
    }
    sign_up_business = (formData)=>{
            return this.postFormData('api/business/register',formData)
    }
    sign_up_university = (formData)=>{
        return this.postResponse('api/university/register',formData)
    }
    send_verify_code_university = (body)=>{
        return this.postResponse('api/university/verify-university',body)
    }
    send_verify_code_business = (formData)=>{
        return this.postFormData('api/business/verify-business',formData)
    }
    send_forgot_code = (email)=>{
        return this.postResponse('api/accounts/forgot-code',email)
    }
    change_password = (formData)=>{
        return this.put('api/accounts/change-password',formData)
    }
    send_new_password = (formData)=>{
        return this.postResponse('api/accounts/forgot-pass',formData)
    }

}
export const userService = new UserService ();
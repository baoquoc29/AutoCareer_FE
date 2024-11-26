import {baseService} from "./BaseService";

export class UserService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super()
    };
    login = (username,password) => {
        return this.post('api/accounts/login',{username,password})
    }
    logout = (token)=>{
        return this.post('api/accounts/logout',{token})
    }
}
export const userService = new UserService ();
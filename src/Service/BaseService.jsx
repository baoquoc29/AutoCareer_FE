import {DOMAIN, TOKEN} from "../Utils/Setting/Config";
import Axios from "axios";


export class baseService {
    put = (url, model) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: 'PUT',
            data: model,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }
    post = (url, model) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: 'POST',
            data: model,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }
    get = (url, model) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: 'GET',
            data: model,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }
    delete = (url, model) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: 'DELETE',
            data: model,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }
}
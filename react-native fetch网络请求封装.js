import { AsyncStorage } from 'react-native';
import * as TYPES from '../types';
import * as CONFIG from '../config';

export function request(route, params, dispatch, success=null, error=null, { method='GET', headers={}, body=null } = {}, is_form_data=false) {
    // 处理query
    const p = Object.keys(params).length > 0 ? '?' + Object.entries(params).map( (i)=> `${i[0]}=${encodeURI(i[1])}` ).join('&') : ''
    const uri = `http://${ CONFIG.API_URI }${ route }${ p }`
    let d = {method: method, headers: headers}
    if (method!='GET') d.body = is_form_data ? body : JSON.stringify(body)
    // console.log(`[${method}] ${uri}`)
    //console.log(uri, d)
    fetch(uri, d)
        .then((response) => {
            //console.log(response)
            if (response.status === 200) {
                return response.json()
            } else {
                return {code: response.status, result: 0}
            }
        })
        .then((data) => {
            //console.log("request",data)
            if (data.code === 0 || data.result === 1) success && success(data)
            else {
                // 处理错误
                switch (data.code) {
                    case 400:
                        //Toast.showShortBottom('参数错误')
                        break
                    case 401:
                        AsyncStorage.removeItem(CONFIG.USER_KEY, () => {
                            if (route === '/token') {
                                //Toast.showShortBottom('登录失败，用户名或密码不正确')
                            } else {
                                //Toast.showShortBottom('登录超时，请重新登录')
                                dispatch({type: TYPES.LOGGED_OUT})
                            }
                        })
                        break
                    default:
                        break
                }
                error && error(data)
            }
        })
        .catch((error) => {
            console.warn(error)
        })
}


// actions 模块


GET请求:
import { AsyncStorage } from 'react-native';
import * as TYPES from '../types';
import * as CONFIG from '../config';
import { request } from './request';
import base64 from 'base-64'

export function login(opt = {}) {
    return (dispatch) => {
        //dispatch({type: TYPES.LOGGED_PEDDING});
        const route = '/token';
        const method = 'GET';
        const headers = {
            ...CONFIG.HEADERS,
            'Authorization': `Basic ${base64.encode(`${opt.username}:${opt.password}`)}`,
        }
        const success = (data) => {
          //创建本地储存 localStorage.setItem()或者AsyncStorage.setItem
          AsyncStorage.setItem(CONFIG.USER_KEY, JSON.stringify(data.result))
          if(data.code === 0) {
            dispatch({ type: TYPES.LOGGED_IN, result: data.result })
          }
          opt.success && opt.success(data)
        }
        const error = (data)=> {
            dispatch({type: TYPES.LOGGED_ERROR, error: data.error})
            opt.error && opt.error(data)
        };
        request(route, {}, dispatch, success, error, {method, headers})
    }
}

//POST 请求
export function addAccountBank(opt = {}) {
    return (dispatch) => {
        const route = `/url`
        const method = 'POST';
        const headers = {
          ...CONFIG.HEADERS,
          Authorization:opt.token,  //认证
        }
        const body = JSON.stringify(opt.body)
        const success = (data)=> {
          opt.success && opt.success(data)
        };
        const error = (data)=> {
          opt.error && opt.error(data)
        };
        request(route, {}, dispatch, success,error,{ method, headers, body })
    }
}

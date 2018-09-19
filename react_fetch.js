/**
 *网络请求的actions
 **/
import { pendingTask, begin, end } from 'react-redux-spinner'
import { message } from 'antd'
import * as TYPES from '../types';
import * as CONFIG from '../../config';


//处理请求参数
function getQueryString(params) {
  return Object
  .keys(params)
  .map(k => {
    if (params[k] !== 0 && !params[k]) return ""
    if (Array.isArray(params[k])) {
      return params[k]
          .map(val => `${encodeURIComponent(k)}=${encodeURIComponent(val)}`)
          .join('&')
    }
    return `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`
  }).filter(item => !!item.length)
  .join('&')
}

export function request(route, params, dispatch, success=null, { method='GET', headers={}, body=null } = {}, is_form_data=false) {
  // 处理query
  dispatch({ type: TYPES.REQUEST_PENDDING, [pendingTask]: begin })
  const arr = Object.keys(params)
  const p = arr.length > 0 ? getQueryString(params): ''
  // console.log(p)
  const uri = `http://${ CONFIG.API_URI }${ route }?${ p }`
  let d = { method: method, headers: headers }
  if (method !== 'GET') d.body = body
  // console.log(`[${method}] ${uri}`)
  fetch(uri, d)
      .then((response) => {
          return response.json()
      })
      .then((data) => {
        // console.log('data',data)
          if (data.code === '0' && data.message === '成功' ) {
            dispatch({ type: TYPES.REQUEST_SUCCESS, [pendingTask]: end })
            success && success(data)
          }else {
            let data_error = JSON.parse(data.message).error
            message.error(`抱歉,${data_error}`)
            dispatch({ type: TYPES.REQUEST_ERROR, [pendingTask]: end })
          }
      })
      .catch((error) => {
        console.warn(error)
      })
}

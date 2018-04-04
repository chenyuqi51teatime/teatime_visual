import store from './store'
import Xhr from '../plugins/xhr'

// 接口地址
const apis = {

  apply: {
    // url: '/v1/delivery/user/add',
    // type: 'post'
  }
}
export default (Vue) => {
  let xhr = Xhr.init(Vue, process.env.OPERATOR_SERVER)
  let request = (api, data = {}, config = {}) => {
    return xhr(apis[api], data, {
      // headers: {'Authorization': `Bearer ${store.state.Token.token}`},
      ...config
    })
  }
  Vue.request = request
  Vue.prototype.$request = request
}

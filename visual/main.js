// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
const setBodyFontSize = () => {
  document.documentElement.style.fontSize = document.body.clientWidth / 20 + 'px'
}
setBodyFontSize()
window.onload = function () {
  setBodyFontSize()
}
const evt = 'onorientationchange' in window ? 'orientationchange' : 'resize'
window.addEventListener(evt, function () {
  setBodyFontSize()
}, false)

import Vue from 'vue'
import Visual from './visual'
import router from './router'
import FastClick from 'fastclick'
import Axios from 'axios'

import VueAxios from 'vue-axios'
Vue.use(VueAxios,Axios)
// 全局filter
import filters from '../filters'
Vue.use(filters)

// store
import store from './store'

import '@/style/tt.css'
import '@/style/mint.scss'

import request from './request'
Vue.use(request)

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  template: '<Visual/>',
  components: { Visual }
})
window.TTSCRIPTLOADED = true

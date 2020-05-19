// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

//全局过滤器：在创建Vue实例之前全局定义过滤器
//格式化时间
Vue.filter('formateDate', (time) => {
    let date = new Date(time * 1000); //创建一个日期对象
    let Y = date.getFullYear(); //年
    let M = date.getMonth() + 1; //月
    let D = date.getDate(); //日

    //补0操作，使用三目运算符
    M = M < 10 ? "0" + M : M; //月
    D = D < 10 ? "0" + D : D; //日

    return `${Y}-${M}-${D}`;
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

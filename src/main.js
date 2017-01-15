import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VeeValidate from 'vee-validate'
import vuei18n from 'vue-i18n'
import locales from './data/locales'

Vue.use(VueResource)
Vue.use(VeeValidate)
Vue.use(vuei18n)

// set lang
let lang = 'es'
Vue.config.lang = ''
Vue.config.fallbackLang = 'es'


// set locales
Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
})

Vue.config.lang = lang;

new Vue({
  el: '#app',
  render: h => h(App)
})

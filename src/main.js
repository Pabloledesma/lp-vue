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
window.lang = lang
Vue.config.lang = ''
Vue.config.fallbackLang = 'en'


// set locales
Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
})

Vue.config.lang = lang;

Vue.filter('two_digits', function (value) {
    if(value.toString().length <= 1)
    {
        return "0"+value.toString();
    }
    return value.toString();
});

new Vue({
  el: '#app',
  render: h => h(App)
})



import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VeeValidate from 'vee-validate'

Vue.use(VueResource)
Vue.use(VeeValidate)

/**
* Validation messages
*/
const dictionary = {
	en: {
        city_origin_null: "Select a city of origin",    
        destination_city_null: "Select the destination city",
        origin_destination: "The destination city should be different from the city of origin",
        departure_date: "Select departure",
        return_date: "Select Return Date"
  	},
  	es: {
        city_origin_null: "Seleccione la ciudad de origen",
        destination_city_null: "Seleccione la ciudad de destino",
        origin_destination: "La ciudad de destino debe ser diferente de la de origen",
        departure_date: "Seleccione la fecha de salida",
        return_date: "Seleccione la fecha de regreso"
  	},
  	pt: {
        city_origin_null: "Selecione uma cidade de origem",
        destination_city_null: "Selecione a cidade de destino",
        origin_destination: "A cidade de destino deve ser diferente a partir da cidade de origem",
        departure_date: "Selecione a partida",
        return_date: "Selecionar data de retorno"
  	}
};

//const validator = new VeeValidate();

new Vue({
  el: '#app',
  render: h => h(App)
})

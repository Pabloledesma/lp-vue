<template>
	<div class="column">
		<h3>Reserva tu vuelo ahora</h3>
		<form @submit.prevent="onSubmit">
			<p class="control">
			  <label class="radio">
			    <input type="radio" name="typeOfTrip" value="RT" v-model="typeOfTrip">
			    Ida y vuelta
			  </label>
			  <label class="radio">
			    <input type="radio" name="typeOfTrip" value="OW" v-model="typeOfTrip">
			    Una Vía
			  </label>
			</p>

			<p class="control">
			  <span class="select">
			    <select v-model="origin">
			      <option value="">Desde</option>
			      <option v-for="city in fromCities" :value="city.id">{{city.name}}</option>
			    </select>
			  </span>

			  <span class="select">
			    <select v-model="destination">
			      <option value="">Hacia</option>
			      <option v-for="city in toCities" :value="city.id">{{city.name}}</option>
			    </select>
			  </span>
			</p>

			<p class="control">
			  <label class="radio">
			    <input type="radio" name="classOfTrip" value="business" v-model="classOfTrip">
			    Clase ejecutiva
			  </label>
			  <label class="radio">
			    <input type="radio" name="classOfTrip" value="economy" v-model="classOfTrip">
			    Clase económica
			  </label>
			</p>

			<p class="control">
				<label class="label">Salida</label>
				<datepicker v-model="departureDate" :disabled="disabled" language="es"></datepicker>
				<label class="label">Regreso</label>
				<datepicker v-model="returnDate" :disabled="disabled" language="es"></datepicker>
			</p>

			<div class="control is-grouped">
			  <p class="control">
			    <button class="button is-primary">Buscar Vuelo</button>
			  </p>
			</div>
			
		</form>
	</div>
</template>
<script>
import info from '../data/info'
import Datepicker from 'vuejs-datepicker'

	export default {
		name: 'booking',
		data(){
			return {
				typeOfTrip: 'OW',
				origin: '',
				destination: '',
				classOfTrip: 'economy',
				departureDate: '',
				returnDate: '',
				fromCities: info.fromcities,
				toCities: info.tocities,
				disabled: {
					to: info.departure_date,
					from: info.return_date
				}
			};
		},
		components: {
			Datepicker
		},
		mounted(){
			//console.log(info);
		}
	}
</script>
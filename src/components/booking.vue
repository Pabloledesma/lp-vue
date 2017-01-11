<template>
	<div class="column">
		<h3>Reserva tu vuelo ahora</h3>
		<form @submit.prevent="onSubmit">
			<p class="control">
			  <label class="radio">
			    <input type="radio" name="typeOfTrip" value="RT" v-model="form.typeOfTrip">
			    Ida y vuelta
			  </label>
			  <label class="radio">
			    <input type="radio" name="typeOfTrip" value="OW" v-model="form.typeOfTrip">
			    Una Vía
			  </label>
			</p>

			<p class="control">
			  <span class="select">
			    <select v-model="form.origin" required>
			      <option value="">Desde</option>
			      <option v-for="city in fromCities" :value="city.id">{{city.name}}</option>
			    </select>
			    <span class="help is-danger" v-text="form.errors.get('origin')" v-if="form.errors.has('origin')"></span>
			  </span>

			  <span class="select">
			    <select v-model="form.destination">
			      <option value="">Hacia</option>
			      <option v-for="city in toCities" :value="city.id">{{city.name}}</option>
			    </select>
			  </span>
			</p>

			<p class="controsrcl">
			  <label class="radio">
			    <input type="radio" name="classOfTrip" value="business" v-model="form.classOfTrip">
			    Clase ejecutiva
			  </label>
			  <label class="radio">
			    <input type="radio" name="classOfTrip" value="economy" v-model="form.classOfTrip">
			    Clase económica
			  </label>
			</p>

			<div class="control is-grouped">
				<div class="control">
					<label class="label">Salida</label>
					<datepicker v-model="form.departureDate" :disabled="disabled" language="es"></datepicker>
				</div>
				<div v-if="typeOfTrip == 'RT'" class="control">
					<label class="label">Regreso</label>
					<datepicker v-model="form.returnDate" :disabled="disabled" language="es"></datepicker>
				</div>
			</div>

			<div class="control is-grouped">
				<div class="control">
				  	<label class="label">Adultos<br>(12+)</label>
				  	<span class="select">
				    	<select v-model="form.adults">
				      		<option v-for="number in numbers" :value="number">{{number}}</option>
				    	</select>
				  	</span>
				</div>
				<div class="control">
					<label class="label">Niños<br>(2-11)</label>
				  	<span class="select">
				    	<select v-model="form.childs">
				      		<option v-for="number in numbers" :value="number">{{number}}</option>
				    	</select>
				  	</span>
				</div>
				<div class="contro">
					<label class="label">Infantes<br>(0-1)</label>
				   	<span class="select">
				    	<select v-model="form.infants">
				      		<option v-for="number in numbers" :value="number">{{number}}</option>
				    	</select>
				  	</span>
				</div>
			</div>

			<div class="control">
			    <button class="button is-primary">Buscar Vuelo</button>
			</div>
			
		</form>
	</div>
</template>
<script>
import info from '../data/info'
import Datepicker from 'vuejs-datepicker'
import Form from '../core/Form'

	export default {
		name: 'booking',
		data(){
			return {
				form: new Form({
					typeOfTrip: 'OW',
					origin: '',
					destination: '',
					classOfTrip: 'economy',
					departureDate: '',
					returnDate: '',
					adults: 1,
					childs: 0,
					infants: 0
				}), 
				fromCities: info.fromcities,
				toCities: info.tocities,
				numbers: [0,1,2,3,4,5,6,7,8],
				disabled: {
					to: info.departure_date,
					from: info.return_date
				}
			};
		},
		components: {
			Datepicker
		},
		methods:{
			onSubmit(){
				console.log('submited!');
			}
		}
		
	}
</script>
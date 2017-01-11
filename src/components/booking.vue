<template>
	<div class="column">
		<h3>Reserva tu vuelo ahora</h3>
		<form @submit.prevent="validateBeforeSubmit">
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

			<div class="control is-grouped">
				<div class="control">
				  	<span class="select">
					    <select 
					    	v-model="origin" 
					    	v-validate 
					    	data-vv-rules="required" 
					    	name="origin"
							:class="{'input': true, 'is-danger': errors.has('origin') }"
					    >
					      	<option value="">Desde</option>
					      	<option v-for="city in fromCities" :value="city.id">{{city.name}}</option>
					    </select>
				  	</span>
					<span v-show="errors.has('origin')" class="help is-danger">{{ errors.first('origin') }}</span>
				</div>

				<div class="control">
				  	<span class="select">
					    <select 
					    	v-model="destination" 
					    	v-validate 
					    	data-vv-rules="required" 
					    	name="destination"
							:class="{'input': true, 'is-danger': errors.has('destination') }"
					    >
					      	<option value="">Hacia</option>
					      	<option v-for="city in toCities" :value="city.id">{{city.name}}</option>
					    </select>
				  	</span>
					<span v-show="errors.has('destination')" class="help is-danger">{{ errors.first('destination') }}</span>
				</div>
			</div>

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

			<div class="control is-grouped">
				<div class="control">
					<label class="label">Salida</label>
					<datepicker 
						v-model="departureDate"
						v-validate
						data-vv-rules="required" 
						:disabled="disabled" 
						language="es"
						name="departureDate"
						:class="{'input': true, 'is-danger': errors.has('departureDate') }"
					></datepicker>
					<span v-show="errors.has('departureDate')" class="help is-danger">
						{{ errors.first('departureDate') }}
					</span>
				</div>

				<div class="control" v-if="typeOfTrip == 'RT'">
					<label class="label">Regreso</label>
					<datepicker 
						v-model="returnDate" 
						v-validate
						data-vv-rules="required"
						:disabled="disabled" 
						language="es"
						name="returnDate"
						:class="{'input': true, 'is-danger': errors.has('returnDate') }"
					></datepicker>
					<span v-show="errors.has('returnDate')" class="help is-danger">
						{{ errors.first('returnDate') }}
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
		methods: {
			validateBeforeSubmit() {
            	// Validate All returns a promise and provides the validation result.                
	            this.$validator.validateAll().then(success => {
	                if (! success) {
	                    // handle error
	                    return;
	                }
	                alert('From Submitted!');
	            });
        	}
		}
	}
</script>
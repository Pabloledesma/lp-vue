<template>
	<div class="col-md-4 booking">
		<form @submit.prevent="validateBeforeSubmit">
			<div class="booking-header">
				<p>Reserva tu vuelo ahora</p>
			</div>
			<div class="col-md-12 radios">
			  <label class="radio-inline">
			    <input type="radio" name="typeOfTrip" value="RT" v-model="typeOfTrip">
			    Ida y vuelta
			  </label>
			  <label class="radio-inline">
			    <input type="radio" name="typeOfTrip" value="OW" v-model="typeOfTrip">
			    Una Vía
			  </label>
			</div>

			<div :class="{'form-group': true, 'col-md-6':true, 'has-error': errors.has('origin')}">
			    <select 
			    	v-model="origin" 
			    	v-validate 
			    	data-vv-rules="required"
			    	data-vv-as="ciudad de origen" 
			    	name="origin"
					class="form-control input-sm"
			    >
			      	<option value="">Desde</option>
			      	<option v-for="city in fromCities" :value="city.id">{{city.name}}</option>
			    </select>
				<!-- <span v-show="errors.has('origin')" class="help is-danger">{{ errors.first('origin') }}</span> -->
				<p v-show="errors.has('origin')" class="text-danger">{{ $t('messages.cityOriginNull') }}</p>
			</div>

			<div :class="{'form-group': true, 'col-md-6':true, 'has-error': errors.has('destination')}">
			    <select 
			    	v-model="destination" 
			    	v-validate 
			    	data-vv-rules="required" 
			    	name="destination"
					class="form-control"
			    >
			      	<option value="">Hacia</option>
			      	<option v-for="city in toCities" :value="city.id">{{city.name}}</option>
			    </select>
				<!-- <span v-show="errors.has('destination')" class="help is-danger">{{ errors.first('destination') }}</span> -->
				<p v-show="errors.has('destination')" class="text-danger">{{ $t('messages.destinationCityNull') }}</p>
			</div>
				
			
			<div class="col-md-12 radios">
				<label class="radio-inline">
				    <input type="radio" name="classOfTrip" value="business" v-model="classOfTrip">
				    Clase ejecutiva
				</label>
				<label class="radio-inline">
				    <input type="radio" name="classOfTrip" value="economy" v-model="classOfTrip">
				    Clase económica
				</label>
				
			</div>

			<div :class="{'form-group': true, 'col-md-6':true, 'has-error': errors.has('departureDate')}">
				<label class="label">Salida</label>
				<input 
					type="text"
					id="departureDate" 
					v-model="departureDate"
					v-validate
					data-vv-rules="required" 
					name="departureDate"
					class="form-control datepicker"
				>
				<!-- <span v-show="errors.has('departureDate')" class="help is-danger">{{ errors.first('departureDate') }}</span> -->
				<p v-show="errors.has('departureDate')" class="text-danger">{{ $t('messages.departureDateRequired') }}</p>
				<p v-show="(departureDate && returnDate) && ! before" class="text-danger">{{ $t('messages.departureDateBefore') }}</p>
			</div>

				<div :class="{'form-group': true, 'col-md-6':true, 'has-error': errors.has('returnDate')}" v-if="typeOfTrip == 'RT'">
					<label class="label">Regreso</label>
					<input
						type="text"
						id="returnDate" 
						v-model="returnDate" 
						v-validate
						data-vv-rules="required"
						name="returnDate"
						class="form-control datepicker"
					>
					<p v-show="errors.has('returnDate')" class="text-danger">{{ $t('messages.returnDateRequired') }}</p>
				</div>
				<div class="form-group col-md-4">
				  	<label class="label">Adultos</label>
			    	<select v-model="adults" class="form-control">
			      		<option v-for="number in numbers" :value="number">{{number}}</option>
			    	</select>
				</div>
				<div class="form-group col-md-4">
					<label class="label">Niños</label>
			    	<select v-model="childs" class="form-control">
			      		<option v-for="number in numbers" :value="number">{{number}}</option>
			    	</select>
				</div>
				<div class="form-group col-md-4">
					<label class="label">Infantes</label>
			    	<select v-model="infants" class="form-control">
			      		<option v-for="number in numbers" :value="number">{{number}}</option>
			    	</select>
				</div>

			<div class="form-group text-center submit">
			    <button type="submit" class="btn btn-primary">Buscar Vuelo</button>
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
				
				typeOfTrip: 'RT',
				origin: '',
				destination: '',
				classOfTrip: 'economy',
				departureDate: '',
				returnDate: '',
				adults: 1,
				childs: 0,
				infants: 0,
				promoCode: '', 
				flexibleSearch: true,
				fromCities: info.fromcities,
				toCities: info.tocities,
				numbers: [0,1,2,3,4,5,6,7,8],
				disabled: {
					to: info.departure_date,
					from: info.return_date
				},
				d1: this.getCookie('cname'),
				pageName: info.pageName

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
	                    //console.log(this.errors)
	                    return;
	                }

	                if( this.beforeRule() ){
	                	this.goBooking();
	                }

	                //Send info
	                alert('From Submitted!');
	            });
        	},

        	/**
			* La fecha de salida debe ser menor o igual que la fecha de regreso
			* y aplica solo cuando el tipo de vuelo es RT
			*/
        	beforeRule(){
        		return ( this.typeOfTrip == "RT" ) && this.before;
        	},

        	/*
			* Busca el nombre de una cookie y retorna su valor
			*
			* @cname  String  Nombre de la cookie
			***/
			getCookie(cname) {
			    var name = cname + "=";
			    var ca = document.cookie.split(';');
			    for(var i = 0; i <ca.length; i++) {
			        var c = ca[i];
			        while (c.charAt(0)==' ') {
			            c = c.substring(1);
			        }
			        if (c.indexOf(name) == 0) {
			            return c.substring(name.length,c.length);
			        }
			    }
			    return "";
			},

        	/**
        	* Recopilación de información para el envío del formulario
        	*/
        	goBooking(){
        		
			    let url = '';

				url += "https://bookings.copaair.com/CMGS/AirLowFareSearchExternal.do?utm_campaign="+
					this.utmCampaign+"&d1="+this.d1+"&tripType="+this.typeOfTrip+"&outboundOption.originLocationCode="+
					this.origin+"&outboundOption.destinationLocationCode="+this.destination+"&outboundOption.departureDay="+
					this.departureDate.getDay()+"&outboundOption.departureMonth="+this.departureDate.getMonth()+"&outboundOption.departureYear="+
					this.departureDate.getYear()+"&inboundOption.destinationLocationCode="+this.origin+"&inboundOption.originLocationCode="+this.destination;
				

				if( this.typeOfTrip == "RT" ){
					url += "&inboundOption.departureDay="+this.returnDate.getDay()+"&inboundOption.departureMonth="+
						this.returnDate.getMonth()+"&inboundOption.departureYear="+this.returnDate.getYear();
				}

				if(this.promoCode){
					url += "&coupon=" + this.promoCode;
				}

				url += "&flexibleSearch="+
						this.flexibleSearch+"&cabinClass="+this.classOfTrip+"&guestTypes[0].type=ADT&guestTypes[0].amount="+
						this.adults+"&guestTypes[1].type=CNN&guestTypes[1].amount="+
						this.childs+"&guestTypes[2].type=INF&guestTypes[2].amount="+
						this.infants+"&pos=CM"+this.storeFront+"&lang="+ window.lang;

				window.open(url);
			
        	}

		},
		computed: {
			/**
			* La definición de esta variable depende de la cookie cname
			**/
			utmCampaign(){
					
				if( this.d1 === "" ){
					this.d1 =  s.pageName;
					utm_campaign = s.pageName;
				}
			},

			/**
			* Comparación de las fechas del formulario
			**/
			before(){
				return  (this.departureDate != '') && (this.departureDate <= this.returnDate);
			},

			/**
			* Según los países seleccionados, se determinará el storefront (PENDIENTE)
			**/
			storeFront(){

				// if(selected != 'CO' && selected != 'BR' && selected != 'CA' && selected != 'US'){
				// 	return 'GS';
				// } else {
				// 	return selected;
				// }
			}
			
			// AGREGAR LA FUNCIONALIDAD DE QUE CUANDO EL USUARIO SELECCIONE UNA PROMOCIÓN DE LA TABLA, EL FORMULARIO TOME LA INFORMACIÓN DISPONIBLE DE LA PROMO
		}
		
	}
</script>
<style>
	.booking {margin-top: -119px}
	.booking-header {
	    height: 41px;
	    width: 100%;
	    background-color: #005aa3;
	    color:#fff;
	}

	.booking-header > p{
		text-align: center;
    	font-size: 19px;
    	padding-top: 7px;
	}

	.text-danger { font-size: 0.8em }

	.radio-inline, .label {
		font-size: 12px;
	}

	.label { color:#333; }

	form {
		background-color: #f5f5f5;
	}
	.radios { padding:10px; }

	.submit { padding:20px; }

</style>
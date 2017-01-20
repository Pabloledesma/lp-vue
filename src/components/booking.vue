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
						:class="{'input': true, 'is-danger': errors.has('returnDate') }"
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
				classOfTrip: 'Economy',
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
					this.departureDay+"&outboundOption.departureMonth="+this.departureMonth+"&outboundOption.departureYear="+
					this.departureYear+"&inboundOption.destinationLocationCode="+this.origin+"&inboundOption.originLocationCode="+this.destination;
				

				if( this.typeOfTrip == "RT" ){
					url += "&inboundOption.departureDay="+this.returnDay+"&inboundOption.departureMonth="+
						this.returnMonth+"&inboundOption.departureYear="+this.returnYear;
				}

				if(this.promoCode){
					url += "&coupon=" + this.promoCode;
				}

				url += "&flexibleSearch="+
						this.flexibleSearch+"&cabinClass="+this.classOfTrip+"&guestTypes[0].type=ADT&guestTypes[0].amount="+
						this.adults+"&guestTypes[1].type=CNN&guestTypes[1].amount="+
						this.childs+"&guestTypes[2].type=INF&guestTypes[2].amount="+
						this.infants+"&pos=CM"+this.storeFront+"&lang="+ window.lang;

				//console.log(url)
				window.open(url);
			
        	}

		},
		computed: {
			departureDay(){
				return this.departureDate.getDate()
			},

			departureMonth(){
				return this.departureDate.getMonth() + 1
			},

			departureYear(){
				return this.departureDate.getFullYear()
			},

			returnDay(){
				return this.returnDate.getDate()
			},

			returnMonth(){
				return this.returnDate.getMonth() + 1
			},

			returnYear(){
				return this.returnDate.getFullYear()
			},

			/**
			* La definición de esta variable depende de la cookie cname
			* Si la cookie está vacia entonces se asigna el nombre de la página
			**/
			utmCampaign(){
					
				if( this.d1 === "" ){
					this.d1 =  this.pageName;
					this.utm_campaign = this.pageName;
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
				let selected = ''

				for( let i=0; i < this.fromCities; i++){
					for( key in this.fromCities[i] ){
						if( this.fromCities[i][key].indexOf(this.origin) != -1 ){
							selected = this.fromCities[i].country
						}
					}
				}

				if(selected != 'CO' || selected != 'BR' || selected != 'CA' || selected != 'US'){
					return 'GS';
				} else {
					return selected;
				}
			}
			
			// AGREGAR LA FUNCIONALIDAD DE QUE CUANDO EL USUARIO SELECCIONE UNA PROMOCIÓN DE LA TABLA, EL FORMULARIO TOME LA INFORMACIÓN DISPONIBLE DE LA PROMO

			// https://bookings.copaair.com/CMGS/AirLowFareSearchExternal.do?utm_campaign=undefined&d1=testPromotion&tripType=RT&outboundOption.originLocationCode=CLO&outboundOption.destinationLocationCode=LIM&outboundOption.departureDay=26&outboundOption.departureMonth=1&outboundOption.departureYear=2017&inboundOption.destinationLocationCode=CLO&inboundOption.originLocationCode=LIM&inboundOption.departureDay=26&inboundOption.departureMonth=1&inboundOption.departureYear=2017&flexibleSearch=true&cabinClass=economy&guestTypes[0].type=ADT&guestTypes[0].amount=1&guestTypes[1].type=CNN&guestTypes[1].amount=0&guestTypes[2].type=INF&guestTypes[2].amount=0&pos=CMGS&lang=es

			// https://bookings.copaair.com/CMGS/AirLowFareSearchExternal.do?utm_campaign=testPromotion&d1=testPromotion&tripType=RT&outboundOption.originLocationCode=MGA&outboundOption.destinationLocationCode=SJO&outboundOption.departureDay=07&outboundOption.departureMonth=01&outboundOption.departureYear=2017&inboundOption.destinationLocationCode=MGA&inboundOption.originLocationCode=SJO&inboundOption.departureDay=15&inboundOption.departureMonth=02&inboundOption.departureYear=2017&flexibleSearch=true&cabinClass=Economy&guestTypes[0].type=ADT&guestTypes[0].amount=1&guestTypes[1].type=CNN&guestTypes[1].amount=0&guestTypes[2].type=INF&guestTypes[2].amount=0&pos=CMGS&lang=es
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
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
					    	data-vv-as="ciudad de origen" 
					    	name="origin"
							:class="{'input': true, 'is-danger': errors.has('origin') }"
					    >
					      	<option value="">Desde</option>
					      	<option v-for="city in fromCities" :value="city.id">{{city.name}}</option>
					    </select>
				  	</span>
					<!-- <span v-show="errors.has('origin')" class="help is-danger">{{ errors.first('origin') }}</span> -->
					<span v-show="errors.has('origin')" class="help is-danger">{{ $t('messages.cityOriginNull') }}</span>
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
					<!-- <span v-show="errors.has('destination')" class="help is-danger">{{ errors.first('destination') }}</span> -->
					<span v-show="errors.has('destination')" class="help is-danger">{{ $t('messages.destinationCityNull') }}</span>
				</div>
			</div>

			<p class="control">
			  <label class="radio">
			    <input type="radio" name="classOfTrip" value="Business" v-model="classOfTrip">
			    Clase ejecutiva
			  </label>
			  <label class="radio">
			    <input type="radio" name="classOfTrip" value="Economy" v-model="classOfTrip">
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
					<!-- <span v-show="errors.has('departureDate')" class="help is-danger">{{ errors.first('departureDate') }}</span> -->
					<span v-show="errors.has('departureDate')" class="help is-danger">{{ $t('messages.departureDateRequired') }}</span>
					<span v-show="(departureDate && returnDate) && ! before" class="help is-danger">{{ $t('messages.departureDateBefore') }}</span>
					
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
					<span v-show="errors.has('returnDate')" class="help is-danger">{{ $t('messages.returnDate') }}</span>
					
				</div>
			</div>
			<div class="control is-grouped">
				<div class="control">
				  	<label class="label">Adultos<br>(12+)</label>
				  	<span class="select">
				    	<select v-model="adults">
				      		<option v-for="number in numbers" :value="number">{{number}}</option>
				    	</select>
				  	</span>
				</div>
				<div class="control">
					<label class="label">Niños<br>(2-11)</label>
				  	<span class="select">
				    	<select v-model="childs">
				      		<option v-for="number in numbers" :value="number">{{number}}</option>
				    	</select>
				  	</span>
				</div>
				<div class="contro">
					<label class="label">Infantes<br>(0-1)</label>
				   	<span class="select">
				    	<select v-model="infants">
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
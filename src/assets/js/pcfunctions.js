// JavaScript Document
$(function() {
	
	$.each(sysCities.fromcities, function (index, value) {
		$("#DESDE").append('<option value="'+value.id+'">'+value.name+'</option>');
	});

	var storeFront = '';
	$("#DESDE").on("change", function(){
		var selected = $(this).val();
		$.each( sysCities.fromcities, function(index, value){
			if( value.id == selected ){
				selected = value.name.substr( value.name.length - 2, 2 );
			}
		});
		
		if(selected != 'CO' && selected != 'BR' && selected != 'CA' && selected != 'US'){
			storeFront = 'GS';
		} else {
			storeFront = selected;
		}

	});

	
	$.each(sysCities.tocities, function (index, value) {
		$("#HACIA").append('<option value="'+value.id+'">'+value.name+'</option>');
	});

	
	$.datepicker.setDefaults($.datepicker.regional['es']);
	var dates = $( "#from, #to" ).datepicker({
		dateFormat: 'dd/mm/yy',
		regional: 'es',
		numberOfMonths: 2,
		//minDate: +1,
		minDate: departure_date,
		maxDate: return_date,
/*		showOn: "both",
		buttonImage: "images/iconcal.jpg",
		buttonImageOnly: true,
*/		

        onSelect: function( selectedDate ) {
            var option = this.id == "from" ? "minDate" : "maxDate",
                instance = $( this ).data( "datepicker" ),
                date = $.datepicker.parseDate(
                    instance.settings.dateFormat ||
                    $.datepicker._defaults.dateFormat,
                    selectedDate, instance.settings );
            dates.not( this ).datepicker( "option", option, date );
        }
    });

	var v_FROM = $("#DESDE"),	
		v_TO = $("#HACIA"),
		v_FROMDATE = $("#from"),
		v_TODATE = $("#to"),
		radioButtons = $("#radioButtons"),
		v_radIdaVuelta = $('input:radio[name=radIdaVuelta]:checked');

	radioButtons.on('click', function(){
		
		v_radIdaVuelta = $('input:radio[name=radIdaVuelta]:checked');

		if( v_radIdaVuelta.val() == "RT"){
			console.log(v_radIdaVuelta.val());
			$("#inputRegreso").show();
		}else{
			$("#inputRegreso").hide();
		}
	});

	$("#btnSubmit").on('click', function(){
		buscarVuelos( storeFront, v_FROM, v_TO, v_FROMDATE, v_TODATE, v_radIdaVuelta );
	}); 	
	
});
function buscarVuelos( storeFront, v_FROM, v_TO, v_FROMDATE, v_TODATE, v_radIdaVuelta  ) {
	
	if (v_FROM.val() == 0) {
		alertMessage('city_origin_null');
		return false;
	}

	if (v_TO.val() == "" || v_TO.val() === undefined || v_TO.val() == 0) {
		alertMessage('destination_city_null');
		return false;
	}

	if(v_FROM.val() == v_TO.val()){
		alertMessage('origin_destination');
		return false;
	}
	
	if (v_FROMDATE.val() == "" || v_FROMDATE.val() == undefined) {
		alertMessage('departure_date');
		return false;
	}
	
	if(v_radIdaVuelta.val() == "RT"){

		arr_elm = v_TODATE.val().split("/");
		v_diaregreso = arr_elm[0];
		v_mesregreso = arr_elm[1];
		v_anoregreso = arr_elm[2];
	
		if (v_TODATE.val() == "" || v_TODATE.val() == undefined) {
			alertMessage('return_date');
			return false;
		}

	} else {
		arr_elm = null;
		v_diaregreso = null;
		v_mesregreso = null;
		v_anoregreso = null;
	}

var d1 = getCookie("cname"),
	utm_campaign = getCookie("cname");
if(d1 === ""){
	d1 =  s.pageName;
	utm_campaign = s.pageName;
}

	//track_medio = $("#d1").val();
	v_codigoprom = $("#coupon").val();
	v_radIdaVuelta = $('input:radio[name=radIdaVuelta]:checked').val();
	
	arr_elm = v_FROMDATE.val().split("/");
	v_diasalida = arr_elm[0];
	v_messalida = arr_elm[1];
	v_anosalida = arr_elm[2];
	
	v_fechas = $('input:radio[name=fechas]:checked').val();
	v_cabinClass = $('input:radio[name=cabinClass]:checked').val();
	
	v_pasajeros = $("#pasajeros").val();
	v_pasajerosninos = $("#cbpasajerosninos").val();
	v_infantesPasajeros = $("#cbinfantesPasajeros").val();
	
	goBooking(
		d1,
		utm_campaign,
		storeFront,
		v_codigoprom,
		v_radIdaVuelta,
		v_FROM.val(),
		v_TO.val(),
		v_diasalida,
		v_messalida,
		v_anosalida,
		v_diaregreso,
		v_mesregreso,
		v_anoregreso,
		v_fechas,
		v_cabinClass,
		v_pasajeros,
		v_pasajerosninos,
		v_infantesPasajeros
	);

	return false;
}

/**
* Muestra una alerta en el idioma adecuado
* @msg mensaje
***/
function alertMessage(msg){

	var lang = $("html").attr('lang'),
		msj = {
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


	switch( lang ){
		case 'es':
			alert( msj.es[msg] );
			break;
		case 'en':
			alert( msj.en[msg] );
			break;
		case 'pt':
			alert( msj.pt[msg] );
			break;
	}
}

/*
* Busca el nombre de una cookie y retorna su valor
*
* @cname  String  Nombre de la cookie
***/
function getCookie(cname) {
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
}

function goBooking(
		utm_campaign, 
		d1, 
		storeFront, 
		v_codigoprom,
		v_radIdaVuelta,
		v_FROM,
		v_TO,
		v_diasalida,
		v_messalida,
		v_anosalida,
		v_diaregreso,
		v_mesregreso,
		v_anoregreso,
		v_fechas,
		v_cabinClass,
		v_pasajeros,
		v_pasajerosninos,
		v_infantesPasajeros
	){
	var lang = $("html").attr('lang'),
	    url = '';


		url += "https://bookings.copaair.com/CMGS/AirLowFareSearchExternal.do?utm_campaign="+
			utm_campaign+"&d1="+d1+"&tripType="+v_radIdaVuelta+"&outboundOption.originLocationCode="+
			v_FROM+"&outboundOption.destinationLocationCode="+v_TO+"&outboundOption.departureDay="+
			v_diasalida+"&outboundOption.departureMonth="+v_messalida+"&outboundOption.departureYear="+
			v_anosalida+"&inboundOption.destinationLocationCode="+v_FROM+"&inboundOption.originLocationCode="+
			v_TO;

		if( v_radIdaVuelta == "RT" ){
			url += "&inboundOption.departureDay="+v_diaregreso+"&inboundOption.departureMonth="+
				v_mesregreso+"&inboundOption.departureYear="+v_anoregreso;
		}

		if(v_codigoprom){
			url += "&coupon=" + v_codigoprom;
		}

		url += "&flexibleSearch="+
				v_fechas+"&cabinClass="+v_cabinClass+"&guestTypes[0].type=ADT&guestTypes[0].amount="+
				v_pasajeros+"&guestTypes[1].type=CNN&guestTypes[1].amount="+
				v_pasajerosninos+"&guestTypes[2].type=INF&guestTypes[2].amount="+
				v_infantesPasajeros+"&pos=CM"+storeFront+"&lang="+lang;



	

	window.open(url);
	
}

//programacion landing
$(document).ready(function(){
	function loadHtml(num) {
		
		$("#bt"+num).parent().addClass("active");
		$("#bt"+num).addClass("active");
		
		$("#load_content").fadeOut("fast", function(){
			$('#load_content').load("info/"+num +".html", function(){
				$("#load_content").fadeIn("slow");
			});
		});
		
    }
    
    var firstTab = $("ul#tarifas li a").first().attr('href');
    
    // Comentando esto, evitamos la carga del jquery.history!
    // $.history.init(function(url) {
    //     loadHtml(url == "" ? firstTab : url);
    // });

    $('.jqload').on('click', function(e) {

		$('.colmenu li a').each(function(){
			$(this).parent().removeClass("active");
			$(this).removeClass("active");
		});

        $(this).parent().addClass("active");
        $(this).addClass("active");

        var url = $(this).attr('href');
        url = url.replace(/^.*#/, '');
        loadHtml(url);
        e.preventDefault();
    });
		
});


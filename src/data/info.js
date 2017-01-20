let info = {
    fromcities: [
        {"name":"Medellín, CO", "id":"MDE", "country": "CO"},
        {"name":"Cali, CO", "id":"CLO", "country": "CO"},
        {"name":"Bogotá, CO", "id":"BGO", "country": "CO"},
        {"name":"Barranquilla, CO", "id":"BAQ", "country": "CO"}
    ],
                        
    tocities: [
		{"name":"Aruba, AW", "id":"AUA", "country": "AW"},
		{"name":"Panamá, PA", "id":"PTY", "country": "PA"},
		{"name":"Lima, PE", "id":"LIM", "country": "PE"},
		{"name":"Miami, US", "id":"MIA", "country": "US"},
		{"name":"Tampa, US", "id":"TPA", "country": "US"},
		{"name":"San José, CR", "id":"SJO", "country": "CR"},
		{"name":"San Juan, PR", "id":"SJU", "country": "PR"}
		
    ],
	copy_superior: "Compra tu boleto del 16 al 30 de diciembre del 2016 y viaja del 16 de diciembre del 2016 al 30 de junio del 2017.",
    tarifas: [
    	{
    		descripcion: 'Tarifa 1',
    		precio: 123412345,
    		destino: 'SJO',
    		origen: 'SJU'
    	},

    	{
    		descripcion: 'Tarifa 2',
    		precio: 65464234,
    		destino: 'LIM',
    		origen: 'PTY'
    	},
    	{
    		descripcion: 'Tarifa 3',
    		precio: 435646643,
    		destino: 'LIM',
    		origen: 'MIA'
    	},
    	{
    		descripcion: 'Tarifa 4',
    		precio: 998899,
    		destino: 'PTY',
    		origen: 'BOG'
    	},
    ],

    departure_date: new Date(2017, 1 - 1, 25),

	return_date: new Date(2017, 3 - 1, 23),

    pageName: 'testPromotion'
};

export default info;



	


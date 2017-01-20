<template>
		<div>	
			<div class="col-md-8">
		    	<div class="notification">
		    		<p>{{copy_superior}}</p>
		    	</div>
			</div>
			<div class="col-md-8">
		    	<table class="table is-stripped">
		    		<thead>
			    		<tr>
			    			<th>Origen</th>
			    			<th>Destino</th>
			    			<th>Precio</th>
			    		</tr>
		    		</thead>
		    		<tbody>
		    			<tr v-for="tarifa in tarifas">
		    				<td>{{tarifa.origen}}</td>
		    				<td>{{tarifa.destino}}</td>
		    				<td>{{tarifa.precio}}</td>
		    			</tr>
		    		</tbody>
		    	</table>
			</div>
		</div>
    	
    </div>
</template>
<script>
import info from '../data/info.js'

	export default {
		name: 'content-component',
		data(){
			return {
				tarifas: info.tarifas,
				copy_superior: info.copy_superior
			}
		}
		
	}
</script>
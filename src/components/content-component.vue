<template>
	<div class="column is-two-thirds">
    	
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
</template>
<script>
import info from '../data/info.js'

	export default {
		name: 'content-component',
		data(){
			return {
				tarifas: info.tarifas
			}
		}
		
	}
</script>
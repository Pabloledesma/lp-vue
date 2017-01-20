<style>
	.top-nav { background: #0d304f;}
	.nav-item img { max-height:100% !important }
</style>
<template>
	<nav class="navbar navbar-inverse navbar-fixed-top">
	    <div class="container">
	        <div class="navbar-header">
		         <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
		            <span class="sr-only">Toggle navigation</span>
		            <span class="icon-bar"></span>
		            <span class="icon-bar"></span>
		            <span class="icon-bar"></span>
		        </button>
	        	<a href="https://www.copaair.com/" target="_blank">
		        	<img class="logo" src="../assets/images/logos/LOGO-COPA.png" alt="Copa Airlines logo">
		      	</a>
	        </div>

	        <div id="navbar" class="collapse navbar-collapse">
		        <ul class="nav navbar-nav navbar-right">
		            <li class="active">
		            	<a href="https://www.copaair.com/?d1=flashSale-CR-301116-cm" target="_blank">
					       <img class="item-menu" src="../assets/images/logos/copa.com.png" alt="Link to Copa Airlines Site" />
					    </a>
				    </li>
		            <li>
		            	<a href="https://www.copaair.com/oficinas-de-ventas?d1=flashSale-CR-301116-logooffices" target="_blank">
            				<img class="item-menu" src="../assets/images/logos/oficina-de-ventas.png" alt="Logo offices">
          				</a>
		            </li>
		            <li>
		            	<a href="https://www.copaair.com/centro-de-reservaciones?d1=flashSale-CR-301116-logocall" target="_blank">
		                    <img class="item-menu" src="../assets/images/logos/call-center.png" alt="Logo call">
		                </a>
		            </li>
		        </ul>
	        </div><!--/.nav-collapse -->
	    </div>
	</nav>
</template>


<script>
	export default {
		name: 'navigation'
	}
</script>

<style type="text/css">
	a > img.logo { max-width: 199px; padding-top:7px; }

	a > img.item-menu { width: 108px; }

	.navbar-nav >li:last-child>a > img { width:75px; }

	@media (min-width: 768px){
		.navbar-nav>li>a {
		    padding-top: 5px;
		    padding-bottom: 5px;
		}
	}
</style>
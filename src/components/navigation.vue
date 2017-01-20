<template>
    <nav class="navbar navbar-default navbar-custom navbar-fixed-top">
	    <div class="container-fluid">
			  <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header page-scroll">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    Menu <i class="fa fa-bars"></i>
                </button>
                <a class="navbar-brand" href="https://www.copaair.com/" target="_blank">
		        	<img class="logo" src="../assets/images/logos/LOGO-COPA.png" alt="Copa Airlines logo">
		      	</a>
            </div>

	       <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
		        <ul class="nav navbar-nav navbar-right">
		            <li>
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
/*	a > img.logo { max-width: 199px; padding-top:7px; }

	a > img.item-menu { width: 108px; }

	.navbar-nav >li:last-child>a > img { width:75px; }

	@media (min-width: 768px){
		.navbar-nav>li>a {
		    padding-top: 5px;
		    padding-bottom: 5px;
		}
	}*/

.navbar-default {
    background-color: transparent !important;
    border-color: transparent !important; 
}
</style>
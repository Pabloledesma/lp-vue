<style>
	.top-nav { background: #0d304f;}
</style>
<template>
	<div>
		<nav class="nav top-nav">
		    <div class="nav-left">
		      <a class="nav-item is-brand" href="https://www.copaair.com/" target="blank">
		        <img src="../assets/images/logos/LOGO-COPA.png" alt="Copa Airlines logo">
		      </a>
		    </div>

		    <div class="nav-center">
		      <a class="nav-item" href="#">
		        <span class="icon">
		          <i class="fa fa-github"></i>
		        </span>
		      </a>
		      <a class="nav-item" href="#">
		        <span class="icon">
		          <i class="fa fa-twitter"></i>
		        </span>
		      </a>
		    </div>

		    <span class="nav-toggle">
		      <span></span>
		      <span></span>
		      <span></span>
		    </span>

		    <div class="nav-right nav-menu">
		      <a class="nav-item" href="https://www.copaair.com/?d1=flashSale-CR-301116-cm" target="_blank">
		        <img src="../assets/images/logos/copa.com.png" alt="Link to Copa Airlines Site">
		      </a>
		      <a class="nav-item" href="https://www.copaair.com/oficinas-de-ventas?d1=flashSale-CR-301116-logooffices" target="_blank">
                <img src="../assets/images/logos/oficina-de-ventas.png" alt="Logo offices">
              </a>
		      <a class="nav-item" href="https://www.copaair.com/centro-de-reservaciones?d1=flashSale-CR-301116-logocall" target="_blank">
                    <img src="../assets/images/logos/call-center.png" alt="Logo call">
                </a>
		    </div>
	  	</nav>
	</div>
</template>


<script>
	export default {
		name: 'navigation'
	}
</script>
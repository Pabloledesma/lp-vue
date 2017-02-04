<template>
  <div id="app">
    <navigation></navigation>
    <slider></slider>
    
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <Countdown date="2017, February 4"></Countdown>
        </div>
      </div>
      <div class="row">
        

        <content-component></content-component>

        <booking></booking>

      </div>
    </div>

    <footerComponent></footerComponent>
    
  </div>
</template>

<script>
import navigation from './components/navigation.vue' 
import slider from './components/slider.vue'
import contentComponent from './components/contentComponent.vue'
import Countdown from './components/Countdown.vue'
import booking from './components/booking.vue'
import footerComponent from './components/footer.vue'

export default {
  name: 'app',

  components: {
    navigation,
    slider,
    contentComponent,
    Countdown,
    booking,
    footerComponent
  }

}
</script>

<style>
body, h1, h2, h3, p {
    font-family: Lato,sans-serif;
}
</style>


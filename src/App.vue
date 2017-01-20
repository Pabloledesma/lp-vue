<template>
  <div id="app">
    <navigation></navigation>
    <slider></slider>
    
    <div class="container">
      <div class="row">
        
        <content-component></content-component>
        <booking></booking>
      </div>
    </div>

    <footer>Este es el footer</footer>
    
  </div>
</template>

<script>
import navigation from './components/navigation.vue' 
import slider from './components/slider.vue'
import contentComponent from './components/content-component.vue'
import booking from './components/booking.vue'

export default {
  name: 'app',
  components: {
    navigation,
    slider,
    contentComponent,
    booking
  },
  data () {
    return {
     
    }
  }
}
</script>

<style>

</style>

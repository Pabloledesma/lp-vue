<template>
<div id="timer">
    <div class="block">
        <p class="digit">{{ days | two_digits }}</p>
        <p class="text">Days</p>
    </div>
    <div class="block">
        <p class="digit">{{ hours | two_digits }}</p>
        <p class="text">Hours</p>
    </div>
    <div class="block">
        <p class="digit">{{ minutes | two_digits }}</p>
        <p class="text">Minutes</p>
    </div>
    <div class="block">
        <p class="digit">{{ seconds | two_digits }}</p>
        <p class="text">Seconds</p>
    </div>
</div>
</template>
<script>
	export default {
		name: 'Countdown',
		

		props : {
	        date : null
	    },

	    data() {
	       return {
                now: Math.trunc((new Date()).getTime() / 1000),
                 event: this.date,
             }
	    },

	    computed: {
	    	calculatedDate: function() {
                 return this.event = Math.trunc(Date.parse(this.event) / 1000);
           },
		    seconds() {
		        return (this.calculatedDate - this.now) % 60;
		    },

		    minutes() {
		        return Math.trunc((this.calculatedDate - this.now) / 60) % 60;
		    },

		    hours() {
		        return Math.trunc((this.calculatedDate - this.now) / 60 / 60) % 24;
		    },

		    days() {
		        return Math.trunc((this.calculatedDate - this.now) / 60 / 60 / 24);
		    },

		    callEvent(){
		       	return this.calculatedDate - this.now;
		    }
		},

		 mounted() {
		    window.setInterval(() => {
		        this.now = Math.trunc((new Date()).getTime() / 1000);
		    },1000);
		},
	}
</script>
<style>
	@import url(https://fonts.googleapis.com/css?family=Roboto+Condensed:400|Roboto:100);

.block {
    display: flex;
    flex:1;
    
}

.text {
    color: #1abc9c;
    font-size: 40px;
    font-family: 'Roboto Condensed', serif;
    font-weight: 40;
    margin-top:10px;
    margin-bottom: 10px;
    text-align: center;
}

.digit {
    color: #ecf0f1;
    font-size: 150px;
    font-weight: 30;
    font-family: 'Roboto', serif;
    margin: 10px;
    text-align: center;
}

#timer {
    display: flex;
    flex:1;
    width: 80%;
    align-items: center;
    background-color: #34495e;
    justify-content: center;
}
</style>
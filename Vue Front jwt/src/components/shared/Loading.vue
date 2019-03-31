<template>
  <div :class='show'>
    <div class='background-loading'>
      <div class='image-loading'>
        <img src='static/img/Loading_icon.gif' />
      </div>
    </div>
  </div>
  
</template>

<script>
  import PubSub from 'pubsub-js';

	export default {
    name: 'loading',

    data() {
      return {
        show: 'invisible'
      }
    },

    mounted() {
      console.log("criado loading")
      PubSub.subscribe('show-loading', (topic, show) => {
        this.show = show
      });
    },

    destroyed() {
      PubSub.unsubscribe('show-loading');
    }
	}

</script>

<style scoped>
  .background-loading {
    margin: 0px;
    padding: 0px;
    position: fixed;
    right: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(25, 25, 25, 0.6);
    z-index: 30001;
  }

  .image-loading {
    position: absolute;
    top: 35%;
    left: 45%;
  };
</style>



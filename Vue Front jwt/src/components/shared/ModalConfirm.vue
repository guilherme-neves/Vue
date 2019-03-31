<template>
  <b-modal hide-header-close v-model='show' title='Confirmação'>
    <div class="d-block">{{text}}</div>
    <template slot="modal-footer">
      <b-btn variant="primary" @click="onClick('S')">
        Sim
      </b-btn>
      <b-btn variant="danger" @click="onClick('N')">
        Não
      </b-btn>
    </template>
  </b-modal>
  
</template>

<script>

	export default {
    name: 'modalConfirm',
    props: {
      modalShow: {
        type: Boolean,
        default: false
      },
      text: {
        type: String,
        default: ''
      }
    },

    data() {
      return {
        show: this.modalShow
      }
    },

    watch: {
      'modalShow': function(value) {
         this.show = value;
      }
   },

    methods: {
      onClick(value) {
        this.$emit('onClickButtonModal', value);
      }
    }

	}

</script>


<template>
	<b-col :lg = lg :md = md :sm = sm>
		<b-form-group >
			<label>{{ label }}</label>
			<input
        
        :value = 'value' 
				:disabled = disabled
				:type = type
				:placeholder = placeholder
				@input = 'onChange($event.target.value)'
        ref = 'input'
        :id = 'fieldname'
        :data-vv-rules = 'ruleValidate'
        :name = 'fieldname'
        :data-vv-as = 'fieldname'
        :maxLength='maxLength'
			/>
      
		</b-form-group>
	</b-col>
</template>

<script>

	export default {
    name: 'inputText',
   // inject: ['$validator'],
    props: {
      label: {
        type: String
      },
      disabled: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: ''
      },
      lg: {
        type: String,
        default: '12'
      },
      md: {
        type: String,
        default: '12'
      },
      sm: {
        type: String,
        default: '12'
      },
      ruleValidate: {
        type: String,
        default: ''
      },
      fieldname: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: ''
      },
      value: {
      },
      mask: {
        type: String,
        default: ''
      },
      maxLength: {
        type: String,
        default: '50'
      }
    },

    methods: {
      onChange(value) {
        this.$emit('onChange', { fieldname: this.fieldname, value: value});
      }
    }
	}

</script>

<style scoped>
  .error {
    color: #f86c6b;
  }

  .input-erro {
    border: 1px solid #f86c6b;
  }
</style>


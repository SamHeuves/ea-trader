<template>
  <!-- <v-text-field
    ref="inputRef"
    v-model="buyPrice"
    readonly
    type="text"
    hide-details="auto"
    bg-color="surface"
    color="success"
    density="compact"
    label="Buy"
  ></v-text-field> -->
  <v-text-field
    ref="inputRef"
    type="text"
    density="compact"
    disabled
  />
</template>

<script>
import { useCurrencyInput } from 'vue-currency-input'

export default {
  name: 'CurrencyInput',
  props: {
    modelValue: Number,
    options: Object,
  },
  setup(props) {
    const { inputRef, setOptions, setValue } = useCurrencyInput(props.options)

    watch(
      () => props.modelValue, // Vue 2: props.value
      (value) => {
        setValue(value)
      }
    )

    watch(
      () => props.options,
      (options) => {
        setOptions(options)
      }
    )

    return { inputRef }
  },
}
</script>

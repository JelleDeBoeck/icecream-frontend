<template>
  <div>
    <h1>Homepagina</h1>
    <p>Welkom op de ijs-customizer!</p>

    <IceCreamCustomizer />
  </div>
</template>

<script>
import IceCreamCustomizer from '../components/IceCreamCustomizer.vue'

export default {
  name: 'HomeView',
  components: {
    IceCreamCustomizer
  }
}
</script>

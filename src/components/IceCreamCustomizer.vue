<template>
  <div class="icecream-customizer">
    <h2>Customize je ijsje 🍦</h2>

    <form @submit.prevent="placeOrder">
      <div>
        <label>Naam:</label>
        <input type="text" v-model="customerName" required />
      </div>

      <div>
        <label>Adres:</label>
        <input type="text" v-model="address" required />
      </div>

      <div>
        <label>Smaak:</label>
        <select v-model="flavor" required>
          <option value="" disabled>Kies smaak</option>
          <option>Vanille</option>
          <option>Chocolade</option>
          <option>Aardbei</option>
          <option>Munt</option>
        </select>
      </div>

      <div>
        <label>Topping:</label>
        <select v-model="topping" required>
          <option value="" disabled>Kies topping</option>
          <option>Chocoladesaus</option>
          <option>Slagroom</option>
          <option>Nootjes</option>
          <option>Sprinkles</option>
        </select>
      </div>

      <div>
        <label>Totaalprijs: </label>
        <span>€{{ totalPrice.toFixed(2) }}</span>
      </div>

      <button type="submit">Bestel</button>
    </form>

    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'IceCreamCustomizer',
  data() {
    return {
      customerName: '',
      address: '',
      flavor: '',
      topping: '',
      basePrice: 2.5,
      toppingPrice: 0.5,
      successMessage: ''
    };
  },
  computed: {
    totalPrice() {
      if (!this.flavor) return 0;
      return this.basePrice + (this.topping ? this.toppingPrice : 0);
    }
  },
  methods: {
    async placeOrder() {
      try {
        const order = {
          customerName: this.customerName,
          address: this.address,
          flavor: this.flavor,
          topping: this.topping,
          totalPrice: this.totalPrice
        };
        await axios.post('http://localhost:5000/orders', order);
        this.successMessage = 'Bestelling geplaatst! 🎉';
        // reset form
        this.customerName = '';
        this.address = '';
        this.flavor = '';
        this.topping = '';
      } catch (err) {
        console.error('Fout bij bestellen:', err);
      }
    }
  }
};
</script>

<style scoped>
.icecream-customizer {
  max-width: 400px;
  margin: 0 auto;
  text-align: left;
}
form div {
  margin-bottom: 10px;
}
button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
}
button:hover {
  background-color: #369f6e;
}
.success {
  color: green;
  margin-top: 10px;
}
</style>

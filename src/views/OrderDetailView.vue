<template>
  <div class="order-detail-container">
    <h1>Bestelling Details</h1>
    <button class="back-btn" @click="$router.push('/admin')">Terug naar Admin</button>

    <div v-if="order" class="order-details">
      <p><strong>Klantnaam:</strong> {{ order.customerName }}</p>
      <p><strong>Adres:</strong> {{ order.address }}</p>
      <p><strong>Totaalprijs:</strong> €{{ order.totalPrice.toFixed(2) }}</p>
      <p><strong>Status:</strong> {{ order.status || 'nieuw' }}</p>
      <p v-if="order.flavors && order.flavors.length"><strong>Smaken:</strong> {{ order.flavors.join(', ') }}</p>
      <p v-if="order.toppings && order.toppings.length"><strong>Toppings:</strong> {{ order.toppings.join(', ') }}</p>

      <div class="actions">
        <button @click="updateStatus('verwerkt')" class="process-btn">Verwerk</button>
        <button @click="updateStatus('geannuleerd')" class="cancel-btn">Annuleer</button>
        <button @click="deleteOrder" class="delete-btn">Verwijder</button>
      </div>
    </div>

    <p v-else>Laden...</p>
  </div>
</template>

<script>
import axios from 'axios';

const BASE_URL = 'https://icecream-backend-aqq3.onrender.com'; // <-- Render backend link

export default {
  name: 'OrderDetailView',
  data() {
    return {
      order: null
    };
  },
  created() {
    this.fetchOrder();
  },
  methods: {
    async fetchOrder() {
      try {
        const res = await axios.get(`${BASE_URL}/orders/${this.$route.params.id}`);
        this.order = res.data;
      } catch (err) {
        console.error('Fout bij ophalen order:', err);
      }
    },
    async updateStatus(newStatus) {
      try {
        await axios.patch(`${BASE_URL}/orders/${this.order._id}`, { status: newStatus });
        this.order.status = newStatus;
      } catch (err) {
        console.error('Fout bij updaten status:', err);
      }
    },
    async deleteOrder() {
      try {
        await axios.delete(`${BASE_URL}/orders/${this.order._id}`);
        this.$router.push('/admin');
      } catch (err) {
        console.error('Fout bij verwijderen order:', err);
      }
    }
  }
};
</script>

<style scoped>
/* Blijft hetzelfde als jouw originele styling */
.order-detail-container {
  max-width: 700px;
  margin: 50px auto;
  background-color: #fff0f3;
  padding: 30px;
  border-radius: 24px;
  border: 4px solid #e68798;
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
  text-align: left;
}

h1 {
  text-align: center;
  color: #e68798;
  margin-bottom: 15px;
}

.back-btn {
  background-color: #e68798;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 16px;
  font-weight: bold;
  margin-bottom: 20px;
  display: block;
  margin-left: auto;
}

.order-details p {
  font-size: 1.1em;
  margin-bottom: 12px;
  padding: 8px;
  background-color: white;
  border-radius: 12px;
  border: 1px solid #e68798;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.actions {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.actions button {
  padding: 8px 14px;
  cursor: pointer;
  border-radius: 16px;
  font-weight: bold;
  border: none;
  transition: all 0.2s;
}

.process-btn {
  background-color: #42b983;
  color: white;
}

.process-btn:hover {
  background-color: #369f70;
}

.cancel-btn {
  background-color: #e67e22;
  color: white;
}

.cancel-btn:hover {
  background-color: #d35400;
}

.delete-btn {
  background-color: #e74c3c;
  color: white;
}

.delete-btn:hover {
  background-color: #c0392b;
}
</style>

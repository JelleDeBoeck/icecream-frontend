<template>
  <div class="admin-container">
    <h1>Adminpagina</h1>
    <p>Hier kan je bestellingen beheren.</p>

    <button class="logout-btn" @click="logout">Logout</button>

    <table>
      <thead>
        <tr>
          <th>Naam</th>
          <th>Adres</th>
          <th>Prijs</th>
          <th>Status</th>
          <th>Acties</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order._id">
          <td>{{ order.customerName }}</td>
          <td>{{ order.address }}</td>
          <td>€{{ order.totalPrice.toFixed(2) }}</td>
          <td>{{ order.status || 'nieuw' }}</td>
          <td>
            <button @click="updateStatus(order._id)">Verwerk</button>
            <button @click="deleteOrder(order._id)">Verwijder</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdminView',
  data() {
    return {
      orders: []
    };
  },
  created() {
    this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      try {
        const res = await axios.get('http://localhost:5000/orders');
        this.orders = res.data;
      } catch (err) {
        console.error('Fout bij ophalen orders:', err);
      }
    },
    async updateStatus(id) {
      try {
        await axios.patch(`http://localhost:5000/orders/${id}`, { status: 'verwerkt' });
        this.fetchOrders();
      } catch (err) {
        console.error('Fout bij updaten status:', err);
      }
    },
    async deleteOrder(id) {
      try {
        await axios.delete(`http://localhost:5000/orders/${id}`);
        this.fetchOrders();
      } catch (err) {
        console.error('Fout bij verwijderen order:', err);
      }
    },
    logout() {
      localStorage.removeItem('adminLoggedIn');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.admin-container {
  max-width: 700px;
  margin: 30px auto;
  text-align: left;
}
.logout-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 6px 12px;
  cursor: pointer;
  margin-bottom: 15px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
}
th {
  background-color: #42b983;
  color: white;
}
button {
  margin-right: 5px;
  cursor: pointer;
  padding: 4px 8px;
}
</style>

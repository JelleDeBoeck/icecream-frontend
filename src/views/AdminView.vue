<template>
  <div>
    <h1>Adminpagina</h1>
    <p>Hier kan je bestellingen beheren.</p>

    <table>
      <thead>
        <tr>
          <th>Naam</th>
          <th>Adres</th>
          <th>Smaak</th>
          <th>Topping</th>
          <th>Prijs</th>
          <th>Status</th>
          <th>Acties</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order._id">
          <td>{{ order.customerName }}</td>
          <td>{{ order.address }}</td>
          <td>{{ order.flavor }}</td>
          <td>{{ order.topping }}</td>
          <td>€{{ order.totalPrice.toFixed(2) }}</td>
          <td>{{ order.status }}</td>
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
        this.fetchOrders(); // lijst updaten
      } catch (err) {
        console.error('Fout bij updaten status:', err);
      }
    },
    async deleteOrder(id) {
      try {
        await axios.delete(`http://localhost:5000/orders/${id}`);
        this.fetchOrders(); // lijst updaten
      } catch (err) {
        console.error('Fout bij verwijderen order:', err);
      }
    }
  }
};
</script>


<style scoped>
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
}
</style>

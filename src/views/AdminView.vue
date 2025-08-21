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
        <tr v-for="order in orders" :key="order._id" @click="goToDetail(order._id)" class="order-row">
          <td>{{ order.customerName }}</td>
          <td>{{ order.address }}</td>
          <td>€{{ order.totalPrice.toFixed(2) }}</td>
          <td>{{ order.status || 'nieuw' }}</td>
          <td>
            <button @click.stop="updateStatus(order._id)" class="action-btn process-btn">Verwerk</button>
            <button @click.stop="deleteOrder(order._id)" class="action-btn delete-btn">Verwijder</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

const BASE_URL = 'https://icecream-backend-aqq3.onrender.com';

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
        const res = await axios.get(`${BASE_URL}/orders`);
        this.orders = res.data;
      } catch (err) {
        console.error('Fout bij ophalen orders:', err);
      }
    },
    async updateStatus(id) {
      try {
        await axios.patch(`${BASE_URL}/orders/${id}`, { status: 'verwerkt' });
        this.fetchOrders();
      } catch (err) {
        console.error('Fout bij updaten status:', err);
      }
    },
    async deleteOrder(id) {
      try {
        await axios.delete(`${BASE_URL}/orders/${id}`);
        this.fetchOrders();
      } catch (err) {
        console.error('Fout bij verwijderen order:', err);
      }
    },
    logout() {
      localStorage.removeItem('adminLoggedIn');
      this.$router.push('/login');
    },
    goToDetail(id) {
      this.$router.push(`/orders/${id}`);
    }
  }
};
</script>

<style scoped>
.admin-container {
  max-width: 800px;
  margin: 50px auto;
  text-align: left;
  background-color: #fff0f3;
  padding: 30px;
  border-radius: 24px;
  border: 4px solid #e68798;
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
}

h1 {
  text-align: center;
  color: #e68798;
  margin-bottom: 10px;
}

p {
  text-align: center;
  color: #c04850;
  margin-bottom: 20px;
}

.logout-btn {
  background-color: #e74c3c;
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

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
}

th {
  background-color: #e68798;
  color: white;
  padding: 12px;
  text-align: left;
}

th:first-child {
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
}

th:last-child {
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
}

td {
  background-color: #fff;
  padding: 12px;
}

.order-row {
  transition: transform 0.2s, box-shadow 0.2s;
}

.order-row:hover {
  transform: translateY(-3px);
  cursor: pointer;
}

.action-btn {
  margin-right: 5px;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 16px;
  border: none;
  font-weight: bold;
  transition: all 0.2s;
}

.process-btn {
  background-color: #42b983;
  color: white;
}

.process-btn:hover {
  background-color: #369f70;
}

.delete-btn {
  background-color: #e74c3c;
  color: white;
}

.delete-btn:hover {
  background-color: #c0392b;
}
</style>

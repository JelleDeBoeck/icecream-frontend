<template>
  <div class="login-container">
    <h2>Admin Login</h2>
    <form @submit.prevent="login">
      <div>
        <label>Gebruikersnaam:</label>
        <input type="text" v-model="username" required />
      </div>
      <div>
        <label>Wachtwoord:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
      error: ''
    };
  },
  methods: {
    login() {
      if (this.username === 'Admin1' && this.password === 'Admin123') {
        localStorage.setItem('adminLoggedIn', 'true');
        this.$router.push('/admin');
      } else {
        this.error = 'Gebruikersnaam of wachtwoord is onjuist.';
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  text-align: left;
}
input {
  width: 100%;
  margin-bottom: 10px;
  padding: 6px;
}
button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>

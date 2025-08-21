<template>
  <div class="login-container">
    <h2>Admin Login</h2>
    <form @submit.prevent="login">
      <div class="input-group">
        <label>Gebruikersnaam:</label>
        <input type="text" v-model="username" required />
      </div>
      <div class="input-group">
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
  margin: 80px auto;
  background-color: #fff0f3;
  padding: 30px;
  border-radius: 24px;
  border: 4px solid #e68798;
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
  text-align: center;
}

h2 {
  color: #e68798;
  margin-bottom: 25px;
}

.input-group {
  margin-bottom: 16px;
  text-align: left;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 6px;
  color: #c04850;
}

input {
  width: 100%;
  padding: 8px 12px;
  border-radius: 16px;
  border: 1px solid #e68798;
  box-sizing: border-box;
  font-size: 14px;
  background-color: white;
  transition: all 0.2s;
}

input:focus {
  outline: none;
  border-color: #e68798;
  box-shadow: 0 0 8px rgba(230, 135, 152, 0.5);
}

button {
  width: 100%;
  padding: 10px;
  background-color: #e68798;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s;
}

button:hover {
  background-color: #c04850;
}

.error {
  color: red;
  margin-top: 12px;
  font-weight: bold;
}
</style>

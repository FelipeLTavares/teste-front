<template>
  <div>
    <h2>Login</h2>
    <input v-model="email" placeholder="E-mail" />
    <br>
    <input v-model="password" type="password" placeholder="Senha" />
    <br>
    <button @click="login">Entrar</button>
    <br>
    <button>
      <router-link to="register">Criar uma conta</router-link>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/users';
import { ref, type Ref } from 'vue';

const email: Ref<string> = ref('');
const password: Ref<string> = ref('');

const userStore = useUserStore();

const login = () => {
  userStore.login(email.value, password.value)
}
</script>
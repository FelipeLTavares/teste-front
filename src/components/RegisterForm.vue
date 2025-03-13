<template>
  <div>
    <h2>Cadastro</h2>
    <input v-model="name" placeholder="Name" />
    <br>
    <input v-model="email" placeholder="E-mail" />
    <br>
    <input v-model="password" type="password" placeholder="Senha" />
    <br>
    <button @click="register">Cadastrar</button>
    <br>
    <button>
      <router-link to="login">Fazer login</router-link>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/users';
import { ref, type Ref } from 'vue';

const name: Ref<string> = ref('');
const email: Ref<string> = ref('');
const password: Ref<string> = ref('');

const userStore = useUserStore();

const register = () => {
  console.log(name.value, email.value, password.value)
  userStore.register(name.value, email.value, password.value)
}

</script>
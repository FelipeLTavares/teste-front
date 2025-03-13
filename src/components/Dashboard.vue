<template>
  <header>
    <p v-if="currentUser">Bem-vindo, {{ currentUser.name }}!</p>

    <button @click="userStore.logout">Sair</button>
  </header>
  <main>

    <table>
      <thead>
        <tr>
          <th>Código</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Aceitou o termo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.email">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.policyAccepted ? 'Sim' : 'Não' }}</td>
        </tr>
      </tbody>
    </table>

    <PolicyModal v-if="isOpen" @close="closeModal" @accept="acceptPolicy" />
  </main>
  <div>


  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/users';
import PolicyModal from './PolicyModal.vue';
import { onMounted, ref, type Ref } from 'vue';

const currentUser = ref();
const users: Ref<any[]> = ref([]);
const isOpen = ref(false);

const closeModal = () => {
  isOpen.value = false;
}

const acceptPolicy = () => {
  isOpen.value = false;
  userStore.acceptPolicy(currentUser.value);
  userStore.fetchUsers();
  users.value = userStore.users;
}

const userStore = useUserStore();

onMounted(() => {
  userStore.fetchCurrentUser();
  userStore.fetchUsers();
  currentUser.value = userStore.currentUser;
  users.value = userStore.users;

  isOpen.value = Boolean(!currentUser?.value?.policyAccepted)
})
</script>

<style scoped>
header {
  top: 0;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 26px;
}

main {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1% 10%;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: gray;
}

tr:nth-child(even) {
  background-color: gray;
}
</style>
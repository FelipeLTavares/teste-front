import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'

interface UserInterface {
    id: number,
    email: string,
    name: string,
    password: string,
    policyAccepted: boolean
}

export const useUserStore = defineStore('user', () => {
  const users: Ref<UserInterface[]> = ref([]);
  let currentUser = ref();

  const login = (email: string, password: string) => {
    fetchUsers();
    const user = users.value.find((user) => user.email === email && user.password === password)
    
    if(!user) { return alert('Usuário não encontrado') }
    currentUser.value = user
    router.push('/dashboard');
  }

  const logout = () => {
    currentUser.value = undefined;
    sessionStorage.removeItem('currentUser')
    router.push('/login')
  }

  const register = (name: string, email: string, password: string) => {
    fetchUsers();
    const user: UserInterface = {
        id: users.value.length + 1,
        email,
        name,
        password,
        policyAccepted: false
    }
    saveCurrentUser(user);
    setUser(user);
    alert('Usuário cadastrado com sucesso!')
    router.push('/login');
  }

  const fetchUsers = () => {
    const userListString = sessionStorage.getItem('users');
    const userList = userListString ? JSON.parse(userListString) : [];
    users.value = userList;
  }

  const setUser = (user: UserInterface) => {
    const userListString = sessionStorage.getItem('users');
    const userList: any[] = userListString ? JSON.parse(userListString) : [];
    userList.push(user);
    const newUserListString = JSON.stringify(userList);
    sessionStorage.setItem('users', newUserListString);
  }

  const saveCurrentUser = (user: UserInterface) => {
    const currentUserString = JSON.stringify(user);
    sessionStorage.setItem('currentUser', currentUserString);
  }

  const fetchCurrentUser = () => {
    const currentUserString = sessionStorage.getItem('currentUser');

    if(currentUserString) currentUser.value = JSON.parse(currentUserString)
  }

  const acceptPolicy = (user: UserInterface) => {
    fetchUsers();
    const selectedUser = users.value.find(el => el.id === user.id)

    const userListString = sessionStorage.getItem('users');
    const userList = userListString ? JSON.parse(userListString) : [];

    const newUserList = userList.map((el: UserInterface) => {
      if(el.id !== selectedUser?.id) return el

      el.policyAccepted = true
      saveCurrentUser(el)
      fetchCurrentUser()
      return el
    })
    console.log(newUserList)

    sessionStorage.setItem('users', JSON.stringify(newUserList))
  }

  return {
    login,
    register,
    fetchUsers,
    setUser,
    saveCurrentUser,
    fetchCurrentUser,
    logout,
    acceptPolicy,
    users,
    currentUser
  }
})

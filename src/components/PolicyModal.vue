<template>
  <div class="modal">
    <div class="modal-content">
      <h2>Atualização de Política</h2>
      <p>Nossa política foi atualizada. Por favor, leia e aceite.</p>
      <div class="botton">
        <button @click="accept">Aceitar</button>
        <button @click="close">Fechar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['close', 'accept']);

const close = () => {
  emit('close');
};

const accept = () => {
  emit('accept');
};
</script>

<style scoped>
.botton {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: gray;
  padding: 20px;
  border-radius: 5px;
}
</style>
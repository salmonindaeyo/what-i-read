<template>
  <div>
    <NuxtLayout>
      <navBar />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup>
import { useMyStore } from "./stores/index";
const store = useMyStore();

onBeforeMount(async () => {
  if (localStorage.getItem("userData")) {
    const userData = JSON.parse(localStorage.getItem("userData"));
    store.setUserData(userData);
    store.setIsLogin(true);
  }
});
</script>

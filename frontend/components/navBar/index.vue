<script setup>
import { useMyStore } from "../../stores/index";
const store = useMyStore();
let isShowLogout = ref(false);

function logout() {
  localStorage.removeItem("userData");
  isShowLogout.value = false;
  store.setIsLogin(false);
  store.setUserData(null);
  store.clearMangaList();
}
</script>

<template>
  <div
    class="w-screen flex md:flex-row flex-col md:justify-between justify-center items-center px-10 py-10"
  >
    <div class="text-[20px]">
      <span class="text-blue-500">จดมังงะ </span> <span> .com</span>
    </div>
    <div v-if="store.isLogin" class="">
      <div
        @click="isShowLogout = !isShowLogout"
        class="flex flex-row relative select-none"
      >
        <div class="flex flex-row cursor-pointer">
          <span> hello , you are </span>
          <span class="text-blue-500 ml-1">{{
            store.userData.user.username
          }}</span>
          <span> . </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-chevron-down mt-2 ml-1 cursor-pointer"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>

      <div
        v-if="isShowLogout"
        class="w-[100px] z-[100000] py-2 flex justify-center rounded-lg drop-shadow-md bg-white absolute top-[80px] right-6 cursor-pointer hover:bg-gray-100"
        @click="logout()"
      >
        logout
      </div>
    </div>
    <div v-else class="flex flex-row space-x-10">
      <navBarRegister />
      <navBarLogin />
    </div>
  </div>
</template>

<style></style>

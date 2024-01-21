<script setup>
import { useMyStore } from "../../stores/index";
const store = useMyStore();
let isLogin = ref(false);

let username = ref("");
let password = ref("");
function login() {
  store.login({ username: username.value, password: password.value });
}

watch(
  () => store.userData,
  () => {
    console.log("X");
    if (store.userData) {
      isLogin.value = true;
    }
  }
);
</script>

<template>
  <div>
    <div
      class="cursor-pointer text-[20px] flex flex-row"
      onclick="my_modal_1.showModal()"
    >
      login
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-key-round ml-2 mt-1"
      >
        <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z" />
        <circle cx="16.5" cy="7.5" r=".5" />
      </svg>
    </div>

    <dialog v-if="!isLogin" id="my_modal_1" class="modal">
      <div class="modal-box">
        <div class="flex flex-col justify-center space-y-4">
          <div class="text-[24px] text-blue-500">Login</div>
          <input
            type="text"
            placeholder="username"
            class="input input-bordered w-full"
            v-model="username"
          />
          <input
            type="password"
            placeholder="password"
            class="input input-bordered w-full"
            v-model="password"
          />

          <div
            @click="login()"
            class="border-blue-500 border-2 rounded-md flex justify-center py-2 hover:bg-blue-500 cursor-pointer transition-all font-light hover:text-white btn-info"
          >
            Enter
          </div>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </div>
</template>

<style></style>

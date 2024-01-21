<script setup>
import { useMyStore } from "../../stores/index";
const store = useMyStore();

let username = ref("");
let password = ref("");
let errorText = ref(null);
let isRegisterSuccess = ref(false);
async function register() {
  if (username.value.length > 0 && password.value.length > 0) {
    try {
      const result = await store.register({
        username: username.value,
        password: password.value,
      });

      if (result.success) {
        isRegisterSuccess.value = true;
      } else {
        errorText.value = result.error;
      }
    } catch (error) {
      console.error("Error in register function:", error);
    }
  }
}
</script>

<template>
  <div>
    <div
      class="cursor-pointer text-[20px] flex flex-row"
      onclick="my_modal_2.showModal()"
    >
      register
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
        class="lucide lucide-user-round-plus ml-2 mt-1"
      >
        <path d="M2 21a8 8 0 0 1 13.292-6" />
        <circle cx="10" cy="8" r="5" />
        <path d="M19 16v6" />
        <path d="M22 19h-6" />
      </svg>
    </div>

    <dialog id="my_modal_2" class="modal">
      <div class="modal-box">
        <div v-if="isRegisterSuccess">สมัครเรียบร้อย login ได้เลยจ้า</div>
        <div v-else class="flex flex-col justify-center space-y-4">
          <div class="text-[24px] text-blue-500">Register</div>
          <div>username</div>
          <input
            type="text"
            placeholder="enter a username"
            class="input input-bordered w-full"
            v-model="username"
          />
          <input
            type="password"
            placeholder="password"
            class="input input-bordered w-full"
            v-model="password"
          />
          <div v-if="errorText" class="text-red-500">
            {{ errorText }}
          </div>
          <div
            @click="register()"
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

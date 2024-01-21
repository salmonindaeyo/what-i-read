<script setup>
import { useMyStore } from "../../stores/index";
const store = useMyStore();
let itemRemove = ref("");
onBeforeMount(async () => {
  store.getMangaList();
});

let isShowList = ref(true);
watch(
  () => store.userData,
  () => {
    store.getMangaList();
    isShowList.value = false;
    setTimeout(() => {
      isShowList.value = true;
    }, 1000);
  }
);

function removeModal(name) {
  my_modal_5.showModal();
  itemRemove.value = name;
}

function removeManga() {
  store.deleteManga(itemRemove.value.book_id);
}
</script>

<template>
  <div v-if="isShowList" class="w-full px-4">
    <div
      v-if="store.mangaList.length > 0"
      id="Projects"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      <div
        class="bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl tooltip relative"
        data-tip="สามารถคลิกเพื่อคัดลอก"
        v-for="(item, index) in store.mangaList"
        :key="index"
      >
        <ShowMangaCard :details="item" />
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
          class="lucide lucide-trash-2 absolute right-2 top-2 z-[10000000000000] cursor-pointer hover:bg-red-300 bg-gray-200 rounded-full p-1"
          @click="removeModal(item)"
        >
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          <line x1="10" x2="10" y1="11" y2="17" />
          <line x1="14" x2="14" y1="11" y2="17" />
        </svg>
      </div>
    </div>
    <div v-else class="flex justify-center items-center h-full">
      มังงะของคุณกำลังว่าง เพิ่มด่วน!
    </div>

    <dialog id="my_modal_5" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Hello!</h3>
        <p class="py-4">
          คุณกำลังจะลบมังงะเรื่อง
          <span class="font-bold text-red-500"> {{ itemRemove.title }}</span>
          แน่ใจหรือไม่ ?
        </p>
        <div class="modal-action">
          <form method="dialog" class="space-x-2 w-full justify-center flex">
            <button
              @click="removeManga()"
              class="btn bg-red-400 hover:bg-red-700"
            >
              DELETE
            </button>
            <button class="btn">CANCEL</button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>

<style></style>

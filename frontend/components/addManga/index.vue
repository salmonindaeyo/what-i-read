<script setup>
import { useMyStore } from "../../stores/index";
const store = useMyStore();

let title = ref("");
let description = ref("");
let picture = ref(null);
let url = ref("");
let textShow = ref("");
function addManga() {
  if (Object.keys(store.userData).length !== 0) {
    if (
      title.value.length > 0 &&
      description.value.length > 0 &&
      url.value.length > 0
    ) {
      store.addManga({
        id: store.userData.user.user_id,
        title: title.value,
        description: description.value,
        picture:
          picture.value ??
          "https://sesupport.edumall.jp/hc/article_attachments/900009570963/noImage.jpg",
        url: url.value,
      });
      textShow.value = "";
    } else {
      textShow.value = "กรุณากรอกข้อมูลให้ครบ";
    }
  } else {
    console.log("not login");
    my_modal_1.showModal();
  }
}

function clearForm() {
  title.value = "";
  description.value = "";
  picture.value = null;
  url.value = "";
}
</script>

<template>
  <div
    class="md:w-1/4 p-5 space-y-4 border border-blue-500 rounded-md md:mx-10 mx-4"
  >
    <div class="">เพิ่มมังงะ</div>
    <input
      type="text"
      placeholder="ชื่อเรื่อง"
      class="input input-bordered w-full"
      maxlength="255"
      v-model="title"
    />
    <input
      type="คำอธิบา"
      placeholder="เรื่องย่อ"
      class="input input-bordered w-full"
      v-model="description"
    />
    <input
      type="text"
      placeholder="ลิ้งรูป"
      class="input input-bordered w-full"
      v-model="picture"
    />
    <input
      type="text"
      placeholder="ลิ้งอ่าน"
      class="input input-bordered w-full"
      v-model="url"
    />
    <div class="text-red-500">
      {{ textShow }}
    </div>
    <div
      @click="addManga()"
      class="border-blue-500 border-2 rounded-md flex justify-center py-2 hover:bg-blue-500 cursor-pointer transition-all font-light hover:text-white btn-info"
    >
      ADD
    </div>
  </div>
</template>

<style></style>

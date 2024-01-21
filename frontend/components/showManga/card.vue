<script setup>
const props = defineProps({
  details: {
    type: Object,
    required: true,
  },
});
const { details } = props;
function copyText(text) {
  navigator.clipboard
    .writeText(details.url_link)
    .then(() => {
      console.log("Text copied to clipboard:", text);
    })
    .catch((error) => {
      console.error("Error copying text to clipboard:", error);
    });
}
</script>

<template>
  <div class="relative">
    <div @click="copyText()" class="cursor-pointer">
      <img
        :src="details.picture_link"
        class="w-full max-h-[300px] object-cover rounded-t-xl"
      />

      <div class="p-4">
        <div class="text-[20px] font-bold">{{ details.title }}</div>
        <div class="text-[16px] line-clamp-3">
          {{ details.description_book }}
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>

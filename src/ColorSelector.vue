<template>
  <div>
    <button
      @click="selectColor('red')"
      :class="{ active: selectedColorProp === 'red' }"
    >
      Red
    </button>
    <button
      @click="selectColor('green')"
      :class="{ active: selectedColorProp === 'green' }"
    >
      Green
    </button>
    <button
      @click="selectColor('blue')"
      :class="{ active: selectedColorProp === 'blue' }"
    >
      Blue
    </button>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";

const props = defineProps(["selectedColorProp"]);
const emit = defineEmits(["selectedColor"]);

const selectColor = (color) => {
  console.log("selected", color);
  emit("selectedColor", color);
};
</script>

<style scoped>
button {
  border: 1px solid #ccc;
  padding: 8px 16px;
  margin-right: 8px;
  cursor: pointer;
}

.active {
  background-color: #007bff;
  color: white;
}
</style>

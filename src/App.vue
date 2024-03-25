<script setup>
import { ref } from "vue";
import ThreeCanvas from "./ThreeCanvas.vue";
import ColorSelector from "./ColorSelector.vue";

const selectedColor = ref("red");
const updateColor = (color) => {
  selectedColor.value = color;
};
</script>

<template>
  <h1>My App</h1>
  <div>
    <ColorSelector
      :selectedColorProp="selectedColor"
      @selectedColor="updateColor"
    />
  </div>
  <div style="width: 100%; height: 400px">
    <ThreeCanvas :color="selectedColor" />
  </div>
</template>

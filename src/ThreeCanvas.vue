<template>
  <div ref="container" class="scene-canvas"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, defineProps } from "vue";
import { createRenderer, disposeRenderer, setColor } from "./scene.js";

const props = defineProps(["color"]); // Define the props
// Define the component setup
const container = ref(null);

// Create the Three.js scene and setup
onMounted(() => createRenderer(container, props.color));

// Cleanup on component unmount
onUnmounted(() => disposeRenderer());

watch(
  () => props.color,
  (newValue) => setColor(newValue)
);
</script>
<style scoped>
/* Add any custom styles for your Three.js canvas container */
.scene-canvas {
  width: 100%;
  height: 350px;
}
</style>

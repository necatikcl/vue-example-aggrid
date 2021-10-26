<template>
  <div class="main">
    <ThemeSwitch :theme="theme" @click="updateTheme('reverse')" />

    <router-view v-slot="{ Component }">
      <Suspense>
        <component :is="Component" />
      </Suspense>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "@vue/runtime-core";
import { ref } from "@vue/reactivity";
import ThemeSwitch from "./components/ThemeSwitch.vue";

const theme = ref("");

const updateTheme = (name: string) => {
  if (name === "reverse") {
    if (theme.value === "light") name = "dark";
    else name = "light";
  }

  let oppositeTheme = name === "light" ? "dark" : "light";

  theme.value = name;
  localStorage.setItem("data-theme", name);

  const doc = document.querySelector("html");
  if (doc?.classList.contains(oppositeTheme))
    doc.classList.remove(oppositeTheme);

  document.querySelector("html")?.classList.add(name);
};
onMounted(() => {
  const currentTheme = localStorage.getItem("data-theme");

  if (currentTheme) {
    updateTheme(currentTheme);
  } else {
    updateTheme("light");
  }
});
</script>

<style>
.main {
  @apply lg:p-8 p-2 bg-gray-100 dark:bg-gray-900 dark:text-white h-screen w-screen relative flex flex-col transition-colors;
}
</style>

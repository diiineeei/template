<template>
  <v-footer app class="footer d-flex justify-center py-4 px-6">
    <span class="text-caption text-medium-emphasis">&copy; {{ currentYear }} Template</span>
  </v-footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer {
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}
</style>

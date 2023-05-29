<template>
  <div class="min-h-full">
    <main>
      <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      </div>
    </main>
  </div>
</template>

<script setup>

import { useAuth } from "@/stores/authStore";
import { RouterView, RouterLink } from 'vue-router'

const authStore = useAuth();

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
}
const navigation = [
  { name: 'Dashboard', href: 'dashboard', current: true },
  { name: 'Planowanie', href: 'tracking', current: false },
  { name: 'Śledzenie', href: 'planing', current: false },
  { name: 'Cykliczne', href: '#', current: false },
]
const userNavigation = [
{ name: 'Dashboard', href: '#', current: true },
  { name: 'Planowanie', href: '#', current: false },
  { name: 'Śledzenie', href: '#', current: false },
  { name: 'Cykliczne', href: '#', current: false },
]

function logout() {
  authStore.logout();
}
</script>
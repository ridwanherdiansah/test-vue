<!-- CardForm.vue -->
<script setup>
const props = defineProps(['formData']);
</script>

<template>
  <div class="card">
    <div class="card-header">Data yang Dimasukkan</div>
    <div class="card-body">
      <p><strong>NIK:</strong> {{ formData.nik }}</p>
      <p><strong>Nomor Kartu Keluarga:</strong> {{ formData.nomorKk }}</p>
      <p><strong>Nama:</strong> {{ formData.nama }}</p>
      <!-- Tambahkan tampilan data lainnya sesuai dengan formData -->
    </div>
  </div>
</template>

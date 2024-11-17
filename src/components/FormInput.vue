<!-- FormInput.vue -->
<script setup>
import { toRefs } from 'vue';

// Menerima formData dari komponen induk (App.vue)
const props = defineProps(['formData']);

// Fungsi untuk meng-handle file upload
function handleFileUpload(event, fieldName) {
  props.formData[fieldName] = event.target.files[0];
}
</script>

<template>
  <div class="card">
    <div class="card-header">
      Data Pendaftaran
    </div>
    <div class="card-body">
      <form>
        <!-- Contoh input untuk NIK -->
        <div class="form-row ">
          <div class="form-group col-md-6">
            <label for="nik">NIK</label>
            <input type="number" class="form-control" id="nik" v-model="formData.nik" required>
          </div>
          <div class="form-group col-md-6">
            <label for="nomorKk">Nomor Kartu Keluarga</label>
            <input type="number" class="form-control" id="nomorKk" v-model="formData.nomorKk" required>
          </div>
        </div>
        <!-- Field lainnya disesuaikan dengan struktur formData -->
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

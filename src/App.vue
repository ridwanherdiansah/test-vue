<template>
  <main class="py-4">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <!-- Konten Kiri -->
          <div class="card">
            <div class="card-header">Data Pendaftaran</div>
            <div class="card-body">
              <form @submit.prevent="handleSubmit">
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="nik">NIK</label>
                    <input type="number" class="form-control" id="nik" v-model="formData.nik" />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="nomorKk">Nomor Kartu Keluarga</label>
                    <input type="number" class="form-control" id="nomorKk" v-model="formData.nomorKk" />
                  </div>
                </div>

                <div class="form-group">
                  <label for="nama">Nama</label>
                  <input type="text" class="form-control" id="nama" v-model="formData.nama" />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="fotoKtp">Foto KTP (Max 2MB, JPG/JPEG/PNG/BMP)</label>
                    <input type="file" class="form-control-file" id="fotoKtp" @change="handleFileUpload($event, 'fotoKtp')" accept=".jpg, .jpeg, .png, .bmp" />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="fotoKk">Foto Kartu Keluarga (Max 2MB, JPG/JPEG/PNG/BMP)</label>
                    <input type="file" class="form-control-file" id="fotoKk" @change="handleFileUpload($event, 'fotoKk')" accept=".jpg, .jpeg, .png, .bmp" />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-8">
                    <label for="umur">Umur</label>
                    <input type="number" class="form-control" id="umur" v-model="formData.umur" min="25" />
                  </div>
                  <div class="form-group col-md-4">
                    <label for="jenisKelamin">Jenis Kelamin</label>
                    <select class="form-control" id="jenisKelamin" v-model="formData.jenisKelamin">
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                </div>

                <div class="form-row">
                  <!-- Dropdown Provinsi -->
                  <div class="form-group col-md-6">
                    <label for="provinsi">Provinsi</label>
                    <select class="form-control" id="provinsi" v-model="selectedProvinsi" @change="fetchCities">
                      <option v-for="prov in provinsi" :key="prov.id" :value="prov.id">{{ prov.name }}</option>
                    </select>
                  </div>
                  <!-- Dropdown Kab/Kota -->
                  <div class="form-group col-md-6">
                    <label for="kabKota">Kab/Kota</label>
                    <select class="form-control" id="kabKota" v-model="selectedCity" @change="fetchKecamatan">
                      <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.name }}</option>
                    </select>
                  </div>
                </div>
                <div class="form-row">
                  <!-- Dropdown Kecamatan -->
                  <div class="form-group col-md-6">
                    <label for="kecamatan">Kecamatan</label>
                    <select class="form-control" id="kecamatan" v-model="selectedKecamatan" @change="fetchDesa">
                      <option v-for="district in districts" :key="district.id" :value="district.id">{{ district.name }}</option>
                    </select>
                  </div>
                  <!-- Dropdown Desa/Kelurahan -->
                  <div class="form-group col-md-6">
                    <label for="kelurahan">Kelurahan/Desa</label>
                    <select class="form-control" id="kelurahan" v-model="selectedKelurahan">
                      <option v-for="village in villages" :key="village.id" :value="village.id">{{ village.name }}</option>
                    </select>
                  </div>
                </div>

                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" v-model="isChecked" id="invalidCheck" />
                    <label class="form-check-label text-danger" for="invalidCheck">
                      Saya menyatakan bahwa data yang diisikan adalah benar dan siap mempertanggungjawabkan apabila ditemukan ketidaksesuaian dalam data tersebut.
                    </label>
                  </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="alamat">Alamat</label>
                        <input type="text" class="form-control" id="alamat" v-model="alamat" maxlength="255" required>
                    </div>
                    <div class="form-group col-md-3">
                        <label for="rt">RT</label>
                        <input type="text" class="form-control" id="rt" v-model="rt" required>
                    </div>
                    <div class="form-group col-md-3">
                        <label for="rw">RW</label>
                        <input type="text" class="form-control" id="rw" v-model="rw" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="penghasilanSebelumPandemi">Penghasilan Sebelum Pandemi</label>
                    <input type="number" class="form-control" id="penghasilanSebelumPandemi" v-model="penghasilanSebelumPandemi" required>
                </div>
                <div class="form-group">
                    <label for="penghasilanSetelahPandemi">Penghasilan Setelah Pandemi</label>
                    <input type="number" class="form-control" id="penghasilanSetelahPandemi" v-model="penghasilanSetelahPandemi" required>
                </div>
                <div class="form-group">
                    <label for="alasan">Alasan Membutuhkan Bantuan</label>
                    <select class="form-control" id="alasan" v-model="alasan" required>
                        <option value="Kehilangan pekerjaan">Kehilangan pekerjaan</option>
                        <option value="Kepala keluarga">Kepala keluarga</option>
                        <option value="Tergolong fakir/miskin">Tergolong fakir/miskin</option>
                        <option value="Lainnya">Lainnya</option>
                    </select>
                    <div v-if="alasan === 'Lainnya'" class="mt-2">
                        <input type="text" class="form-control" placeholder="Jelaskan alasan lain" v-model="alasanLainnya">
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>

                <button type="submit" class="btn btn-primary" :disabled="!isChecked">Submit</button>
              </form>
            </div>
          </div>
        </div>

        <div class="col-md-6">
            <!-- Konten Kanan -->
            <div class="card">
              <div class="card-body">
                <div v-if="submitted">
                  <h3>Data yang Dikirim:</h3>
                  <!-- Tampilkan data yang telah dikirimkan -->
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <h5 class="card-title">NIK</h5>
                      <p class="card-text">{{ formData.nik }}</p>
                    </div>
                    <div class="form-group col-md-6">
                      <h5 class="card-title">Nomor Kartu Keluarga</h5>
                      <p class="card-text">{{ formData.nomorKk }}</p>
                    </div>
                  </div>
                  <!-- Tambah bagian lainnya sesuai kebutuhan -->
                </div>
              </div>
            </div>
          </div>
          
      </div>
    </div>
  </main>
</template>

<script>
import { ref, reactive, onMounted } from "vue";

export default {
  data() {
    return {
      formData: reactive({
        nik: "",
        nomorKk: "",
      }),
      isChecked: ref(false),
      provinsi: [], // Data provinsi
      cities: [], // Data kota/kabupaten
      districts: [], // Data kecamatan
      villages: [], // Data kelurahan/desa
      selectedProvinsi: null, // Provinsi yang dipilih
      selectedCity: null, // Kota/Kabupaten yang dipilih
      selectedKecamatan: null, // Kecamatan yang dipilih
      selectedKelurahan: null, // Desa/Kelurahan yang dipilih
      submitted: ref(false),
    };
  },
  methods: {
    handleSubmit() {
    if (this.isChecked) {
      this.submitted = true;
      alert("Data berhasil disubmit!");

      // Log the form data to the console
      console.log("Form Data:");
      console.log("NIK:", this.formData.nik);
      console.log("Nomor Kartu Keluarga:", this.formData.nomorKk);
      console.log("Provinsi ID:", this.selectedProvinsi);
      console.log("Kabupaten/Kota ID:", this.selectedCity);
      console.log("Kecamatan ID:", this.selectedKecamatan);
      console.log("Kelurahan/Desa ID:", this.selectedKelurahan);

    } else {
      alert("Anda harus mencentang kotak pernyataan sebelum mengirim data.");
    }
  },
    // Fetch data provinsi
    async fetchProvinsi() {
      try {
        const response = await fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json");
        this.provinsi = await response.json();
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    },
    // Fetch data kota/kabupaten berdasarkan provinsi
    async fetchCities() {
      if (!this.selectedProvinsi) return;
      try {
        const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${this.selectedProvinsi}.json`);
        this.cities = await response.json();
        this.districts = []; // Reset districts
        this.villages = []; // Reset villages
        this.selectedCity = null; // Reset selected city
        this.selectedKecamatan = null; // Reset selected kecamatan
        this.selectedKelurahan = null; // Reset selected kelurahan
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    },
    // Fetch data kecamatan berdasarkan kota/kabupaten
    async fetchKecamatan() {
      if (!this.selectedCity) return;
      try {
        const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${this.selectedCity}.json`);
        this.districts = await response.json();
        this.villages = []; // Reset villages
        this.selectedKecamatan = null; // Reset selected kecamatan
        this.selectedKelurahan = null; // Reset selected kelurahan
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    },
    // Fetch data desa/kelurahan berdasarkan kecamatan
    async fetchDesa() {
      if (!this.selectedKecamatan) return;
      try {
        const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${this.selectedKecamatan}.json`);
        this.villages = await response.json();
        this.selectedKelurahan = null; // Reset selected kelurahan
      } catch (error) {
        console.error("Error fetching villages:", error);
      }
    },
  },
  mounted() {
    this.fetchProvinsi(); // Ambil data provinsi saat komponen di-mount
  },
};
</script>

// src/utils/apiWilayah.js

// Fungsi untuk mengambil provinsi
export async function getProvinces() {
    const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`);
    const data = await response.json();
    return data.provinces;  // Misalnya, menyesuaikan dengan format data API
  }
  
  // Fungsi untuk mengambil kabupaten/kota
  export async function getCities(provinceId) {
    const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json/`);
    const data = await response.json();
    return data.cities;  // Misalnya, menyesuaikan dengan format data API
  }
  
  // Fungsi untuk mengambil kecamatan
  export async function getSubdistricts(cityId) {
    const response = await fetch(`URL_API_KECAMATAN/${cityId}`);
    const data = await response.json();
    return data.subdistricts;  // Misalnya, menyesuaikan dengan format data API
  }
  
  // Fungsi untuk mengambil kelurahan/desa
  export async function getVillages(subdistrictId) {
    const response = await fetch(`URL_API_KELURAHAN/${subdistrictId}`);
    const data = await response.json();
    return data.villages;  // Misalnya, menyesuaikan dengan format data API
  }
  
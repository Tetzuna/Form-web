// ===== 1. Ambil elemen ===== 
const form = document.querySelector('#formDaftar'); 
const fields = form.querySelectorAll('input'); 
const tanggal = document.querySelector('#tanggal'); 
const password = document.querySelector('#password');
const retypePassword = document.querySelector('#retypepassword');
const statusForm = document.querySelector('#statusForm'); 

// ===== 2. Daftar pesan error (kunci = id input) ===== 
const pesan = { 
  nama:    { kosong: 'Nama wajib diisi.', pendek: 'Nama minimal 3 huruf.' }, 
  email:   { kosong: 'Email wajib diisi.', format: 'Format email belum benar. Contoh: nama@domain.com' }, 
  hp:      { kosong: 'Nomor WhatsApp wajib diisi.', format: 'Nomor diawali 08 dan terdiri dari 10–13 digit.', pendek: 'Pastikan nomor anda sudah benar' }, 
  password: { kosong: 'Password wajib diisi.', pendek: 'Password minimal 6 karakter.' }, 
  retypePassword: { kosong: 'Konfirmasi password wajib diisi.', tidakSama: 'Password dan re-type password tidak sama.' },
  tanggal: { kosong: 'Pilih tanggal lahir.', tidakcukup: 'Umur tidak mencukupi, kamu harus berusia 20 tahun keatas'}, 
}; 

// ===== 3. Tampilkan dan hapus error ===== 
function showError(input, teks) { 
  input.classList.add('is-invalid');           // tampilan merah Bootstrap 
  input.setAttribute('aria-invalid', 'true'); 
  document.getElementById(input.id + '-error').textContent = teks; 
  return false; 
} 
 
function clearError(input) { 
  input.classList.remove('is-invalid'); 
  input.removeAttribute('aria-invalid'); 
  document.getElementById(input.id + '-error').textContent = ''; 
  return true; 
} 

// ===== 4. Pengecekan field ===== 
function cekField(input) { 
  const v = input.validity; 
  const p = pesan[input.id]; 
  if (input.value.trim() === '') return showError(input, p.kosong); 
  if (v.tooShort) return showError(input, p.pendek); 
  if (v.typeMismatch || v.patternMismatch) return showError(input, p.format); 
  if (input.id === 'tanggal') 
    if (input.value > tanggal.max) {
      return showError(input, p.tidakcukup);
    }
  if (input.id === 'retypePassword' && input.value !== password.value) return showError(input, p.tidakSama);
  return clearError(input); 
} 

function semuaFieldValid() { 
  let valid = true; 
  for (const input of fields) { 
    if (!cekField(input)) valid = false; 
  } 
  return valid; 
} 

// ===== 5. Tanggal minimal = hari ini ===== 
function tanggalahir() { 
  const d = new Date(); 
  const tahun = d.getFullYear() - 20;
  const bln = String(d.getMonth() + 1).padStart(2, "0");
  const tgl = String(d.getDate()).padStart(2, "0");
  return tahun + '-' + bln + '-' + tgl; 
} 

tanggal.max = tanggalahir(); 

// ===== 6. Event: saat pindah field ===== 
function saatBlur(event) { 
  cekField(event.target); 
} 

for (const input of fields) { 
  input.addEventListener('blur', saatBlur); 
} 

// ===== 7. Event: saat form dikirim ===== 
function saatSubmit(event) { 
  event.preventDefault(); 
  statusForm.className = '';        // sembunyikan pesan sukses sebelumnya 
  statusForm.textContent = ''; 

  if (!semuaFieldValid()) { 
    form.querySelector('[aria-invalid="true"]').focus(); 
    return; 
  } 

  statusForm.textContent = 'Pendaftaran berhasil! Sampai jumpa di workshop.'; 
  statusForm.className = 'alert alert-success mt-3'; 
  form.reset(); 
} 

form.addEventListener('submit', saatSubmit); 

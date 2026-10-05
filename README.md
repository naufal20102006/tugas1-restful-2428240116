# Tugas 1 — RESTful API Murni dengan Express.js

## Identitas
- Nama: Naufal Samih Najasyi
- NIM: 2428240116
- Kelas: SI5B
- Nomor topik: 32
- Topik: Kendaraan Listrik — Stasiun Pengisian
- Resource: `/charging-stations`
- URL Vercel: Isi setelah deployment berhasil.

## Teknologi
- Node.js LTS
- Express.js
- Nodemon (development)
- Data disimpan dalam array di memori; tidak menggunakan database.

## Menjalankan secara lokal
1. Instal Node.js LTS.
2. Buka terminal di folder project.
3. Jalankan `npm install`.
4. Jalankan `npm run dev` atau `npm start`.
5. API berjalan di `http://localhost:3000`.

## Endpoint
| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/` | Informasi API dalam JSON |
| GET | `/charging-stations` | Mengambil semua stasiun |
| GET | `/charging-stations/:id` | Mengambil satu stasiun berdasarkan ID |
| POST | `/charging-stations` | Menambahkan stasiun |
| PUT | `/charging-stations/:id` | Mengganti seluruh data stasiun |
| DELETE | `/charging-stations/:id` | Menghapus stasiun |
| GET | `/charging-stations?kota=Palembang` | Filter berdasarkan kota |

## Contoh body POST/PUT
```json
{
  "nama": "SPKLU Jakabaring",
  "kota": "Palembang",
  "jumlahSlot": 4,
  "dayaKw": 50,
  "buka24Jam": true
}
```

Field wajib: `nama` (string), `kota` (string), `jumlahSlot` (number), dan `dayaKw` (number). `buka24Jam` bertipe boolean dan bersifat opsional sesuai penandaan pada lembar soal; jika tidak dikirim, nilainya menjadi `false`.

## Format response
- GET sukses: objek atau array JSON secara langsung.
- POST sukses: HTTP 201 dan `{ "status": "success", "message": "...", "data": { ... } }`.
- PUT/DELETE sukses: HTTP 200 dengan struktur `{ status, message, data }`.
- Validasi gagal: HTTP 400 dengan `data: null`.
- Data atau endpoint tidak ditemukan: HTTP 404 dengan `data: null`.

## Catatan
Data disimpan di memori. Perubahan data tidak persisten dan bisa kembali ke data awal ketika proses/serverless instance dimulai ulang.

## Identitas Mahasiswa

- Nama: Naufal Samih Najasyi
- NIM: 2428240116
- Kelas: SI5B
- Nomor Topik: 32
- Topik: Stasiun Pengisian Kendaraan Listrik

## Deployment

URL Vercel:
https://tugas1-restful-2428240116.vercel.app

## Menjalankan Aplikasi Secara Lokal

1. Pastikan Node.js sudah terpasang.
2. Install dependency:

   npm install

3. Jalankan aplikasi dalam mode development:

   npm run dev

4. Buka http://localhost:3000

## Daftar Endpoint

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | / | Informasi API |
| GET | /charging-stations | Mengambil seluruh data |
| GET | /charging-stations/:id | Mengambil data berdasarkan ID |
| POST | /charging-stations | Menambahkan data |
| PUT | /charging-stations/:id | Memperbarui seluruh data |
| DELETE | /charging-stations/:id | Menghapus data |
| GET | /charging-stations?kota=Palembang | Filter berdasarkan kota |
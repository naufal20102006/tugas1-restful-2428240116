const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware untuk membaca request body berformat JSON.
app.use(express.json());

// Data awal stasiun pengisian kendaraan listrik (disimpan di memori).
const chargingStations = [
  {
    id: 1,
    nama: 'SPKLU Jakabaring',
    kota: 'Palembang',
    jumlahSlot: 4,
    dayaKw: 50,
    buka24Jam: true
  },
  {
    id: 2,
    nama: 'SPKLU Sudirman',
    kota: 'Palembang',
    jumlahSlot: 6,
    dayaKw: 60,
    buka24Jam: true
  },
  {
    id: 3,
    nama: 'SPKLU Prabumulih',
    kota: 'Prabumulih',
    jumlahSlot: 3,
    dayaKw: 30,
    buka24Jam: false
  }
];

// ID dibuat otomatis oleh server.
let nextId = Math.max(...chargingStations.map((station) => station.id)) + 1;

// Memeriksa field wajib sesuai spesifikasi Topik 32.
// Field buka24Jam bersifat opsional karena tidak diberi tanda wajib (*) pada soal.
function validateChargingStation(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return 'Body harus berupa objek JSON';
  }

  for (const field of ['nama', 'kota']) {
    if (body[field] === undefined || body[field] === null || body[field] === '') {
      return `Field ${field} wajib diisi`;
    }
    if (typeof body[field] !== 'string' || body[field].trim() === '') {
      return `Field ${field} harus berupa teks yang tidak kosong`;
    }
  }

  for (const field of ['jumlahSlot', 'dayaKw']) {
    if (body[field] === undefined || body[field] === null || body[field] === '') {
      return `Field ${field} wajib diisi`;
    }
    if (typeof body[field] !== 'number' || !Number.isFinite(body[field])) {
      return `Field ${field} harus berupa angka`;
    }
  }

  if (body.buka24Jam !== undefined && typeof body.buka24Jam !== 'boolean') {
    return 'Field buka24Jam harus berupa boolean (true atau false)';
  }

  return null;
}

// Menyiapkan objek stasiun tanpa menerima ID dari client.
function buildChargingStation(body, id) {
  return {
    id,
    nama: body.nama.trim(),
    kota: body.kota.trim(),
    jumlahSlot: body.jumlahSlot,
    dayaKw: body.dayaKw,
    buka24Jam: body.buka24Jam === undefined ? false : body.buka24Jam
  };
}

// GET /
// Mengembalikan informasi API dalam format JSON.
app.get('/', (req, res) => {
  res.json({
    nama: 'Naufal Samih Najasyi',
    nim: '2428240116',
    nomorTopik: 32,
    topik: 'Kendaraan Listrik — Stasiun Pengisian',
    resource: '/charging-stations',
    endpoints: [
      'GET /charging-stations',
      'GET /charging-stations/:id',
      'POST /charging-stations',
      'PUT /charging-stations/:id',
      'DELETE /charging-stations/:id',
      'GET /charging-stations?kota=Palembang'
    ]
  });
});

// GET /charging-stations
// Mengambil seluruh data, atau memfilter berdasarkan query string kota.
app.get('/charging-stations', (req, res) => {
  const { kota } = req.query;

  if (kota !== undefined) {
    const kotaFilter = typeof kota === 'string' ? kota.trim().toLowerCase() : '';
    const hasilFilter = chargingStations.filter(
      (station) => station.kota.toLowerCase() === kotaFilter
    );
    return res.status(200).json(hasilFilter);
  }

  return res.status(200).json(chargingStations);
});

// GET /charging-stations/:id
// Mengambil satu data berdasarkan ID.
app.get('/charging-stations/:id', (req, res) => {
  const station = chargingStations.find(
    (item) => item.id === Number(req.params.id)
  );

  if (!station) {
    return res.status(404).json({
      status: 'error',
      message: `Data dengan id ${req.params.id} tidak ditemukan`,
      data: null
    });
  }

  return res.status(200).json(station);
});

// POST /charging-stations
// Body contoh: { "nama": "SPKLU Jakabaring", "kota": "Palembang", "jumlahSlot": 4, "dayaKw": 50, "buka24Jam": true }
// Menambahkan data baru dengan ID otomatis.
app.post('/charging-stations', (req, res) => {
  const validationMessage = validateChargingStation(req.body);
  if (validationMessage) {
    return res.status(400).json({
      status: 'error',
      message: validationMessage,
      data: null
    });
  }

  const baru = buildChargingStation(req.body, nextId++);
  chargingStations.push(baru);

  return res.status(201).json({
    status: 'success',
    message: 'Data stasiun pengisian berhasil ditambahkan',
    data: baru
  });
});

// PUT /charging-stations/:id
// Body harus berisi seluruh field wajib untuk mengganti data secara penuh.
app.put('/charging-stations/:id', (req, res) => {
  const index = chargingStations.findIndex(
    (item) => item.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      status: 'error',
      message: `Data dengan id ${req.params.id} tidak ditemukan`,
      data: null
    });
  }

  const validationMessage = validateChargingStation(req.body);
  if (validationMessage) {
    return res.status(400).json({
      status: 'error',
      message: validationMessage,
      data: null
    });
  }

  const diperbarui = buildChargingStation(req.body, Number(req.params.id));
  chargingStations[index] = diperbarui;

  return res.status(200).json({
    status: 'success',
    message: `Data stasiun dengan id ${req.params.id} berhasil diperbarui`,
    data: diperbarui
  });
});

// DELETE /charging-stations/:id
// Menghapus data berdasarkan ID.
app.delete('/charging-stations/:id', (req, res) => {
  const index = chargingStations.findIndex(
    (item) => item.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      status: 'error',
      message: `Data dengan id ${req.params.id} tidak ditemukan`,
      data: null
    });
  }

  chargingStations.splice(index, 1);

  return res.status(200).json({
    status: 'success',
    message: `Data stasiun dengan id ${req.params.id} berhasil dihapus`,
    data: null
  });
});

// Catch-all 404: seluruh endpoint yang tidak terdaftar tetap berformat JSON.
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint tidak ditemukan',
    data: null
  });
});

// Menangani JSON request yang rusak agar error tetap berformat JSON.
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      status: 'error',
      message: 'Format JSON pada request body tidak valid',
      data: null
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Terjadi kesalahan internal pada server',
    data: null
  });
});

// Server lokal dijalankan saat bukan production.
// Vercel menggunakan app yang diekspor di bawah ini.
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

module.exports = app;

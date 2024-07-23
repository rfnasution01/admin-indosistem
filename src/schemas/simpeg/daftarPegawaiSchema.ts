import zod from 'zod'

export const IdentitasPersonalSchema = zod.object({
  nama: zod.string({
    required_error: 'Nama harus diisi',
  }),
  email: zod
    .string({
      required_error: 'Email harus diisi',
      invalid_type_error: 'Format email tidak valid',
    })
    .email('Format email tidak valid'), // Menambahkan validasi email
  jk: zod.string({
    required_error: 'Jenis kelamin harus diisi',
  }),
  hp: zod.string({
    required_error: 'Nomor HP harus diisi',
  }),
  npwp: zod.string().optional().nullish().nullable(),
  nik: zod
    .string({
      required_error: 'NIK harus diisi',
    })
    .length(16, 'NIK harus terdiri dari 16 karakter'),
  tempatLahir: zod.string({
    required_error: 'Tempat lahir harus diisi',
  }),
  tanggalLahir: zod.string({
    required_error: 'Tanggal lahir harus diisi',
  }),
  pernikahan: zod.string({
    required_error: 'Status pernikahan harus diisi',
  }),
  photo: zod.string().optional().nullable().nullish(),
  nama_kategori_pernikahan: zod.string().optional().nullable().nullish(),
})

export const IdentitasPekerjaanschema = zod.object({
  asal_pegawai: zod.string({
    required_error: 'Asal pegawai harus diisi',
  }),
  nama_kategori_asal_pegawai: zod.string().optional().nullable().nullish(),
  nip: zod.string().nullable().nullish().optional(),
  golongan: zod.string({
    required_error: 'Golongan harus diisi',
  }),
  nama_golongan: zod.string().optional().nullable().nullish(),
  jenis_ptk: zod.string().nullable().nullish().optional(),
  nama_kategori_jenis_ptk: zod.string().optional().nullable().nullish(),
  nuptk: zod.string().optional().nullable().nullish(),
  jabatan: zod.string({
    required_error: 'Jabatan harus diisi',
  }),
  kategori_pegawai: zod.string({
    required_error: 'Kategori pegawai harus diisi',
  }),
  nama_kategori_kategori_pegawai: zod.string().optional().nullable().nullish(),

  jenis_pegawai: zod.string({
    required_error: 'Jenis pegawai harus diisi',
  }),
  no_karpeg: zod.string({
    required_error: 'Nomor karpeg harus diisi',
  }),
  status: zod.string({
    required_error: 'Status harus diisi',
  }),
  tanggal_mulai: zod.string({
    required_error: 'Tanggal mulai harus diisi',
  }),
  sk: zod.string().nullable().nullish(),
  no_urut: zod.string().nullable().nullish(),
})

export const AlamatSchema = zod.object({
  alamat_lengkap: zod.string({
    required_error: 'Alamat harus diisi',
  }),
  provinsi: zod.string({
    required_error: 'Provinsi harus diisi',
  }),
  nama_provinsi: zod.string().optional().nullable().nullish(),

  kabupaten: zod.string({
    required_error: 'Kabupaten harus diisi',
  }),
  nama_kabupaten: zod.string().optional().nullable().nullish(),

  kecamatan: zod.string({
    required_error: 'Kecamatan harus diisi',
  }),
  nama_kecamatan: zod.string().optional().nullable().nullish(),

  kelurahan: zod.string({
    required_error: 'Kelurahan harus diisi',
  }),
  nama_kelurahan: zod.string().optional().nullable().nullish(),

  kodepos: zod.string({
    required_error: 'Kode Pos harus diisi',
  }),
  longitude: zod.string({
    required_error: 'Longitude harus diisi',
  }),
  latitude: zod.string({
    required_error: 'Latitude harus diisi',
  }),
})

export const FisikSchema = zod.object({
  tinggi: zod.string({
    required_error: 'Tinggi badan harus diisi',
  }),
  berat: zod.string({
    required_error: 'Berat badan harus diisi',
  }),
  agama: zod.string({
    required_error: 'Agama harus diisi',
  }),
  nama_kategori_agama: zod.string().optional().nullable().nullish(),

  suku: zod.string({
    required_error: 'Suku harus diisi',
  }),
  nama_kategori_suku: zod.string().optional().nullable().nullish(),

  rambut: zod.string({
    required_error: 'Rambut harus diisi',
  }),
  nama_kategori_rambut: zod.string().optional().nullable().nullish(),

  bentuk: zod.string({
    required_error: 'Bentuk muka harus diisi',
  }),
  nama_kategori_bentuk: zod.string().optional().nullable().nullish(),

  warna: zod.string({
    required_error: 'Warna kulit harus diisi',
  }),
  nama_kategori_warna: zod.string().optional().nullable().nullish(),

  ciri: zod.string({
    required_error: 'Ciri khas harus diisi',
  }),

  cacat: zod.string({
    required_error: 'Cacat tubuh harus diisi',
  }),
  darah: zod.string({
    required_error: 'Golongan darah harus diisi',
  }),
  nama_kategori_darah: zod.string().optional().nullable().nullish(),

  hobi: zod.string({
    required_error: 'Hobi harus diisi',
  }),
})

export const TambahPegawaiSchema = zod.object({
  nama: zod.string().optional().nullable().nullish(),
  email: zod.string().optional().nullable().nullish(),
  jk: zod.string().optional().nullable().nullish(),
  hp: zod.string().optional().nullable().nullish(),
  npwp: zod.string().optional().nullish().nullable(),
  nik: zod.string().optional().nullable().nullish(),
  tempatLahir: zod.string().optional().nullable().nullish(),
  tanggalLahir: zod.string().optional().nullable().nullish(),
  pernikahan: zod.string().optional().nullable().nullish(),
  photo: zod.string().optional().nullable().nullish(),
  nama_kategori_pernikahan: zod.string().optional().nullable().nullish(),
  asal_pegawai: zod.string().nullable().nullish().optional(),
  nama_kategori_asal_pegawai: zod.string().optional().nullable().nullish(),
  nip: zod.string().nullable().nullish().optional(),
  golongan: zod.string().nullable().nullish().optional(),
  nama_golongan: zod.string().optional().nullable().nullish(),
  jenis_ptk: zod.string().nullable().nullish().optional(),
  nama_kategori_jenis_ptk: zod.string().optional().nullable().nullish(),
  nuptk: zod.string().optional().nullable().nullish(),
  jabatan: zod.string().nullable().nullish().optional(),
  kategori_pegawai: zod.string().nullable().nullish().optional(),
  nama_kategori_kategori_pegawai: zod.string().optional().nullable().nullish(),
  jenis_pegawai: zod.string().nullable().nullish().optional(),
  no_karpeg: zod.string().nullable().nullish().optional(),
  status: zod.string().nullable().nullish().optional(),
  tanggal_mulai: zod.string().nullable().nullish().optional(),
  sk: zod.string().nullable().nullish().optional(),
  no_urut: zod.string().nullable().nullish().optional(),
  alamat_lengkap: zod.string().optional().nullable().nullish(),
  provinsi: zod.string().optional().nullable().nullish(),
  nama_provinsi: zod.string().optional().nullable().nullish(),
  kabupaten: zod.string().optional().nullable().nullish(),
  nama_kabupaten: zod.string().optional().nullable().nullish(),
  kecamatan: zod.string().optional().nullable().nullish(),
  nama_kecamatan: zod.string().optional().nullable().nullish(),
  kelurahan: zod.string().optional().nullable().nullish(),
  nama_kelurahan: zod.string().optional().nullable().nullish(),
  kodepos: zod.string().optional().nullable().nullish(),
  longitude: zod.string().optional().nullable().nullish(),
  latitude: zod.string().optional().nullable().nullish(),
  tinggi: zod.string().optional().nullable().nullish(),
  berat: zod.string().optional().nullable().nullish(),
  agama: zod.string().optional().nullable().nullish(),
  nama_kategori_agama: zod.string().optional().nullable().nullish(),
  suku: zod.string().optional().nullable().nullish(),
  nama_kategori_suku: zod.string().optional().nullable().nullish(),
  rambut: zod.string().optional().nullable().nullish(),
  nama_kategori_rambut: zod.string().optional().nullable().nullish(),
  bentuk: zod.string().optional().nullable().nullish(),
  nama_kategori_bentuk: zod.string().optional().nullable().nullish(),
  warna: zod.string().optional().nullable().nullish(),
  nama_kategori_warna: zod.string().optional().nullable().nullish(),
  ciri: zod.string().optional().nullable().nullish(),
  cacat: zod.string().optional().nullable().nullish(),
  darah: zod.string().optional().nullable().nullish(),
  nama_kategori_darah: zod.string().optional().nullable().nullish(),
  hobi: zod.string().optional().nullable().nullish(),
})

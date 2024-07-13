import loadable from '@loadable/component'

// ------------------
// ----- Layouts -----
// ------------------
export const CommonLayout = loadable(() => import('@/layouts/commonLayout'))
export const LoginLayout = loadable(() => import('@/layouts/loginLayout'))
export const MainLayout = loadable(() => import('@/layouts/mainLayout'))
// --- website ---
export const WebsiteMainLayout = loadable(
  () => import('@/layouts/website/mainLayout'),
)
export const ProfilWebsiteLayout = loadable(
  () => import('@/layouts/website/ProfilLayout'),
)

// ------------------
// ----- Pages -----
// ------------------
export const ComingSoonPage = loadable(() => import('@/pages/comingSoon'))
// --- Website ---
export const TentangSekolahPage = loadable(
  () => import('@/pages/website/profil/TentangSekolah'),
)

export const TambahProfilPage = loadable(
  () => import('@/pages/website/profil/TambahTentangSekolah'),
)

export const VisiMisiPage = loadable(
  () => import('@/pages/website/profil/VisiMisi'),
)

export const GuruStaffPage = loadable(
  () => import('@/pages/website/profil/GuruStaff'),
)

export const FasilitasSekolahPage = loadable(
  () => import('@/pages/website/profil/FasilitasSekolah'),
)

export const TambahFasilitasSekolahPage = loadable(
  () => import('@/pages/website/profil/TambahFasilitasSekolah'),
)

export const TestimoniPage = loadable(
  () => import('@/pages/website/profil/Testimoni'),
)

export const TambahTestimoniPage = loadable(
  () => import('@/pages/website/profil/TambahTestimoni'),
)

export const ProgramLayananPage = loadable(
  () => import('@/pages/website/profil/ProgramLayanan'),
)

export const TambahProgramLayananPage = loadable(
  () => import('@/pages/website/profil/TambahProgram'),
)

export const KategoriPage = loadable(
  () => import('@/pages/website/kategori/Kategori'),
)

export const DetailKategoriPage = loadable(
  () => import('@/pages/website/kategori/DetailKategori'),
)

export const EditKategoriPage = loadable(
  () => import('@/pages/website/kategori/UpdateKategori'),
)

export const TambahGambarKategoriPage = loadable(
  () => import('@/pages/website/kategori/TambahGambar'),
)

export const EditGambarKategoriPage = loadable(
  () => import('@/pages/website/kategori/EditGambar'),
)

export const GaleriPage = loadable(
  () => import('@/pages/website/galeri/Galeri'),
)

export const EditGaleriPage = loadable(
  () => import('@/pages/website/galeri/UpdateGaleri'),
)

export const DetailGaleriPage = loadable(
  () => import('@/pages/website/galeri/DetailGaleri'),
)

export const TambahGambarAlbumPage = loadable(
  () => import('@/pages/website/galeri/TambahGambar'),
)

export const EditGambarAlbumPage = loadable(
  () => import('@/pages/website/galeri/EditGambar'),
)

export const KontakPage = loadable(
  () => import('@/pages/website/kontak/Kontak'),
)

export const TambahKontakPage = loadable(
  () => import('@/pages/website/kontak/TambahKontak'),
)

export const DetailKontakPage = loadable(
  () => import('@/pages/website/kontak/DetailKotakMasuk'),
)

export const SliderPage = loadable(
  () => import('@/pages/website/konten/Slider'),
)

export const HalamanPage = loadable(
  () => import('@/pages/website/konten/Halaman'),
)

export const FAQPage = loadable(() => import('@/pages/website/konten/FAQ'))

export const MenuPage = loadable(() => import('@/pages/website/konten/Menu'))

export const DownloadPage = loadable(
  () => import('@/pages/website/konten/Download'),
)

export const TambahSliderPage = loadable(
  () => import('@/pages/website/konten/TambahSlider'),
)

export const TambahHalamanPage = loadable(
  () => import('@/pages/website/konten/TambahHalaman'),
)

export const DetailHalamanPage = loadable(
  () => import('@/pages/website/konten/DetailHalaman'),
)

export const TambahFAQPage = loadable(
  () => import('@/pages/website/konten/TambahFAQ'),
)

export const TambahDownloadPage = loadable(
  () => import('@/pages/website/konten/TambahDownload'),
)

export const DetailDownloadPage = loadable(
  () => import('@/pages/website/konten/DetailDownload'),
)

export const DetailFAQPage = loadable(
  () => import('@/pages/website/konten/DetailFAQ'),
)

export const IdentitasPage = loadable(
  () => import('@/pages/website/pengaturan/Identitas'),
)

export const UpdateIdentitasPage = loadable(
  () => import('@/pages/website/pengaturan/UpdateIdentitas'),
)

export const PolicyPage = loadable(
  () => import('@/pages/website/pengaturan/Policy'),
)

export const UpdatePolicyPage = loadable(
  () => import('@/pages/website/pengaturan/UpdatePolicy'),
)

export const TambahMenuPage = loadable(
  () => import('@/pages/website/konten/TambahMenu'),
)

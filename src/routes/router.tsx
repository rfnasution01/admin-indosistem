import { createBrowserRouter, redirect } from 'react-router-dom'
import {
  ComingSoonPage,
  CommonLayout,
  DetailGaleriPage,
  DetailKategoriPage,
  EditGaleriPage,
  EditGambarAlbumPage,
  EditGambarKategoriPage,
  EditKategoriPage,
  FasilitasSekolahPage,
  GaleriPage,
  GuruStaffPage,
  KategoriPage,
  LoginLayout,
  MainLayout,
  ProfilWebsiteLayout,
  ProgramLayananPage,
  TambahFasilitasSekolahPage,
  TambahGambarAlbumPage,
  TambahGambarKategoriPage,
  TambahProfilPage,
  TambahProgramLayananPage,
  TambahTestimoniPage,
  TentangSekolahPage,
  TestimoniPage,
  VisiMisiPage,
  WebsiteMainLayout,
} from './loadables'
import Cookies from 'js-cookie'

const categories = ['berita', 'pengumuman', 'agenda', 'prestasi', 'mading']

export const router = createBrowserRouter([
  {
    path: '/',
    element: <CommonLayout />,
    loader: async () => {
      const jwtPayload = Cookies.get('token')

      if (!jwtPayload) {
        return redirect('/login')
      }

      return null
    },
    children: [
      {
        path: '',
        element: <MainLayout />,
      },
      {
        path: 'website',
        element: <WebsiteMainLayout />,
        children: [
          {
            path: '',
            element: <ComingSoonPage />,
          },
          ...categories.flatMap((category) => [
            {
              path: category,
              element: <CommonLayout />,
              children: [
                {
                  path: '',
                  element: <KategoriPage />,
                },
                {
                  path: 'detail',
                  element: <CommonLayout />,
                  children: [
                    {
                      path: '',
                      element: <DetailKategoriPage />,
                    },
                    {
                      path: 'tambah-gambar',
                      element: <TambahGambarKategoriPage />,
                    },
                    {
                      path: 'edit-gambar',
                      element: <EditGambarKategoriPage />,
                    },
                  ],
                },
                {
                  path: 'edit',
                  element: <EditKategoriPage />,
                },
                {
                  path: 'tambah',
                  element: <EditKategoriPage />,
                },
              ],
            },
          ]),

          {
            path: 'galeri',
            element: <CommonLayout />,
            children: [
              {
                path: '',
                element: <GaleriPage />,
              },
              {
                path: 'detail',
                element: <CommonLayout />,
                children: [
                  {
                    path: '',
                    element: <DetailGaleriPage />,
                  },
                  {
                    path: 'tambah-gambar',
                    element: <TambahGambarAlbumPage />,
                  },
                  {
                    path: 'edit-gambar',
                    element: <EditGambarAlbumPage />,
                  },
                ],
              },
              {
                path: 'edit',
                element: <EditGaleriPage />,
              },
              {
                path: 'tambah',
                element: <EditGaleriPage />,
              },
            ],
          },
          {
            path: 'kontak',
            element: <ComingSoonPage />,
          },
          {
            path: 'profil',
            element: <ProfilWebsiteLayout />,
            children: [
              {
                path: '',
                element: <ComingSoonPage />,
              },
              {
                path: 'tentang',
                element: <CommonLayout />,
                children: [
                  {
                    path: '',
                    element: <TentangSekolahPage />,
                  },
                  {
                    path: 'tambah',
                    element: <TambahProfilPage />,
                  },
                ],
              },
              {
                path: 'visimisi',
                element: <VisiMisiPage />,
              },
              {
                path: 'program',
                element: <CommonLayout />,
                children: [
                  {
                    path: '',
                    element: <ProgramLayananPage />,
                  },
                  {
                    path: ':aksi',
                    element: <TambahProgramLayananPage />,
                  },
                ],
              },
              {
                path: 'guru',
                element: <GuruStaffPage />,
              },
              {
                path: 'fasilitas',
                element: <CommonLayout />,
                children: [
                  {
                    path: '',
                    element: <FasilitasSekolahPage />,
                  },
                  {
                    path: ':aksi',
                    element: <TambahFasilitasSekolahPage />,
                  },
                ],
              },
              {
                path: 'testimonial',
                element: <CommonLayout />,
                children: [
                  {
                    path: '',
                    element: <TestimoniPage />,
                  },
                  {
                    path: ':aksi',
                    element: <TambahTestimoniPage />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <LoginLayout />,
    loader: async () => {
      const jwtPayload = Cookies.get('token')

      if (jwtPayload) {
        return redirect('/')
      }

      return null
    },
  },

  {
    path: '*',
    element: <ComingSoonPage />,
  },
])

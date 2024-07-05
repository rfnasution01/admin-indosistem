import { createBrowserRouter, redirect } from 'react-router-dom'
import {
  ComingSoonPage,
  CommonLayout,
  LoginLayout,
  MainLayout,
  ProfilWebsiteLayout,
  TentangSekolahPage,
  WebsiteMainLayout,
} from './loadables'
import Cookies from 'js-cookie'

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
          {
            path: 'pengumuman',
            element: <ComingSoonPage />,
          },
          {
            path: 'mading',
            element: <ComingSoonPage />,
          },
          {
            path: 'berita',
            element: <ComingSoonPage />,
          },
          {
            path: 'agenda',
            element: <ComingSoonPage />,
          },
          {
            path: 'prestasi',
            element: <ComingSoonPage />,
          },
          {
            path: 'galeri',
            element: <ComingSoonPage />,
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
                element: <TentangSekolahPage />,
              },
              {
                path: 'visimisi',
                element: <ComingSoonPage />,
              },
              {
                path: 'program',
                element: <ComingSoonPage />,
              },
              {
                path: 'guru',
                element: <ComingSoonPage />,
              },
              {
                path: 'fasilitas',
                element: <ComingSoonPage />,
              },
              {
                path: 'testimonial',
                element: <ComingSoonPage />,
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

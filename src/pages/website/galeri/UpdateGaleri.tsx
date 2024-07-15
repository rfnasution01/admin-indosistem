import { usePathname } from '@/hooks/usePathname'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import { Breadcrumb } from '@/components/Breadcrumb'
import { convertSlugToText } from '@/utils/formatText'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'js-cookie'
import { GetAlbumType } from '@/types/website/galeriType'
import {
  useCreateAlbumMutation,
  useGetAlbumDetailQuery,
} from '@/store/slices/website/galeriAPI'
import { TambahGaleriSchema } from '@/schemas/website/galeriSchema'
import FormTambahGaleri from '@/components/Form/website/galeri/FormTambahGaleri'
import { useAkses } from '@/hooks/useAkses'
export default function UpdateGaleri() {
  const navigate = useNavigate()
  const { lastPathname, secondPathname } = usePathname()
  const { isHakAksesTambah, isHakAksesUbah } = useAkses()

  const isEdit = lastPathname === 'edit'
  const idEdit = localStorage.getItem('editID') ?? null

  const [urls, setUrls] = useState<string>()

  // --- Data DetailGaleri ---
  const [detailGaleri, setDetailGaleri] = useState<GetAlbumType>()

  const {
    data: dataDetailGaleriSekolah,
    isError: isErrorDetailGaleriSekolah,
    error: errorDetailGaleriSekolah,
  } = useGetAlbumDetailQuery(
    {
      id: idEdit,
      page_number: 1,
      page_size: 100,
      search: '',
    },
    { skip: !idEdit || !isEdit },
  )

  useEffect(() => {
    if (dataDetailGaleriSekolah?.data) {
      setDetailGaleri(dataDetailGaleriSekolah?.data?.data)
    }
  }, [dataDetailGaleriSekolah?.data, idEdit])

  useEffect(() => {
    if (isErrorDetailGaleriSekolah) {
      const errorMsg = errorDetailGaleriSekolah as {
        data?: { message?: string }
      }

      toast.error(`${errorMsg?.data?.message ?? 'Terjadi Kesalahan'}`, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })

      if (errorMsg?.data?.message?.includes('Token')) {
        setTimeout(() => {
          Cookies.remove('token')
          navigate(`/`)
        }, 3000)
      }
    }
  }, [isErrorDetailGaleriSekolah, errorDetailGaleriSekolah])

  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [isShow, setIsShow] = useState<boolean>(false)

  const form = useForm<zod.infer<typeof TambahGaleriSchema>>({
    resolver: zodResolver(TambahGaleriSchema),
    defaultValues: {},
  })

  // --- Create Tambah Galeri ---
  const [
    createUpdateGaleri,
    {
      isError: isErrorUpdateGaleri,
      error: errorUpdateGaleri,
      isLoading: isLoadingUpdateGaleri,
      isSuccess: isSuccessUpdateGaleri,
    },
  ] = useCreateAlbumMutation()

  const handleSubmit = async () => {
    const values = form.getValues()

    const body = {
      id: isEdit ? idEdit : null,
      judul: values?.judul ?? '',
      url_gambar: urls,
      photo: values?.gambar ?? [],
    }

    if ((isEdit && !isHakAksesUbah) || (!isEdit && !isHakAksesTambah)) {
      toast.error(
        `Maaf, anda tidak memiliki akses untuk ${isEdit ? 'mengubah' : 'menambah'} data`,
        {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        },
      )
    }

    if (isSubmit && isShow) {
      try {
        await createUpdateGaleri({
          body: body,
          aksi: isEdit ? 'edit' : 'tambah',
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (isSuccessUpdateGaleri) {
      toast.success(
        `${isEdit ? 'Update' : 'Tambah'} ${convertSlugToText(secondPathname).toLowerCase()} berhasil`,
        {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        },
      )
      setTimeout(() => {
        form.reset()
        navigate(-1)
      }, 3000)
    }
  }, [isSuccessUpdateGaleri])

  useEffect(() => {
    if (isErrorUpdateGaleri) {
      const errorMsg = errorUpdateGaleri as { data?: { message?: string } }

      toast.error(`${errorMsg?.data?.message ?? 'Terjadi Kesalahan'}`, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
    }
  }, [isErrorUpdateGaleri, errorUpdateGaleri])

  useEffect(() => {
    if (detailGaleri) {
      const data = detailGaleri

      form.setValue('judul', data?.judul)
      form.setValue('url_gambar', data?.url_gambar)
      setUrls(data?.url_gambar)
    }
  }, [detailGaleri])

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white p-48">
      <Breadcrumb editID={idEdit} />
      <div className="scrollbar flex flex-1 flex-col gap-32 overflow-y-auto">
        <p className="font-roboto text-[2.4rem]">
          Form {convertSlugToText(lastPathname)}{' '}
          {convertSlugToText(secondPathname)}
        </p>
        <FormTambahGaleri
          form={form}
          isLoading={isLoadingUpdateGaleri}
          handleSubmit={handleSubmit}
          setIsShow={setIsShow}
          setIsSubmit={setIsSubmit}
          isShow={isShow}
          isSubmit={isSubmit}
          setUrls={setUrls}
          urls={urls}
          isEdit={isEdit}
          isUbah={isHakAksesUbah}
          isTambah={isHakAksesTambah}
        />
      </div>
      <ToastContainer />
    </div>
  )
}

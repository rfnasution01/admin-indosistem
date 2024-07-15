import { Breadcrumb } from '@/components/Breadcrumb'
import { getPaths, usePathname } from '@/hooks/usePathname'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { TentangSekolahSchema } from '@/schemas/website/tentangSekolahSchema'
import { useCreateTentangSekolahMutation } from '@/store/slices/website/profilAPI/tentangAPI'
import { capitalizeFirstLetterFromLowercase } from '@/utils/formatText'
import FormTambahProfil from '@/components/Form/website/profil/FormTambahProfil'
import { useGetMenuWebsiteQuery } from '@/store/slices/website/menuAPI'
import { GetMenuWebsiteType } from '@/types/website/menuType'

export default function TambahTentangSekolah() {
  const navigate = useNavigate()

  const { lastPathname, secondPathname, pathname } = usePathname()

  const [urls, setUrls] = useState<string>()
  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [isShow, setIsShow] = useState<boolean>(false)

  const form = useForm<zod.infer<typeof TentangSekolahSchema>>({
    resolver: zodResolver(TentangSekolahSchema),
    defaultValues: {},
  })

  const [menu, setMenu] = useState<GetMenuWebsiteType[]>([])
  const { data } = useGetMenuWebsiteQuery()

  useEffect(() => {
    if (data) {
      setMenu(data?.data)
    }
  }, [data])

  const path = getPaths(pathname.slice(1, pathname?.length))

  const hakAkses = menu?.find((item) => item?.link === path)
  const isHakAksesTambah = hakAkses?.ubah === '1'
  const isHakAksesUbah = hakAkses?.ubah === '1'

  // --- Create Tambah Profil ---
  const [
    createTambahProfil,
    {
      isError: isErrorTambahProfil,
      error: errorTambahProfil,
      isLoading: isLoadingTambahProfil,
      isSuccess: isSuccessTambahProfil,
    },
  ] = useCreateTentangSekolahMutation()

  const values = form.watch()
  values?.list?.forEach((item, index) => {
    item.urutan = (index + 1)?.toString()
  })

  const handleSubmit = async () => {
    const values = form.getValues()

    const body = {
      id: null,
      jenis: values?.jenis ?? '',
      keterangan: values?.keterangan ?? '',
      sub_keterangan: values?.sub_keterangan ?? '',
      gambar_url: urls ?? '',
      list: values?.list ?? [],
    }

    if (isSubmit && isShow) {
      try {
        await createTambahProfil({ body: body })
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (isSuccessTambahProfil) {
      toast.success(`Tambah profil berhasil`, {
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
      setTimeout(() => {
        navigate(-1)
      }, 3000)
    }
  }, [isSuccessTambahProfil])

  useEffect(() => {
    if (isErrorTambahProfil) {
      const errorMsg = errorTambahProfil as { data?: { message?: string } }

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
  }, [isErrorTambahProfil, errorTambahProfil])

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white p-48">
      <Breadcrumb />
      <div className="scrollbar flex flex-1 flex-col gap-32 overflow-y-auto">
        <p className="font-roboto text-[2.4rem]">
          Form {capitalizeFirstLetterFromLowercase(lastPathname)}{' '}
          {capitalizeFirstLetterFromLowercase(secondPathname)}
        </p>
        <FormTambahProfil
          form={form}
          isLoading={isLoadingTambahProfil}
          handleSubmit={handleSubmit}
          setUrls={setUrls}
          urls={urls}
          setIsShow={setIsShow}
          setIsSubmit={setIsSubmit}
          isShow={isShow}
          isSubmit={isSubmit}
          isUbah={isHakAksesUbah}
          isTambah={isHakAksesTambah}
        />
      </div>
      <ToastContainer />
    </div>
  )
}

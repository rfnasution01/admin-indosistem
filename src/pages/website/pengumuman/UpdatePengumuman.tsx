import { usePathname } from '@/hooks/usePathname'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { TambahPengumumanSchema } from '@/schemas/website/pengumumanSchema'
import {
  useGetPengumumanDetailQuery,
  useUpdatePengumumanMutation,
} from '@/store/slices/website/pengumumanAPI'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import { Breadcrumb } from '@/components/Breadcrumb'
import { convertSlugToText } from '@/utils/formatText'
import FormTambahPengumuman from '@/components/Form/website/pengumuman/FormTambahPengumuman'
import 'react-toastify/dist/ReactToastify.css'
import { GetPengumumanDetailType } from '@/types/website/pengumumanType'
import Cookies from 'js-cookie'

export default function UpdatePengumuman() {
  const navigate = useNavigate()

  const { lastPathname } = usePathname()

  const isEdit = lastPathname === 'edit'
  const idEdit = localStorage.getItem('editID') ?? null

  // --- Data DetailPengumuman ---
  const [data, setDataDetailPengumuman] = useState<GetPengumumanDetailType>()

  const {
    data: dataDetailPengumumanSekolah,
    isError: isErrorDetailPengumumanSekolah,
    error: errorDetailPengumumanSekolah,
  } = useGetPengumumanDetailQuery(
    {
      id: idEdit,
    },
    { skip: !idEdit },
  )

  useEffect(() => {
    if (dataDetailPengumumanSekolah?.data) {
      setDataDetailPengumuman(dataDetailPengumumanSekolah?.data?.data)
    }
  }, [dataDetailPengumumanSekolah?.data])

  useEffect(() => {
    if (isErrorDetailPengumumanSekolah) {
      const errorMsg = errorDetailPengumumanSekolah as {
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
  }, [isErrorDetailPengumumanSekolah, errorDetailPengumumanSekolah])

  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [isShow, setIsShow] = useState<boolean>(false)

  const form = useForm<zod.infer<typeof TambahPengumumanSchema>>({
    resolver: zodResolver(TambahPengumumanSchema),
    defaultValues: {},
  })

  // --- Create Tambah Pengumuman ---
  const [
    createTambahPengumuman,
    {
      isError: isErrorTambahPengumuman,
      error: errorTambahPengumuman,
      isLoading: isLoadingTambahPengumuman,
      isSuccess: isSuccessTambahPengumuman,
    },
  ] = useUpdatePengumumanMutation()

  const handleSubmit = async () => {
    const values = form.getValues()

    const body = {
      id: idEdit,
      id_kategori: values?.id_kategori,
      id_tags: values?.id_tags ?? [],
      tanggal: values?.tanggal ?? '',
      judul: values?.judul ?? '',
      isi: values?.isi ?? '',
      publish: values?.publish ?? '1',
      gambar: values?.gambar ?? [],
    }

    if (isSubmit && isShow) {
      try {
        await createTambahPengumuman({ body: body })
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (isSuccessTambahPengumuman) {
      toast.success(`${isEdit ? 'Edit' : 'Tambah'} Pengumuman berhasil`, {
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
  }, [isSuccessTambahPengumuman])

  useEffect(() => {
    if (isErrorTambahPengumuman) {
      const errorMsg = errorTambahPengumuman as { data?: { message?: string } }

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
  }, [isErrorTambahPengumuman, errorTambahPengumuman])

  useEffect(() => {
    if (data) {
      form.setValue('judul', data?.judul)
      form.setValue('id_kategori', data?.id_kategori)
      form.setValue('isi', data?.isi)
      form.setValue('publish', data?.publish)
      const date = data?.tanggal
      const dateSplit = date?.split('-')
      const newDate = `${dateSplit[0]}-${dateSplit[1]}-${dateSplit[2]}`

      form.setValue(
        'tanggal',
        data?.tanggal === '' || !data?.tanggal ? '' : newDate,
      )

      const idArray = data?.tags?.map((data) => data.id)
      const namaArray = data?.tags?.map((data) => data.nama)

      form.setValue('id_tags', idArray)
      form.setValue('label_tags', namaArray)
    }
  }, [data])

  const transformedData = data?.tags?.map((item) => ({
    value: item.id,
    label: item.nama,
  }))

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white p-48">
      <Breadcrumb />
      <div className="scrollbar flex flex-1 flex-col gap-32 overflow-y-auto">
        <p className="font-roboto text-[2.4rem]">
          Form {convertSlugToText(lastPathname)} Pengumuman
        </p>
        <FormTambahPengumuman
          form={form}
          isLoading={isLoadingTambahPengumuman}
          handleSubmit={handleSubmit}
          setIsShow={setIsShow}
          setIsSubmit={setIsSubmit}
          isShow={isShow}
          isSubmit={isSubmit}
          defaultValues={transformedData}
        />
      </div>
      <ToastContainer />
    </div>
  )
}

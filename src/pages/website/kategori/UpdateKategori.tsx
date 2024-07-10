import { usePathname } from '@/hooks/usePathname'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import { Breadcrumb } from '@/components/Breadcrumb'
import { convertSlugToText } from '@/utils/formatText'
import FormTambahKategori from '@/components/Form/website/kategori/FormTambahKategori'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'js-cookie'
import { GetKategoriDetailType } from '@/types/website/kategoriType'
import {
  useCreateKategoriMutation,
  useGetKategoriDetailQuery,
} from '@/store/slices/website/kategoriAPI'
import { TambahKategoriSchema } from '@/schemas/website/kategoriSchema'

export default function UpdateKategori() {
  const navigate = useNavigate()

  const { lastPathname, secondPathname } = usePathname()

  const isEdit = lastPathname === 'edit'
  const idEdit = localStorage.getItem('editID') ?? null

  // --- Data DetailKategori ---
  const [data, setDataDetailKategori] = useState<GetKategoriDetailType>()

  const {
    data: dataDetailKategoriSekolah,
    isError: isErrorDetailKategoriSekolah,
    error: errorDetailKategoriSekolah,
  } = useGetKategoriDetailQuery(
    {
      id: idEdit,
      jenis: secondPathname,
    },
    { skip: !idEdit || !isEdit },
  )

  useEffect(() => {
    if (dataDetailKategoriSekolah?.data) {
      setDataDetailKategori(dataDetailKategoriSekolah?.data?.data)
    }
  }, [dataDetailKategoriSekolah?.data])

  useEffect(() => {
    if (isErrorDetailKategoriSekolah) {
      const errorMsg = errorDetailKategoriSekolah as {
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
  }, [isErrorDetailKategoriSekolah, errorDetailKategoriSekolah])

  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [isShow, setIsShow] = useState<boolean>(false)

  const form = useForm<zod.infer<typeof TambahKategoriSchema>>({
    resolver: zodResolver(TambahKategoriSchema),
    defaultValues: {},
  })

  // --- Create Tambah Kategori ---
  const [
    createUpdateKategori,
    {
      isError: isErrorUpdateKategori,
      error: errorUpdateKategori,
      isLoading: isLoadingUpdateKategori,
      isSuccess: isSuccessUpdateKategori,
    },
  ] = useCreateKategoriMutation()

  const handleSubmit = async () => {
    const values = form.getValues()

    const body = {
      id: isEdit ? idEdit : null,
      id_kategori: values?.id_kategori,
      id_tags: values?.id_tags ?? [],
      tanggal: values?.tanggal ?? '',
      judul: values?.judul ?? '',
      deskripsi_singkat: values?.deskripsi_singkat ?? '',
      isi: values?.isi ?? '',
      publish: values?.publish ?? '1',
      gambar: values?.gambar ?? [],
    }

    if (isSubmit && isShow) {
      try {
        await createUpdateKategori({
          body: body,
          jenis: secondPathname,
          aksi: isEdit ? 'edit' : 'tambah',
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (isSuccessUpdateKategori) {
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
  }, [isSuccessUpdateKategori])

  useEffect(() => {
    if (isErrorUpdateKategori) {
      const errorMsg = errorUpdateKategori as { data?: { message?: string } }

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
  }, [isErrorUpdateKategori, errorUpdateKategori])

  useEffect(() => {
    if (data) {
      form.setValue('judul', data?.judul)
      form.setValue('id_kategori', data?.id_kategori)
      form.setValue('deskripsi_singkat', data?.deskripsi_singkat)
      form.setValue('isi', data?.isi)
      form.setValue('publish', data?.publish)
      const date = data?.tanggal
      const dateSplit = date?.split('-')
      const newDate = `${dateSplit[0]}-${dateSplit[1]}-${dateSplit[2]}`

      form.setValue(
        'tanggal',
        data?.tanggal === '' || !data?.tanggal ? '' : newDate,
      )

      const idArray = data?.tags?.map((data) => data?.id)
      const namaArray = data?.tags?.map((data) => data?.nama)

      form.setValue('id_tags', idArray)
      form.setValue('label_tags', namaArray)
    }
  }, [data])

  const transformedData = data?.tags?.map((item) => ({
    value: item?.id,
    label: item?.nama,
  }))

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white p-48">
      <Breadcrumb editID={idEdit} />
      <div className="scrollbar flex flex-1 flex-col gap-32 overflow-y-auto">
        <p className="font-roboto text-[2.4rem]">
          Form {convertSlugToText(lastPathname)}{' '}
          {convertSlugToText(secondPathname)}
        </p>
        <FormTambahKategori
          form={form}
          isLoading={isLoadingUpdateKategori}
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

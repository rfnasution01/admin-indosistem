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
import { TambahHalamanSchema } from '@/schemas/website/halamanSchema'
import { useCreateHalamanMutation } from '@/store/slices/website/kontenAPI/halamanAPI'
import FormTambahHalaman from '@/components/Form/website/konten/FormTambahHalaman'

export default function UpdateSliderKonten() {
  const navigate = useNavigate()

  const { lastPathname, secondPathname } = usePathname()

  const isEdit = lastPathname === 'edit'
  const idEdit = localStorage.getItem('editID') ?? null
  const data = localStorage.getItem('editData') ?? ''
  const [urls, setUrls] = useState<string>()

  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [isShow, setIsShow] = useState<boolean>(false)

  const form = useForm<zod.infer<typeof TambahHalamanSchema>>({
    resolver: zodResolver(TambahHalamanSchema),
    defaultValues: {},
  })

  // --- Create Tambah Halaman ---
  const [
    createUpdateHalaman,
    {
      isError: isErrorUpdateHalaman,
      error: errorUpdateHalaman,
      isLoading: isLoadingUpdateHalaman,
      isSuccess: isSuccessUpdateHalaman,
    },
  ] = useCreateHalamanMutation()

  const handleSubmit = async () => {
    const values = form.getValues()

    const body = {
      id: isEdit ? idEdit : null,
      judul: values?.judul ?? '',
      url_gambar: urls ?? '',
      isi: values?.isi ?? '',
      id_jenis: values?.id_jenis ?? '',
    }

    if (isSubmit && isShow) {
      try {
        await createUpdateHalaman({
          body: body,
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (isSuccessUpdateHalaman) {
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
  }, [isSuccessUpdateHalaman])

  useEffect(() => {
    if (isErrorUpdateHalaman) {
      const errorMsg = errorUpdateHalaman as { data?: { message?: string } }

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
  }, [isErrorUpdateHalaman, errorUpdateHalaman])

  useEffect(() => {
    if (data && isEdit) {
      const item = JSON.parse(data)

      form.setValue('judul', item?.judul)
      form.setValue('url_gambar', item?.url_gambar)
      form.setValue('isi', item?.isi)
      form.setValue('id_jenis', item?.id_jenis)
      setUrls(item?.url_gambar)
    }
  }, [data])

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white p-48">
      <Breadcrumb editID={idEdit} />
      <div className="scrollbar flex flex-1 flex-col gap-32 overflow-y-auto">
        <p className="font-roboto text-[2.4rem]">
          Form {convertSlugToText(lastPathname)}{' '}
          {convertSlugToText(secondPathname)}
        </p>
        <FormTambahHalaman
          form={form}
          isLoading={isLoadingUpdateHalaman}
          handleSubmit={handleSubmit}
          setIsShow={setIsShow}
          setIsSubmit={setIsSubmit}
          isShow={isShow}
          isSubmit={isSubmit}
          urls={urls}
          setUrls={setUrls}
        />
      </div>
      <ToastContainer />
    </div>
  )
}

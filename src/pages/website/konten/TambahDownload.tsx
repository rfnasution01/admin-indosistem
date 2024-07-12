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
import { TambahDownloadSchema } from '@/schemas/website/DownloadSchema'
import FormTambahDownload from '@/components/Form/website/konten/FormTambahDownload'
import { useCreateDownloadMutation } from '@/store/slices/website/kontenAPI/downloadAPI'

export default function UpdateDownloadKonten() {
  const navigate = useNavigate()

  const { lastPathname, secondPathname } = usePathname()

  const isEdit = lastPathname === 'edit'
  const idEdit = localStorage.getItem('editID') ?? null
  const data = localStorage.getItem('editData') ?? ''
  const [urls, setUrls] = useState<string>()

  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [isShow, setIsShow] = useState<boolean>(false)

  const form = useForm<zod.infer<typeof TambahDownloadSchema>>({
    resolver: zodResolver(TambahDownloadSchema),
    defaultValues: {},
  })

  // --- Create Tambah Download ---
  const [
    createUpdateDownload,
    {
      isError: isErrorUpdateDownload,
      error: errorUpdateDownload,
      isLoading: isLoadingUpdateDownload,
      isSuccess: isSuccessUpdateDownload,
    },
  ] = useCreateDownloadMutation()

  const handleSubmit = async () => {
    const values = form.getValues()

    const body = {
      id: isEdit ? idEdit : null,
      judul: values?.judul ?? '',
      jenis_file: values?.jenis_file ?? '',
      url_file: values?.jenis_file === 'Link' ? values?.url_file : urls,
      id_kategori: values?.id_kategori ?? '',
    }

    if (isSubmit && isShow) {
      try {
        await createUpdateDownload({
          body: body,
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (isSuccessUpdateDownload) {
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
  }, [isSuccessUpdateDownload])

  useEffect(() => {
    if (isErrorUpdateDownload) {
      const errorMsg = errorUpdateDownload as { data?: { message?: string } }

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
  }, [isErrorUpdateDownload, errorUpdateDownload])

  useEffect(() => {
    if (data && isEdit) {
      const item = JSON.parse(data)

      form.setValue('judul', item?.judul)
      form.setValue('jenis_file', item?.jenis_file)
      form.setValue('url_file', item?.url_file)
      form.setValue('id_kategori', item?.id_kategori)
      form.setValue('nama_kategori', item?.kategori)
      if (item?.jenis_file === 'Upload') {
        setUrls(item?.url_file)
      }
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
        <FormTambahDownload
          form={form}
          isLoading={isLoadingUpdateDownload}
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

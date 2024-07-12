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
import { TambahFAQSchema } from '@/schemas/website/FAQSchema'
import FormTambahFAQ from '@/components/Form/website/konten/FormTambahFAQ'
import { useCreateFAQMutation } from '@/store/slices/website/kontenAPI/faqAPI'

export default function UpdateFAQKonten() {
  const navigate = useNavigate()

  const { lastPathname, secondPathname } = usePathname()

  const isEdit = lastPathname === 'edit'
  const idEdit = localStorage.getItem('editID') ?? null
  const data = localStorage.getItem('editData') ?? ''

  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [isShow, setIsShow] = useState<boolean>(false)

  const form = useForm<zod.infer<typeof TambahFAQSchema>>({
    resolver: zodResolver(TambahFAQSchema),
    defaultValues: {},
  })

  // --- Create Tambah FAQ ---
  const [
    createUpdateFAQ,
    {
      isError: isErrorUpdateFAQ,
      error: errorUpdateFAQ,
      isLoading: isLoadingUpdateFAQ,
      isSuccess: isSuccessUpdateFAQ,
    },
  ] = useCreateFAQMutation()

  const handleSubmit = async () => {
    const values = form.getValues()

    const body = {
      id: isEdit ? idEdit : null,
      pertanyaan: values?.pertanyaan ?? '',
      jawaban: values?.jawaban ?? '',
      urutan: '1',
      id_kategori: values?.id_kategori ?? '',
    }

    if (isSubmit && isShow) {
      try {
        await createUpdateFAQ({
          body: body,
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (isSuccessUpdateFAQ) {
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
  }, [isSuccessUpdateFAQ])

  useEffect(() => {
    if (isErrorUpdateFAQ) {
      const errorMsg = errorUpdateFAQ as { data?: { message?: string } }

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
  }, [isErrorUpdateFAQ, errorUpdateFAQ])

  useEffect(() => {
    if (data && isEdit) {
      const item = JSON.parse(data)

      form.setValue('pertanyaan', item?.pertanyaan)
      form.setValue('jawaban', item?.jawaban)
      form.setValue('id_kategori', item?.id_kategori)
      form.setValue('nama_kategori', item?.kategori)
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

        <FormTambahFAQ
          form={form}
          isLoading={isLoadingUpdateFAQ}
          handleSubmit={handleSubmit}
          setIsShow={setIsShow}
          setIsSubmit={setIsSubmit}
          isShow={isShow}
          isSubmit={isSubmit}
        />
      </div>
      <ToastContainer />
    </div>
  )
}

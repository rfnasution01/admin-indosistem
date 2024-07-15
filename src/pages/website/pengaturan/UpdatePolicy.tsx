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
import { UpdatePolicySchema } from '@/schemas/website/pengaturanSchema'
import { useUpdatePengaturanPolicyMutation } from '@/store/slices/website/pengaturanAPI'
import FormUpddatePolicy from '@/components/Form/website/pengaturan/FormUpdatePolicy'
import { useAkses } from '@/hooks/useAkses'

export default function UpdatePolicyKonten() {
  const navigate = useNavigate()
  const { isHakAksesUbah } = useAkses()

  const { lastPathname, secondPathname } = usePathname()

  const isEdit = lastPathname === 'edit'
  const idEdit = localStorage.getItem('editID') ?? null
  const data = localStorage.getItem('editData') ?? ''

  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [isShow, setIsShow] = useState<boolean>(false)

  const form = useForm<zod.infer<typeof UpdatePolicySchema>>({
    resolver: zodResolver(UpdatePolicySchema),
    defaultValues: {},
  })

  // --- Create Tambah Policy ---
  const [
    createUpdatePolicy,
    {
      isError: isErrorUpdatePolicy,
      error: errorUpdatePolicy,
      isLoading: isLoadingUpdatePolicy,
      isSuccess: isSuccessUpdatePolicy,
    },
  ] = useUpdatePengaturanPolicyMutation()

  const handleSubmit = async () => {
    const values = form.getValues()

    const body = {
      policy: values?.policy ?? '',
    }

    if (!isHakAksesUbah) {
      toast.error(`Maaf, anda tidak memiliki akses untuk mengubah data`, {
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

    if (isSubmit && isShow) {
      try {
        await createUpdatePolicy({
          body: body,
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (isSuccessUpdatePolicy) {
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
  }, [isSuccessUpdatePolicy])

  useEffect(() => {
    if (isErrorUpdatePolicy) {
      const errorMsg = errorUpdatePolicy as { data?: { message?: string } }

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
  }, [isErrorUpdatePolicy, errorUpdatePolicy])

  useEffect(() => {
    if (data) {
      const item = JSON.parse(data)

      form.setValue('policy', item?.policy)
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
        <FormUpddatePolicy
          form={form}
          isLoading={isLoadingUpdatePolicy}
          handleSubmit={handleSubmit}
          setIsShow={setIsShow}
          setIsSubmit={setIsSubmit}
          isShow={isShow}
          isSubmit={isSubmit}
          isUbah={isHakAksesUbah}
        />
      </div>
      <ToastContainer />
    </div>
  )
}

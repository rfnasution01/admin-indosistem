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
import { UpdateIdentitasSchema } from '@/schemas/website/pengaturanSchema'
import { useUpdatePengaturanIdentitasMutation } from '@/store/slices/website/pengaturanAPI'
import FormUpddateIdentitas from '@/components/Form/website/pengaturan/FormUpdateIdentitas'
import { useAkses } from '@/hooks/useAkses'

export default function UpdateIdentitasKonten() {
  const navigate = useNavigate()
  const { isHakAksesUbah } = useAkses()

  const { lastPathname, secondPathname } = usePathname()

  const isEdit = lastPathname === 'edit'
  const idEdit = localStorage.getItem('editID') ?? null
  const data = localStorage.getItem('editData') ?? ''
  const [logo, setLogo] = useState<string>()
  const [favicon, setFavicon] = useState<string>()

  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [isShow, setIsShow] = useState<boolean>(false)

  const form = useForm<zod.infer<typeof UpdateIdentitasSchema>>({
    resolver: zodResolver(UpdateIdentitasSchema),
    defaultValues: {},
  })

  // --- Create Tambah Identitas ---
  const [
    createUpdateIdentitas,
    {
      isError: isErrorUpdateIdentitas,
      error: errorUpdateIdentitas,
      isLoading: isLoadingUpdateIdentitas,
      isSuccess: isSuccessUpdateIdentitas,
    },
  ] = useUpdatePengaturanIdentitasMutation()

  const handleSubmit = async () => {
    const values = form.getValues()

    const body = {
      id: isEdit ? idEdit : null,
      nama_website: values?.nama_website ?? '',
      logo: logo ?? '',
      favicon: favicon ?? '',
      footer: values?.footer ?? '',
      deskripsi: values?.deskripsi ?? '',
      keyword: values?.keyword ?? '',
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
        await createUpdateIdentitas({
          body: body,
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (isSuccessUpdateIdentitas) {
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
  }, [isSuccessUpdateIdentitas])

  useEffect(() => {
    if (isErrorUpdateIdentitas) {
      const errorMsg = errorUpdateIdentitas as { data?: { message?: string } }

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
  }, [isErrorUpdateIdentitas, errorUpdateIdentitas])

  useEffect(() => {
    if (data) {
      const item = JSON.parse(data)

      form.setValue('nama_website', item?.nama_website)
      form.setValue('logo', item?.logo)
      form.setValue('favicon', item?.favicon)
      form.setValue('footer', item?.footer)
      form.setValue('deskripsi', item?.deskripsi)
      form.setValue('keyword', item?.keyword)
      setLogo(item?.logo)
      setFavicon(item?.favicon)
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
        <FormUpddateIdentitas
          form={form}
          isLoading={isLoadingUpdateIdentitas}
          handleSubmit={handleSubmit}
          setIsShow={setIsShow}
          setIsSubmit={setIsSubmit}
          isShow={isShow}
          isSubmit={isSubmit}
          logo={logo}
          setLogo={setLogo}
          favicon={favicon}
          setFavicon={setFavicon}
          isUbah={isHakAksesUbah}
        />
      </div>
      <ToastContainer />
    </div>
  )
}

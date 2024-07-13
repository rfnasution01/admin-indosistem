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
import { TambahMenuSchema } from '@/schemas/website/menuSchema'
import { useCreateMenuKontenMutation } from '@/store/slices/website/menuKontenAPI'
import FormTambahMenu from '@/components/Form/website/konten/FormTambahMenu'

export default function UpdateMenuKonten() {
  const navigate = useNavigate()

  const { lastPathname, secondPathname } = usePathname()

  const isEdit = lastPathname === 'edit'
  const idEdit = localStorage.getItem('editID') ?? null
  const data = localStorage.getItem('editData') ?? ''
  const parentData = localStorage.getItem('parentData') ?? ''

  const [urls, setUrls] = useState<string>()

  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [isShow, setIsShow] = useState<boolean>(false)

  const form = useForm<zod.infer<typeof TambahMenuSchema>>({
    resolver: zodResolver(TambahMenuSchema),
    defaultValues: {},
  })

  // --- Create Tambah Menu ---
  const [
    createUpdateMenu,
    {
      isError: isErrorUpdateMenu,
      error: errorUpdateMenu,
      isLoading: isLoadingUpdateMenu,
      isSuccess: isSuccessUpdateMenu,
    },
  ] = useCreateMenuKontenMutation()

  const handleSubmit = async () => {
    const values = form.getValues()

    const body = {
      id: isEdit ? idEdit : null,
      nama_menu: values?.nama_menu ?? '',
      posisi: values?.posisi ?? '',
      jenis_menu: values?.jenis_menu ?? '',
      id_konten: values?.id_konten ?? '',
      deskripsi_singkat: values?.deskripsi_singkat ?? '',
      url_gambar: urls ?? '',
      id_parent: values?.id_parent ?? '',
      urutan: values?.urutan ?? '1',
    }

    if (isSubmit && isShow) {
      try {
        await createUpdateMenu({
          body: body,
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (isSuccessUpdateMenu) {
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
  }, [isSuccessUpdateMenu])

  useEffect(() => {
    if (isErrorUpdateMenu) {
      const errorMsg = errorUpdateMenu as { data?: { message?: string } }

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
  }, [isErrorUpdateMenu, errorUpdateMenu])

  useEffect(() => {
    const list = JSON.parse(parentData)

    if (data && isEdit && parentData) {
      const item = JSON.parse(data)

      form.setValue('nama_menu', item?.nama_menu)
      form.setValue('jenis_menu', item?.jenis_menu)
      form.setValue('posisi', list?.posisi)
      form.setValue('id_konten', item?.id_konten)
      form.setValue('deskripsi_singkat', item?.deskripsi_singkat)
      form.setValue('url_gambar', item?.url_gambar)
      form.setValue('id_parent', item?.id_parent)
      form.setValue('urutan', item?.urutan)
      setUrls(item?.url_gambar)
    } else {
      form.setValue('jenis_menu', list.jenis_menu)
      form.setValue('posisi', list?.posisi)
      form.setValue('id_parent', list?.id_parent)
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
        <FormTambahMenu
          form={form}
          isLoading={isLoadingUpdateMenu}
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

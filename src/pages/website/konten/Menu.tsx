import { KategoriSchema } from '@/schemas/website/kategoriSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/Form'
import { SelectListPosisiMenu } from '@/components/Select/website'
import { useEffect, useState } from 'react'
import { MenubarDropDown } from '@/components/Menubar/MenubarDropdown'
import { GetMenuType } from '@/types/website/konten/menuType'
import {
  useCreateStatusKontenMutation,
  useDeleteMenuKontenMutation,
  useGetMenuKontenQuery,
} from '@/store/slices/website/menuKontenAPI'
import { Bounce, toast } from 'react-toastify'
import { usePathname } from '@/hooks/usePathname'
import { TableSlider } from '@/components/Table/TableSlider'
import { columnsListDataMenu } from '@/dummy/table'

export default function Menu() {
  const { thirdPathname } = usePathname()

  const [idKategori, setIdKategori] = useState<string>('')
  const [isShowStatus, setIsShowStatus] = useState<boolean>(false)
  const [isShowDelete, setIsShowDelete] = useState<boolean>(false)

  const form = useForm<zod.infer<typeof KategoriSchema>>({
    resolver: zodResolver(KategoriSchema),
    defaultValues: {},
  })

  const [menu, setMenu] = useState<GetMenuType[]>([])
  const { data, isLoading, isFetching } = useGetMenuKontenQuery({
    posisi: idKategori,
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setMenu(data?.data)
    }
  }, [data, idKategori])

  // --- Delete ---
  const [
    deleteMenu,
    {
      isError: isErrorDeleteMenu,
      isLoading: isLoadingDeleteMenu,
      isSuccess: isSuccessDeleteMenu,
      error: errorDeleteMenu,
    },
  ] = useDeleteMenuKontenMutation()

  const handleSubmitDelete = async (id: string) => {
    try {
      await deleteMenu({ id: id })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessDeleteMenu) {
      toast.success(`Delete ${thirdPathname} berhasil`, {
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
      setIsShowDelete(false)
    }
  }, [isSuccessDeleteMenu])

  useEffect(() => {
    if (isErrorDeleteMenu) {
      const errorMsg = errorDeleteMenu as { data?: { message?: string } }

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
  }, [isErrorDeleteMenu, errorDeleteMenu])

  // --- Status Menu ---
  const [
    statusMenu,
    {
      isError: isErrorStatusMenu,
      isLoading: isLoadingStatusMenu,
      isSuccess: isSuccessStatusMenu,
      error: errorStatusMenu,
    },
  ] = useCreateStatusKontenMutation()

  const handleSubmitStatus = async (id: string, status: number) => {
    const body = {
      id: id,
      aktif: status === 0 ? 1 : 0,
    }
    try {
      await statusMenu({ body: body })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessStatusMenu) {
      toast.success(`Update ${thirdPathname} berhasil`, {
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
      setIsShowStatus(false)
    }
  }, [isSuccessStatusMenu])

  useEffect(() => {
    if (isErrorStatusMenu) {
      const errorMsg = errorStatusMenu as { data?: { message?: string } }

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
  }, [isErrorStatusMenu, errorStatusMenu])

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white p-48">
      <div className="flex justify-between gap-32">
        <Form {...form}>
          <form className="w-1/3 phones:w-full">
            <SelectListPosisiMenu
              name="kategori"
              placeholder="Pilih Posisi"
              useFormReturn={form}
              setIdKategori={setIdKategori}
            />
          </form>
        </Form>
        {idKategori && <MenubarDropDown posisi={idKategori} />}
      </div>
      <TableSlider
        data={menu}
        columns={columnsListDataMenu}
        containerClasses="w-full h-full flex-1 overflow-y-auto scrollbar"
        loading={loading}
        pageSize={1}
        currentPage={1}
        isNumber
        handleSubmitDelete={handleSubmitDelete}
        isShowDelete={isShowDelete}
        isLoadingDelete={isLoadingDeleteMenu}
        handleSubmitStatus={handleSubmitStatus}
        isLoadingStatus={isLoadingStatusMenu}
        setIsShowStatus={setIsShowStatus}
        isShowStatus={isShowStatus}
        isDetail
        isSlider
        posisi={idKategori}
      />
    </div>
  )
}

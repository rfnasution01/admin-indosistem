import { Pagination } from '@/components/Pagination'
import { Searching } from '@/components/Searching'
import {
  SelectListAgenda,
  SelectListBerita,
  SelectListMading,
  SelectListPrestasi,
} from '@/components/Select/website'
import { Meta } from '@/store/api'
import { Dispatch, SetStateAction } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/Form'
import { TableKategori } from '@/components/Table/TableKategori'
import { columnsListDataKategori } from '@/dummy/table'
import { GetKategoriType } from '@/types/website/kategoriType'
import { SelectListPengumuman } from '@/components/Select/website/ListPengumuman'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { convertSlugToText } from '@/utils/formatText'
import { usePathname } from '@/hooks/usePathname'
import { MenubarPerPage } from '@/components/Menubar/MenubarPerPage'

export function KategoriTable({
  data,
  meta,
  setSearch,
  setPageNumber,
  setPageSize,
  setIdKategori,
  pageNumber,
  pageSize,
  search,
  isLoading,
  isLoadingDelete,
  handleSubmitDelete,
  isShowDelete,
  setIsShowDelete,
  isLoadingPublish,
  isShowPublish,
  setIsShowPublish,
  handleSubmitPublish,
  form,
  isUbah,
  isHapus,
  isTambah,
}: {
  data: GetKategoriType[]
  meta: Meta
  setSearch: Dispatch<SetStateAction<string>>
  setPageNumber: Dispatch<SetStateAction<number>>
  setPageSize: Dispatch<SetStateAction<number>>
  setIdKategori: Dispatch<SetStateAction<string>>
  pageSize: number
  pageNumber: number
  search: string
  isLoading?: boolean
  handleSubmitDelete: (id: string) => Promise<void>
  setIsShowDelete: Dispatch<SetStateAction<boolean>>
  isShowDelete: boolean
  isLoadingDelete: boolean
  handleSubmitPublish: (id: string, publish: string) => Promise<void>
  setIsShowPublish: Dispatch<SetStateAction<boolean>>
  isShowPublish: boolean
  isLoadingPublish: boolean
  form: UseFormReturn
  isUbah: boolean
  isHapus: boolean
  isTambah: boolean
}) {
  const { secondPathname } = usePathname()

  return (
    <div className="flex w-full flex-col gap-32">
      <div className="flex items-center justify-between gap-32 phones:flex-col phones:items-start">
        <div className="flex w-2/3 items-center gap-32 phones:w-full phones:flex-col phones:items-start">
          <Searching
            setPageNumber={setPageNumber}
            setSearch={setSearch}
            className="w-1/2 phones:w-full"
            search={search}
          />
          <Form {...form}>
            <form>
              {secondPathname === 'pengumuman' ? (
                <SelectListPengumuman
                  name="kategori"
                  placeholder="Pilih Kategori"
                  useFormReturn={form}
                  isDisabled={isLoading}
                  setIdKategori={setIdKategori}
                />
              ) : secondPathname === 'mading' ? (
                <SelectListMading
                  name="kategori"
                  placeholder="Pilih Kategori"
                  setIdKategori={setIdKategori}
                  useFormReturn={form}
                  isDisabled={isLoading}
                />
              ) : secondPathname === 'berita' ? (
                <SelectListBerita
                  name="kategori"
                  placeholder="Pilih Kategori"
                  useFormReturn={form}
                  isDisabled={isLoading}
                  setIdKategori={setIdKategori}
                />
              ) : secondPathname === 'agenda' ? (
                <SelectListAgenda
                  name="kategori"
                  placeholder="Pilih Kategori"
                  useFormReturn={form}
                  isDisabled={isLoading}
                  setIdKategori={setIdKategori}
                />
              ) : secondPathname === 'prestasi' ? (
                <SelectListPrestasi
                  name="kategori"
                  placeholder="Pilih Kategori"
                  useFormReturn={form}
                  isDisabled={isLoading}
                  setIdKategori={setIdKategori}
                />
              ) : (
                <></>
              )}
            </form>
          </Form>
        </div>
        {isTambah && (
          <Link
            to="tambah"
            className="flex items-center gap-12 rounded-2xl bg-warna-primary px-24 py-16 text-white hover:bg-opacity-80"
          >
            <FontAwesomeIcon icon={faPlus} />
            <p className="phones:hidden">
              Tambah {convertSlugToText(secondPathname)} Baru
            </p>
          </Link>
        )}
      </div>
      <TableKategori
        data={data}
        columns={columnsListDataKategori}
        containerClasses="w-full h-full flex-1 overflow-y-auto scrollbar"
        loading={isLoading}
        pageSize={pageSize}
        currentPage={pageNumber}
        isNumber
        isShowDelete={isShowDelete}
        setIsShowDelete={setIsShowDelete}
        handleSubmitDelete={handleSubmitDelete}
        isLoadingDelete={isLoadingDelete}
        isKategori
        handleSubmitPublish={handleSubmitPublish}
        isLoadingPublish={isLoadingPublish}
        setIsShowPublish={setIsShowPublish}
        isShowPublish={isShowPublish}
        isHapus={isHapus}
        isUbah={isUbah}
      />
      <div className="flex justify-end">
        <div className="flex items-center gap-32">
          <MenubarPerPage setPageSize={setPageSize} pageSize={pageSize} />
          {data?.length > 0 && (
            <Pagination
              pageNow={pageNumber ?? 0}
              lastPage={meta?.last_page ?? 0}
              setPageNumber={setPageNumber}
            />
          )}
        </div>
      </div>
    </div>
  )
}

import { MenubarPerPage } from '@/components/Menubar/MenubarPerPage'
import { Pagination } from '@/components/Pagination'
import { Searching } from '@/components/Searching'
import { Table } from '@/components/Table'
import { columnsListDataGuru } from '@/dummy/table'
import { Meta } from '@/store/api'
import { GetWebsiteGuruStaffType } from '@/types/website/profil/guruStaffType'
import { Dispatch, SetStateAction } from 'react'

export function GuruStaffTable({
  data,
  meta,
  setSearch,
  setPageNumber,
  setPageSize,
  pageNumber,
  pageSize,
  search,
  isLoading,
}: {
  data: GetWebsiteGuruStaffType[]
  meta: Meta
  setSearch: Dispatch<SetStateAction<string>>
  setPageNumber: Dispatch<SetStateAction<number>>
  setPageSize: Dispatch<SetStateAction<number>>
  pageSize: number
  pageNumber: number
  search: string
  isLoading?: boolean
}) {
  return (
    <div className="flex w-full flex-col gap-32">
      <div className="flex items-center justify-between gap-32 phones:flex-col phones:items-start">
        <Searching
          setPageNumber={setPageNumber}
          setSearch={setSearch}
          className="w-1/2 phones:w-full"
          search={search}
        />
      </div>
      <Table
        data={data}
        columns={columnsListDataGuru}
        containerClasses="w-full h-full flex-1 overflow-y-auto scrollbar"
        loading={isLoading}
        pageSize={pageSize}
        currentPage={pageNumber}
        isNumber
      />
      {data?.length > 0 && (
        <div className="flex items-center justify-end gap-32">
          <MenubarPerPage
            pageSize={pageSize}
            setPageSize={setPageSize}
            position="bottom"
          />
          <Pagination
            pageNow={pageNumber ?? 0}
            lastPage={meta?.last_page ?? 0}
            setPageNumber={setPageNumber}
          />
        </div>
      )}
    </div>
  )
}

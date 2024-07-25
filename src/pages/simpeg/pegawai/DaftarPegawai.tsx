import { MenubarDaftarPegawai } from '@/components/Menubar/MenubarDaftarPegawai'
import { MenubarPerPage } from '@/components/Menubar/MenubarPerPage'
import { Pagination } from '@/components/Pagination'
import { Searching } from '@/components/Searching'
import { TableDaftarPegawai } from '@/components/Table/TableDaftarPegawai'
import { columnsListDaftarPegawai } from '@/dummy/tableSimpeg'
import { ManajemenData } from '@/features/simpeg/dashbhoard/daftarPegawai/ManajemenData'
import { useSimpegDaftarPegawai } from '@/hooks/simpeg'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function DaftarPegawai() {
  const {
    formReset,
    formFilter,
    setBulan,
    setJenisKepegawaian,
    setSearch,
    setStatusPegawai,
    setTahun,
    setValidasi,
    setPageNumber,
    search,
    data,
    meta,
    loadingDaftarPegawai,
    pageSize,
    pageNumber,
    isUbah,
    isHapus,
    setIsShowDelete,
    isShowDelete,
    handleSubmitDelete,
    isLoadingDeleteDaftarPegawai,
    setPageSize,
    tahun,
    bulan,
    statusPegawai,
    setIsShowReset,
    isShowReset,
    handleSubmitResetPassword,
    isLoadingResetPasswordDaftarPegawai,
    setId,
    id,
  } = useSimpegDaftarPegawai()

  useEffect(() => {
    if (tahun) {
      formFilter.setValue('tahun', tahun)
    }
    if (bulan) {
      formFilter.setValue('bulan', bulan)
    }
    if (statusPegawai) {
      formFilter.setValue('status_pegawai', statusPegawai)
    }
  }, [tahun, bulan, setStatusPegawai])

  const manajemenData = ['Cetak', 'Import Data Excel', 'Tambah Data']

  return (
    <div className="scrollbar flex h-full w-full overflow-y-auto px-64 py-32 phones:p-32">
      <div className="flex w-full flex-col gap-32 rounded-3x bg-white p-32">
        <p className="font-roboto text-[4rem] text-primary-100">
          Daftar Pegawai
        </p>

        {/* <ListData listData={listData} /> */}

        <ManajemenData manajemenData={manajemenData} />

        <div className="flex items-center justify-between gap-32">
          <MenubarDaftarPegawai
            setBulan={setBulan}
            setJenisKepegawaian={setJenisKepegawaian}
            setStatusKepegawaian={setStatusPegawai}
            setTahun={setTahun}
            setValidasi={setValidasi}
            form={formFilter}
          />
          <Searching
            setPageNumber={setPageNumber}
            setSearch={setSearch}
            className="w-1/2 phones:w-full"
            search={search}
          />
        </div>
        <TableDaftarPegawai
          data={data}
          columns={columnsListDaftarPegawai}
          containerClasses="w-full h-full flex-1 overflow-y-auto scrollbar"
          loading={loadingDaftarPegawai}
          pageSize={pageSize}
          currentPage={pageNumber}
          isNumber
          handleSubmitDelete={handleSubmitDelete}
          isLoadingDelete={isLoadingDeleteDaftarPegawai}
          setIsShowDelete={setIsShowDelete}
          isShowDelete={isShowDelete}
          isDaftarPegawai
          isHapus={isHapus}
          isUbah={isUbah}
          isShowReset={isShowReset}
          setIsShowReset={setIsShowReset}
          form={formReset}
          handleSubmitResetPassword={handleSubmitResetPassword}
          isLoadingReset={isLoadingResetPasswordDaftarPegawai}
          setId={setId}
          id={id}
        />

        {data?.length > 0 && (
          <div className="flex justify-end">
            <div className="flex items-center gap-32">
              <MenubarPerPage pageSize={pageSize} setPageSize={setPageSize} />

              <Pagination
                pageNow={pageNumber ?? 0}
                lastPage={meta?.last_page ?? 0}
                setPageNumber={setPageNumber}
              />
            </div>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  )
}

import {
  FormAlamat,
  FormFisik,
  FormIdentitasPekerjaan,
  FormIdentitasPersonal,
} from '@/components/Form/simpeg/daftarPegawai'
import {
  NavigasiUpdateData,
  PreviewDataPegawai,
} from '@/features/simpeg/dashbhoard/daftarPegawai'
import { usePathname } from '@/hooks/usePathname'
import { ComingSoonPage } from '@/routes/loadables'
import { convertSlugToText } from '@/utils/formatText'
import { useState } from 'react'
import { useAksesSimpeg } from '@/hooks/useAksesSimpeg'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useTambahPegawai } from '@/hooks/simpeg'

export default function UpdateDataPegawai() {
  const { isHakAksesTambah } = useAksesSimpeg()
  const {
    handleSubmitTambahPegawai,
    isLoadingTambahPegawai,
    formAlamat,
    formFisik,
    formIdentitasPekerjaan,
    formIdentitasPersonal,
    isShowTambah,
    setIsShowTambah,
    formTambahPegawai,
  } = useTambahPegawai()
  const { lastPathname } = usePathname()
  const isEdit = lastPathname === 'edit'

  const menuList = [
    'Identitas Personal',
    'Identitas Pekerjaan',
    'Alamat Tempat Tinggal',
    'Karakter Fisik',
    'Preview',
  ]

  const [menu, setMenu] = useState<string>(menuList?.[0])
  const [currentIdx, setCurrentIdx] = useState<number>(0)

  return (
    <div className="scrollbar flex h-full w-full flex-col overflow-y-auto px-64 py-32 phones:p-32">
      <div className="scrollbar flex h-full w-full flex-col gap-32 overflow-y-auto rounded-3x bg-white p-32">
        <div className="flex flex-col gap-8">
          <p className="font-roboto text-[2.8rem] text-primary-100">
            {convertSlugToText(lastPathname)} Data Pegawai
          </p>
          <p>Isilah data dengan lengkap dan benar!</p>
        </div>
        <div className="flex">
          <NavigasiUpdateData
            menu={menu}
            menuList={menuList}
            setMenu={setMenu}
            currentIdx={currentIdx}
            isEdit={isEdit}
            setCurrentIdx={setCurrentIdx}
          />
        </div>

        {menu === 'Identitas Personal' ? (
          <FormIdentitasPersonal
            setCurrentIdx={setCurrentIdx}
            currentIdx={currentIdx}
            form={formIdentitasPersonal}
            menuList={menuList}
            setMenu={setMenu}
            isTambah={isHakAksesTambah}
            isLoading={isLoadingTambahPegawai}
          />
        ) : menu === 'Identitas Pekerjaan' ? (
          <FormIdentitasPekerjaan
            setCurrentIdx={setCurrentIdx}
            currentIdx={currentIdx}
            form={formIdentitasPekerjaan}
            menuList={menuList}
            setMenu={setMenu}
            isTambah={isHakAksesTambah}
            isLoading={isLoadingTambahPegawai}
          />
        ) : menu === 'Alamat Tempat Tinggal' ? (
          <FormAlamat
            setCurrentIdx={setCurrentIdx}
            currentIdx={currentIdx}
            form={formAlamat}
            menuList={menuList}
            setMenu={setMenu}
            isTambah={isHakAksesTambah}
            isLoading={isLoadingTambahPegawai}
          />
        ) : menu === 'Karakter Fisik' ? (
          <FormFisik
            setCurrentIdx={setCurrentIdx}
            currentIdx={currentIdx}
            form={formFisik}
            menuList={menuList}
            setMenu={setMenu}
            isTambah={isHakAksesTambah}
            isLoading={isLoadingTambahPegawai}
          />
        ) : menu === 'Preview' ? (
          <PreviewDataPegawai
            handleSubmitTambahPegawai={handleSubmitTambahPegawai}
            isShowTambah={isShowTambah}
            setIsShowTambah={setIsShowTambah}
            form={formTambahPegawai}
            setCurrentIdx={setCurrentIdx}
            setMenu={setMenu}
            menuList={menuList}
          />
        ) : (
          <ComingSoonPage />
        )}
      </div>
      <ToastContainer />
    </div>
  )
}

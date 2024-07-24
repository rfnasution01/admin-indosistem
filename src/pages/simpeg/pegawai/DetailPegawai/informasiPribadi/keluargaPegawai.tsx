import { DialogUpdate } from '@/components/Dialog/DialogUpdate'
import {
  FormAnak,
  FormIstri,
  FormOrangTua,
  FormSaudara,
} from '@/components/Form/simpeg/detailPegawai'
import { TabDetailPegawai } from '@/features/simpeg/detailPegawai'
import {
  Anak,
  IbuKandung,
  SaudaraKandung,
  SuamiIstri,
} from '@/features/simpeg/detailPegawai/informasiPribadi'
import { useSimpegDetailPegawai } from '@/hooks/simpeg'
import { ComingSoonPage } from '@/routes/loadables'
import { useState } from 'react'

export function DetailKeluargaPegawai() {
  const {
    formTambahAnak,
    formTambahIstri,
    formTambahOrangtua,
    formTambahSaudara,
  } = useSimpegDetailPegawai()

  const listMenu = [
    'Suami / Istri',
    'Anak',
    'Orang Tua Kandung dan Mertua',
    'Saudara Kandung',
  ]
  const [menu, setMenu] = useState<string>(listMenu?.[0])
  const [isShow, setIsShow] = useState<boolean>(false)

  const tampilkanKonten = () => {
    switch (menu) {
      case 'Suami / Istri':
        return <SuamiIstri />
      case 'Anak':
        return <Anak />
      case 'Orang Tua Kandung dan Mertua':
        return <IbuKandung />
      case 'Saudara Kandung':
        return <SaudaraKandung />

      default:
        return <ComingSoonPage />
    }
  }

  const formKonten = () => {
    switch (menu) {
      case 'Suami / Istri':
        return (
          <FormIstri form={formTambahIstri} isTambah setIsShow={setIsShow} />
        )
      case 'Anak':
        return <FormAnak form={formTambahAnak} isTambah setIsShow={setIsShow} />
      case 'Orang Tua Kandung dan Mertua':
        return (
          <FormOrangTua
            form={formTambahOrangtua}
            isTambah
            setIsShow={setIsShow}
          />
        )
      case 'Saudara Kandung':
        return (
          <FormSaudara
            form={formTambahSaudara}
            isTambah
            setIsShow={setIsShow}
          />
        )

      default:
        return <ComingSoonPage />
    }
  }

  return (
    <div className="flex w-full flex-col gap-24">
      <TabDetailPegawai listMenu={listMenu} setMenu={setMenu} menu={menu} />
      <div className="flex items-center justify-between gap-32">
        <p className="font-roboto text-[2.6rem] text-primary-100">{menu}</p>
        <button
          onClick={() => setIsShow(true)}
          className="rounded-2xl border border-primary-100 px-24 py-12 text-primary-100"
        >
          Tambah Data
        </button>
      </div>
      {tampilkanKonten()}

      <DialogUpdate
        isOpen={isShow}
        setIsOpen={setIsShow}
        children={
          <div className="flex flex-col gap-32 text-[2rem] phones:text-[2.4rem]">
            {formKonten()}
          </div>
        }
        title={`Tambah Data ${menu}`}
      />
    </div>
  )
}

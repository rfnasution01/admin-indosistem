import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import {
  SimpegTambahAnakSchema,
  SimpegTambahIstriSchema,
  SimpegTambahOrangTuaSchema,
  SimpegTambahRekeningBankSchema,
  SimpegTambahSaudaraSchema,
} from '@/schemas/simpeg/informasiPribadiSchema'
import {
  SimpegTambahRiwayatJabatanFungsionalSchema,
  SimpegTambahRiwayatJabatanSchema,
  SimpegTambahRiwayatKepangkatanCPNSSchema,
} from '@/schemas/simpeg/riwayatKarirSchema'
import {
  SimpegTambahRiwayatKeahlianSchema,
  SimpegTambahRiwayatPelatihanSchema,
  SimpegTambahRiwayatPendidikanSchema,
  SimpegTambahRiwayatSertifikasiSchema,
} from '@/schemas/simpeg/riwayatPendidikanSchema'
import {
  SimpegTambahGajiSchema,
  SimpegTambahRiwayatPenyesuaianIjazahSchema,
  SimpegTambahRiwayatPMKSchema,
} from '@/schemas/simpeg/gajiSchema'

export function useSimpegDetailPegawai() {
  const formTambahIstri = useForm<zod.infer<typeof SimpegTambahIstriSchema>>({
    resolver: zodResolver(SimpegTambahIstriSchema),
    defaultValues: {},
  })
  const formTambahAnak = useForm<zod.infer<typeof SimpegTambahAnakSchema>>({
    resolver: zodResolver(SimpegTambahAnakSchema),
    defaultValues: {},
  })
  const formTambahOrangtua = useForm<
    zod.infer<typeof SimpegTambahOrangTuaSchema>
  >({
    resolver: zodResolver(SimpegTambahOrangTuaSchema),
    defaultValues: {},
  })
  const formTambahSaudara = useForm<
    zod.infer<typeof SimpegTambahSaudaraSchema>
  >({
    resolver: zodResolver(SimpegTambahSaudaraSchema),
    defaultValues: {},
  })

  const formTambahRekening = useForm<
    zod.infer<typeof SimpegTambahRekeningBankSchema>
  >({
    resolver: zodResolver(SimpegTambahRekeningBankSchema),
    defaultValues: {},
  })

  const formTambahRiwayatKepangkatanCPNS = useForm<
    zod.infer<typeof SimpegTambahRiwayatKepangkatanCPNSSchema>
  >({
    resolver: zodResolver(SimpegTambahRiwayatKepangkatanCPNSSchema),
    defaultValues: {},
  })

  const formTambahRiwayatKepangkatan = useForm<
    zod.infer<typeof SimpegTambahRiwayatKepangkatanCPNSSchema>
  >({
    resolver: zodResolver(SimpegTambahRiwayatKepangkatanCPNSSchema),
    defaultValues: {},
  })

  const formTambahRiwayatJabatanFungsional = useForm<
    zod.infer<typeof SimpegTambahRiwayatJabatanFungsionalSchema>
  >({
    resolver: zodResolver(SimpegTambahRiwayatJabatanFungsionalSchema),
    defaultValues: {},
  })

  const formTambahRiwayatJabatan = useForm<
    zod.infer<typeof SimpegTambahRiwayatJabatanSchema>
  >({
    resolver: zodResolver(SimpegTambahRiwayatJabatanSchema),
    defaultValues: {},
  })

  const formTambahRiwayatPendidikan = useForm<
    zod.infer<typeof SimpegTambahRiwayatPendidikanSchema>
  >({
    resolver: zodResolver(SimpegTambahRiwayatPendidikanSchema),
    defaultValues: {},
  })

  const formTambahRiwayatPelatihan = useForm<
    zod.infer<typeof SimpegTambahRiwayatPelatihanSchema>
  >({
    resolver: zodResolver(SimpegTambahRiwayatPelatihanSchema),
    defaultValues: {},
  })

  const formTambahRiwayatSertifikasi = useForm<
    zod.infer<typeof SimpegTambahRiwayatSertifikasiSchema>
  >({
    resolver: zodResolver(SimpegTambahRiwayatSertifikasiSchema),
    defaultValues: {},
  })

  const formTambahRiwayatKeahlian = useForm<
    zod.infer<typeof SimpegTambahRiwayatKeahlianSchema>
  >({
    resolver: zodResolver(SimpegTambahRiwayatKeahlianSchema),
    defaultValues: {},
  })

  const formTambahRiwayatGaji = useForm<
    zod.infer<typeof SimpegTambahGajiSchema>
  >({
    resolver: zodResolver(SimpegTambahGajiSchema),
    defaultValues: {},
  })

  const formTambahRiwayatPMK = useForm<
    zod.infer<typeof SimpegTambahRiwayatPMKSchema>
  >({
    resolver: zodResolver(SimpegTambahRiwayatPMKSchema),
    defaultValues: {},
  })

  const formTambahRiwayatPenyesuaianIjazah = useForm<
    zod.infer<typeof SimpegTambahRiwayatPenyesuaianIjazahSchema>
  >({
    resolver: zodResolver(SimpegTambahRiwayatPenyesuaianIjazahSchema),
    defaultValues: {},
  })

  return {
    formTambahIstri,
    formTambahAnak,
    formTambahOrangtua,
    formTambahSaudara,
    formTambahRekening,
    formTambahRiwayatJabatan,
    formTambahRiwayatJabatanFungsional,
    formTambahRiwayatKepangkatan,
    formTambahRiwayatKepangkatanCPNS,
    formTambahRiwayatPendidikan,
    formTambahRiwayatPelatihan,
    formTambahRiwayatSertifikasi,
    formTambahRiwayatKeahlian,
    formTambahRiwayatGaji,
    formTambahRiwayatPMK,
    formTambahRiwayatPenyesuaianIjazah,
  }
}

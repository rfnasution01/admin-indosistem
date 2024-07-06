import { LabelComponent } from '@/components/LabelComponent'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import DefaultImg from '@/assets/images/default.jpg'

export function PreviewIdentitas({
  kode,
  nama,
  sk_pendirian,
  tgl_sk_pendirian,
  sk_operasional,
  tgl_sk_operasional,
  tgl_akhir_akreditasi,
  tgl_mulai_akreditasi,
  akreditasi,
  alamat,
  nama_pimpinan,
  nip_pimpinan,
  nis,
  nss,
  email,
  telepon,
  penyelenggaraan,
  penyelenggaraan_akhir,
  penyelenggaraan_mulai,
  photo_pimpinan,
}: {
  kode?: string
  nama?: string
  sk_pendirian?: string
  tgl_sk_pendirian?: string
  sk_operasional?: string
  tgl_sk_operasional?: string
  akreditasi?: string
  tgl_mulai_akreditasi?: string
  tgl_akhir_akreditasi?: string
  penyelenggaraan?: string
  penyelenggaraan_mulai?: string
  penyelenggaraan_akhir?: string
  nis?: string
  nss?: string
  alamat?: string
  email?: string
  telepon?: string
  nama_pimpinan?: string
  nip_pimpinan?: string
  photo_pimpinan?: string
}) {
  return (
    <div className="scrollbar flex h-full gap-48 overflow-y-auto phones:flex-col phones:gap-32">
      <img
        src={photo_pimpinan ?? DefaultImg}
        alt={nama_pimpinan}
        className="h-auto w-[50rem] rounded-2xl filter"
        loading="lazy"
      />
      <div className="flex flex-1 flex-col gap-16">
        {nama && (
          <LabelComponent
            label="Nama"
            value={nama}
            widthLabel="w-1/4 phones:w-full"
            widthValue="w-3/4 phones:w-full"
          />
        )}
        {kode && (
          <LabelComponent
            label="Kode"
            value={kode}
            widthLabel="w-1/4 phones:w-full"
            widthValue="w-3/4 phones:w-full"
          />
        )}
        {sk_pendirian && (
          <LabelComponent
            label="SK Pendirian"
            value={sk_pendirian}
            widthLabel="w-1/4 phones:w-full"
            widthValue="w-3/4 phones:w-full"
          />
        )}
        {tgl_sk_pendirian && (
          <LabelComponent
            label="Tanggal SK Pendirian"
            value={dayjs(tgl_sk_pendirian).locale('id').format('DD MMMM YYYY')}
            widthLabel="w-1/4 phones:w-full"
            widthValue="w-3/4 phones:w-full"
          />
        )}
        {sk_operasional && (
          <LabelComponent
            label="SK Operasional"
            value={sk_operasional}
            widthLabel="w-1/4 phones:w-full"
            widthValue="w-3/4 phones:w-full"
          />
        )}
        {tgl_sk_operasional && (
          <LabelComponent
            label="Tanggal SK Operasional"
            value={dayjs(tgl_sk_operasional)
              .locale('id')
              .format('DD MMMM YYYY')}
            widthLabel="w-1/4 phones:w-full"
            widthValue="w-3/4 phones:w-full"
          />
        )}
        {akreditasi && (
          <LabelComponent
            label="Akreditasi"
            value={akreditasi}
            widthLabel="w-1/4 phones:w-full"
            widthValue="w-3/4 phones:w-full"
          />
        )}
        {tgl_mulai_akreditasi && (
          <LabelComponent
            label="Tanggal Mulai Akreditasi"
            value={dayjs(tgl_mulai_akreditasi)
              .locale('id')
              .format('DD MMMM YYYY')}
            widthLabel="w-1/4 phones:w-full"
            widthValue="w-3/4 phones:w-full"
          />
        )}

        {tgl_akhir_akreditasi && (
          <LabelComponent
            label="Tanggal Akhir Akreditasi"
            value={dayjs(tgl_akhir_akreditasi)
              ?.locale('id')
              .format('DD MMMM YYYY')}
            widthLabel="w-1/4 phones:w-full"
            widthValue="w-3/4 phones:w-full"
          />
        )}

        {penyelenggaraan && (
          <LabelComponent
            label="Penyelenggaraan"
            value={penyelenggaraan}
            widthLabel="w-1/4 phones:w-full"
            widthValue="w-3/4 phones:w-full"
          />
        )}

        {penyelenggaraan_mulai && (
          <LabelComponent
            label="Penyelenggaraan Mulai"
            value={penyelenggaraan_mulai?.substring(0, 5)}
            widthLabel="w-1/4 phones:w-full"
            widthValue="w-3/4 phones:w-full"
          />
        )}

        {penyelenggaraan_akhir && (
          <LabelComponent
            label="Penyelenggaraan Akhir"
            value={penyelenggaraan_akhir?.substring(0, 5)}
            widthLabel="w-1/4 phones:w-full"
            widthValue="w-3/4 phones:w-full"
          />
        )}

        {nis && (
          <LabelComponent
            label="NIS"
            value={nis}
            widthLabel="w-1/4 phones:w-full"
            widthValue="w-3/4 phones:w-full"
          />
        )}

        {nss && (
          <LabelComponent
            label="NSS"
            value={nss}
            widthLabel="w-1/4 phones:w-full"
            widthValue="w-3/4 phones:w-full"
          />
        )}

        {alamat && (
          <LabelComponent
            label="Alamat"
            value={alamat}
            widthLabel="w-1/4 phones:w-full"
            widthValue="w-3/4 phones:w-full"
          />
        )}

        {email && (
          <LabelComponent
            label="Email"
            value={email}
            widthLabel="w-1/4 phones:w-full"
            widthValue="w-3/4 phones:w-full"
          />
        )}

        {telepon && (
          <LabelComponent
            label="Telepon"
            value={telepon}
            widthLabel="w-1/4 phones:w-full"
            widthValue="w-3/4 phones:w-full"
          />
        )}

        {nama_pimpinan && (
          <LabelComponent
            label="Nama Pimpinan"
            value={nama_pimpinan}
            widthLabel="w-1/4 phones:w-full"
            widthValue="w-3/4 phones:w-full"
          />
        )}

        {nip_pimpinan && (
          <LabelComponent
            label="NIP Pimpinan"
            value={nip_pimpinan}
            widthLabel="w-1/4 phones:w-full"
            widthValue="w-3/4 phones:w-full"
          />
        )}
      </div>
    </div>
  )
}

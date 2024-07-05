import { LabelComponent } from '@/components/LabelComponent'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import { IdentitasSekolahType } from '@/types/website/profil/tentangSekolahType'

export function PreviewIdentitas({ data }: { data: IdentitasSekolahType }) {
  return (
    <div className="scrollbar flex h-full gap-48 overflow-y-auto phones:flex-col phones:gap-32">
      <img
        src={data?.photo_pimpinan ?? '/logo.png'}
        alt={data?.nama_pimpinan}
        className="h-[67rem] w-[50rem] rounded-2xl filter"
        loading="lazy"
      />
      <div className="flex flex-1 flex-col gap-16">
        {data?.nama && (
          <LabelComponent
            label="Nama"
            value={data?.nama}
            widthLabel="w-1/4 phones:w-full"
            widthValue="w-3/4 phones:w-full"
          />
        )}
        {data?.kode && (
          <LabelComponent
            label="Kode"
            value={data?.kode}
            widthLabel="w-1/4 phones:w-full"
            widthValue="w-3/4 phones:w-full"
          />
        )}
        {data?.sk_pendirian && (
          <LabelComponent
            label="SK Pendirian"
            value={data?.sk_pendirian}
            widthLabel="w-1/4 phones:w-full"
            widthValue="w-3/4 phones:w-full"
          />
        )}
        {data?.tgl_sk_pendirian && (
          <LabelComponent
            label="Tanggal SK Pendirian"
            value={dayjs(data?.tgl_sk_pendirian)
              .locale('id')
              .format('DD MMMM YYYY')}
            widthLabel="w-1/4 phones:w-full"
            widthValue="w-3/4 phones:w-full"
          />
        )}
        {data?.sk_operasional && (
          <LabelComponent
            label="SK Operasional"
            value={data?.sk_operasional}
            widthLabel="w-1/4 phones:w-full"
            widthValue="w-3/4 phones:w-full"
          />
        )}
        {data?.tgl_sk_operasional && (
          <LabelComponent
            label="Tanggal SK Operasional"
            value={dayjs(data?.tgl_sk_operasional)
              .locale('id')
              .format('DD MMMM YYYY')}
            widthLabel="w-1/4 phones:w-full"
            widthValue="w-3/4 phones:w-full"
          />
        )}
        {data?.akreditasi && (
          <LabelComponent
            label="Akreditasi"
            value={data?.akreditasi}
            widthLabel="w-1/4 phones:w-full"
            widthValue="w-3/4 phones:w-full"
          />
        )}
        {data?.tgl_mulai_akreditasi && (
          <LabelComponent
            label="Tanggal Mulai Akreditasi"
            value={dayjs(data?.tgl_mulai_akreditasi)
              .locale('id')
              .format('DD MMMM YYYY')}
            widthLabel="w-1/4 phones:w-full"
            widthValue="w-3/4 phones:w-full"
          />
        )}

        {data?.tgl_akhir_akreditasi && (
          <LabelComponent
            label="Tanggal Akhir Akreditasi"
            value={dayjs(data?.tgl_akhir_akreditasi)
              ?.locale('id')
              .format('DD MMMM YYYY')}
            widthLabel="w-1/4 phones:w-full"
            widthValue="w-3/4 phones:w-full"
          />
        )}

        {data?.penyelenggaraan && (
          <LabelComponent
            label="Penyelenggaraan"
            value={data?.penyelenggaraan}
            widthLabel="w-1/4 phones:w-full"
            widthValue="w-3/4 phones:w-full"
          />
        )}

        {data?.penyelenggaraan_mulai && (
          <LabelComponent
            label="Penyelenggaraan Mulai"
            value={data?.penyelenggaraan_mulai?.substring(0, 5)}
            widthLabel="w-1/4 phones:w-full"
            widthValue="w-3/4 phones:w-full"
          />
        )}

        {data?.penyelenggaraan_akhir && (
          <LabelComponent
            label="Penyelenggaraan Akhir"
            value={data?.penyelenggaraan_akhir?.substring(0, 5)}
            widthLabel="w-1/4 phones:w-full"
            widthValue="w-3/4 phones:w-full"
          />
        )}

        {data?.nis && (
          <LabelComponent
            label="NIS"
            value={data?.nis}
            widthLabel="w-1/4 phones:w-full"
            widthValue="w-3/4 phones:w-full"
          />
        )}

        {data?.nss && (
          <LabelComponent
            label="NSS"
            value={data?.nss}
            widthLabel="w-1/4 phones:w-full"
            widthValue="w-3/4 phones:w-full"
          />
        )}

        {data?.alamat && (
          <LabelComponent
            label="Alamat"
            value={data?.alamat}
            widthLabel="w-1/4 phones:w-full"
            widthValue="w-3/4 phones:w-full"
          />
        )}

        {data?.email && (
          <LabelComponent
            label="Email"
            value={data?.email}
            widthLabel="w-1/4 phones:w-full"
            widthValue="w-3/4 phones:w-full"
          />
        )}

        {data?.telepon && (
          <LabelComponent
            label="Telepon"
            value={data?.telepon}
            widthLabel="w-1/4 phones:w-full"
            widthValue="w-3/4 phones:w-full"
          />
        )}

        {data?.nama_pimpinan && (
          <LabelComponent
            label="Nama Pimpinan"
            value={data?.nama_pimpinan}
            widthLabel="w-1/4 phones:w-full"
            widthValue="w-3/4 phones:w-full"
          />
        )}

        {data?.nip_pimpinan && (
          <LabelComponent
            label="NIP Pimpinan"
            value={data?.nip_pimpinan}
            widthLabel="w-1/4 phones:w-full"
            widthValue="w-3/4 phones:w-full"
          />
        )}
      </div>
    </div>
  )
}

import { LabelList } from '@/components/LabelComponent/LabelList'

export function KontakData({
  alamat,
  telegram,
  kota,
  wa,
  fb,
  tw,
  ig,
  yt,
  telepon,
  weekday_cs,
  weekend_cs,
  tiktok,
  email,
  latitude,
  longitude,
}: {
  alamat: string
  telepon: string
  kota: string
  wa: string
  fb: string
  tw: string
  ig: string
  yt: string
  telegram: string
  weekday_cs: string
  weekend_cs: string
  tiktok: string
  email: string
  latitude: string
  longitude: string
}) {
  return (
    <div className="flex flex-col gap-80 rounded-2x border border-warna-pale-grey p-32">
      <div className="flex flex-col gap-32">
        <p className="font-roboto text-[2.4rem] text-warna-dark">🏫 Alamat</p>
        <div className="flex flex-col gap-12">
          <LabelList label="Alamat" value={alamat ?? '-'} />
          <LabelList label="Kota" value={kota ?? '-'} />
          <LabelList label="Latitude" value={latitude ?? '-'} />
          <LabelList label="Longitude" value={longitude ?? '-'} />
        </div>
      </div>
      <div className="flex flex-col gap-32">
        <p className="font-roboto text-[2.4rem] text-warna-dark">
          🌐 Social Media
        </p>
        <div className="flex flex-col gap-12">
          <LabelList label="Whatsapp" value={wa ?? '-'} />
          <LabelList label="Facebook" value={fb ?? '-'} />
          <LabelList label="Twitter" value={tw ?? '-'} />
          <LabelList label="Instagram" value={ig ?? '-'} />
          <LabelList label="Youtube" value={yt ?? '-'} />
          <LabelList label="Telegram" value={telegram ?? '-'} />
          <LabelList label="Tiktok" value={tiktok ?? '-'} />
        </div>
      </div>
      <div className="flex flex-col gap-32">
        <p className="font-roboto text-[2.4rem] text-warna-dark">📞 Kontak</p>
        <div className="flex flex-col gap-12">
          <LabelList label="Telepon" value={telepon ?? '-'} />
          <LabelList label="Email" value={email ?? '-'} />
          <LabelList label="Weekday" value={weekday_cs ?? '-'} />
          <LabelList label="Weekend" value={weekend_cs ?? '-'} />
        </div>
      </div>
    </div>
  )
}

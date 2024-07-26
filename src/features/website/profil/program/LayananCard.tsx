import { Loading } from '@/components/Loading'
import { GetWebsiteLayananType } from '@/types/website/profil/programLayananType'
import { faDisplay, faSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

export function LayananCard({
  loadingLayanan,
  layanan,
}: {
  loadingLayanan: boolean
  layanan: GetWebsiteLayananType[]
}) {
  return (
    <Link
      to="edit"
      onClick={() => {
        localStorage.setItem('jenisID', 'layanan')
      }}
      className="grid-cols-1 rounded-2x border border-warna-grey p-32 shadow hover:cursor-pointer hover:shadow-lg phones:col-span-3"
    >
      {loadingLayanan ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-start gap-32 text-warna-primary">
          <FontAwesomeIcon icon={faDisplay} size="4x" />
          <p className="font-roboto text-[3.2rem]">Layanan</p>
          {layanan?.length > 0 ? (
            <div className="flex flex-col gap-12 text-[2.2rem] text-warna-grey">
              {layanan?.map((item, idx) => (
                <div key={idx} className="flex items-center gap-12">
                  <span className="rotated-icon">
                    <FontAwesomeIcon icon={faSquare} size="xs" />
                  </span>
                  <p style={{ lineHeight: '130%' }}>{item?.nama_layanan}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-warna-grey">Belum ada data.</p>
          )}
        </div>
      )}
    </Link>
  )
}

import { faFileExcel, faPlus, faPrint } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function ManajemenData({ manajemenData }: { manajemenData: string[] }) {
  return (
    <div className="flex flex-col gap-12">
      <p className="font-roboto text-[2.6rem] text-primary-100">
        Manajemen Data
      </p>
      <div className="scrollbar flex w-full items-center gap-32 overflow-y-auto">
        {manajemenData?.map((item, idx) => (
          <div
            className="flex items-center justify-center gap-12 text-nowrap rounded-2xl border border-primary-100 px-24 py-12 text-primary-100 hover:cursor-pointer hover:bg-primary-100 hover:text-white"
            key={idx}
          >
            <FontAwesomeIcon
              icon={
                item?.includes('Cetak')
                  ? faPrint
                  : item?.includes('Excel')
                    ? faFileExcel
                    : faPlus
              }
            />
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

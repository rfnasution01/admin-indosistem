import { FormChat, FormClose } from '@/components/Form/website/kontak'
import { ChatType, KontakMasukDetail } from '@/types/website/profil/kontakType'
import TimeSinceUploaded from '@/utils/format-time'
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { ChatLampiran } from './ChatLampiran'

export function DetailPesanChat({
  chat,
  nama,
  tiket,
  formChat,
  formClose,
  handleSubmitChat,
  handleSubmitClose,
  handleUploadFoto,
  setUrls,
  setDir,
  dir,
  loadingFile,
  isLoadingChat,
  isLoadingClose,
  isShow,
  setIsShow,
  isUbah,
}: {
  chat: ChatType[]
  tiket: KontakMasukDetail
  nama: string
  formChat: UseFormReturn
  formClose: UseFormReturn
  handleSubmitChat: () => Promise<void>
  handleUploadFoto: (file: File) => Promise<void>
  handleSubmitClose: () => Promise<void>
  setUrls: Dispatch<SetStateAction<string[]>>
  setDir: Dispatch<SetStateAction<string[]>>
  dir: string[]
  loadingFile: boolean
  isLoadingChat: boolean
  isLoadingClose: boolean
  isShow: boolean
  setIsShow: Dispatch<SetStateAction<boolean>>
  isUbah: boolean
}) {
  return (
    <div className="scrollbar h-full w-2/3 overflow-y-auto py-32 pl-32 phones:h-auto phones:w-full phones:overflow-visible">
      <div className="flex h-full flex-col gap-32 phones:h-auto">
        <div className="scrollbar flex flex-1 flex-col gap-32 overflow-y-auto">
          {chat?.map((item, idx) => (
            <div className={`flex w-full flex-col gap-24`} key={idx}>
              <div
                className={`flex w-full gap-32 ${item?.jenis !== 'UMUM' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex w-3/5 gap-32 phones:w-4/5 ${item?.jenis !== 'UMUM' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div
                    className={clsx(
                      'flex flex-1 flex-col gap-8 rounded-2xl border p-24',
                      {
                        'border-[#73C2FF] bg-[#f5faff]': item?.jenis === 'UMUM',
                        'border-green-300 bg-green-100':
                          item?.jenis === 'ADMIN',
                      },
                    )}
                  >
                    <p className="text-rose-700">
                      {item?.jenis !== 'UMUM' ? item?.user : nama}
                    </p>
                    <p className="font-sf-pro">{item?.isi}</p>
                    {item.lampiran?.length > 0 && (
                      <div className="grid grid-cols-4 gap-32">
                        {item?.lampiran?.map((list, index) => (
                          <Link
                            to={list?.dokumen}
                            className="col-span-1 transform transition-transform duration-300 ease-in-out hover:scale-105 phones:col-span-2"
                            target="_blank"
                            key={index}
                          >
                            <img
                              src={list?.dokumen}
                              alt="Dokumen"
                              className="w-full rounded-2xl object-cover filter"
                              loading="lazy"
                            />
                          </Link>
                        ))}
                      </div>
                    )}
                    <div className="items-canter flex justify-end gap-16 text-[2rem] italic">
                      <TimeSinceUploaded uploadTime={item?.create_at} />
                      {item?.baca === 0 && item?.jenis === 'UMUM' ? (
                        <span className="text-slate-500">
                          <FontAwesomeIcon icon={faCheckDouble} />
                        </span>
                      ) : item?.baca === 1 && item?.jenis === 'UMUM' ? (
                        <span className="text-primary">
                          <FontAwesomeIcon icon={faCheckDouble} />
                        </span>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-32">
          <FormChat
            handleUploadFoto={handleUploadFoto}
            form={formChat}
            dir={dir}
            setUrls={setUrls}
            data={tiket}
            loadingFile={loadingFile}
            handleSubmitChat={handleSubmitChat}
            isLoadingUpload={isLoadingChat}
            isUbah={isUbah}
            closeButton={
              <FormClose
                handleSubmitClose={handleSubmitClose}
                loadingClose={isLoadingClose}
                form={formClose}
                data={tiket}
                setIsShow={setIsShow}
                isShow={isShow}
                isUbah={isUbah}
              />
            }
          />

          {dir?.length > 0 && <ChatLampiran dir={dir} setDir={setDir} />}
        </div>
      </div>
    </div>
  )
}

import { Dispatch, SetStateAction } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Form } from '../..'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faSave, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { ValidasiKonfirmasi } from '@/components/Dialog/ValidasiKonfirmasi'
import { FormLabelInput } from '@/components/InputComponent'
import { KontakData } from '@/features/website/kontak/KontakData'

export default function FormTambahKontak({
  form,
  isLoading,
  handleSubmit,
  setIsShow,
  setIsSubmit,
  isSubmit,
  isShow,
  isUbah,
}: {
  form: UseFormReturn
  isLoading: boolean
  handleSubmit: () => Promise<void>
  setIsSubmit: Dispatch<SetStateAction<boolean>>
  setIsShow: Dispatch<SetStateAction<boolean>>
  isShow: boolean
  isSubmit: boolean
  isUbah: boolean
}) {
  return (
    <div className="w-full">
      <Form {...form}>
        <form
          className="flex w-full flex-col gap-48"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="flex flex-col gap-32">
            <p className="font-roboto text-[2.2rem] text-warna-dark">
              🏫 Alamat
            </p>
            <div className="flex gap-64 phones:flex-col phones:gap-32">
              <FormLabelInput
                name={`alamat`}
                form={form}
                label="Alamat"
                placeholder="Masukkan alamat"
                className="w-1/2 hover:cursor-not-allowed phones:w-full "
                type="text"
                isDisabled={isLoading || !isUbah}
              />

              <FormLabelInput
                name={`kota`}
                form={form}
                label="Kota"
                placeholder="Masukkan kota"
                className="w-1/2 hover:cursor-not-allowed phones:w-full "
                type="text"
                isDisabled={isLoading || !isUbah}
              />
            </div>
            <div className="flex gap-64 phones:flex-col phones:gap-32">
              <FormLabelInput
                name={`latitude`}
                form={form}
                label="Latitude"
                placeholder="Masukkan latitude"
                className="w-1/2 hover:cursor-not-allowed phones:w-full "
                type="text"
                isDisabled={isLoading || !isUbah}
              />

              <FormLabelInput
                name={`longitude`}
                form={form}
                label="Longitude"
                placeholder="Masukkan longitude"
                className="w-1/2 hover:cursor-not-allowed phones:w-full "
                type="text"
                isDisabled={isLoading || !isUbah}
              />
            </div>
          </div>

          <div className="flex flex-col gap-32">
            <p className="font-roboto text-[2.2rem] text-warna-dark">
              🌐 Social Media
            </p>
            <div className="flex gap-64 phones:flex-col phones:gap-32">
              <FormLabelInput
                name={`wa`}
                form={form}
                label="Whatsapp"
                placeholder="Masukkan whatsapp"
                className="w-1/2 hover:cursor-not-allowed phones:w-full "
                type="text"
                isDisabled={isLoading || !isUbah}
              />

              <FormLabelInput
                name={`fb`}
                form={form}
                label="Facebook"
                placeholder="Masukkan facebook"
                className="w-1/2 hover:cursor-not-allowed phones:w-full "
                type="text"
                isDisabled={isLoading || !isUbah}
              />
            </div>
            <div className="flex gap-64 phones:flex-col phones:gap-32">
              <FormLabelInput
                name={`tw`}
                form={form}
                label="Twitter"
                placeholder="Masukkan twitter"
                className="w-1/2 hover:cursor-not-allowed phones:w-full "
                type="text"
                isDisabled={isLoading || !isUbah}
              />

              <FormLabelInput
                name={`ig`}
                form={form}
                label="Instagram"
                placeholder="Masukkan instagram"
                className="w-1/2 hover:cursor-not-allowed phones:w-full "
                type="text"
                isDisabled={isLoading || !isUbah}
              />
            </div>
            <div className="flex gap-64 phones:flex-col phones:gap-32">
              <FormLabelInput
                name={`yt`}
                form={form}
                label="Youtube"
                placeholder="Masukkan youtube"
                className="w-1/2 hover:cursor-not-allowed phones:w-full "
                type="text"
                isDisabled={isLoading || !isUbah}
              />

              <FormLabelInput
                name={`telegram`}
                form={form}
                label="Telegram"
                placeholder="Masukkan telegram"
                className="w-1/2 hover:cursor-not-allowed phones:w-full "
                type="text"
                isDisabled={isLoading || !isUbah}
              />
            </div>
            <div className="flex gap-64 phones:flex-col phones:gap-32">
              <FormLabelInput
                name={`tiktok`}
                form={form}
                label="Tiktok"
                placeholder="Masukkan tiktok"
                className="w-1/2 hover:cursor-not-allowed phones:w-full "
                type="text"
                isDisabled={isLoading || !isUbah}
              />

              <div className="w-1/2 phones:hidden" />
            </div>
          </div>

          <div className="flex flex-col gap-32">
            <p className="font-roboto text-[2.2rem] text-warna-dark">
              📞 Kontak
            </p>
            <div className="flex gap-64 phones:flex-col phones:gap-32">
              <FormLabelInput
                name={`telepon`}
                form={form}
                label="Telepon"
                placeholder="Masukkan telepon"
                className="w-1/2 hover:cursor-not-allowed phones:w-full "
                type="text"
                isDisabled={isLoading || !isUbah}
                isNumber
              />

              <FormLabelInput
                name={`email`}
                form={form}
                label="Email"
                placeholder="Masukkan email"
                className="w-1/2 hover:cursor-not-allowed phones:w-full "
                type="email"
                isDisabled={isLoading || !isUbah}
              />
            </div>
            <div className="flex gap-64 phones:flex-col phones:gap-32">
              <div className="flex w-1/2 flex-col gap-12 phones:w-full">
                <p className="font-roboto text-[2rem] text-warna-dark">
                  Weekday
                </p>
                <div className="flex items-center gap-12">
                  <FormLabelInput
                    name={`weekday_cs_mulai`}
                    form={form}
                    className="w-1/2 hover:cursor-not-allowed phones:w-full "
                    type="time"
                    isDisabled={isLoading || !isUbah}
                  />
                  <p>s/d</p>

                  <FormLabelInput
                    name={`weekday_cs_selesai`}
                    form={form}
                    className="w-1/2 hover:cursor-not-allowed phones:w-full "
                    type="time"
                    isNumber
                    isDisabled={isLoading || !isUbah}
                  />
                </div>
              </div>

              <div className="flex w-1/2 flex-col gap-12 phones:w-full">
                <p className="font-roboto text-[2rem] text-warna-dark">
                  Weekend
                </p>
                <div className="flex items-center gap-12">
                  <FormLabelInput
                    name={`weekend_cs_mulai`}
                    form={form}
                    className="w-1/2 hover:cursor-not-allowed phones:w-full "
                    type="time"
                    isDisabled={isLoading || !isUbah}
                  />
                  <p>s/d</p>
                  <FormLabelInput
                    name={`weekend_cs_selesai`}
                    form={form}
                    className="w-1/2 hover:cursor-not-allowed phones:w-full "
                    type="time"
                    isNumber
                    isDisabled={isLoading || !isUbah}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading || !isUbah}
              onClick={async () => {
                const isValid = await form.trigger()

                if (isValid) {
                  setIsShow(true)
                }
              }}
              className="flex items-center justify-center gap-12 rounded-2xl bg-warna-primary px-32 py-12 text-white disabled:cursor-not-allowed"
            >
              <p>Simpan</p>
              {isLoading ? (
                <span className="animate-spin duration-300">
                  <FontAwesomeIcon icon={faSpinner} />
                </span>
              ) : (
                <FontAwesomeIcon icon={faSave} />
              )}
            </button>
          </div>
        </form>
      </Form>
      <ValidasiKonfirmasi
        isOpen={isShow}
        setIsOpen={setIsShow}
        children={
          <div className="flex w-full flex-col gap-32 rounded-2x bg-warna-pale-blue p-32 text-[2rem] text-warna-dark phones:text-[2.4rem]">
            <div className="scrollbar flex h-full flex-col gap-48 overflow-y-auto phones:flex-col phones:items-start phones:gap-32">
              <KontakData
                alamat={form.watch('alamat')}
                telepon={form.watch('telepon')}
                kota={form.watch('kota')}
                wa={form.watch('wa')}
                fb={form.watch('fb')}
                tw={form.watch('tw')}
                ig={form.watch('ig')}
                yt={form.watch('yt')}
                telegram={form.watch('telegram')}
                weekday_cs={
                  form.watch('weekday_cs_mulai') &&
                  form.watch('weekday_cs_selesai')
                    ? `${form.watch('weekday_cs_mulai')} s/d ${form.watch('weekday_cs_selesai')} WIB`
                    : '-'
                }
                weekend_cs={
                  form.watch('weekend_cs_mulai') &&
                  form.watch('weekend_cs_selesai')
                    ? `${form.watch('weekend_cs_mulai')} s/d ${form.watch('weekend_cs_selesai')} WIB`
                    : '-'
                }
                tiktok={form.watch('tiktok')}
                email={form.watch('email')}
                latitude={form.watch('latitude')}
                longitude={form.watch('longitude')}
              />
            </div>
          </div>
        }
        childrenButton={
          <button
            type="submit"
            onClick={() => {
              setIsSubmit(true)
              handleSubmit()
            }}
            disabled={isLoading}
            className="flex items-center gap-12 rounded-2xl bg-warna-dark px-24 py-12 text-white hover:bg-opacity-80 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="animate-spin duration-300">
                <FontAwesomeIcon icon={faSpinner} />
              </div>
            ) : isSubmit ? (
              <FontAwesomeIcon icon={faSave} />
            ) : (
              <FontAwesomeIcon icon={faCheck} />
            )}
            {isSubmit ? 'Simpan' : 'Sudah Benar'}
          </button>
        }
      />
    </div>
  )
}

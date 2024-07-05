import { UseFormReturn } from 'react-hook-form'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { LoginParamsType } from '@/types/loginType'
import { Form } from '..'
import { FormLabelInput } from '@/components/InputComponent'
import { IconLogin } from '@/assets/icons'

export function FormLogin({
  form,
  isLoading,
  handleSubmit,
  angka1,
  angka2,
}: {
  form: UseFormReturn
  isLoading: boolean
  handleSubmit: (values: LoginParamsType) => Promise<void>
  angka1: number
  angka2: number
}) {
  const [isShow, setIsShow] = useState<boolean>(false)

  return (
    <div className="h-auto w-[70%] rounded-2x border border-warna-pale-grey p-32 phones:h-4/5 phones:w-4/5">
      <Form {...form}>
        <form
          className="flex flex-col gap-32"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormLabelInput
            name="username"
            form={form}
            label="Username / NIP"
            placeholder="Masukkan username atau nip"
            className="text-sim-dark"
            type="text"
            isDisabled={isLoading}
          />

          <FormLabelInput
            name="password"
            form={form}
            label="Password"
            placeholder="Masukkan password"
            className="text-sim-dark"
            isDisabled={isLoading}
            suffix={
              <span
                onClick={() => {
                  setIsShow(!isShow)
                }}
              >
                {isShow ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </span>
            }
            type={isShow ? 'text' : 'password'}
          />

          <FormLabelInput
            name="hasil"
            form={form}
            label={`Hasil dari ${angka1} + ${angka2} = ?`}
            placeholder="Masukkan hasil penjumlahan"
            className="text-sim-dark"
            type="text"
            isNumber
            isDisabled={isLoading}
          />
          <Link
            to={'lupa-password'}
            className="text-center text-warna-primary underline"
          >
            Lupa Password?
          </Link>
          <button
            type="submit"
            className="flex items-center justify-center gap-12 rounded-2xl bg-warna-primary py-12 text-white"
          >
            <p>Login</p>
            {isLoading ? (
              <span className="animate-spin duration-300">
                <FontAwesomeIcon icon={faSpinner} />
              </span>
            ) : (
              <IconLogin />
            )}
          </button>
        </form>
      </Form>
    </div>
  )
}

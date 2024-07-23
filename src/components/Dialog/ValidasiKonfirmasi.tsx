import { Dispatch, ReactNode, SetStateAction } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../Dialog'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faX } from '@fortawesome/free-solid-svg-icons'

/* eslint-disable @typescript-eslint/no-explicit-any */
export function ValidasiKonfirmasi({
  isOpen,
  setIsOpen,
  children,
  childrenButton,
  isAuto,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  children: ReactNode
  childrenButton: ReactNode
  isAuto?: boolean
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="text-dark scrollbar flex flex-col overflow-y-auto bg-white text-black"
        position="middle"
        style={{
          width: isAuto ? 'auto' : '80%',
          maxHeight: isAuto ? 'auto' : '80%',
        }}
      >
        <div className="flex flex-col gap-16 p-32">
          {/* --- Header --- */}
          <DialogHeader>
            <DialogTitle>
              <p className="text-center text-[2.4rem] font-bold phones:text-[2.8rem]">
                Konfirmasi
              </p>
            </DialogTitle>
            <DialogPrimitive.Close className="focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-32 top-32 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
              <FontAwesomeIcon icon={faX} />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </DialogHeader>
          <p className="text-sim-grey text-center text-[2.4rem]">
            Apakah data yang anda masukkan sudah benar?
          </p>
          {children}
          <div className="flex items-center justify-center gap-32 text-[2rem]">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-12 rounded-2xl border border-warna-dark px-24 py-12 text-warna-dark hover:bg-warna-dark hover:text-white disabled:cursor-not-allowed"
            >
              <FontAwesomeIcon icon={faPencil} />
              Ubah Data
            </button>
            {childrenButton}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

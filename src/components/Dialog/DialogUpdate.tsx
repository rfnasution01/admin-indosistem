import { Dispatch, ReactNode, SetStateAction } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../Dialog'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

/* eslint-disable @typescript-eslint/no-explicit-any */
export function DialogUpdate({
  isOpen,
  setIsOpen,
  children,
  title,
  isAuto,
}: {
  isOpen: boolean
  isAuto?: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  children: ReactNode
  title: string
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="text-dark scrollbar flex flex-col overflow-y-auto bg-white text-black"
        position="middle"
        style={{
          width: isAuto ? 'auto' : '30%',
          maxHeight: isAuto ? 'auto' : '90%',
        }}
      >
        <div className="flex flex-col gap-16 p-32">
          {/* --- Header --- */}
          <DialogHeader>
            <DialogTitle>
              <p className="text-center font-roboto text-[2.4rem] font-bold text-primary-100 phones:text-[2.8rem]">
                {title}
              </p>
            </DialogTitle>
            <DialogPrimitive.Close className="focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-32 top-32 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
              <FontAwesomeIcon icon={faX} />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </DialogHeader>

          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}

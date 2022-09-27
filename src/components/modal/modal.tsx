import * as React from 'react'
import { Dialog, Transition } from '@headlessui/react'

import Button from '../button'

// ---------------------------------
// Prop types
// ---------------------------------
type ModalProps = {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  actions: {
    cancel?: {
      label: string
      action: () => void
    }
    confirm: {
      label: string
      action: () => void
    }
  }
}

// ---------------------------------
// Main Component
// ---------------------------------
export default function Modal({ open, onClose, title, children, actions }: ModalProps) {
  /*  
    ------------------------------
    TODO: Update the code below to use the title, children 
    and action props instead of having these "hardcoded".
    ------------------------------
  */
  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      {/* Background overlay */}
      <div className="fixed inset-0 bg-opacity-75 transition-opacity bg-indigo-300"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          {/* Modal panel */}
          <Dialog.Panel className="relative overflow-hidden rounded-lg bg-white text-left shadow-xl sm:my-8 w-full sm:max-w-lg">
            <div className="bg-white p-4 sm:p-6">
              <div className="text-center sm:text-left">
                {/* Title */}
                <Dialog.Title className="text-xl font-semibold leading-6 text-slate-900">
                  {title}
                </Dialog.Title>

                {/* Body */}
                {children}
              </div>
            </div>

            {/* Action buttons */}
            <div className="border-t p-4 flex flex-col gap-2 sm:flex-row-reverse">
              <Button onClick={actions.confirm.action}>{actions.confirm.label}</Button>

              {/* Only show the cancel button if the action exists */}
              {actions.cancel && (
                <Button impact="none" onClick={actions.cancel.action}>
                  {actions.cancel.label}
                </Button>
              )}
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  )
}

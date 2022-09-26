import * as React from 'react'
import { Dialog, Transition } from '@headlessui/react'

import Button from '../button'

// ---------------------------------
// Main Component
// ---------------------------------
export default function Modal({ isOpen, onClose }) {
  return (
    <Transition.Root show={isOpen}>
      <Dialog onClose={onClose} className="relative z-10">
        {/* Background overlay */}
        <Transition.Child
          enter="transition ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-opacity-75 transition-opacity bg-indigo-300"></div>
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            {/* Modal panel */}
            <Transition.Child
              enter="transition duration-300"
              enterFrom="opacity-0 translate-y-16"
              enterTo="opacity-100 translate-y-0"
              leave="transition"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative overflow-hidden rounded-lg bg-white text-left shadow-xl sm:my-8 w-full sm:max-w-lg">
                <div className="bg-white p-4 sm:p-6">
                  <div className="text-center sm:text-left">
                    <Dialog.Title className="text-xl font-semibold leading-6 text-slate-900">
                      Confirm subscription
                    </Dialog.Title>
                    <div className="mt-4">
                      <p className="text-slate-500">
                        You're about to confirm your{' '}
                        <a className="underline text-indigo-600 hover:text-indigo-500" href="#">
                          membership subscription
                        </a>
                        . Your account will be billed for a one-year membership. We just want to
                        make sure you understand that.
                      </p>
                    </div>
                  </div>
                </div>
                {/* Action buttons */}
                <div className="border-t p-4 flex flex-col gap-2 sm:flex-row-reverse">
                  <Button onClick={onClose}>Confirm</Button>
                  <Button impact="none" onClick={onClose}>
                    Cancel
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

import * as React from 'react'
import { Dialog, Transition } from '@headlessui/react'

import Button from './button'

export default function Modal() {
  const [isOpen, setIsOpen] = React.useState(true)
  const [isLoading, setIsLoading] = React.useState(false)

  // Custom confirmation logic
  function handleConfirm() {
    setIsLoading(true)
    setTimeout(() => {
      setIsOpen(false)
    }, 3000)
  }

  return (
    <div>
      {/* Modal toggle */}
      <Button impact="light" onClick={() => setIsOpen(true)}>
        Toggle modal
      </Button>

      {/* Modal */}
      <Transition.Root show={isOpen}>
        <Dialog onClose={setIsOpen} className="relative z-10">
          <Transition.Child
            enter="transition ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setIsLoading(false)}
          >
            <div className="fixed inset-0 bg-indigo-300 bg-opacity-75 transition-opacity"></div>
          </Transition.Child>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                enter="transition"
                enterFrom="opacity-0 translate-y-12"
                enterTo="opacity-100 translate-y-0"
                leave="transition"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative overflow-hidden rounded-lg bg-white text-left shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white p-4 sm:p-6">
                    <div className="text-center sm:text-left">
                      <Dialog.Title
                        className="text-xl font-semibold leading-6 text-slate-900"
                        id="modal-title"
                      >
                        Confirm Subscription
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
                  <div className="border-t p-4 flex flex-col gap-2 sm:flex-row-reverse">
                    <Button onClick={handleConfirm} disabled={isLoading}>
                      <span className="flex gap-4 items-center">
                        <span>{isLoading ? 'Confirming' : 'Yes, confirm'}</span>
                        <Transition
                          show={isLoading}
                          enter="transition ease-out"
                          enterFrom="scale-0"
                          enterTo="scale-100"
                        >
                          <Spinner />
                        </Transition>
                      </span>
                    </Button>
                    <Button disabled={isLoading} impact="none" onClick={() => setIsOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )
}

import * as React from 'react'

import Button from './button'

export default function Modal() {
  const [isOpen, setIsOpen] = React.useState(true)

  return (
    <div>
      <Button impact="light" onClick={() => setIsOpen(true)}>
        Toggle modal
      </Button>
      <div className="relative z-10">
        {isOpen && (
          <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            {/* Dialog */}
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative overflow-hidden rounded-lg bg-white text-left shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white p-4 sm:p-6">
                    <div className="text-center sm:text-left">
                      <h3
                        className="text-xl font-semibold leading-6 text-slate-900"
                        id="modal-title"
                      >
                        Confirm Subscription
                      </h3>
                      <div className="mt-4">
                        <p className="text-slate-500">
                          You're about to confirm your{' '}
                          <a class="underline text-indigo-600 hover:text-indigo-500" href="#">
                            membership subscription
                          </a>
                          . Your account will be billed for a one-year membership. We just want to
                          make sure you understand that.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="border-t p-4 flex flex-col gap-2 sm:flex-row-reverse">
                    <Button onClick={() => setIsOpen(false)}>Yes, confirm</Button>
                    <Button impact="none" onClick={() => setIsOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

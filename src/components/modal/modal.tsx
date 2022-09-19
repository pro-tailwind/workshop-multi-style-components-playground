import * as React from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { cx } from '../../utils'

import Button from '../button'

interface ModalProps {
  title: string
  description?: string
  isOpen: boolean
  onClose: () => void
  setIsLoading?: (isLoading: boolean) => void
  actions: {
    cancel?: {
      label: string
      action: () => void
    }
    confirm: {
      label: string
      loading?: boolean
      action: () => void
      afterLeave?: () => void
    }
  }
  slideFrom: 'top' | 'right' | 'bottom' | 'left'
  size: 'small' | 'medium' | 'large'
  children: React.ReactNode
}

export default function Modal({
  title,
  description,
  isOpen,
  onClose,
  setIsLoading,
  actions,
  slideFrom = 'bottom',
  size = 'medium',
  children,
}: ModalProps) {
  // ------------------------------
  // Styles lookup
  // ------------------------------
  const sizeClasses = {
    small: 'sm:max-w-sm',
    medium: 'sm:max-w-lg',
    large: 'sm:max-w-3xl',
  }
  const slideFromClasses = {
    top: {
      from: '-translate-y-16',
      to: 'translate-y-0',
    },
    right: {
      from: 'translate-x-16',
      to: 'translate-x-0',
    },
    bottom: {
      from: 'translate-y-16',
      to: 'translate-y-0',
    },
    left: {
      from: '-translate-x-16',
      to: 'translate-x-0',
    },
  }
  return (
    <div>
      <Transition.Root show={isOpen}>
        <Dialog onClose={onClose} className="relative z-10">
          <Transition.Child
            enter="transition ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setIsLoading && setIsLoading(false)}
          >
            <div className="fixed inset-0 bg-indigo-300 bg-opacity-75 transition-opacity"></div>
          </Transition.Child>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                enter="transition duration-300"
                enterFrom={cx('opacity-0', slideFromClasses[slideFrom].from)}
                enterTo={cx('opacity-100', slideFromClasses[slideFrom].to)}
                leave="transition"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={cx(
                    'relative overflow-hidden rounded-lg bg-white text-left shadow-xl sm:my-8 w-full',
                    sizeClasses[size]
                  )}
                >
                  <div className="bg-white p-4 sm:p-6">
                    <div className="text-center sm:text-left">
                      <Dialog.Title
                        className="text-xl font-semibold leading-6 text-slate-900"
                        id="modal-title"
                      >
                        {title}
                      </Dialog.Title>
                      <div className="mt-4">
                        {description && (
                          <Dialog.Description className="sr-only">{description}</Dialog.Description>
                        )}
                        {children}
                      </div>
                    </div>
                  </div>
                  <div className="border-t p-4 flex flex-col gap-2 sm:flex-row-reverse">
                    {actions.confirm && (
                      <Button onClick={actions.confirm.action} disabled={actions.confirm.loading}>
                        <span className="flex gap-4 items-center">
                          <span>{actions.confirm.label}</span>
                          <Transition
                            show={!!actions.confirm.loading}
                            enter="transition ease-out"
                            enterFrom="scale-0"
                            enterTo="scale-100"
                          >
                            <Spinner />
                          </Transition>
                        </span>
                      </Button>
                    )}
                    {actions.cancel && (
                      <Button
                        disabled={actions.confirm.loading}
                        impact="none"
                        onClick={actions.cancel.action}
                      >
                        {actions.cancel.label}
                      </Button>
                    )}
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

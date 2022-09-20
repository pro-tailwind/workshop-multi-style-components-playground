import React from 'react'

import ModalComponent from './modal'
import Button from '../button'

export default function Modal() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isOpen2, setIsOpen2] = React.useState(false)
  const [isOpen3, setIsOpen3] = React.useState(false)

  const [isLoading, setIsLoading] = React.useState(false)

  function handleConfirm() {
    setIsLoading(true)
    setTimeout(() => {
      setIsOpen(false)
    }, 3000)
  }
  function handleConfirm2() {
    setIsLoading(true)
    setTimeout(() => {
      setIsOpen2(false)
    }, 3000)
  }
  return (
    <>
      <div className="flex gap-2">
        <Button impact="light" onClick={() => setIsOpen(true)}>
          Default dialog
        </Button>
        <Button tone="danger" impact="light" onClick={() => setIsOpen2(true)}>
          Danger dialog
        </Button>
        <Button tone="success" impact="light" onClick={() => setIsOpen3(true)}>
          Success dialog
        </Button>
      </div>

      <ModalComponent
        isOpen={isOpen}
        onClose={setIsOpen}
        slideFrom="top"
        title="Confirm Subscription"
        description="Membership subscription confirmation"
        actions={{
          confirm: {
            label: 'Yes, confirm',
            action: handleConfirm,
            loading: isLoading,
            afterLeave: () => setIsLoading(false),
          },
          cancel: { label: 'Cancel', action: () => setIsOpen(false) },
        }}
      >
        <p className="text-slate-500">
          You're about to confirm your{' '}
          <a className="underline text-indigo-600 hover:text-indigo-500" href="#">
            membership subscription
          </a>
          . Your account will be billed for a one-year membership. We just want to make sure you
          understand that.
        </p>
      </ModalComponent>

      <ModalComponent
        title="Delete account permanently?"
        tone="danger"
        slideFrom="left"
        isOpen={isOpen2}
        onClose={setIsOpen2}
        actions={{
          cancel: { label: 'Cancel', action: () => setIsOpen2(false) },
          confirm: {
            label: 'YOLO, delete it!',
            action: handleConfirm2,
            loading: isLoading,
            afterLeave: () => setIsLoading(false),
          },
        }}
      >
        <p>Are you really sure you want to delete this account? This operation cannot be undone.</p>
      </ModalComponent>

      <ModalComponent
        title="Welcome to the team 🎉"
        isOpen={isOpen3}
        onClose={setIsOpen3}
        tone="success"
        actions={{
          confirm: {
            label: 'View your dashboard',
            action: () => setIsOpen3(false),
          },
        }}
      >
        <p>Ooooh yeah, your account has been successfully created.</p>
        <p className="mt-2">One of us! One of us!</p>
      </ModalComponent>
    </>
  )
}

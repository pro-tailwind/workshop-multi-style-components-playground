import React from 'react'

import ModalComponent from './modal'
import Button from '../button'

export default function Modal() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  // Custom confirmation logic
  function handleConfirm() {
    setIsLoading(true)
    setTimeout(() => {
      setIsOpen(false)
      setTimeout(() => setIsLoading(false), 1000)
    }, 3000)
  }
  return (
    <>
      {/* Modal toggle */}
      <Button impact="light" onClick={() => setIsOpen(true)}>
        Toggle modal
      </Button>
      <ModalComponent
        isOpen={isOpen}
        onClose={setIsOpen}
        title="Confirm Subscription"
        description="Membership subscription confirmation"
        actions={{
          confirm: { label: 'Yes, confirm', action: handleConfirm, loading: isLoading },
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
    </>
  )
}

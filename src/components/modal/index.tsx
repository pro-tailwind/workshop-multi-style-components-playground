import React from 'react'

import ModalComponent from './modal'
import Button from '../button'
import { action_destroyer } from 'svelte/internal'

export default function Modal() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isOpen2, setIsOpen2] = React.useState(false)

  const [isLoading, setIsLoading] = React.useState(false)

  // Custom confirmation logic
  function handleConfirm() {
    setIsLoading(true)
    setTimeout(() => {
      setIsOpen(false)
    }, 3000)
  }
  return (
    <>
      <div className="flex gap-2">
        <Button impact="light" onClick={() => setIsOpen(true)}>
          Medium, from top
        </Button>
        <Button impact="light" onClick={() => setIsOpen2(true)}>
          Large, from left
        </Button>
      </div>

      <ModalComponent
        isOpen={isOpen}
        onClose={setIsOpen}
        setIsLoading={setIsLoading}
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
        title="Hang on a second!"
        size="large"
        slideFrom="left"
        isOpen={isOpen2}
        onClose={setIsOpen2}
        actions={{ confirm: { label: 'Ack!', action: () => setIsOpen2(false) } }}
      >
        <p>
          Just wanted to let you know that we're working hard on finding a better solution for this.
          We'll keep you updated as soon as we've got something to show you!
        </p>
      </ModalComponent>
    </>
  )
}

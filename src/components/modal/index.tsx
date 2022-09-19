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
      setTimeout(() => setIsLoading(false), 1000)
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
        title="Whoaaaaa"
        size="large"
        slideFrom="left"
        isOpen={isOpen2}
        onClose={setIsOpen2}
        actions={{ confirm: { label: 'Ack!', action: () => setIsOpen2(false) } }}
      >
        <p>I am the component 2. I should be a little longer, but I don't have any cancel setup.</p>
      </ModalComponent>

      <ModalComponent
        isOpen={isOpen}
        onClose={setIsOpen}
        slideFrom="top"
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

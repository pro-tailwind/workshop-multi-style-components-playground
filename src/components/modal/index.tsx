import React from 'react'

import Modal from './modal'
import Button from '../button'

export default function ModalDemo() {
  const [isOpenSmall, setIsOpenSmall] = React.useState(false)
  const [isOpenMedium, setIsOpenMedium] = React.useState(false)
  const [isOpenLarge, setIsOpenLarge] = React.useState(false)

  return (
    <main>
      {/* 
        ------------------------------
        Small modal
        ------------------------------
      */}
      {isOpenSmall && (
        <Modal
          size="small"
          open={isOpenSmall}
          onClose={() => setIsOpenSmall(false)}
          title="Small modal"
          actions={{
            confirm: {
              label: 'Okay!',
              action: () => setIsOpenSmall(false),
            },
          }}
        >
          <div className="mt-4">
            <p className="text-slate-500">
              This is a small modal. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Tenetur commodi dolorum ut consectetur provident ipsum corporis nihil, animi voluptas.
            </p>
          </div>
        </Modal>
      )}

      {/* 
        ------------------------------
        Medium modal
        ------------------------------
      */}
      {isOpenMedium && (
        <Modal
          size="medium"
          open={isOpenMedium}
          onClose={() => setIsOpenMedium(false)}
          title="Medium modal"
          actions={{
            confirm: {
              label: 'Okay!',
              action: () => setIsOpenMedium(false),
            },
          }}
        >
          <div className="mt-4">
            <p className="text-slate-500">
              This is a medium modal. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Tenetur commodi dolorum ut consectetur provident ipsum corporis nihil, animi voluptas.
            </p>
          </div>
        </Modal>
      )}

      {/* 
        ------------------------------
        Large modal
        ------------------------------
      */}
      {isOpenLarge && (
        <Modal
          size="large"
          open={isOpenLarge}
          onClose={() => setIsOpenLarge(false)}
          title="Large modal"
          actions={{
            confirm: {
              label: 'Okay!',
              action: () => setIsOpenLarge(false),
            },
          }}
        >
          <div className="mt-4">
            <p className="text-slate-500">
              This is a large modal. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Tenetur commodi dolorum ut consectetur provident ipsum corporis nihil, animi voluptas.
            </p>
          </div>
        </Modal>
      )}

      {/* 
        ------------------------------
        Toggle buttons
        ------------------------------
      */}
      <div className="flex gap-2">
        <Button impact="light" onClick={() => setIsOpenSmall(true)}>
          Small
        </Button>
        <Button impact="light" onClick={() => setIsOpenMedium(true)}>
          Medium
        </Button>
        <Button impact="light" onClick={() => setIsOpenLarge(true)}>
          Large
        </Button>
      </div>
    </main>
  )
}

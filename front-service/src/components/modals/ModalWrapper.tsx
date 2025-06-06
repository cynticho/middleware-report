// 'use client';

// import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
// import { ReactNode, useState } from 'react';

// interface ModalWrapperProps {
//   title: string;
//   children: ReactNode;
//   trigger: ReactNode; // au lieu de triggerLabel
// }

// const ModalWrapper = ({ title, children, trigger }: ModalWrapperProps) => {
//   const [open, setOpen] = useState(false);

//   // Clone le trigger pour lui injecter le onClick
//   const clonedTrigger = trigger && typeof trigger === 'object' && 'props' in trigger
//     ? { ...trigger, props: { ...trigger.props, onClick: () => setOpen(true) } }
//     : null;

//   return (
//     <>
//       {clonedTrigger && <>{clonedTrigger}</>}

//       <Dialog
//         open={open}
//         onClose={(_, reason) => {
//           if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
//             setOpen(false);
//           }
//         }}
//       >
//         <DialogTitle>{title}</DialogTitle>
//         <DialogContent>{children}</DialogContent>
//         <DialogActions>
//           <button onClick={() => setOpen(false)} className="text-gray-500 px-4 py-2">
//             Fermer
//           </button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default ModalWrapper;


'use client';

import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { ReactNode, useState, cloneElement, isValidElement } from 'react';

interface ModalWrapperProps {
  title: string;
  children: ReactNode;
  trigger: ReactNode;
}

const ModalWrapper = ({ title, children, trigger }: ModalWrapperProps) => {
  const [open, setOpen] = useState(false);

  const enhancedTrigger = isValidElement(trigger)
    ? cloneElement(trigger, {
        onClick: () => setOpen(true),
      })
    : null;

  return (
    <>
      {enhancedTrigger}

      <Dialog
        open={open}
        onClose={(_, reason) => {
          if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
            setOpen(false);
          }
        }}
        disableEscapeKeyDown
        // fullWidth // permet d'utiliser la largeur complète définie dans le contenu
        // maxWidth={false} // empêche MUI d'imposer ses tailles max (xs, sm, md, etc.)
        PaperProps={{
             sx: {
              width: '600px', // largeur fixe
              maxWidth: '90%', // largeur maximale pour les petits écrans
       },
          style: { overflow: 'visible' }, // important pour éviter le clipping du bouton "Fermer"
        }}
      >
        <div className="relative dark:bg-[#020d1a] dark:bg-[#020d1a] rounded-md shadow-lg max-w-4xl w-full mx-auto p-6">
          <DialogTitle className="pr-10 text-lg font-semibold text-gray-900 dark:bg-[#020d1a]">
            {title}
          </DialogTitle>

          {/* Bouton fermeture en haut à droite */}
          <button
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
            aria-label="Fermer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <DialogContent className="pt-2 w-full">{children}</DialogContent>
        </div>
      </Dialog>
    </>
  );
};

export default ModalWrapper;

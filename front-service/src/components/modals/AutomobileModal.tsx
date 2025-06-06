'use client';

import { useState } from "react";
import { Button } from "@/components/ui-elements/button";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { SignInForm } from "./sign-in-form";

const AutomobileModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="my-2">
        <Button label="New" variant="green" shape="rounded" onClick={() => setOpen(true)} />
      </div>

      <Dialog open={open} onClose={(_, reason) => reason !== 'backdropClick' && setOpen(false)}>
        <DialogTitle>Connexion</DialogTitle>
        <DialogContent>
          <SignInForm />
        </DialogContent>
        <DialogActions>
          <button onClick={() => setOpen(false)} className="text-gray-500 px-4 py-2">
            Fermer
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AutomobileModal;

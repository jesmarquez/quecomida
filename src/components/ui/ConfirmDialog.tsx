import { useEffect, useRef } from "react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  isLoading?: boolean;
  messageError?: string | null
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog = ({
  open,
  title,
  message,
  confirmLabel = "Delete",
  isLoading = false,
  messageError,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onCancel={(e) => { e.preventDefault(); onCancel(); }}
      onClick={(e) => { if (e.target === dialogRef.current) onCancel(); }}
      className="m-auto rounded-xl p-0 bg-surface text-on-surface backdrop:bg-black/40 w-full max-w-[28rem]"
    >
      <div className="p-md flex flex-col gap-md">
        <div className="flex items-center gap-sm">
          <span className="material-symbols-outlined text-[24px] text-error">warning</span>
          <h2 className="font-headline-sm text-headline-sm text-on-surface">{title}</h2>
        </div>

        <p className="font-body-md text-body-md text-on-surface-variant">{message}</p>
        {
          messageError && <p className="font-body-md text-body-md text-on-surface-variant">{ messageError }</p>
        }
        <div className="flex justify-end gap-sm">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="w-full sm:w-auto px-md h-10 rounded-full border border-outline font-label-md text-label-md text-on-surface hover:bg-surface-container transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="w-full sm:w-auto px-md h-10 rounded-full bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container font-label-md text-label-md flex items-center justify-center gap-xs transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">delete</span
            >{isLoading ? "Deleting..." : confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
};
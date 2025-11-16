import { Clipboard, CircleCheck } from 'lucide-react';
import { useState } from 'react';
import 'animate.css';

export default function ShareModal({ colorPalette, setOpen }) {
  const encoded = colorPalette.map((c) => c.replace('#', '')).join('-');
  const shareUrl = `${window.location.origin}/palette/${encoded}`;
  const [isCopied, setIsCopied] = useState(false);

  // Share palette (copy link)
  function sharePalette() {
    if (!isCopied) {
      navigator.clipboard
        .writeText(shareUrl)
        .then(() => {
          console.log('Palette link copied to clipboard: ' + shareUrl);
          setTimeout(() => {
            setIsCopied(false);
          }, 2500);
        })
        .catch((err) => {
          console.error('Failed to copy:', err);
          alert('❌ Could not copy the link.');
        });
    }
    setIsCopied(true);
  }

  return (
    <>
      <dialog
        id="my_modal_4"
        className="modal flex items-center justify-center cursor-auto"
      >
        <div className="modal-box w-200 mx-auto">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => {
              document.getElementById('my_modal_4').close();
              setOpen(false);
            }}
          >
            ✕
          </button>

          <h3 className="font-semibold text-lg pb-4 pt-2">
            Share it with your friends
          </h3>
          <div className="flex space-x-2 items-center text-nowrap">
            <label htmlFor="colorUrl" className="text-lg">
              URL :
            </label>

            <input
              type="text"
              className="input join-item text-black"
              id="colorUrl"
              value={shareUrl}
              disabled
            />
            <button
              className="btn flex-1 join-item tooltip"
              onClick={sharePalette}
              data-tip="Copy the URL"
            >
              {!isCopied ? (
                <Clipboard
                  size={24}
                  className="animate__animated animate__zoomIn animate__faster"
                />
              ) : (
                <div className="flex items-center space-x-1 animate__animated animate__zoomIn animate__faster">
                  <span>COPIED</span>
                  <CircleCheck size={24} color="green" />
                </div>
              )}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

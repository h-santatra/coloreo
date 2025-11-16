import { Link, useLocation } from 'react-router';

export default function DeleteModal({
  colorArray,
  setColorArray,
  setOpen,
  colorPalette,
}) {
  function deletePalette(task) {
    const deletedArray = colorArray.filter((color) => {
      return color.join(',') !== task.join(',');
    });
    setColorArray(deletedArray);
    setOpen(false);
  }

  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <dialog
        id="my_modal_3"
        className="modal flex items-center justify-center "
      >
        <div className="modal-box w-90 mx-auto">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg pb-4 pt-2">
            Are you sure to delete this Palette ?
          </h3>
          <div className="flex justify-around">
            <button
              className="btn btn-error"
              onClick={() => deletePalette(colorPalette)}
            >
              Yes, Delete it{' '}
            </button>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn " onClick={() => setOpen(false)}>
                No, Keep it
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

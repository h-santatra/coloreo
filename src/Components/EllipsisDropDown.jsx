import React, { useState, useRef, useEffect } from 'react';
import { EllipsisVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DeleteModal from './Modal/DeleteModal.jsx';
import ShareModal from './Modal/ShareModal.jsx';

export default function EllipsisDropdown({
  colorArray,
  setColorArray,
  colorPalette,
  deleteButton = true,
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // View palette (in-app navigation)
  const viewClick = () => {
    const encoded = colorPalette.map((c) => c.replace('#', '')).join('-');
    navigate(`/palette/${encoded}`, { state: { selectedColor: colorPalette } });
    setOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left mx-1" ref={dropdownRef}>
      <button
        className="btn btn-sm btn-square flex items-center justify-center"
        onClick={() => setOpen(!open)}
      >
        <EllipsisVertical size={24} />
      </button>

      {open && (
        <ul className="menu menu-sm dropdown-content mt-2 p-2 shadow bg-base-100 rounded-box w-32 absolute right-0 z-50 ">
          <li>
            <button onClick={viewClick}>View</button>
          </li>
          <li>
            <button
              onClick={() => document.getElementById('my_modal_4').showModal()}
            >
              Share
            </button>
          </li>
          {deleteButton && (
            <li>
              <button
                onClick={() =>
                  document.getElementById('my_modal_3').showModal()
                }
              >
                Delete
              </button>
            </li>
          )}
        </ul>
      )}
      <ShareModal colorPalette={colorPalette} setOpen={setOpen} />
      <DeleteModal
        colorArray={colorArray}
        setColorArray={setColorArray}
        setOpen={setOpen}
        colorPalette={colorPalette}
      />
    </div>
  );
}

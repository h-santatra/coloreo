import { useState, useEffect } from 'react';
import tinycolor from 'tinycolor2';

export default function Converttorgb({ color, setcolor }) {
  const [rgbColor, setRgbColor] = useState(tinycolor(color).toRgb());

  useEffect(() => {
    setRgbColor(tinycolor(color).toRgb());
  }, [color]);

  function updateRgb(e, channel) {
    const input = e.target.value;
    if (input === '') {
      setRgbColor({ ...rgbColor, [channel]: '' });
      return;
    }

    const value = parseInt(input, 10);
    if (isNaN(value) || value < 0 || value > 255) return;

    const updatedRgb = { ...rgbColor, [channel]: value };
    setRgbColor(updatedRgb);

    const hex = tinycolor(updatedRgb).toHexString();
    setcolor(hex);
  }
  return (
    <div className="flex space-x-4">
      {['r', 'g', 'b'].map((channel) => (
        <div key={channel} className="flex space-x-1">
          <label htmlFor={channel} className="uppercase label">
            {channel}
          </label>
          <input
            type="number"
            id={channel}
            value={rgbColor[channel] === '' ? '' : Number(rgbColor[channel])}
            onChange={(e) => updateRgb(e, channel)}
            min="0"
            max="255"
            className="input w-16"
            onBlur={(e) => {
              if (e.target.value === '') {
                setRgbColor({ ...rgbColor, [channel]: 0 });

                const updatedRgb = { ...rgbColor, [channel]: 0 };
                const rgb = tinycolor(updatedRgb).toHexString();
                setcolor(rgb);
              }
            }}
          />
        </div>
      ))}
    </div>
  );
}

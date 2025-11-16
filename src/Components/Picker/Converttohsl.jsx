import { useState, useEffect } from 'react';
import tinycolor from 'tinycolor2';

export default function Converttohsl({ color, setcolor }) {
  const [hslColor, sethslColor] = useState(tinycolor(color).toHsl());

  useEffect(() => {
    const rawHsl = tinycolor(color).toHsl();
    const roundedHsl = {
      h: Math.round(rawHsl.h),
      s: Math.round(rawHsl.s * 100) / 100,
      l: Math.round(rawHsl.l * 100) / 100,
    };
    sethslColor(roundedHsl);
  }, [color]);

  function updateHsl(e, channel) {
    const input = e.target.value;

    // Allow empty input to let the user delete
    if (input === '') {
      sethslColor({ ...hslColor, [channel]: '' });
      return;
    }
    const raw = parseFloat(input);
    const value = Math.round(raw * 100) / 100;

    if (
      isNaN(value) ||
      (channel === 'h' && (value < 0 || value > 360)) ||
      ((channel === 's' || channel === 'l') && (value < 0 || value > 1))
    ) {
      return;
    }

    const updatedHsl = { ...hslColor, [channel]: value };
    sethslColor(updatedHsl);

    const hex = tinycolor(updatedHsl).toHexString();
    setcolor(hex);
  }
  return (
    <div className="flex space-x-4">
      {['h', 's', 'l'].map((channel) => (
        <div key={channel} className="flex  space-x-1">
          <label htmlFor={channel} className="uppercase label">
            {channel}
          </label>
          <input
            type="number"
            id={channel}
            value={hslColor[channel] === '' ? '' : Number(hslColor[channel])}
            onChange={(e) => updateHsl(e, channel)}
            className="input w-16"
            onBlur={(e) => {
              if (e.target.value === '') {
                sethslColor({ ...hslColor, [channel]: 0 });

                const updatedHsl = { ...hslColor, [channel]: 0 };
                const hex = tinycolor(updatedHsl).toHexString();
                setcolor(hex);
              }
            }}
            step={channel === 'h' ? 1 : 0.01}
            min={0}
            max={channel === 'h' ? 360 : 1}
          />
        </div>
      ))}
    </div>
  );
}

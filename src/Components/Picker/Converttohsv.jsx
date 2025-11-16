import { useState, useEffect } from 'react';
import tinycolor from 'tinycolor2';

export default function Converttohsv({ color, setcolor }) {
  const [hsvColor, sethsvColor] = useState(tinycolor(color).toHsv());

  useEffect(() => {
    const rawHsv = tinycolor(color).toHsv();
    const roundedHsv = {
      h: Math.round(rawHsv.h),
      s: Math.round(rawHsv.s * 100) / 100,
      v: Math.round(rawHsv.v * 100) / 100,
    };
    sethsvColor(roundedHsv);
  }, [color]);

  function updateHsv(e, channel) {
    const input = e.target.value;

    // Allow empty input to let the user delete
    if (input === '') {
      sethsvColor({ ...hsvColor, [channel]: '' });
      return;
    }
    const raw = parseFloat(input);
    const value = Math.round(raw * 100) / 100;

    if (
      isNaN(value) ||
      (channel === 'h' && (value < 0 || value > 360)) ||
      ((channel === 's' || channel === 'v') && (value < 0 || value > 1))
    ) {
      return;
    }

    const updatedHsv = { ...hsvColor, [channel]: value };
    sethsvColor(updatedHsv);

    const hex = tinycolor(updatedHsv).toHexString();
    setcolor(hex);
  }

  return (
    <div className="flex space-x-4">
      {['h', 's', 'v'].map((channel) => (
        <div key={channel} className="flex space-x-1">
          <label htmlFor={channel} className="uppercase label">
            {channel}
          </label>
          <input
            type="number"
            id={channel}
            value={hsvColor[channel] === '' ? '' : Number(hsvColor[channel])}
            onChange={(e) => updateHsv(e, channel)}
            className="input w-16"
            onBlur={(e) => {
              if (e.target.value === '') {
                sethsvColor({ ...hsvColor, [channel]: 0 });

                const updatedHsv = { ...hsvColor, [channel]: 0 };
                const hex = tinycolor(updatedHsv).toHexString();
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

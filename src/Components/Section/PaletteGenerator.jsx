import { useEffect, useState } from 'react';
import tinycolor from 'tinycolor2';

export default function paletteGenerator({
  color,
  colorArray,
  setColorArray,
  setShowPalette,
  colorPalette,
  setColorPalette,
}) {
  useEffect(() => {
    function monoColor() {
      const colorMonochromatic = tinycolor(color).monochromatic(4);
      let hexArray = colorMonochromatic.map(function (t) {
        return t.toHexString();
      });

      let bgColor = tinycolor(hexArray[0]).toHsl();

      // Ensure saturation is 1 and luminance is at least 0.9
      if (bgColor.s <= 1 || bgColor.l < 0.9) {
        bgColor.s = 0.25;
        bgColor.l = Math.max(bgColor.l, 0.97);
      }
      hexArray[0] = tinycolor(bgColor).toHexString();

      let frColor = tinycolor(hexArray[3]).toHsl();
      // Ensure saturation is 0.15 and luminance is  0.15
      if (frColor.s > 0.15 || frColor.l > 0.15) {
        frColor.s = 0.1;
        frColor.l = 0.135;
      }
      hexArray[3] = tinycolor(frColor).toHexString();

      let pColor = tinycolor(hexArray[1]);
      let sColor = tinycolor(hexArray[2]);
      if (pColor.isDark()) {
        pColor = pColor.lighten(10);
        sColor = sColor.lighten(5);
        hexArray[1] = pColor.toHexString();
        hexArray[2] = sColor.toHexString();
      }
      if (sColor.isDark()) {
        sColor = sColor.lighten(5);
        hexArray[2] = sColor.toHexString();
      }

      // Check if there is pure White or pure black and change the color to subtle
      // Also checks if saturation is higher than 0.8 then desaturate the color by 10 if true
      const isBright = tinycolor(hexArray[0]).getLuminance() == 1;
      const isBlack = tinycolor(hexArray[3]).getLuminance() == 0;

      hexArray = hexArray.map((color) => {
        const tc = tinycolor(color);
        const hColor = tc.toHsv();

        if (isBright) {
          return tc.darken(2).toHexString();
        }
        if (isBlack) {
          return tc.lighten(13.5).toHexString();
        }
        if (hColor.s >= 0.8) {
          return tc.desaturate(10).toHexString();
        }
        return tc.toHexString();
      });

      hexArray = hexArray.sort(
        (a, b) => tinycolor(b).getBrightness() - tinycolor(a).getBrightness()
      );
      setColorPalette(hexArray);
    }
    monoColor();
  }, [color]);

  function saveColorArray() {
    if (colorArray.length >= 8) {
      alert('You have reached the maxed saved Color Palette');
      return;
    }
    const paletteKey = colorPalette.join(',');
    if (!colorArray.some((arr) => arr.join(',') === paletteKey)) {
      setColorArray([...colorArray, colorPalette]);
    } else {
      alert('This palette already exists');
    }
    setShowPalette(false);
  }
  return (
    <>
      <div className="flex space-x-4">
        <div className="flex border border-2 border-gray-700">
          {colorPalette.map((color) => {
            const hexColor = tinycolor(color);
            return (
              <div
                style={{ backgroundColor: color }}
                className={`p-2 ${hexColor.isLight() ? '' : 'text-white'}`}
                key={color}
              >
                {color}
              </div>
            );
          })}
        </div>
        <button className="btn btn-success" onClick={saveColorArray}>
          Save
        </button>
      </div>
    </>
  );
}

import { useState, useEffect } from 'react';
import tinycolor from 'tinycolor2';
import EllipsisDropDown from '../EllipsisDropDown.jsx';
import useLocalStorage from '../../hooks/localStorage';

export default function MostPopular() {
  const [randomA, setRandomA] = useLocalStorage('mostPopular', []);

  useEffect(() => {
    if (randomA.length > 0) return;
    const newPalettes = [];
    function monoColor(color) {
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

      hexArray.sort(
        (a, b) => tinycolor(b).getBrightness() - tinycolor(a).getBrightness()
      );
      return hexArray;
    }

    for (let i = 12; i > 0; i--) {
      const color = tinycolor.random();
      const hexColor = color.toHex();
      const newC = monoColor(hexColor);
      newPalettes.push(newC);
    }
    setRandomA(newPalettes);
  }, []);
  return (
    <div className="px-4 pb-2">
      <h1 className="text-2xl w-full py-2">Most Popular </h1>
      <hr />
      <div className="flex space-x-4 flex-wrap mt-2">
        {randomA.map((palette) => {
          return (
            <div
              className="flex p-2 focus-within:bg-neutral-200 focus-within:rounded-md mx-auto"
              key={palette}
            >
              {palette.map((color) => {
                const hexColor = tinycolor(color);
                return (
                  <div
                    style={{ backgroundColor: color }}
                    className={`w-8 sm:w-8 md:w-10 lg:w-16 ${
                      hexColor.isLight() ? '' : 'text-white'
                    }`}
                    key={color}
                  >
                    {/* {color} */}
                  </div>
                );
              })}
              <EllipsisDropDown
                colorArray={randomA}
                setColorArray={setRandomA}
                colorPalette={palette}
                deleteButton={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { Link, useLocation, useParams } from 'react-router-dom';
import { X } from 'lucide-react';
import tinycolor from 'tinycolor2';
import CopyToClipboard from '../Components/CopyToClipboard';
import { Share } from 'lucide-react';
import ShareModal from '../Components/Modal/ShareModal';

export default function ViewColor() {
  const location = useLocation();
  const { encodedColors } = useParams();

  // Priority: URL param → location.state
  let selectedColor = location.state?.selectedColor;

  // If no state passed, decode URL param
  if (!selectedColor && encodedColors) {
    selectedColor = encodedColors.split('-').map((hex) => `#${hex}`);
  }

  // If no colors available, show fallback
  if (!selectedColor) {
    return (
      <div className="p-8 text-center">
        <h2>No color palette found</h2>
        <Link to="/" className="text-blue-600 underline">
          Go back home
        </Link>
      </div>
    );
  }

  // Accessibility calculations
  const bgColor = selectedColor[0];
  const textColor = selectedColor[3];

  const colorRatio =
    Math.round(tinycolor.readability(bgColor, textColor) * 100) / 100;

  const normalAA = tinycolor.isReadable(bgColor, textColor, {
    level: 'AA',
    size: 'small',
  });
  const largeAA = tinycolor.isReadable(bgColor, textColor, {
    level: 'AA',
    size: 'large',
  });
  const normalAAA = tinycolor.isReadable(bgColor, textColor, {
    level: 'AAA',
    size: 'small',
  });
  const largeAAA = tinycolor.isReadable(bgColor, textColor, {
    level: 'AAA',
    size: 'large',
  });

  // Color sections
  const colorDetails = [
    { title: 'Background Color', color: selectedColor[0] },
    { title: 'Primary Color', color: selectedColor[2] },
    { title: 'Secondary Color', color: selectedColor[1] },
    { title: 'Text Color', color: selectedColor[3] },
  ];

  return (
    <div className="h-screen">
      <div className="relative overflow-hidden 2xl:w-4/6 xl:w-5/6 mx-auto bg-gray-100">
        {/* Close button */}
        <button className="btn btn-circle btn-outline md:btn-soft btn-primary absolute top-2 right-2">
          <Link to="/">
            <X size={16} />
          </Link>
        </button>
        {/* Color display */}
        <div className="flex flex-col md:flex-row md:h-70">
          {colorDetails.map((color) => {
            const isLight = tinycolor(color.color).isLight();
            return (
              <div
                key={color.title}
                style={{ backgroundColor: color.color }}
                className={`flex flex-col text-center font-semibold uppercase w-full items-center justify-center space-y-4 py-4 ${
                  isLight ? 'text-black' : 'text-white'
                }`}
              >
                <div>{color.title}</div>
                <CopyToClipboard text={color.color}>
                  {color.color}
                </CopyToClipboard>
              </div>
            );
          })}
        </div>

        {/* Accessibility section */}
        <div className="py-4 px-4 pb-8 ">
          <div className="flex justify-center pt-4 pb-8 ">
            <button
              className="btn btn-info btn-outline uppercase"
              onClick={() => document.getElementById('my_modal_4').showModal()}
            >
              Share this Color Palette <Share size={20} />
            </button>
            <ShareModal colorPalette={selectedColor} />
          </div>
          <h1 className="divider text-2xl uppercase font-semibold text-center">
            <span className="px-8">Accessibility</span>
          </h1>
          <div className="flex items-center justify-center space-x-2 mt-8">
            <h2 className="text-xl w-fit uppercase ">Contrast Ratio :</h2>
            <span
              className={`text-xl w-fit py-1 px-2 border  border-2 rounded-md font-semibold ${
                colorRatio > 7.1 ? 'border-green-600' : 'border-red-600'
              }`}
            >
              {colorRatio} : 1
            </span>
          </div>

          <div className="space-y-10">
            <div className="">
              <h3 className="text-xl font-semibold pb-4">Level AA </h3>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4 overflow-hidden text-nowrap">
                  <h5 className="flex items-center text-nowrap">
                    <span>Normal text :</span>
                    {normalAA ? (
                      <span className="p-1 ml-1 border rounded-md border-green-600 border-2">
                        PASS
                      </span>
                    ) : (
                      <span className="p-1 ml-1 border rounded-md border-red-600 border-2">
                        FAIL
                      </span>
                    )}
                  </h5>
                  <div>
                    <p
                      style={{
                        backgroundColor: selectedColor[0],
                        color: selectedColor[3],
                      }}
                      className="px-4 py-1 rounded-md "
                    >
                      Lorem ipsum dolor sit amet consectetur adipiscing elit
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 overflow-hidden text-nowrap">
                  <h5 className="flex items-center">
                    <span>Large text : </span>
                    {largeAA ? (
                      <span className="p-1 ml-1 border rounded-md border-green-600 border-2">
                        PASS
                      </span>
                    ) : (
                      <span className="p-1 ml-1 border rounded-md border-red-600 border-2">
                        FAIL
                      </span>
                    )}
                  </h5>
                  <div>
                    <p
                      style={{
                        backgroundColor: selectedColor[0],
                        color: selectedColor[3],
                      }}
                      className="px-4 py-1 text-[18px] font-bold rounded-md "
                    >
                      Lorem ipsum dolor sit
                      <span className="text-[24px] font-normal">
                        {' '}
                        amet consectetur adipiscing elit
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold pb-4"> Level AAA </h3>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4 overflow-hidden text-nowrap">
                  <h5 className="flex items-center text-nowrap">
                    <span>Normal text :</span>
                    {normalAAA ? (
                      <span className="p-1 ml-1 border rounded-md border-green-600 border-2">
                        PASS
                      </span>
                    ) : (
                      <span className="p-1 ml-1 border rounded-md border-red-600 border-2">
                        FAIL
                      </span>
                    )}
                  </h5>
                  <div>
                    <p
                      style={{
                        backgroundColor: selectedColor[0],
                        color: selectedColor[3],
                      }}
                      className="px-4 py-1 rounded-md "
                    >
                      Lorem ipsum dolor sit amet consectetur adipiscing elit
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 overflow-hidden text-nowrap">
                  <h5 className="flex items-center">
                    <span>Large text : </span>
                    {largeAAA ? (
                      <span className="p-1 ml-1 border rounded-md border-green-600 border-2">
                        PASS
                      </span>
                    ) : (
                      <span className="p-1 ml-1 border rounded-md border-red-600 border-2">
                        FAIL
                      </span>
                    )}
                  </h5>
                  <div>
                    <p
                      style={{
                        backgroundColor: selectedColor[0],
                        color: selectedColor[3],
                      }}
                      className="px-4 py-1 text-[18px] font-bold rounded-md "
                    >
                      Lorem ipsum dolor sit
                      <span className="text-[24px] font-normal">
                        {' '}
                        amet consectetur adipiscing elit
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full font-light text-center uppercase link link-hover py-4 bg-gray-200">
          <a href="https://www.w3.org/TR/WCAG/#contrast-minimum">
            Learn More about the WCAG Contrast Ratio
          </a>
        </div>
      </div>
    </div>
  );
}

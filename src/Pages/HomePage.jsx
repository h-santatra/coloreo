import { useEffect, useState, useRef } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import tinycolor from "tinycolor2";
import Converttorgb from "../Components/Picker/Converttorgb";
import Converttohsl from "../Components/Picker/Converttohsl";
import Converttohsv from "../Components/Picker/Converttohsv";
import InputRgb from "../Components/Picker/InputRgb";
import PaletteGenerator from "../Components/Section/PaletteGenerator";
import EllipsisDropDown from "../Components/EllipsisDropDown";
import MostPopular from "../Components/Section/MostPopular";
import Last24H from "../Components/Section/Last24H";
import useLocalStorage from "../hooks/localStorage";
import { Shuffle, Palette } from "lucide-react";
import SplitText from "../Components/ReactBits/SplitText";
import emptyImage from "../assets/empty.svg";

export default function Homepage() {
  const modeColor = ["hex", "rgb", "hsl", "hsv"];
  const [color, setColor] = useState("#aabbcc");
  const [selectMode, setselectMode] = useState("hex");
  const [generatedColor, setgeneratedColor] = useState("");

  const [colorArray, setColorArray] = useLocalStorage("colorArray", []);

  const [colorPalette, setColorPalette] = useState([]);
  const [showPalette, setShowPalette] = useState(false);
  const hexColor = tinycolor(color);
  const hasAnimated = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  function handleClick() {
    setgeneratedColor(color);
    setShowPalette(true);
  }

  function randomClick() {
    const randomColor = tinycolor.random();
    const convertHex = randomColor.toHexString();
    setColor(convertHex);
    setgeneratedColor(convertHex);
    setShowPalette(true);
  }

  const handleAnimationComplete = () => {
    hasAnimated.current = true;
    console.log("All letters have animated!");
  };
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  });
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-100 ">
        <div className="loader"></div>
      </div>
    );
  } else {
    return (
      <>
        <div className="bg-gray-100 2xl:w-4/6 xl:w-5/6 mx-auto">
          <h1 className="text-center underline">
            <SplitText
              key={hasAnimated.current ? "static" : "animated"}
              text="Coloreo"
              className="text-6xl uppercase font-semibold tracking-widest pt-2 "
              delay={150}
              duration={0.8}
              ease="power3.out"
              splitType="chars"
              from={hasAnimated.current ? {} : { opacity: 0, y: 40 }}
              to={hasAnimated.current ? {} : { opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
              onLetterAnimationComplete={handleAnimationComplete}
            />
          </h1>
          <h1 className="text-center underline">
            <SplitText
              key={hasAnimated.current ? "static" : "animated"}
              text="The color palette generator for you !"
              className="text-md uppercase font-semibold tracking-widest py-1"
              delay={150}
              duration={1}
              ease="power3.out"
              splitType="words"
              from={hasAnimated.current ? {} : { opacity: 0, y: 40 }}
              to={hasAnimated.current ? {} : { opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
              onLetterAnimationComplete={handleAnimationComplete}
            />
          </h1>

          <div className="flex flex-col items-center justify-center pt-2 ">
            <div className="space-y-2 colorpicker">
              <HexColorPicker color={color} onChange={setColor} />
              <div
                style={{ backgroundColor: color }}
                className={`px-8 py-2 rounded-lg uppercase font-semibold ${
                  hexColor.isLight() ? "" : "text-white"
                }`}
              >
                {color}
              </div>
            </div>
            <div className="flex pt-2 space-x-4">
              <label htmlFor="">
                <select
                  value={selectMode}
                  className="select  uppercase w-fit"
                  onChange={(e) => setselectMode(e.target.value)}
                >
                  {modeColor.map((mode) => {
                    return (
                      <option key={mode} value={mode} className="">
                        {mode}
                      </option>
                    );
                  })}
                </select>
                <label htmlFor=""></label>
              </label>
              {selectMode === "hex" && (
                <InputRgb color={color} setcolor={setColor} />
              )}
              {selectMode === "rgb" && (
                <Converttorgb color={color} setcolor={setColor} />
              )}
              {selectMode === "hsl" && (
                <Converttohsl color={color} setcolor={setColor} />
              )}
              {selectMode === "hsv" && (
                <Converttohsv color={color} setcolor={setColor} />
              )}
            </div>
            <div className="flex space-x-8 py-4">
              <button
                className="btn btn-primary uppercase"
                onClick={handleClick}
              >
                <Palette size={20} />
                Generate
              </button>
              <button
                className="btn btn-neutral uppercase"
                onClick={randomClick}
              >
                <Shuffle size={20} />
                Random
              </button>
            </div>

            <div className="pb-2 ">
              <PaletteGenerator
                color={color}
                colorArray={colorArray}
                setColorArray={setColorArray}
                setShowPalette={setShowPalette}
                colorPalette={colorPalette}
                setColorPalette={setColorPalette}
              />
            </div>
          </div>
          <div className="flex flex-col px-4 pb-2 ">
            <div>
              <h2 className="text-start text-2xl py-2  w-full">
                Saved Palette
              </h2>
              <hr />
            </div>
            {colorArray.length === 0 ? (
              <div className="mx-auto p-2 my-2">
                <img src={emptyImage} alt="" className="w-35" />
              </div>
            ) : (
              <div className="flex space-x-4 flex-wrap mt-2">
                {colorArray.map((palette) => {
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
                              hexColor.isLight() ? "" : "text-white"
                            }`}
                            key={color}
                          >
                            {/* {color} */}
                          </div>
                        );
                      })}
                      <EllipsisDropDown
                        colorArray={colorArray}
                        setColorArray={setColorArray}
                        colorPalette={palette}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <MostPopular />
          <Last24H />
          <div className="py-8 bg-neutral-900 "></div>
        </div>
      </>
    );
  }
}

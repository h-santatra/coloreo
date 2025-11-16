import { HexColorInput } from 'react-colorful';

export default function InputRgb({ color, setcolor }) {
  return (
    <div className="flex space-x-1">
      <label htmlFor="inputColor" className="label">
        #
      </label>
      <HexColorInput
        color={color}
        onChange={setcolor}
        id="inputColor"
        className=" input uppercase pl-1"
      ></HexColorInput>
    </div>
  );
}

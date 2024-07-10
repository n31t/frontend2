import React from 'react';

type HintComponentProps = {
  hintText: string;
    hintImage: string;
  setInputValue: (value: string) => void;
};

const HintComponent: React.FC<HintComponentProps> = ({ hintText, hintImage, setInputValue }) => {
  const handleHintClick = () => {
    setInputValue(hintText); // Set input value when hint is clicked
  };

  return (
    <div
      className="flex w-full mt-2 md:mt-0 md:w-1/5 flex-col hover:bg-[#ffffffce] bg-[#e2e1e1c4] text-[#626262] pt-2 px-2 rounded-[8px] cursor-pointer border-[1px] border-[#626262] shadow-md"
      onClick={handleHintClick}
    >
      <div className="flex items-center">
        <img src={hintImage} alt="hint" className="ml-2 mb-2 w-6 h-6" />
        {/* <span className="ml-2 mb-2 text-base"></span> */}
      </div>
      <div className="ml-2 mb-2 text-sm">{hintText}</div>
    </div>
  );
};

export default HintComponent;

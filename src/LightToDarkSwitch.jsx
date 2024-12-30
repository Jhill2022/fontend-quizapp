import moondark from "./images/icon-moon-dark.svg";
import sundark from "./images/icon-sun-dark.svg";


export function LightToDarkSwitch({ isDarkMode, handleDarkMode }) {
  return (
    <div className="flex gap-1">
      {isDarkMode ? <img src="./src/images/icon-sun-light.svg" /> : <img src={sundark} alt="" />}
      <div
        className={`bg-purple-600 w-12 px-[5px] h-7 rounded-2xl  flex items-center cursor-pointer ${isDarkMode ? "justify-end" : "justify-start"}`}
        onClick={handleDarkMode}
      >
        <div className="bg-white w-4 h-4 rounded-full shadow-md transition-transform duration-300"></div>
      </div>
      {isDarkMode ? <img src="./src/images/icon-moon-light.svg"></img> : <img src={moondark} alt="" />}
    </div>
  );
}

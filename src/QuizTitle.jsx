import { titleColors } from "./App";

export function QuizTitle({ title, handleTitle, isDarkMode }) {
  return (
    <li
      className={`${isDarkMode ? "bg-[#3B4D66] text-white" : "bg-white"} shadow rounded-lg flex items-center py-3 px-3 gap-4`}
      onClick={() => handleTitle(title.title)}
    >
      <div
        style={{ backgroundColor: titleColors[title.title] }}
        className="w-10 h-10 rounded-md flex items-center justify-center"
      >
        <img src={title.icon} alt="" />
      </div>
      <h2 className="text-lg font-medium">{title.title}</h2>
    </li>
  );
}

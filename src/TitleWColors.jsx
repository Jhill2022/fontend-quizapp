import { titleColors } from "./App";

export function TitleWColors({ title, icon }) {
  return <div className="flex items-center gap-3 ">
    <div
      style={{ backgroundColor: titleColors[title] }}
      className=" p-1 rounded-md flex items-center justify-center"
    >
      <img src={icon} alt="" />
    </div>
    <h2 className="text-lg font-medium">{title}</h2>
  </div>;
}

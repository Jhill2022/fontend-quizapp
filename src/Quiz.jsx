import { useState } from "react";
import { titleColors } from "./App";
import { LightToDarkSwitch } from "./LightToDarkSwitch";
import correct from "./images/icon-correct.svg";
import incorrect from "./images/icon-incorrect.svg";

export function Quiz({
  title, icon, quiz, currentQuestionIndex, setAnswered, answered, handleNextQuestion, selectedOption, setSelectedOption, setIsSubmitted, isSubmitted, pendingOption, setPendingOption, setScore, handleDarkMode, isDarkMode,
}) {
  const currentQuestion = quiz[currentQuestionIndex];
  const [active, setActive] = useState(false);
  const isLastQuestion = currentQuestionIndex === quiz.length - 1;

  const progressPercentage = ((currentQuestionIndex + 1) / quiz.length) * 100;
  const labels = ["A", "B", "C", "D"];

  function handleScore() {
    if (isSubmitted) return; // Prevent further clicks if already answered or no option selected
    setSelectedOption(pendingOption);
    setAnswered(true); // Mark the question as answered
    if (pendingOption === quiz[currentQuestionIndex].answer) {
      setScore((prev) => prev + 1);
    }
  }

  function handleSubmitAnswer() {
    handleScore();
    setAnswered(true);
    setIsSubmitted(true); // Mark the question as answered
  }
  return (
    <div className={`px-7 py-5 ${isDarkMode ? 'bg-[#313E51] bg-[url("./images/pattern-background-mobile-dark.svg")] text-white' : 'bg-[#F4F6FA] bg-[url("./images/pattern-background-mobile-light.svg")]'}  min-h-screen `}>
      <div className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-3 ">
          <div
            style={{ backgroundColor: titleColors[title] }}
            className=" p-1 rounded-md flex items-center justify-center"
          >
            <img src={icon} alt="" />
          </div>
          <h2 className="text-lg font-medium">{title}</h2>
        </div>
        <div>
          <LightToDarkSwitch
            handleDarkMode={handleDarkMode}
            isDarkMode={isDarkMode} />
        </div>
      </div>
      <p className="mb-3 text-[#626C7F]">
        <em className={`${isDarkMode ? 'text-[#ABC1E1]' : 'text-[#626C7F]'} font-light`}>
          Question {currentQuestionIndex + 1} of {quiz.length}
        </em>
      </p>
      <h3 className="text-2xl font-semibold mb-6">
        {currentQuestion.question}
      </h3>
      <div className={`w-full ${isDarkMode
        ? 'bg-[#3B4D66]' : 'bg-white '} rounded-full h-3 mb-10 flex items-center`}>
        <div
          className="bg-purple-500 h-2 rounded-full "
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <ul className="mb-4">
        {currentQuestion.options.map((option, index) => (
          <div key={index}>
            <li
              style={{
                border: isSubmitted && pendingOption === option
                  ? `2px solid ${option === currentQuestion.answer ? "green" : "red"}`
                  : pendingOption === option
                    ? "2px solid #A729F5"
                    : "transparent",
              }}
              className={`border ${isDarkMode
                ? 'bg-[#3B4D66]' : 'bg-white '} flex h-16 justify-between items-center rounded-lg p-3 mb-3 cursor-pointer`}
              onClick={() => !isSubmitted && setPendingOption(option)}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 p-2 rounded-md flex justify-center items-center flex-shrink-0 ${isSubmitted && pendingOption === option
                      ? option === currentQuestion.answer
                        ? "bg-green-400"
                        : "bg-red-500"
                      : pendingOption === option
                        ? "bg-purple-500"
                        : "bg-gray-200"}`}
                >
                  <span
                    className={`text-sm font-medium ${isSubmitted && pendingOption === option
                        ? "text-white"
                        : pendingOption === option
                          ? "text-white"
                          : "text-[#626C7F]"}`}
                  >
                    {labels[index]}
                  </span>
                </div>
                {option}
              </div>

              {answered && (
                <span className="flex ">
                  <img
                    src={option === currentQuestion.answer
                      ? correct
                      : selectedOption === option
                        ? incorrect
                        : undefined}
                    alt="" />
                </span>
              )}
            </li>
          </div>
        ))}
        {!isSubmitted ? (
          <button
            className="bg-purple-500 py-4 text-white w-full rounded-lg"
            onClick={handleSubmitAnswer}
            disabled={!pendingOption}
          >
            Submit Answer
          </button>
        ) : (
          <button
            className="bg-purple-500 py-4 text-white w-full px-4  rounded-lg"
            onClick={handleNextQuestion}
          >
            Next Question
          </button>
        )}
      </ul>
    </div>
  );
}

import { useState } from "react";
import data from "./data.json";
import patternBg from "./images/pattern-background-mobile-light.svg";
import { QuizTitle } from "./QuizTitle";
import { Quiz } from "./Quiz";
import { LightToDarkSwitch } from "./LightToDarkSwitch";

export const titleColors = {
  HTML: "#FFF1E9",
  CSS: "#E0FDEF",
  JavaScript: "#EBF0FF",
  Accessibility: "#F6E7FF",
};

function App() {
  const [quiz, setQuiz] = useState([]);
  const [title, setTitle] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [pendingOption, setPendingOption] = useState(null);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [icon, setIcon] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  function handleTitle(selectedTitle) {
    const findTitle = data.quizzes.find((quiz) => quiz.title === selectedTitle);
    if (findTitle) {
      setTitle(findTitle.title);
      setQuiz(findTitle.questions);
      setIcon(findTitle.icon);
      setCurrentQuestionIndex(0); // Reset the question index
      setSelectedOption(null);
      setIsQuizCompleted(false);
    }
  }

  function handleDarkMode() {
    setIsDarkMode((prev) => !prev);
  }

  function handleNextQuestion() {
    if (currentQuestionIndex === quiz.length - 1) {
      setIsQuizCompleted(true);
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
      setAnswered(false);
      setIsSubmitted(false);
      setPendingOption(null);
    }
  }

  return (
    <div>
      {!title ? (
        <div
          className={`min-h-screen ${
            isDarkMode
              ? 'bg-[#313E51] bg-[url("./images/pattern-background-mobile-dark.svg")] text-white'
              : 'bg-[#F4F6FA] text-black bg-[url("./images/pattern-background-mobile-light.svg")]'
          } px-7 pt-7  bg-no-repeat`}
        >
          <div className="flex justify-end mb-14">
            <LightToDarkSwitch
              handleDarkMode={handleDarkMode}
              isDarkMode={isDarkMode}
            />
          </div>
          <h1 className="text-[40px] font-light">Welcome to the</h1>
          <span className="font-medium text-[40px]">Frontend Quiz!</span>
          <p className="text-[#626C7F] mt-4 mb-10">
            <em className="text-[#ABC1E1] font-light">
              Pick a subject to get started
            </em>
          </p>
          <div>
            <ul className="flex flex-col gap-3">
              {data.quizzes.map((quizItem) => (
                <QuizTitle
                  title={quizItem}
                  handleTitle={handleTitle}
                  key={quizItem.title}
                  isDarkMode={isDarkMode}
                />
              ))}
            </ul>
          </div>
        </div>
      ) : isQuizCompleted ? (
        <div className="px-6 py-8 bg-[#F4F6FA] min-h-screen bg-[url('./images/pattern-background-mobile-light.svg')]">
          <div className="mb-10">
            <p className="text-4xl font-light">Quiz completed</p>
            <p className="text-4xl font-medium">You scored...</p>
          </div>

          <div className="flex flex-col items-center gap-3 mb-3 py-8 bg-white">
            <div className="flex items-center gap-3">
              <div
                style={{ backgroundColor: titleColors[title] }}
                className=" p-1 rounded-md flex items-center justify-center"
              >
                <img src={icon} alt="" />
              </div>
              <h2 className="text-lg font-medium">{title}</h2>
            </div>

            <h2 className="text-8xl text-[#313E51]">{score}</h2>
            <p className="text-[#626C7F] text-lg">out of {quiz.length}</p>
          </div>
          <button className="py-3 w-full bg-purple-500 text-white text-lg rounded-xl">
            Play Again
          </button>
        </div>
      ) : (
        <Quiz
          quiz={quiz}
          currentQuestionIndex={currentQuestionIndex}
          setSelectedOption={setSelectedOption}
          selectedOption={selectedOption}
          handleNextQuestion={handleNextQuestion}
          answered={answered}
          setAnswered={setAnswered}
          isSubmitted={isSubmitted}
          setIsSubmitted={setIsSubmitted}
          pendingOption={pendingOption}
          setPendingOption={setPendingOption}
          title={title}
          icon={icon}
          isQuizCompleted={isQuizCompleted}
          setScore={setScore}
          handleDarkMode={handleDarkMode}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
}

export default App;

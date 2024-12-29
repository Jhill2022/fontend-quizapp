import { useState } from "react";
import data from "./data.json";
import correct from "./images/icon-correct.svg";
import incorrect from "./images/icon-incorrect.svg";
import patternBg from "./images/pattern-background-mobile-light.svg";
import moondark from "./images/icon-moon-dark.svg";
import sundark from "./images/icon-sun-dark.svg";

const titleColors = {
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

function QuizTitle({ title, handleTitle, isDarkMode }) {
  return (
    <li
      className={`${
        isDarkMode ? "bg-[#3B4D66] text-white" : "bg-white"
      } shadow rounded-lg flex items-center py-3 px-3 gap-4`}
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

function Quiz({
  title,
  icon,
  quiz,
  currentQuestionIndex,
  setAnswered,
  answered,
  handleNextQuestion,
  selectedOption,
  setSelectedOption,
  setIsSubmitted,
  isSubmitted,
  pendingOption,
  setPendingOption,
  setScore,
  handleDarkMode,
  isDarkMode,
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
    <div className={`px-7 py-5 ${isDarkMode ? 'bg-[#313E51] bg-[url("./images/pattern-background-mobile-dark.svg")] text-white': 'bg-[#F4F6FA] bg-[url("./images/pattern-background-mobile-light.svg")]'}  min-h-screen `}>
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
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
      <p className="mb-3 text-[#626C7F]">
        <em className="text-[#ABC1E1] font-light">
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
                border:
                  isSubmitted && pendingOption === option
                    ? `2px solid ${
                        option === currentQuestion.answer ? "green" : "red"
                      }`
                    : pendingOption === option
                    ? "2px solid purple"
                    : "transparent",
              }}
              className={`border ${isDarkMode
              ? 'bg-[#3B4D66]' : 'bg-white '} flex h-16 justify-between items-center rounded-lg p-3 mb-3 cursor-pointer`}
              onClick={() => !isSubmitted && setPendingOption(option)}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 p-2 rounded-md flex justify-center items-center flex-shrink-0 ${
                    isSubmitted && pendingOption === option
                      ? option === currentQuestion.answer
                        ? "bg-green-400"
                        : "bg-red-500"
                      : pendingOption === option
                      ? "bg-purple-500"
                      : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`text-sm font-medium ${
                      isSubmitted && pendingOption === option
                        ? "text-white"
                        : pendingOption === option
                        ? "text-white"
                        : "text-[#626C7F]"
                    }`}
                  >
                    {labels[index]}
                  </span>
                </div>
                {option}
              </div>

              {answered && (
                <span className="flex ">
                  <img
                    src={
                      option === currentQuestion.answer
                        ? correct
                        : selectedOption === option
                        ? incorrect
                        : undefined
                    }
                    alt=""
                  />
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

function LightToDarkSwitch({ isDarkMode, handleDarkMode }) {
  return (
    <div className="flex gap-1">
      <img src={sundark} alt="" />
      <div
        className={`bg-purple-600 w-12 px-[5px] h-7 rounded-2xl  flex items-center cursor-pointer ${
          isDarkMode ? "justify-end" : "justify-start"
        }`}
        onClick={handleDarkMode}
      >
        <div className="bg-white w-4 h-4 rounded-full shadow-md transition-transform duration-300"></div>
      </div>
      <img src={moondark} alt="" />
    </div>
  );
}
export default App;

import type { Option, Question } from "./types";

const questionWrap = document.getElementById("question-wrap")!;
const buttons = document.getElementById("buttons")!;
const solutionBtn = document.getElementById("solution")!;
const nextBtn = document.getElementById("next")!;
let idCounter: number = 0;

const questions: Question[] = [
  {
    id: "1",
    title: "What is the capital of the USA?",
    options: [
      {
        id: "a",
        choice: "Chicago",
        right: false,
      },
      {
        id: "b",
        choice: "New York City",
        right: false,
      },
      {
        id: "c",
        choice: "Washington DC",
        right: true,
      },
      {
        id: "d",
        choice: "Miami",
        right: false,
      },
    ],
  },
  {
    id: "2",
    title: "Which of the following animals does not lay eggs?",
    options: [
      {
        id: "a",
        choice: "elephant",
        right: true,
      },
      {
        id: "b",
        choice: "chicken",
        right: false,
      },
      {
        id: "c",
        choice: "shark",
        right: false,
      },
      {
        id: "d",
        choice: "spider",
        right: false,
      },
    ],
  },
  {
    id: "3",
    title: "In which year did the french revolution happen?",
    options: [
      {
        id: "a",
        choice: "1833",
        right: false,
      },
      {
        id: "b",
        choice: "1757",
        right: false,
      },
      {
        id: "c",
        choice: "1802",
        right: false,
      },
      {
        id: "d",
        choice: "1789",
        right: true,
      },
    ],
  },
];

function randomFourArray(): number[] {
  const firstArray: number[] = [0, 1, 2, 3];
  const endArray: number[] = [];
  while (firstArray.length > 0) {
    let index = Math.floor(Math.random() * firstArray.length);
    endArray.push(firstArray[index]);
    firstArray.splice(index, 1);
  }
  return endArray;
}

function getRightAnswerId(options: Option[]): string | undefined {
  for (const option of options) {
    if (option.right) {
      return option.id;
    }
  }
}

function disableButtons(id: string): undefined | void {
  const question = questions.find((question) => id === question.id);
  if (!question) {
    return;
  }
  question.options.forEach((option) => {
    const button = document.getElementById(option.id) as HTMLButtonElement;
    button.disabled = true;
  });
}

function showAnswer(id: string): void {
  const question = questions.find((question) => id === question.id);
  if (!question) {
    return;
  }
  question.options.forEach((option) => {
    const button = document.getElementById(option.id) as HTMLButtonElement;
    if (option.right) {
      button.classList.add("right");
      disableButtons(id);
      return;
    }
  });
}

function renderQuestion(
  id: string,
  title: string,
  options: Option[]
): undefined {
  const question = document.createElement("div");
  question.setAttribute("id", id);

  const questionTitle = document.createElement("h2");
  questionTitle.setAttribute("id", "question-title");
  questionTitle.innerText = title;

  const rightAnswer = getRightAnswerId(options);

  const optionsDiv = document.createElement("div");
  optionsDiv.classList.add("options-div");
  const randomArray = randomFourArray();
  randomArray.forEach((num) => {
    const optionBtn = document.createElement("button");
    optionBtn.setAttribute("id", options[num].id);
    optionBtn.classList.add("question-btn");
    optionBtn.innerText = options[num].choice;
    optionsDiv.appendChild(optionBtn);
    optionBtn.addEventListener("click", () => {
      if (!rightAnswer) {
        return;
      }
      rightOrWrong(id, options[num].id, rightAnswer);
    });
  });
  questionWrap.appendChild(question);
  question.appendChild(questionTitle);
  question.appendChild(optionsDiv);
}

function selectQuestionToRender(): void {
  questionWrap.innerHTML = "";
  const renderedQuestion = questions[idCounter];
  const { id, title, options } = renderedQuestion;
  renderQuestion(id, title, options);
  if (idCounter + 1 < questions.length) {
    idCounter++;
  } else {
    idCounter = 0;
  }
}

function rightOrWrong(
  questionId: string,
  choiceId: string,
  rightId: string
): void {
  const clickedChoice = document.getElementById(choiceId);
  const rightAnswer = document.getElementById(rightId);
  const question = questions.find((question) => questionId === question.id);
  if (!clickedChoice || !question || !rightAnswer) {
    return;
  }
  for (const choice of question.options) {
    if (choice.id === choiceId && choice.right) {
      clickedChoice.classList.add("right");
      alert("You chose the right answer!");
      disableButtons(questionId);
      return;
    } else if (choice.id === choiceId && !choice.right) {
      clickedChoice.classList.add("wrong");
      rightAnswer.classList.add("right");
      alert("Wrong choice... Try again!");
      disableButtons(questionId);
      return;
    }
  }
}

function startGame(): void {
  selectQuestionToRender();
  buttons.classList.remove("hidden");
}

function initialClickHandler(): void {
  startGame();
  document.removeEventListener("click", initialClickHandler);
}

solutionBtn.addEventListener("click", () => {
  const currentid = String(idCounter + 1);
  showAnswer(currentid);
});
nextBtn.addEventListener("click", selectQuestionToRender);
document.addEventListener("click", initialClickHandler);

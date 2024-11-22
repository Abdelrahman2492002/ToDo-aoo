import {
  alltasksButton,
  countList,
  filterIcons,
  getTasks,
  input,
  tasksList,
  wrapperElement,
} from "./element";
import { giveListeners } from "./eventListeners";

let activeTasks = "all";

export const saveToDB = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getDataFromDB = (key) => {
  let data = localStorage.getItem(key);
  return data ? JSON.parse(data) : false;
};

const setDefaultTasks = () => {
  if (!localStorage.getItem("appInitialized")) {
    const data = [
      { value: "Complete online JavaScript course", isCompleted: true },
      { value: "Jog around the park 3x", isCompleted: false },
      { value: "10 minutes meditation", isCompleted: false },
      { value: "Read for 1 hour", isCompleted: false },
      { value: "Pick up groceries", isCompleted: false },
      { value: "Complete Todo App on Frontend Mentor", isCompleted: false },
    ];

    localStorage.setItem("appInitialized", "true");
    saveToDB("tasks", data);
    getDataFromDB("theme") && toggleTheme();
  }
};

export const toggleTheme = () => {
  wrapperElement.classList.toggle("darkTheme");
  saveToDB("theme", wrapperElement.classList.contains("darkTheme"));
};

const FilterRenderTasks = () => {
  let tasks = getDataFromDB("tasks");
  let tasksElement = getTasks();

  let activeCount = 0;
  let completedCount = 0;
  let totalCount = tasks.length;

  tasks.forEach((task, index) => {
    if (activeTasks === "completed" && !task.isComplete) {
      tasksElement[index].classList.add("task__list--item__hidden");
    } else if (activeTasks === "active" && task.isComplete) {
      tasksElement[index].classList.add("task__list--item__hidden");
    } else {
      tasksElement[index].classList.remove("task__list--item__hidden");
    }

    if (activeTasks === "completed" && task.isComplete) {
      completedCount++;
    } else if (activeTasks === "active" && !task.isComplete) {
      activeCount++;
    }
  });

  if (activeTasks === "completed") {
    if (!completedCount) {
      emptyMessage("No Completed Tasks In The List");
    }
    tasksCount(completedCount);
  } else if (activeTasks === "active") {
    if (!activeCount) {
      emptyMessage("No Active Tasks In The List");
    }
    tasksCount(activeCount);
  } else {
    if (!totalCount) {
      emptyMessage("List is Empty");
    }
    tasksCount(totalCount);
  }
};

export const renderTask = (tasks) => {
  let result = "";

  tasks.forEach((task) => {
    result += `
         <li draggable="true" class="task__list--item ${
           task.isComplete ? "task__list--item__checked" : ""
         }">
              <button class="checkButton">
                <img
                  class="checkButton__img"
                  src="./images/icon-check.svg"
                  alt=""
                />
              </button>
              <p>${task.value}</p>
              <button class="delete-icon">
                <img src="./images/delete-button.svg" alt="delete icon" />
              </button>
            </li>
      `;
  });

  tasksList.innerHTML = result;
  FilterRenderTasks();
  giveListeners();
};

export const addTask = (e) => {
  e.preventDefault();
  const inputValue = input.value;
  if (!inputValue) return;

  const task = {
    value: inputValue,
    isComplete: false,
  };

  let tasks = getDataFromDB("tasks") || [];

  tasks.push(task);

  saveToDB("tasks", tasks);

  showAllTasks(e);
  alltasksButton.classList.add("active");

  input.value = "";
};

export const deleteTask = (index) => {
  let tasks = getDataFromDB("tasks");

  const deletedElement = tasksList.children[index];
  deletedElement.classList.add("task__deleting");

  deletedElement.addEventListener(
    "transitionend",
    () => {
      tasks.splice(index, 1);
      saveToDB("tasks", tasks);
      renderTask(tasks);
    },
    { once: true }
  );
};

export const taskToggleCheck = (index) => {
  let tasks = getDataFromDB("tasks");
  tasks[index].isComplete = !tasks[index].isComplete;
  saveToDB("tasks", tasks);
  renderTask(tasks);
};

const emptyMessage = (message) => {
  tasksList.innerHTML = `<p>${message}</p>`;
};
const tasksCount = (count) => (countList.textContent = `${count} items left`);

const addActiveClass = (e) => {
  filterIcons.forEach((filterIcon) => filterIcon.classList.remove("active"));
  e.currentTarget.classList.add("active");
};

export const showAllTasks = (e) => {
  let tasks = getDataFromDB("tasks") || [];
  activeTasks = "all";
  renderTask(tasks);
  addActiveClass(e);
};

export const showActiveTasks = (e) => {
  let tasks = getDataFromDB("tasks") || [];
  activeTasks = "active";
  renderTask(tasks);
  addActiveClass(e);
};

export const completedTasks = (e) => {
  let tasks = getDataFromDB("tasks") || [];
  activeTasks = "completed";

  renderTask(tasks);
  addActiveClass(e);
};

export const clearCompletedTask = () => {
  let tasks = getDataFromDB("tasks");
  let inComleteTasks = tasks.filter((task) => !task.isComplete);
  saveToDB("tasks", inComleteTasks);
  renderTask(inComleteTasks);
};

export const initDataOnStartUp = () => {
  setDefaultTasks();
  getDataFromDB("theme") && toggleTheme();
  let tasks = getDataFromDB("tasks");
  renderTask(tasks);
};

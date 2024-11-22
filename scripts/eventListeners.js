import {
  activetasksButton,
  addButton,
  alltasksButton,
  clearCompletedButton,
  completedTasksButton,
  getCheckBoxButtons,
  getDeleteIcons,
  themeButton,
} from "./element";
import {
  addTask,
  clearCompletedTask,
  completedTasks,
  deleteTask,
  showActiveTasks,
  showAllTasks,
  taskToggleCheck,
  toggleTheme,
} from "./util";

export const initListeners = () => {
  themeButton.addEventListener("click", toggleTheme);
  themeButton.addEventListener(
    "keydown",
    (e) => e.key === "Enter" && toggleTheme()
  );
  addButton.addEventListener("click", addTask);
  alltasksButton.addEventListener("click", showAllTasks);
  alltasksButton.addEventListener(
    "keydown",
    (e) => e.key === "Enter" && showAllTasks(e)
  );
  completedTasksButton.addEventListener("click", completedTasks);
  completedTasksButton.addEventListener(
    "keydown",
    (e) => e.key === "Enter" && completedTasks(e)
  );
  activetasksButton.addEventListener("click", showActiveTasks);
  activetasksButton.addEventListener(
    "keydown",
    (e) => e.key === "Enter" && showActiveTasks(e)
  );
  clearCompletedButton.addEventListener("click", clearCompletedTask);
  clearCompletedButton.addEventListener(
    "keydown",
    (e) => e.key === "Enter" && clearCompletedTask()
  );
};

export const giveListeners = () => {
  getDeleteIcons().forEach((icon, index) => {
    icon.addEventListener("click", () => deleteTask(index));
  });
  getCheckBoxButtons().forEach((checkbox, index) => {
    checkbox.addEventListener("click", () => taskToggleCheck(index));
  });
};

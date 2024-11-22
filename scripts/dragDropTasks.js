import { tasksList } from "./element";
import { getDataFromDB, renderTask, saveToDB } from "./util";

export const initDargDrop = () => {
  let draggedItem = null;

  tasksList.addEventListener("dragstart", (e) => {
    draggedItem = e.target;
    draggedItem.classList.add("draggbale");
  });

  tasksList.addEventListener("dragend", () => {
    if (draggedItem) {
      draggedItem.classList.remove("draggbale");
      draggedItem.style.opacity = 1;
    }
    draggedItem = null;
  });

  tasksList.addEventListener("dragover", (e) => e.preventDefault());
  tasksList.addEventListener("drop", (e) => {
    e.preventDefault();
    const target = e.target.closest(".task__list--item");

    if (target && draggedItem !== target) {
      let tasks = getDataFromDB("tasks");

      const draggedIndex = Array.from(tasksList.children).indexOf(draggedItem);
      const targetIndex = Array.from(tasksList.children).indexOf(target);

      tasks.splice(targetIndex, 0, tasks.splice(draggedIndex, 1)[0]);

      saveToDB("tasks", tasks);
      renderTask(tasks);
    }

    draggedItem = null;
  });
};

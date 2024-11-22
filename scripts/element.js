export const wrapperElement = document.querySelector(".wrapper");
export const themeButton = document.querySelector(".header__theme");
export const addButton = document.querySelector(".addButton");
export const input = document.querySelector(".input");
export const tasksList = document.querySelector(".task__list");
export const filterIcons = document.querySelectorAll(".list-filter");
export const alltasksButton = document.querySelector(".list-filter__all");
export const activetasksButton = document.querySelector(".list-filter__active");
export const clearCompletedButton = document.querySelector(".clear-completed");
export const countList = document.querySelector(".count-tasks");
export const completedTasksButton = document.querySelector(
  ".list-filter__completed"
);
export const getTasks = () => document.querySelectorAll(".task__list--item");
export const getDeleteIcons = () => document.querySelectorAll(".delete-icon");
export const getCheckBoxButtons = () =>
  document.querySelectorAll(".checkButton");

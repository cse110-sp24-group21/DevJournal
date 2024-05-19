// Note this is the note app from lab 6

import { storage } from './storage.js';

const tasksContainer = document.getElementById("task-list");
const addTaskButton = tasksContainer.querySelector(".add-task");
const deleteTaskButton = tasksContainer.querySelector(".delete-task");
let taskCount = 0;

getTasks().forEach(task => {
    const taskElement = createTaskElement(task.id, task.content);
    //tasksContainer.insertBefore(taskElement, addTaskButton);
    tasksContainer.append(taskElement);
    taskCount++;
});

document.addEventListener("keydown", (event) => deleteAllTasks(event));

addTaskButton.addEventListener("click", () => addTask());

//Creates new task elements
function createTaskElement(id, content){
  listContainer.innerHTML = ''; // empty list
          
  listContainer.innerHTML += '<li class="task">'
  + '<button class="dropdown-btn" onclick="toggleIcon(this)"><img src="images/triangle-right-black.svg" alt="Task Icon "class="task-icon light-mode-icon right-icon" onclick="toggleIcon(this)"></button>'; 
  + '<input class="checkbox" type="checkbox">'
  + '<h3 class="taskName">' + taskData.data[i].title + '</h3>'
  + '<p class="due-date">'+ taskData.data[i].dueDate + '</p>'
  + '<p class="description" style="display: none;">' + taskData.data[i].details + '</p>'
  + '</li>';
    const task = document.createElement("textarea");

    element.classList.add("task");
    element.value = content;
    element.placeholder = "New Task";
    
    element.addEventListener("change", () =>{
        updateTask(id, element.value);
    });
   
    element.addEventListener("dblclick", () => {
        deleteTask(id, element);
    });

    return element;
}

//Adds new Tasks to page
function addTask(){

    const tasks = getTasks();
    const taskObject = {
        id: Math.floor(Math.random() * 2000000),
        title: "Example Task",
        assignDate: "2024-05-18T13:37:27Z",
        dueDate: "2024-05-20T23:59:59Z",
        description: "Just an example task used for testing purposes",
        tags: ["python", "logistics"]
    };

    const taskElement = createTaskElement(taskObject.id, taskObject.content);
    tasksContainer.append(taskElement);
    tasks.push(taskObject);
    saveTasks(tasks);
    taskCount++
}

//Updates Task with new given content
function updateTask(id, newContent) {

    tasks = getTasks();
    updatedTask = getTask(tasks, id);
    updatedTask.content = newContent;
    saveTasks(tasks);
}

//Get all the tasks from local storage
function getTasks() {
    return storage.getItems('tasks');
}

//Get a certain task based of id
function getTask(tasks, id) {
    return tasks.filter(task => task.id == id)[0];
}

//Saves all tasks to local storage
function saveTasks(tasks){
    localStorage.setItem("stickytasks-tasks", JSON.stringify(tasks));
}

//Deletes a single specific task with double click
function deleteTask(id, element){
    const tasks = getTasks().filter(task => task.id != id);
    saveTasks(tasks);
    tasksContainer.removeChild(element);
    taskCount--;
}

//deletes all tasks with crt + shift + D
function deleteAllTasks(event){
    if (event.ctrlKey && event.shiftKey && event.key === 'D') {
        if(confirm("Do you want to delete all tasks")){
            for(var i = 0; i < taskCount; i++){
                tasksContainer.removeChild(tasksContainer.lastChild);
            }
            saveTasks(JSON.parse("[]"));
            taskCount = 0;
        }
    }
}
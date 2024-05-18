// Note this is the note app from lab 6

import { storage } from './storage.js';

const tasksContainer = document.getElementById("tasks-app");
const addTaskButton = tasksContainer.querySelector(".add-task");
let taskCount = 0;

getTasks().forEach(task => {
    const taskElement = createTaskElement(task.id, task.content);
    //tasksContainer.insertBefore(taskElement, addTaskButton);
    tasksContainer.append(taskElement);
    taskCount++;
});

document.addEventListener("keydown", (event) => deleteAllTasks(event));

//UI button change feature
addTaskButton.addEventListener("mouseover", ()=> {
    addTaskButton.textContent = "+";
});
addTaskButton.addEventListener("mouseout", () => { 
    addTaskButton.textContent = "Add Task"; 
});

addTaskButton.addEventListener("click", () => addTask());

//Creates new task elements
function createTaskElement(id, content){

    const element = document.createElement("textarea");

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
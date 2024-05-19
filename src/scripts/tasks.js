import { storage } from './storage.js';

let tasks; // The variable we'll use to add our array of objects we fetch
let taskURL = '../assets/json/tasklist.json'; // the URL to fetch from
const tasklistContainer = document.getElementById("task-list");   // determine the tasklist container
const addTaskButton = tasklistContainer.querySelector(".add-task");  // get an add task button
const deleteTaskButton = tasklistContainer.querySelector(".delete-task");  // get a delete task button

// Bind the init() function to run once the page loads
window.addEventListener('DOMContentLoaded', init);

/** Initializes every function, they all stem from here */
async function init() {
  // Attempt to fetch the task items
  try {
    await fetchTasks();
  } catch (err) {
    console.log(`Error fetch tasks: ${err}`);
    return; // Return if fetch fails
  }
  populatePage(); // Add tasks elements to page with fetched data
  bindUpdates(); // Add the event listeners to those elements
}

/**
 * Fetches all of the products from itemsURL top and stores them
 * inside the global items variable. 
 * @returns {Promise} Resolves if the items are found it localStorage or if they
 *                    are fetched correctly
 */
async function fetchTasks() {
  return new Promise((resolve, reject) => {
    let tasklist = localStorage.getItem('tasklist')
    if (tasklist) {
      tasks = JSON.parse(tasklist);
      resolve();
    } else {
      fetch(taskURL)
        // Grab the response first, catch any errors here
        .then(response => response.json())
        .catch(err => reject(err))
        // Grab the data next, cach errors here as well
        .then(data => {
          if (data) {
            localStorage.setItem('tasklist', JSON.stringify(data));
            tasks = data;
            resolve();
          }
        })
        .catch(err => reject(err));
    }
  });
}

/**
 * Adds the Fetched tasks to the webpage -> UI Task
 */
function populatePage() {
  return
  if (!tasks) return;
  // Get all of the items currently in the cart from storage
  tasks = storage.getItems('tasklist');
  // Iterate over each of the items in the array
  items.forEach(item => {
    // Create <product-item> element and populate it with item data
    let productItem = document.createElement('task-element');
    productItem.data = item;
    // If the item was in the cart already, set it to be that way
    if (inCart.indexOf(item.id) > -1) {
      productItem.alreadyInCart();
    }
    // Add the item to the webpage
    document.querySelector('#product-list').appendChild(productItem);
  });
  // Update the cart count in the webpage
  document.querySelector('#cart-count').innerHTML = inCart.length;
}

/**
 * Binds the event listeners to each item for when the add to cart & remove
 * from cart buttons get pressed
 */
function bindUpdates() {
  addTaskButton.addEventListener('addNewTask', () => { createTaskElement() });
  // deleteTaskButton.addEventListener('deleteSelectedTasks', () => { deleteSelectedTasks() });
}

//Creates new task elements
function createTaskElement(){
    // storage.addItem('task', id) cart update
    inputTitle = document.getElementById("input-title");
    inputDate = document.getElementById("input-date");
    inputDescription = document.getElementById("input-description");
    inputTags = document.getElementById("input-tags");
    currDate = new Date()
    const taskObject = {
      id: Math.floor(Math.random() * 2000000),
      title: inputTitle.value,
      assignDate: currDate.value.toISOString(),
      dueDate: inputDate.value.toISOString(),
      description: inputDescription.value,
      tags: inputTags.value.split(' ')
    };
    return taskObject;
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
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Deletes a single specific task with double click
function deleteTask(id, element){
    const tasks = getTasks().filter(task => task.id != id);
    saveTasks(tasks);
    tasksContainer.removeChild(element);
    taskCount--;
}

//deletes all tasks with crt + shift + D
function deleteSelectedTasks(event){
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
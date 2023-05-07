/*======= TASK LIST PROJECT =======*/

// Define UI Vars
const form = document.getElementById('task-form');
const taskInput = document.getElementById('task');
const filter = document.getElementById('filter');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');

// Load all event listeners function call
loadEventListeners();

// Load all event listeners function definition
function loadEventListeners() {
  // Add DOMContentLoaded event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event 
  form.addEventListener('submit', addTask);
  // Add click event to taskList
  taskList.addEventListener('click', deleteTask);
  // Add click event to clearBtn
  clearBtn.addEventListener('click', clearTasks);
  // Add keyup event o filter
  filter.addEventListener('keyup', filterTasks);
}

// Define getTasks function
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(task => {
    // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(task));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Set href attribute
  link.setAttribute('href', '#');
  // Add delete icon to link
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);
  // Append li to ul
  taskList.appendChild(li);
  });
}

// Add Task function definition
function addTask(e) {
  // Validate if input is empty
  if (taskInput.value === '') {
    alert('Please add a task');
    return;
  }

  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Set href attribute
  link.setAttribute('href', '#');
  // Add delete icon to link
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);
  // Append li to ul
  taskList.appendChild(li);

  // Store tasks in LS
  storeTaskInLocalStorage(taskInput.value);

  // Clear task input
  taskInput.value = '';

  e.preventDefault();
}

// Define store tasks in LS function
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Define deleteTask function
function deleteTask(e) {
  // Delete tasks one by one
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm(`You about to delete "${e.target.parentElement.parentElement.textContent}" task`))
      e.target.parentElement.parentElement.remove();
  
    // Delete tasks from LS
    deleteFromLocalStorage(e.target.parentElement.parentElement);
  }
}

// Define deleteFromlocalStorage function
function deleteFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Define clearTasks function
function clearTasks() {
  // taskList.innerHTML = '';

  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear tasks from LS
  (function clearTasksFromLocalStorage() {
    if (confirm('Clear the entire task list, are you sure?'))
      localStorage.clear();
  }());
}

// Define filterTasks funtion
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(task => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) !== -1) {
      task.style.display = 'block';
    }
    else {
      task.style.display = 'none';
    }
  });
}

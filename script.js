// script.js
// Advanced To-Do List with Local Storage
document.addEventListener('DOMContentLoaded', function () {

    // Select DOM elements using the exact IDs required
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // addTask function: adds a task to the DOM and optionally saves to localStorage
    function addTask(taskText = null, save = true) {
        // Determine text: if taskText provided (from load), use it; otherwise read input
        const text = (taskText !== null) ? String(taskText).trim() : taskInput.value.trim();

        // If empty, alert when user tried to add interactively
        if (!text) {
            if (taskText === null) {
                alert('Please enter a task.');
            }
            return;
        }

        // Create list item
        const li = document.createElement('li');
        li.textContent = text;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // When Remove clicked: remove li from DOM and update localStorage
        removeBtn.addEventListener('click', function () {
            if (li.parentNode === taskList) {
                taskList.removeChild(li);
            }

            // Update localStorage: remove first matching instance
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const index = storedTasks.indexOf(text);
            if (index > -1) {
                storedTasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(storedTasks));
            }
        });

        // Append remove button and list item
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Save to localStorage if requested
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(text);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));

            // Clear input and focus for convenience
            taskInput.value = '';
            taskInput.focus();
        }
    }

    // loadTasks function: reads tasks from localStorage and populates the list
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(function (taskText) {
            // Add to DOM without saving again to localStorage (save = false)
            addTask(taskText, false);
        });
    }

    // Attach event listeners
    addButton.addEventListener('click', function () {
        addTask();
    });

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            addTask();
        }
    });

    // Load tasks at startup
    loadTasks();

});

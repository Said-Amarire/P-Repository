// script.js
// Advanced To-Do List with localStorage persistence
document.addEventListener('DOMContentLoaded', function () {

    // --- Select DOM elements exactly as required ---
    const addButton = document.getElementById('add-task-btn'); // Add Task button
    const taskInput = document.getElementById('task-input');   // Input field for new task
    const taskList = document.getElementById('task-list');     // UL that will contain tasks

    // --- Function: addTask ---
    // Adds a task to the DOM and optionally saves it to localStorage.
    // Parameters:
    //   taskText (string|null) - if provided, uses this text instead of reading the input field.
    //   save (boolean) - if true (default) the task is saved into localStorage.
    function addTask(taskText = null, save = true) {
        // If taskText is null, read from the input field and trim
        const text = (taskText !== null) ? String(taskText).trim() : taskInput.value.trim();

        // If the text is empty, show alert (only when triggered by manual add, not when loading from storage)
        if (!text) {
            if (taskText === null) {
                // Only alert when user attempted to add an empty task interactively
                alert('Please enter a task.');
            }
            return; // do nothing for empty strings
        }

        // Create <li> element and set its text content
        const li = document.createElement('li');
        li.textContent = text;

        // Create the remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Attach the click event to remove the task from DOM and localStorage
        removeBtn.addEventListener('click', function () {
            // Remove the li element from the task list
            if (li.parentNode === taskList) {
                taskList.removeChild(li);
            }

            // Update localStorage: load array, remove the first matching instance, save back
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const index = storedTasks.indexOf(text);
            if (index > -1) {
                storedTasks.splice(index, 1); // remove the item
                localStorage.setItem('tasks', JSON.stringify(storedTasks));
            }
        });

        // Append the remove button to the li and li to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // If this addition should be saved to localStorage, update persistent storage
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(text);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));

            // Clear the input field after successful add
            taskInput.value = '';
            taskInput.focus();
        }
    }

    // --- Function: loadTasks ---
    // Loads tasks array from localStorage and renders them by calling addTask(..., false)
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(function (taskText) {
            // Use save = false to avoid saving again when rendering
            addTask(taskText, false);
        });
    }

    // --- Attach event listeners ---

    // Click on "Add Task" button
    addButton.addEventListener('click', function () {
        addTask(); // read value from taskInput and save to localStorage
    });

    // Allow adding by pressing Enter inside the input field
    // Use 'keypress' as specified; check event.key === 'Enter'
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // prevent form submit or default behavior
            addTask();
        }
    });

    // --- Initialize: load tasks from localStorage when page loads ---
    loadTasks();

});

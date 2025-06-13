document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when page loads
    loadTasks();

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || [];
        storedTasks.forEach(taskText => {
            createTaskElement(taskText, false); // false means don't save to Local Storage again
        });
    }

    // Function to create a task element (separated from addTask for reusability)
    function createTaskElement(taskText, saveToStorage = true) {
        // Create new list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');
        
        // Add click event to remove button
        removeButton.onclick = function() {
            // Remove from DOM
            taskList.removeChild(li);
            // Remove from Local Storage
            removeTaskFromStorage(taskText);
        };

        // Add elements to the DOM
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Save to Local Storage if needed
        if (saveToStorage) {
            saveTaskToStorage(taskText);
        }
    }

    // Function to save a task to Local Storage
    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Main addTask function
    function addTask() {
        const taskText = taskInput.value.trim();
        
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        createTaskElement(taskText);
        
        // Clear the input field
        taskInput.value = '';
    }

    // Event listeners
    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});

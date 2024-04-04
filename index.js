document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from Local Storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="task ${task.status === 'completed' ? 'completed' : ''}">${task.name}</span>
                <button class="editBtn" onclick="editTask(${index})">Edit</button>
                <button class="deleteBtn" onclick="deleteTask(${index})">Delete</button>
                <button class="statusBtn" onclick="toggleStatus(${index})">${task.status === 'completed' ? 'Not Completed' : 'Completed'}</button>
            `;
            taskList.appendChild(li);
        });
    }

    // Add Task
    addTaskBtn.addEventListener('click', () => {
        const taskName = taskInput.value.trim();
        if (taskName !== '') {
            tasks.push({ name: taskName, status: 'pending' });
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
            taskInput.value = '';
        }
    });

    // Edit Task
    window.editTask = function(index) {
        const newName = prompt('Enter new task name:');
        if (newName !== null) {
            tasks[index].name = newName;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        }
    };

    // Delete Task
    window.deleteTask = function(index) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    };

    // Toggle Task Status
    window.toggleStatus = function(index) {
        tasks[index].status = tasks[index].status === 'completed' ? 'pending' : 'completed';
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    };

    // Initial render
    renderTasks();
});
const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");

let tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];

displayTasks();

// Add Task
addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    const date = taskDate.value;

    if (text === "") return;

    const newTask = {
        id: Date.now(),
        title: text,
        date: date,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    displayTasks();

    taskInput.value = "";
    taskDate.value = "";
});

// Display Tasks
function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.classList.add("task-item");

        const info = document.createElement("div");
        info.classList.add("task-info");

        const title = document.createElement("p");
        title.textContent = task.title;
        if (task.completed) title.classList.add("completed");

        const dateTxt = document.createElement("p");
        dateTxt.classList.add("date");
        dateTxt.textContent = task.date ? `📅 ${task.date}` : "";

        info.appendChild(title);
        info.appendChild(dateTxt);

        const btns = document.createElement("div");
        btns.classList.add("btns");

        const doneBtn = document.createElement("button");
        doneBtn.textContent = "Done";
        doneBtn.classList.add("done-btn");

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.classList.add("del-btn");

        // Mark Completed
        doneBtn.onclick = () => {
            task.completed = !task.completed;
            saveTasks();
            displayTasks();
        };

        // Edit Task
        editBtn.onclick = () => {
            let updated = prompt("Edit task:", task.title);
            if (updated !== null && updated.trim() !== "") {
                task.title = updated.trim();
                saveTasks();
                displayTasks();
            }
        };

        // Delete Task
        delBtn.onclick = () => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            displayTasks();
        };

        btns.appendChild(doneBtn);
        btns.appendChild(editBtn);
        btns.appendChild(delBtn);

        li.appendChild(info);
        li.appendChild(btns);
        taskList.appendChild(li);
    });
}

// Save to Local Storage
function saveTasks() {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

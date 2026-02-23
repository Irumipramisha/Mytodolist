// 1. Taking previous tasks while the page is loading
document.addEventListener('DOMContentLoaded', getTodos);

const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

// 2. Add task
function addTask() {
    if (todoInput.value.trim() === '') return; 

    const todoText = todoInput.value;
    createTodoElement(todoText);
    saveLocal(todoText); 
    todoInput.value = '';
}

// 3. Make the List of UI
function createTodoElement(text) {
    const li = document.createElement('li');
    
    // UI incude task and buttons
    li.innerHTML = `
        <span>${text}</span>
        <div>
            <button class="done-btn" onclick="toggleDone(this)">Done</button>
            <button style="background: #ff4d4d; margin-left:5px;" onclick="deleteTodo(this)">X</button>
        </div>
    `;
    todoList.appendChild(li);
}

// 4. Show that a job is done (Strike-through)
function toggleDone(btn) {
    const parent = btn.parentElement.parentElement;
    parent.classList.toggle('completed');
}

// 5. Deleting a task completely
function deleteTodo(btn) {
    const item = btn.parentElement.parentElement;
    const text = item.querySelector('span').innerText;
    removeLocal(text);
    item.remove();
}

// 6. Save to Local Storage 
function saveLocal(todo) {
    let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// 7. Remove from Local Storage 
function removeLocal(todo) {
    let todos = JSON.parse(localStorage.getItem('todos'));
    const index = todos.indexOf(todo);
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// 8. Show previos data again
function getTodos() {
    let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    todos.forEach(todo => createTodoElement(todo));
}

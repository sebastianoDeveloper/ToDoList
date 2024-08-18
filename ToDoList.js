/**
 * Este proyecto es un ToDoList o Task Manager
 * Podemos cambiar el tema:
 * Podemos agregar tareas y se van agregando a la lista
 * Hacemos un CRUD con las tareas
 *
 * Esto tiene persistencia de datos, aunque se refresque la pagina con F5
 * Utilizamos la WEB API llamada Local Storage
 *
 * ¿Que es un API?
 * Es un app programing interface
 * En español: una interfaz de programación de aplicacion
 * Funciona como un intermediario para k 2 app se puedan comunicar
 * Es un conjunto de reglas y definiciones k permite k diferentes programas de software se comuniquen entre ellos
 * ¿Que es un web API?
 * es la forma en la cual nosotros nos podemos comunicar con iertas fucnionalidades k vienen en el navegador, k ahi es donde entra el localStorage,
 * ¿Que es localStorage?
 * es una web api k permite almacenar datos en el navegador de forma persistente
*/
const formulario = document.getElementById('task_form')
const taskList = document.getElementById("task_list")

loadTasks();

formulario.addEventListener('submit', (event) => {
  event.preventDefault()
  const taskInput = document.getElementById("task_input")
  const task = taskInput.value
  if (task) {
    taskList.append(createTaskElement(task));
    storeTaskInLocalStorage(task)
    taskInput.value = ''
  }
})

function createTaskElement(task) {
  const li = document.createElement("li");
  li.textContent = task;
  li.append(createButton("❌", "delete_btn"),
    createButton("✏️", "edit_btn"));
  return li;
}

function createButton(text, className) {
  const btn = document.createElement("span");
  btn.textContent = text;
  btn.className = className;
  return btn;
}

taskList.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete_btn')) {
    deleteTask(event.target.parentElement)
  }else if (event.target.classList.contains('edit_btn')) {
    editTask(event.target.parentElement)

  }

});

function deleteTask(taskItem) {
  if (confirm('Estás seguro/a de borrar este elemento?')) {
    taskItem.remove()
  }
}
function editTask(taskItem) {
  const newTask= prompt("Edita la tarea:", taskItem.firstChild.textContent)
  if (newTask !== null) {
    taskItem.firstChild.textContent = newTask
  }
  updateLocalStorage()
}
function storeTaskInLocalStorage(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  tasks.push(task);
  localStorage.setItem('tasks',JSON.stringify(tasks));
}
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  tasks.forEach((task) => {
    taskList.appendChild(createTaskElement(task));
  });
}
function updateLocalStorage() {
  const tasks = Array.from(taskList.querySelectorAll('li')).map((li) => li.firstChild.textContent);
  localStorage.setItem('tasks',JSON.stringify(tasks));
  // console.log(tasks);
}

const toggleThemeBtn = document.getElementById('toggle_theme_btn');
const currentTheme = localStorage.getItem('theme');
console.log(currentTheme);

toggleThemeBtn.addEventListener('click',() => {
  document.body.classList.toggle('dark_theme');
  const theme = document.body.classList.contains('dark_theme') ? 'dark' : 'light';
  localStorage.setItem('theme',theme);
});
if (currentTheme === 'dark') {
  document.body.classList.add('dark_theme');

}

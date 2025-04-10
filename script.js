let todos = [];
const todoList = document.getElementById('todoList');
const searchInput = document.getElementById('searchInput');
const detailsView = document.getElementById('detailsView');
const todoDetails = document.getElementById('todoDetails');

fetch('https://jsonplaceholder.typicode.com/todos')
  .then(response => response.json())
  .then(data => {
    todos = data;
    renderList(todos);
  });

searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filtered = todos.filter(todo => todo.title.toLowerCase().includes(searchTerm));
  renderList(filtered);
});

function renderList(todosToRender) {
  todoList.innerHTML = '';
  todosToRender.forEach(todo => {
    const row = document.createElement('tr');

    const titleCell = document.createElement('td');
    titleCell.textContent = todo.title;
    row.appendChild(titleCell);

    const completedCell = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => {
      todo.completed = checkbox.checked; // Bind com a propriedade
    });
    completedCell.appendChild(checkbox);
    row.appendChild(completedCell);

    const detailsCell = document.createElement('td');
    const button = document.createElement('button');
    button.textContent = '🔍';
    button.addEventListener('click', () => showDetails(todo));
    detailsCell.appendChild(button);
    row.appendChild(detailsCell);

    todoList.appendChild(row);
  });
}

function showDetails(todo) {
  todoDetails.innerHTML = `
    <strong>ID:</strong> ${todo.id}<br>
    <strong>Usuário:</strong> ${todo.userId}<br>
    <strong>Título:</strong> ${todo.title}<br>
    <strong>Completado:</strong> ${todo.completed ? 'Sim' : 'Não'}
  `;
  detailsView.style.display = 'block';
}

function closeDetails() {
  detailsView.style.display = 'none';
}

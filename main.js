import { getState, setState, login, logout, addTask, updateTaskStatus, deleteTask } from './store.js';

const app = document.getElementById('app');

function render() {
  const state = getState();
  if (!state.user) {
    app.innerHTML = `
      <div class="auth-container">
        <form id="login-form" class="auth-card">
          <h1>TaskFlow Login</h1>
          <div class="input-group">
            <input type="email" id="email" placeholder="Email (test@test.com)" required>
          </div>
          <div class="input-group">
            <input type="password" id="password" placeholder="Password (any)" required>
          </div>
          <button type="submit" class="btn">Login / Simulate SSO</button>
        </form>
      </div>
    `;
    document.getElementById('login-form').addEventListener('submit', (e) => {
      e.preventDefault();
      login(document.getElementById('email').value);
      render();
    });
  } else {
    app.innerHTML = `
      <div class="dashboard">
        <header class="header">
          <h2>TaskFlow Dashboard</h2>
          <div>
            <span style="margin-right: 1rem;">Welcome, ${state.user.email}</span>
            <button id="logout-btn" class="btn btn-small">Logout</button>
          </div>
        </header>
        <main class="main-content">
          <form id="add-task-form" class="task-controls">
            <input type="text" id="new-task-title" placeholder="What needs to be done?" required>
            <button type="submit" class="btn" style="width: auto;">Add Task</button>
          </form>
          <div class="board">
            ${renderColumn('todo', 'To Do', state.tasks)}
            ${renderColumn('doing', 'In Progress', state.tasks)}
            ${renderColumn('done', 'Done', state.tasks)}
          </div>
        </main>
      </div>
    `;
    
    document.getElementById('logout-btn').addEventListener('click', () => { logout(); render(); });
    document.getElementById('add-task-form').addEventListener('submit', (e) => {
      e.preventDefault();
      addTask(document.getElementById('new-task-title').value);
      render();
    });

    // Attach delegated events for dynamic buttons
    document.querySelectorAll('.move-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        updateTaskStatus(e.target.dataset.id, e.target.dataset.status);
        render();
      });
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        deleteTask(e.target.dataset.id);
        render();
      });
    });
  }
}

function renderColumn(status, title, tasks) {
  const columnTasks = tasks.filter(t => t.status === status);
  return `
    <div class="column">
      <h2>${title} (${columnTasks.length})</h2>
      <div class="task-list">
        ${columnTasks.map(t => `
          <div class="task-card">
            <div class="task-header">
              <span class="task-title">${t.title}</span>
            </div>
            <div class="task-actions">
              ${status !== 'todo' ? `<button class="btn btn-small move-btn" data-id="${t.id}" data-status="todo">To Do</button>` : ''}
              ${status !== 'doing' ? `<button class="btn btn-small move-btn" data-id="${t.id}" data-status="doing">Doing</button>` : ''}
              ${status !== 'done' ? `<button class="btn btn-small move-btn" data-id="${t.id}" data-status="done">Done</button>` : ''}
              <button class="btn btn-small btn-danger delete-btn" data-id="${t.id}">Delete</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Initial render
render();

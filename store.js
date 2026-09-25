// Persistent State Management using LocalStorage
const STORAGE_KEY = 'taskflow_capstone_state';

const defaultState = {
  user: null,
  tasks: []
};

let state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultState;

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getState() {
  return state;
}

export function login(email) {
  state.user = { email, token: Math.random().toString(36).substr(2) };
  saveState();
}

export function logout() {
  state.user = null;
  saveState();
}

export function addTask(title) {
  const newTask = {
    id: Date.now().toString(),
    title,
    status: 'todo',
    createdAt: new Date().toISOString()
  };
  state.tasks.push(newTask);
  saveState();
}

export function updateTaskStatus(id, newStatus) {
  const task = state.tasks.find(t => t.id === id);
  if (task) {
    task.status = newStatus;
    saveState();
  }
}

export function deleteTask(id) {
  state.tasks = state.tasks.filter(t => t.id !== id);
  saveState();
}

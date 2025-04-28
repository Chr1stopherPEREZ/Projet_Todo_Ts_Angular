import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private storageKey = 'todos';
  private todos: Todo[] = [];

  constructor() {
    this.todos = this.loadTodos();
  }

  /** Retourne toutes les tâches */
  getAll(): Todo[] {
    return this.todos;
  }

  /** Ajoute une tâche (avec completed=false) */
  add(title: string) {
    this.todos.push({ title, completed: false });
    this.save();
  }

  /** Supprime la tâche à l’index donné */
  remove(index: number) {
    this.todos.splice(index, 1);
    this.save();
  }

  /** Bascule l’état completed */
  toggle(index: number) {
    this.todos[index].completed = !this.todos[index].completed;
    this.save();
  }

  /** Sauvegarde dans localStorage */
  private save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.todos));
  }

  /** Charge depuis localStorage */
  private loadTodos(): Todo[] {
    const raw = localStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) : [];
  }
}

/* Todo.Service.ts */

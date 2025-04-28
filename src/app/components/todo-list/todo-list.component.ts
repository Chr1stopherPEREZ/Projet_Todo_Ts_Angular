import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  filter: 'all' | 'active' | 'completed' = 'all';
  newTitle = '';

  constructor(public todoService: TodoService) {}

  ngOnInit(): void {
    this.load();
  }

  /** Recharge la liste selon le filtre */
  load(): void {
    const all = this.todoService.getAll();
    if (this.filter === 'active') {
      this.todos = all.filter((t) => !t.completed);
    } else if (this.filter === 'completed') {
      this.todos = all.filter((t) => t.completed);
    } else {
      this.todos = all;
    }
  }

  /** Ajoute si le titre n’est pas vide */
  add(): void {
    const title = this.newTitle.trim();
    if (!title) {
      return;
    }
    this.todoService.add(title);
    this.newTitle = '';
    this.load();
  }

  /** Quand on change le select */
  onFilterChange(value: 'all' | 'active' | 'completed'): void {
    this.filter = value;
    this.load();
  }
}

/* Todo-List.Components.ts */

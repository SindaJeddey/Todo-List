import { Injectable, NotFoundException } from "@nestjs/common";
import { NewTodoDto } from "./entities/Dtos/newTodo.dto";
import { Todo } from "./entities/todo.entity";

@Injectable()
export class TodoService {
  todos: Todo[] = [];

  getAllTodos(): Todo[]{
    return this.todos;
  }

  getTodo(id) : Todo{
    const todo = this.todos.find((actualtodo) => actualtodo.id === id);
    if (todo) {
      return todo;
    }
    throw new NotFoundException(`Todo id ${id} not found`);
  }

  createTodo(newTodo: NewTodoDto) : Todo{
    const {name,description} = newTodo
    const id = this.todos ? this.todos.length + 1 : 1;
    const todo = {
      id,
      name,
      description,
      createdAt: new Date()
    }
    this.todos.push(todo);
    return todo;
  }

  updateTodo(id,updates: Partial<Todo>): Todo{
    const todo = this.getTodo(id);
    todo.name = updates.name ? updates.name : todo.name;
    todo.description = updates.description ? updates.description : todo.description
    return todo;
  }

  deleteTodo(id){
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index >= 0) {
      this.todos.slice(index, index + 1);
      return 'To do supprimé';
    } else throw new NotFoundException(`Todo id ${id} not found`);
  }
}

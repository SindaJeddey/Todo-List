import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('todo')
export class TodoController {
  @Get()
  getTodos(): string {
    console.log('Liste des todo');
    return 'Liste des todos';
  }
  @Post()
  newTodo(): string {
    console.log("Création d'un nouveau to-do");
    return 'New To Do';
  }
  @Put()
  updateTodo(): string {
    console.log("MAJ d'un to-do");
    return 'To Do mis à jour';
  }
  @Delete()
  deleteTodo(): string {
    console.log("Suppression d'un to-do");
    return 'To Do supprimé';
  }
}

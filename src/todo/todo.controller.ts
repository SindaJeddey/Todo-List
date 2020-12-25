import { Controller, Delete, Get, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('todo')
export class TodoController {
  @Get()
  getTodos(@Req() request: Request, @Res() response: Response): string {
    console.log('Liste des todo');
    response.send('Liste des todos dans le corps de la réponse'); //overrides the return statement
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

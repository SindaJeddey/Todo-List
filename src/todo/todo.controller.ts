import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Todo } from './entities/todo.entity';

@Controller('todo')
export class TodoController {
  todos: Todo[];

  constructor() {
    this.todos = [];
  }

  @Get()
  getTodos(
    @Req() request: Request,
    @Res() response: Response,
    @Query() queryParams,
  ): Todo[] {
    console.log(queryParams);
    response.send(this.todos); //overrides the return statement
    return this.todos;
  }

  @Get('/:id')
  getTodo(@Param('id') id): Todo {
    const todo = this.todos.find((actualtodo) => actualtodo.id === +id);
    if (todo) {
      return todo;
    }
    throw new NotFoundException(`Todo id ${id} not found`);
  }

  @Post()
  newTodo(@Body() todo: Todo): Todo {
    todo.id = this.todos.length + 1;
    this.todos.push(todo);
    return todo;
  }

  @Put()
  updateTodo(): string {
    console.log("MAJ d'un to-do");
    return 'To Do mis à jour';
  }
  @Delete('/:id')
  deleteTodo(@Param('id') id): string {
    const index = this.todos.findIndex((todo) => todo.id === +id);
    console.log(index);
    if (index >= 0) {
      this.todos.slice(index, index + 1);
      return 'To do supprimé';
    } else throw new NotFoundException(`Todo id ${id} not found`);
  }
}

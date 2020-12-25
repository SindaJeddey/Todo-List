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
import { NewTodoDto } from "./entities/Dtos/newTodo.dto";
import { TodoService } from "./todo.service";

@Controller('todo')
export class TodoController {

  constructor(private todoService: TodoService) {}

  @Get()
  getTodos(
    @Req() request: Request,
    @Res() response: Response,
    @Query() queryParams,
  ): Todo[] {
    return this.todoService.getAllTodos();
  }

  @Get('/:id')
  getTodo(@Param('id') id): Todo {
    return this.todoService.getTodo(id);
  }

  @Post()
  newTodo(
    @Body() newTodo: NewTodoDto
  ): Todo {
    return this.todoService.createTodo(newTodo);
  }

  @Put('/:id')
  updateTodo(
    @Param('id') id,
    @Body() updates: Partial<Todo>
  ): Todo {
    return this.todoService.updateTodo(id,updates);
  }

  @Delete('/:id')
  deleteTodo(@Param('id') id): string {
    this.todoService.deleteTodo(id);
    return 'To do deleted';
  }
}

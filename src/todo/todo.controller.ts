import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res, UseInterceptors
} from "@nestjs/common";
import { Request, Response } from "express";
import { Todo } from "./entities/todo.entity";
import { NewTodoDto } from "./entities/Dtos/newTodo.dto";
import { TodoService } from "./todo.service";
import { UpperAndFusionPipe } from "../pipes/upper-and-fusion.pipe";
import { DurationInterceptor } from "../interceptors/duration.interceptor";

@UseInterceptors(DurationInterceptor)
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
  getTodo(@Param('id',new ParseIntPipe({ //for pipe customizing
    errorHttpStatusCode: HttpStatus.NOT_FOUND
  })) id): Todo {
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
    @Param('id',ParseIntPipe) id,
    @Body() updates: Partial<Todo>
  ): Todo {
    return this.todoService.updateTodo(id,updates);
  }

  @Delete('/:id')
  deleteTodo(@Param('id',ParseIntPipe) id): string {
    this.todoService.deleteTodo(id);
    return 'To do deleted';
  }

  @Post('pipe')
  testPipe(@Body(UpperAndFusionPipe) data){
    return data;
  }
}

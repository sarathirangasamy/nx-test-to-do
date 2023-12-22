import { Body, Controller, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
@Controller('toDo')
export class TodoController {
  constructor(private toDoService: TodoService) {}

  //   @Post('/create')
  //   async toDoCreate(@Body() data) {
  //     return this.toDoService.createTodo();
  //   }

  @Post('/create')
  async toDoCreate(@Body('name') name: string) {
    return this.toDoService.createTodo(name);
  }
}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
@Controller('toDo')
export class TodoController {
  constructor(private toDoService: TodoService) {}

  @Post('/create')
  async toDoCreate(@Body() data) {
    return this.toDoService.createTodo(data?.name);
  }

  @Get('getTodo/:id')
  getTodoWithId(@Param('id') id: string) {
    return this.toDoService.getTodo(id);
  }

  @Post('update-todo')
  async updateTodo(@Body() data) {
    return this.toDoService.updateTodo(data?.id, data?.name);
  }

  @Post('get-all-todo-list')
  getAllTodoList(@Body() data) {
    return this.toDoService.getTodoList(data?.take, data?.skip);
  }

  //   @Post('/create')
  //   async toDoCreate(@Body('name') name: string) {
  //     console.log(name)
  //     return
  //     return this.toDoService.createTodo(name);
  //   }
}

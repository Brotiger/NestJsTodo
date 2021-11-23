import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CreateDto, UpdateDto } from './dto/todo.dto';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';

@Controller('rest/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService){}

  @Get()
  async getAllAction(): Promise<Todo[]>{
    return this.todoService.findAll();
  }

  @Get(':id')
  async getOneAction(
    @Param('id')
    id: string
  ): Promise<Todo>{
    const todo = await this.todoService.finedOne(id);

    if (todo === undefined){
      throw new HttpException(`Todo with id=${id} not exists`, HttpStatus.NOT_FOUND);
    }

    return todo;
  }

  @Put(':id')
  async updateAction(
    @Param('id')
    id: string,
    
    @Body()
    updateDto: UpdateDto
  ): Promise<Todo>{
    const todo = await this.todoService.finedOne(id);

    if (todo === undefined){
      throw new HttpException(`Todo with id=${id} not exists`, HttpStatus.NOT_FOUND);
    }

    todo.title = updateDto.title;
    todo.isCompleted = updateDto.isCompleted;

    return this.todoService.update(todo);
  }

  @Post()
  async createAction(
    @Body()
    createDto: CreateDto
  ): Promise<Todo>{

    const todo = new Todo();
    todo.title = createDto.title;

    if(createDto.isCompleted !== undefined){
      todo.isCompleted = createDto.isCompleted;
    }

    return this.todoService.create(todo);
  }

  @Delete(":id")
  async deleteAction(
    @Param('id')
    id: string
  ): Promise<void>{
    return this.todoService.remove(id);
  }
}

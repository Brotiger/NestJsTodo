import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateDto, UpdateDto } from './dto/todo.dto';
import { Todo } from './todo.entity';

@Controller('rest/todo')
export class TodoController {
  @Get()
  async getAllAction(): Promise<string>{
    return 'Todo get all';
  }

  @Get(':id')
  async getOneAction(
    @Param('id')
    id: string
  ): Promise<string>{
    return `Todo get one: ${id}`;
  }

  @Put(':id')
  async updateAction(
    @Param('id')
    id: string,
    
    @Body()
    todo: UpdateDto
  ): Promise<UpdateDto>{
    return todo;
  }

  @Post()
  async createAction(
    @Body()
    todo: CreateDto
  ): Promise<CreateDto>{
    return todo;
  }

  @Delete(":id")
  async deleteAction(
    @Param('id')
    id: string
  ): Promise<string>{
    return `Delete todo by id = ${id}`
  }
}

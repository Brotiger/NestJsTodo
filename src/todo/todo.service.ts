import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ){}

  async findAll(): Promise<Todo[]>{
    return this.todoRepository.find();
  }

  async finedOne(id: string): Promise<Todo>{
    return this.todoRepository.findOne(id);
  }

  async remove(id: string): Promise<void>{
    await this.todoRepository.delete(id);
  }

  async create(todo: Todo): Promise<Todo> {
    return this.todoRepository.save(todo)
  }

  async update(todo: Todo): Promise<Todo> {
    await this.todoRepository.findOneOrFail(todo.id)

    return this.todoRepository.save(todo)
  }
}

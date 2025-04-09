import { Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Repository } from "typeorm";
import { Task } from "./entities/task.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}
  async create(createTaskDto: CreateTaskDto) {
    const task = await this.taskRepository.create(createTaskDto);
    return await this.taskRepository.save(task);
  }

  async findAll() {
    return await this.taskRepository.find();
  }

  findOne(id: number) {
    return this.taskRepository.findOneBy({ id });
  }

  findByUserId(userId: number) {
    return this.taskRepository.find({ where: { userId } });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const taskUpdated = await this.taskRepository.update(id, updateTaskDto);
    return await this.taskRepository.findOneBy({ id });
  }

  remove(id: number) {
    return this.taskRepository.delete(id);
  }
}

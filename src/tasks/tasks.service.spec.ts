import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TaskStatus } from './task-status.enum';
import { TaskRepository } from './tasks.repositry';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});
const mockUser = {
  username: 'mohamed',
  password: 'somepassword',
  id: 'someid',
  tasks: [],
};
const mockTaskId = 'someId';
const mockTask = {
  title: 'someTitle',
  description: 'someDescription',
  id: 'someId',
  status: TaskStatus.OPEN,
};
describe('TaskService', () => {
  let tasksService: TasksService;
  let tasksRepository;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTasksRepository },
      ],
    }).compile();
    tasksService = module.get(TasksService);
    tasksRepository = module.get(TaskRepository);
  });
  describe('getTasks', () => {
    it('call TaskRepository.getTasks and return result', async () => {
      tasksRepository.getTasks.mockResolvedValue('someValue');
      const result = await tasksService.getTasks(null, mockUser);
      expect(result).toEqual('someValue');
    });
  });
  describe('getTaskById', () => {
    it('call TaskRepository.findOne and return result', async () => {
      tasksRepository.findOne.mockResolvedValue(mockTask);
      const res = await tasksService.getTaskById(mockTaskId, mockUser);
      expect(res).toEqual(mockTask);
    });
    it('call TaskRepository.findOne and throw exception', async () => {
      tasksRepository.findOne.mockResolvedValue(null);
      const res = tasksService.getTaskById(mockTaskId, mockUser);
      expect(res).rejects.toThrow(NotFoundException);
    });
  });
});

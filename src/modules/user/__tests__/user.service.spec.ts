import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { userEntityMock } from '../__mocks__/user.mock';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../user.service';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            insert: jest.fn().mockResolvedValue(userEntityMock),
            update: jest.fn().mockResolvedValue(userEntityMock),
            delete: jest.fn().mockResolvedValue(userEntityMock),
            findOne: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
      ],
    }).compile();
    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should return user in findOne', async () => {
    const user = await service.findOne({ id: userEntityMock.id });
    expect(user).toEqual(userEntityMock);
  });

  it('should return error in findOne', async () => {
    jest.spyOn(userRepository, 'findOne').mockReturnValue(undefined);
    expect(service.findOne({ id: userEntityMock.id })).rejects.toThrowError();
  });
});

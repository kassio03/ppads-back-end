import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getUserMock } from '../__mocks__';
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
            save: jest.fn().mockResolvedValue(getUserMock),
            update: jest.fn().mockResolvedValue({ statusCode: 200 }),
            delete: jest.fn().mockResolvedValue({ statuscode: 200 }),
            findOne: jest.fn().mockResolvedValue(getUserMock),
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
  /* 
  it('should return the user created in insert', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
    const user = await service.insert(createUserMock);
    console.log(user, getUserMock);

    expect(user).toEqual(getUserMock);
  });

  it('should return error if user exist', async () => {
    expect(await service.insert(createUserMock)).rejects.toThrowError();
  });
 */
  it('should return user in findOne', async () => {
    const user = await service.findOne({ id: getUserMock.id });
    expect(user).toEqual(getUserMock);
  });

  it('should return error in findOne', async () => {
    jest
      .spyOn(userRepository, 'findOne')
      .mockRejectedValue(new UnauthorizedException());
    await expect(service.findOne({ id: getUserMock.id })).rejects.toThrowError(
      new UnauthorizedException(),
    );
  });
});

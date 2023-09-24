import { Test, TestingModule } from '@nestjs/testing';
import { createUserMock, getUserMock, returnUserMock } from '../__mocks__';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: {
            insert: jest.fn().mockResolvedValue(getUserMock),
            update: jest.fn().mockResolvedValue({ statusCode: 200 }),
            delete: jest.fn().mockResolvedValue({ statusCode: 200 }),
            findOne: jest.fn().mockResolvedValue(getUserMock),
          },
        },
      ],
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should return user Entity in createUser', async () => {
    const user = await controller.createUser(createUserMock);
    expect(user.body).toEqual(returnUserMock);
  });
});

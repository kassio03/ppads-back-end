import { UserEntity } from '../entities/user.entity';

export const getUserMock: UserEntity = {
  email: 'mock@gmail.com',
  id: 'd1h08d-i82u31in-c01i23u-j0198fd',
  name: 'Name Mock',
  password: 'largePassword',
  updatedAt: new Date(),
  createdAt: new Date(),
  deletedAt: new Date(),
  events: [],
  tickets: [],
};

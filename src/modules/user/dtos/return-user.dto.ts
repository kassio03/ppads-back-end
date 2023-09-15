import { UserEntity } from '../entities/user.entity';

export class ReturnUserDto {
  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.email = userEntity.email;
  }
  id: string;
  name: string;
  email: string;
}

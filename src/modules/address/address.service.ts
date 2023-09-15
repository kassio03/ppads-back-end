import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityService } from '../city/city.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressEntity } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly repository: Repository<AddressEntity>,
    private readonly cityService: CityService,
  ) {}
  async create(body: CreateAddressDto) {
    // todo: findOneCity pra ver se existe
    await this.cityService.findOne(body.cityId);

    const entityToInsert = this.repository.create();
    entityToInsert.cep = body.cep;
    entityToInsert.complement = body.complement;
    entityToInsert.houseNumber = body.houseNumber;
    entityToInsert.cityId = body.cityId;
    const entityInserted = await this.repository.save(entityToInsert);
    return entityInserted;
  }

  findAll() {
    return `This action returns all address`;
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return updateAddressDto;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}

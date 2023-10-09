import { Injectable, NotFoundException } from '@nestjs/common';
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
    const specificCityEntity = await this.cityService.findOne(body.cityId);
    if (!specificCityEntity)
      throw new NotFoundException('Cidade não encontrada');
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

  async findOne(id: string) {
    const specificAddressEntity = await this.repository.findOne({
      where: { id },
    });
    if (!specificAddressEntity) {
      throw new NotFoundException('Endereço não encontrado.');
    }
    return specificAddressEntity;
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return updateAddressDto;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}

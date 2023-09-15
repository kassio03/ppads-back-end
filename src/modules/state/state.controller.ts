import { Controller, Get } from '@nestjs/common';
import { successBody } from 'src/common/utils';
import { StateService } from './state.service';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get()
  async findAll() {
    const allStates = await this.stateService.findAll();
    return successBody(allStates);
  }
}

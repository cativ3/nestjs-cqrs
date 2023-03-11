import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from 'src/database/database.module';
import { vehicleProviders } from 'src/database/schemas/vehicle.schema';
import { CreateVehicleHandler } from './commands/create.command';
import { VehicleCreatedHandler } from './events/vehicle-created.event';
import { GetAllHandler } from './queries/getall.query';
import { VehicleController } from './vehicle.controller';

@Module({
  imports: [DatabaseModule, CqrsModule],
  controllers: [VehicleController],
  providers: [
    GetAllHandler,
    CreateVehicleHandler,
    VehicleCreatedHandler,
    ...vehicleProviders
  ],
})
export class VehicleModule {}
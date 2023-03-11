import { Connection, Schema, Document } from 'mongoose';

export const VehicleSchema = new Schema({
    name: String,
    price: Number
});

export interface IVehicle extends Document {
    readonly name: string;
    readonly price: number;
}

export const vehicleProviders = [
    {
      provide: 'VEHICLE_WRITE_MODEL',
      useFactory: (connection: Connection) => connection.model('Vehicle', VehicleSchema),
      inject: ['WRITE_DATABASE_CONNECTION'],
    },
    {
      provide: 'VEHICLE_READ_MODEL',
      useFactory: (connection: Connection) => connection.model('Vehicle', VehicleSchema),
      inject: ['READ_DATABASE_CONNECTION'],
    },
  ];
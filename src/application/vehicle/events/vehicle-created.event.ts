import { Inject } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { Model } from "mongoose";
import { IVehicle } from "src/database/schemas/vehicle.schema";

export class VehicleCreatedEvent {
    constructor(
        public readonly _id: string,
        public readonly name: string,
        public readonly price: number
    ) {}
}

@EventsHandler(VehicleCreatedEvent)
export class VehicleCreatedHandler implements IEventHandler<VehicleCreatedEvent> {
    constructor(@Inject("VEHICLE_READ_MODEL") private readonly vehicleModel: Model<IVehicle>){}

    handle(event: VehicleCreatedEvent) {
        const createdVehicle = new this.vehicleModel(event);
        createdVehicle.save();
    }
}

    
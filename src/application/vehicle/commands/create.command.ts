import { Inject } from "@nestjs/common";
import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { IVehicle } from "src/database/schemas/vehicle.schema";
import { Model } from "mongoose";
import { ServiceResponse } from "src/core/wrappers/service-response";
import { VehicleCreatedEvent } from "../events/vehicle-created.event";

export class CreateVehicleCommand {
    name: string;
    price: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }
}

@CommandHandler(CreateVehicleCommand)
export class CreateVehicleHandler implements ICommandHandler<CreateVehicleCommand>{
    constructor(
        @Inject("VEHICLE_WRITE_MODEL") private readonly vehicleModel: Model<IVehicle>,
        private readonly eventBus: EventBus
        ) {}
    
    async execute(command: CreateVehicleCommand): Promise<ServiceResponse> {
        const response = new ServiceResponse();

        const createdVehicle = new this.vehicleModel(command);
        createdVehicle.save();
        
        await this.eventBus.publish(new VehicleCreatedEvent(createdVehicle.id, createdVehicle.name, createdVehicle.price))
        
        return response;
    }
}
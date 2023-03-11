import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Model } from "mongoose";
import { ServiceResponse } from "src/core/wrappers/service-response";
import { IVehicle } from "src/database/schemas/vehicle.schema";

export class GetAllQuery {}

@QueryHandler(GetAllQuery)
export class GetAllHandler implements IQueryHandler<GetAllQuery> {
    constructor(@Inject("VEHICLE_READ_MODEL") private readonly vehicleModel: Model<IVehicle>) {}

    async execute(query: GetAllQuery): Promise<ServiceResponse<GetAllResponseItem[]>> {
        const response = new ServiceResponse<GetAllResponseItem[]>();

        response.data = (await this.vehicleModel.find().exec()).map(x => new GetAllResponseItem(x.id, x.name, x.price));
        
        return response;
    }
}

export class GetAllResponseItem {
    constructor(
        public id: string, 
        public name: string, 
        public price: number
    ) {}
}
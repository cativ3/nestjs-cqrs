import { Body, Controller, Get, Post, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ServiceResponse } from "src/core/wrappers/service-response";
import { CreateVehicleCommand } from "./commands/create.command";
import { GetAllQuery } from "./queries/getall.query";

@Controller("vehicles")
export class VehicleController {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus
    ) {}

    @Get()
    async getall() : Promise<ServiceResponse> {
        return await this.queryBus.execute(new GetAllQuery())
    }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() command: CreateVehicleCommand) : Promise<ServiceResponse> {
        return await this.commandBus.execute(command);
    }
}
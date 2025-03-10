import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/utils/ZodValidationPipe.pipe';

import { HallService } from './hall.service';
import { CreateHallDTO } from './dto/create-hall.dto';
import { hallSchema } from './schema/hall.schema';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Role } from '../common/decorators/role.decorators';


@Controller('hall')
export class HallController {
    constructor (private hallService: HallService) {}

    @Get()
    async findHalls() {
        return this.hallService.getAllHalls();
    }

    @Get(':hall_id')
    findHall(@Param('hall_id') hall_id: string) {
        if (!hall_id.match(/^[0-9a-fA-F]{24}$/)) {
            throw new BadRequestException('Invalid Hall ID format');
        }
        return this.hallService.getHallById(hall_id);
    }

    @Post()
    @UsePipes(new ZodValidationPipe(hallSchema))
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Role('AGENT')
    registerHall(@Request() req: any, @Body() hall: CreateHallDTO) {
        console.log("user in controller", req.user);
        return this.hallService.createHall(req.user.id, hall);
    }

    @Put(':hall_id')
    @UsePipes(new ZodValidationPipe(hallSchema))
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Role('AGENT')
    updateHallDetails(@Request() req: any, @Param('hall_id') hall_id: string, @Body() hall: CreateHallDTO) {
        if (!hall_id.match(/^[0-9a-fA-F]{24}$/)) {
            throw new BadRequestException('Invalid Hall ID format');
        }
        return this.hallService.editHallDetails(req.user.id, hall_id, hall);
    }


    @Delete(':hall_id') 
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Role('AGENT')
    deleteHall(@Request() req: any, @Param('hall_id') hall_id: string) {
        if (!hall_id.match(/^[0-9a-fA-F]{24}$/)) {
            throw new BadRequestException('Invalid Hall ID format');
        }
        return this.hallService.deleteHallById(req.user.id, hall_id);
    }
}

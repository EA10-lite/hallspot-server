import { Body, Controller, Delete, Get, Param, Post, Put, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { HallsService } from "./halls.service";
import { CreateHallDto } from './dto/create-hall.dto';
import { UpdateHallDto } from './dto/update-hall.dto';

@Controller('halls')
export class HallsController {

    constructor(private readonly hallService: HallsService){}

    @Get()
    findHalls() {
        return this.hallService.findHalls();
    }

    @Get(':id')
    findHall(@Param('id', ParseIntPipe) id: number ) {
        return this.hallService.findHall(id);
    }

    @Post()
    createHall(@Body(ValidationPipe) createHallDto : CreateHallDto) {
        return this.hallService.createHall(createHallDto);
    }

    @Put(':id')
    updateHall(@Param('id', ParseIntPipe) id : number, @Body(ValidationPipe) updateHallDto: UpdateHallDto) {
        return this.hallService.updateHall(id, updateHallDto);
    }

    @Delete(':id')
    deleteHall(@Param('id', ParseIntPipe) id : number) {
        return this.hallService.deleteHall(id);
    } 
}

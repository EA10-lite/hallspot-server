import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

@Controller('halls')
export class HallsController {
    @Get()
    findHalls(): string {
        return 'This will return available halls';
    }

    @Get(':id')
    findHall(@Param('id') id: string ) {
        return 'This will return the hall  with id - ' + id
    }

    @Post()
    createHall(@Body() hall : {}) {
        return hall;
    }

    @Put(':id')
    updateHall(@Param('id') id : string, @Body() hall: {}) {
        return {
            ...hall,
            id,
        }
    }

    @Delete(':id')
    deleteHall(@Param('id') id : string, @Body() hall : {}) {
        return {
            ...hall,
            id
        }
    } 
}

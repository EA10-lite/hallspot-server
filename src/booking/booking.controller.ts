import { Body, Controller, Param, Patch, Post, Put, UsePipes } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingDTO } from './dto/booking.dto';
import { ZodValidationPipe } from 'src/utils/ZodValidationPipe.pipe';
import { bookingschema } from './schema/booking.schema';

@Controller('booking')
export class BookingController {
    constructor (private bookingService: BookingService) {}

    @Post()
    @UsePipes(new ZodValidationPipe(bookingschema))
    async createBooking(@Body() booking: BookingDTO) {
        this.bookingService.createUserBooking(booking);
    }

    @Put(':booking_id')
    @UsePipes(new ZodValidationPipe(bookingschema))
    async modifyBooking(@Param('booking_id') booking_id: string, @Body() booking: BookingDTO) {
        this.bookingService.modifyBooking(booking_id, booking);
    }

    @Patch(':booking_id/cancel') 
    async cancelBooking(@Param('booking_id') booking_id: string){
        this.bookingService.cancelBooking(booking_id);
    } 
}

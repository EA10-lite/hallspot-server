import { Injectable, NotFoundException } from '@nestjs/common';
import { HallService } from '../hall/hall.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookingService {
    constructor(private prisma: PrismaService) {}
    async createUserBooking(booking: any) {
        const today = new Date();

        if(booking.date < today) {

        }
    }

    async modifyBooking(id: string, booking: any) {
        let temp_booking = await this.fetchBookingById(id);

        return this.prisma.booking.update({
            where: { id },
            data: {
                ...booking
            }
        })
    }
    async cancelBooking(id: string) {}

    async fetchUserBookings() {}
    async fetchBookingById(id: string) {
        let booking = await this.prisma.booking.findUnique({
            where: { id }
        });

        if(!booking) throw new NotFoundException("Booking you're looking for does not exist!");
        return booking;
    }
}

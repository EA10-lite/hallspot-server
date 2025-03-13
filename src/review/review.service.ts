import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewService {
    constructor (private prisma: PrismaService) {}

    async addHallReview(userId: string, hallId: string, body: any) {
        let user = await this.prisma.user.findUnique({ where: { id: userId }});
        if(!user) throw new ForbiddenException("You don't have access to this resource!");

        let hall = await this.prisma.hall.findUnique({ where: { id: hallId }});
        if(!hall) throw new NotFoundException("")
        return this.prisma.review.create({
            data: {
                ...body,
                hallId,
                userId
            }
        })
    }
}

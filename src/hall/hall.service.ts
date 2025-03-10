import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HallService {
    constructor (private prisma: PrismaService) {};

    async getAllHalls() {
        return await this.prisma.hall.findMany();
    }

    async getHallById(id: string) {
        let hall =  await this.prisma.hall.findUnique({
            where: { id }
        });

        if(!hall) throw new NotFoundException("Hall you're looking for does not exist!");
        return hall;
    }

    async createHall(agentId: string, hall: any) {
        return await this.prisma.hall.create({
            data: {
                ...hall,
                agentId
            }
        })
    }

    
    async editHallDetails(agentId: string, id: string, hall: any) {
        let temp_hall  = await this.getHallById(id);
        if(temp_hall && temp_hall.agentId !== agentId) throw new ForbiddenException("You don't have permission to edit this hall");

        return this.prisma.hall.update({
            where: { id },
            data: {
                ...hall
            }
        })
    }


    async deleteHallById(agentId: string, id: string) {
        let temp_hall  = await this.getHallById(id);
        if(temp_hall && temp_hall.agentId !== agentId) throw new ForbiddenException("You don't have permission to delete this hall");

        return this.prisma.hall.delete({ where: { id }});
    }
}

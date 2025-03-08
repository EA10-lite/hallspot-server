import { Injectable } from '@nestjs/common';
import { CreateHallDto } from './dto/create-hall.dto';
import { UpdateHallDto } from './dto/update-hall.dto';

@Injectable()
export class HallsService {
    private halls = [
        {
            id: 1,
            name: "Grand Ballroom",
            location: "Lagos, Nigeria",
            capacity: 500
        },
        {
            id: 2,
            name: "Skyview Rooftop",
            location: "Abuja, Nigeria",
            capacity: 150
        },
        {
            id: 3,
            name: "Oceanfront Pavilion",
            location: "Lekki, Nigeria",
            capacity: 300
        },
        {
            id: 4,
            name: "Elite Conference Center",
            location: "Victoria Island, Lagos",
            capacity: 200
        },
        {
            id: 5,
            name: "Heritage Banquet Hall",
            location: "Ibadan, Nigeria",
            capacity: 400
        }
    ];

    findHalls() {
        return this.halls;
    }

    findHall(id: number) {
        let hall = this.halls.find(hall => hall.id === id)

        return hall;
    }

    createHall(createHallDto: CreateHallDto) {
        let user_by_highest_id = [...this.halls].sort((a, b) => b.id - a.id);
        const new_user = {
            id: user_by_highest_id[0].id + 1,
            ...createHallDto
        }

        this.halls.push(new_user);
        return new_user;
    }

    updateHall(id: number, updateHallDto: UpdateHallDto){
        this.halls = this.halls.map(hall => {
            if(hall.id === id) {
                return {...hall, ...updateHallDto};
            }

            return hall;
        })


        return this.findHall(id);
    }

    deleteHall(id: number) {
        let hall = this.findHall(id);
        this.halls = this.halls.filter(hall => hall.id !== id);

        return hall;
    }
}

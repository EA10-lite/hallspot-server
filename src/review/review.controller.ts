import { Body, Controller, Param, Post, Request, UseGuards, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/utils/ZodValidationPipe.pipe';
import { reviewSchema } from './schema/review.schema';
import { ReviewDTO } from './dto/review.dto';
import { ReviewService } from './review.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/common/decorators/role.decorators';

@Controller('review')
export class ReviewController {
    constructor (private reviewService: ReviewService) {}

    @Post(':hall_id')
    @UsePipes(new ZodValidationPipe(reviewSchema))
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Role('USER')
    async addHallReview(@Request() req: any, @Param('hall_id') hall_id: string, @Body() review: ReviewDTO) {
        return await this.reviewService.addHallReview(req.user.id, hall_id, review);
    }
}

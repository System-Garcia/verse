import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

@Controller('ai-analysis')
export class AiAnalysisController {


    @Get('recommendations/:userId')
    async getRecommendations(@Param('userId', ParseIntPipe) userId: number) {
        return `Recommendations for user ${userId}`;
    }
}

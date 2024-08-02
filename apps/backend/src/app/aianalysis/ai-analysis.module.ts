import { Module } from '@nestjs/common';
import { AiAnalysisService } from './ai-analysis.service';
import { AiAnalysisController } from './ai-analysis.controller';

@Module({
  providers: [AiAnalysisService],
  controllers: [AiAnalysisController],
})
export class AiAnalysisModule {}
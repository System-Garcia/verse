import { Test, TestingModule } from '@nestjs/testing';
import { AianalysisService } from './ai-analysis.service';

describe('AianalysisService', () => {
  let service: AianalysisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AianalysisService],
    }).compile();

    service = module.get<AianalysisService>(AianalysisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

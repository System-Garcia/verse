import { Test, TestingModule } from '@nestjs/testing';
import { AianalysisController } from './ai-analysis.controller';

describe('AianalysisController', () => {
  let controller: AianalysisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AianalysisController],
    }).compile();

    controller = module.get<AianalysisController>(AianalysisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

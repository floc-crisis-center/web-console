import { TestBed } from '@angular/core/testing';

import { BotBuilderService } from './bot-builder.service';

describe('BotBuilderService', () => {
  let service: BotBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BotBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

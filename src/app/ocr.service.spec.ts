import { TestBed } from '@angular/core/testing';

import { OcrService } from './ocr.service';

describe('OcrServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OcrService = TestBed.get(OcrService);
    expect(service).toBeTruthy();
  });
});

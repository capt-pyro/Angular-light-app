import { TestBed, inject } from '@angular/core/testing';

import { RoomDataService } from './room-data.service';

describe('RoomDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomDataService]
    });
  });

  it('should be created', inject([RoomDataService], (service: RoomDataService) => {
    expect(service).toBeTruthy();
  }));
});

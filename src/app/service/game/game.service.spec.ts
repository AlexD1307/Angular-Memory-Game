import { TestBed, inject } from '@angular/core/testing';

import { GameService } from './game.service';

describe('GameService', () => {
  // tslint:disable-next-line:prefer-const
  const service: GameService = TestBed.get(GameService);
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    // const service: GameService = TestBed.get(GameService);
    expect(service).toBeTruthy();
  });

  it('should return ', inject([GameService], () => {
    service.startGame(16);
    expect(service.openCards).toBeDefined();
  }));
});

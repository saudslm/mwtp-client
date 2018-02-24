import { TestBed, async, inject } from '@angular/core/testing';

import { AuthFmanagerGuard } from './auth-fmanager.guard';

describe('AuthFmanagerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthFmanagerGuard]
    });
  });

  it('should ...', inject([AuthFmanagerGuard], (guard: AuthFmanagerGuard) => {
    expect(guard).toBeTruthy();
  }));
});

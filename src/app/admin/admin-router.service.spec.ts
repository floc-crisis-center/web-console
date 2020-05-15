import { TestBed } from '@angular/core/testing';

import { AdminRouterService } from './admin-router.service';

describe('AdminService', () => {
  let service: AdminRouterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminRouterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

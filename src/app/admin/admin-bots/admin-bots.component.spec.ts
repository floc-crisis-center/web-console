import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBotsComponent } from './admin-bots.component';

describe('AdminBotsComponent', () => {
  let component: AdminBotsComponent;
  let fixture: ComponentFixture<AdminBotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

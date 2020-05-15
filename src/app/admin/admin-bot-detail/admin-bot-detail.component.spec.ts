import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBotDetailComponent } from './admin-bot-detail.component';

describe('AdminBotDetailComponent', () => {
  let component: AdminBotDetailComponent;
  let fixture: ComponentFixture<AdminBotDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBotDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBotDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotrokhachhangStartComponent } from './hotrokhachhang-start.component';

describe('HotrokhachhangStartComponent', () => {
  let component: HotrokhachhangStartComponent;
  let fixture: ComponentFixture<HotrokhachhangStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotrokhachhangStartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotrokhachhangStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

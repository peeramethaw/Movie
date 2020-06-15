import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRegisterComponent } from './show-register.component';

describe('ShowRegisterComponent', () => {
  let component: ShowRegisterComponent;
  let fixture: ComponentFixture<ShowRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

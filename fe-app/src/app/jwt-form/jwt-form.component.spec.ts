import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JwtFormComponent } from './jwt-form.component';

describe('JwtFormComponent', () => {
  let component: JwtFormComponent;
  let fixture: ComponentFixture<JwtFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JwtFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JwtFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

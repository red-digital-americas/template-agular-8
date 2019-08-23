import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NsoComponent } from './nso.component';

describe('NsoComponent', () => {
  let component: NsoComponent;
  let fixture: ComponentFixture<NsoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NsoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

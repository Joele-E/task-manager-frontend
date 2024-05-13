import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormModalRComponent } from './form-modal-r.component';

describe('FormModalRComponent', () => {
  let component: FormModalRComponent;
  let fixture: ComponentFixture<FormModalRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormModalRComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormModalRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

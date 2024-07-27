import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindpersonComponent } from './findperson.component';

describe('FindpersonComponent', () => {
  let component: FindpersonComponent;
  let fixture: ComponentFixture<FindpersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindpersonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FindpersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

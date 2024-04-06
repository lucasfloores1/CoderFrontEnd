import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestorePwComponent } from './restore-pw.component';

describe('RestorePwComponent', () => {
  let component: RestorePwComponent;
  let fixture: ComponentFixture<RestorePwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestorePwComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestorePwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

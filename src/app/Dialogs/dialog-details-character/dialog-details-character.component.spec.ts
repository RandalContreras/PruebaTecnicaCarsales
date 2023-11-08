import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetailsCharacterComponent } from './dialog-details-character.component';

describe('DialogDetailsCharacterComponent', () => {
  let component: DialogDetailsCharacterComponent;
  let fixture: ComponentFixture<DialogDetailsCharacterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDetailsCharacterComponent]
    });
    fixture = TestBed.createComponent(DialogDetailsCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

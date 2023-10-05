import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordScrambleComponent } from './word-scramble.component';

describe('WordScrambleComponent', () => {
  let component: WordScrambleComponent;
  let fixture: ComponentFixture<WordScrambleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WordScrambleComponent]
    });
    fixture = TestBed.createComponent(WordScrambleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

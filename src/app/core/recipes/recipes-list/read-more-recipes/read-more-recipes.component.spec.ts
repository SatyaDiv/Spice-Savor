import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadMoreRecipesComponent } from './read-more-recipes.component';

describe('ReadMoreRecipesComponent', () => {
  let component: ReadMoreRecipesComponent;
  let fixture: ComponentFixture<ReadMoreRecipesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadMoreRecipesComponent]
    });
    fixture = TestBed.createComponent(ReadMoreRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

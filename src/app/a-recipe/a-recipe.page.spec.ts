import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ARecipePage } from './a-recipe.page';

describe('ARecipePage', () => {
  let component: ARecipePage;
  let fixture: ComponentFixture<ARecipePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ARecipePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ARecipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListRecipePage } from './list-recipe.page';

describe('ListRecipePage', () => {
  let component: ListRecipePage;
  let fixture: ComponentFixture<ListRecipePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRecipePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListRecipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

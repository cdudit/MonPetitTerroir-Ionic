import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../model/Recipe';

@Component({
  selector: 'app-a-recipe',
  templateUrl: './a-recipe.page.html',
  styleUrls: ['./a-recipe.page.scss'],
})
export class ARecipePage implements OnInit {

  recipe :Recipe;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let recipe = params['id'];
      
  });
  }

}

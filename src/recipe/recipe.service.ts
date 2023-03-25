import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RecipeDto } from './dto/recipe.dto';
import { Recipe } from './entity/recipe.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe) private recipeRepository: Repository<Recipe>,
  ) {}

  async createRecipe(recipe: RecipeDto): Promise<void> {
    await this.recipeRepository.save(recipe);
  }

  async getRecipes(): Promise<Recipe[]> {
    return this.recipeRepository.find();
  }

  async getRecipe(id: string): Promise<Recipe> {
    const recipe = this.recipeRepository.findOne({ where: { id } });
    if (!recipe) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }
    return recipe;
  }

  async updateDescription(id: string, description: string): Promise<void> {
    this.recipeRepository.update({ id }, { description });
  }

  async deleteRecipe(id: string): Promise<void> {
    await this.recipeRepository.delete({ id });
  }
}

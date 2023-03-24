import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Unit } from '../dto/recipe.dto';

@Entity({ name: 'recipe' })
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.recipe)
  ingredients: Ingredient[];
}

@Entity({ name: 'ingredient' })
export class Ingredient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'varchar' })
  unit: Unit;

  @Column({ type: 'integer' })
  quantity: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.ingredients, {
    cascade: true,
    eager: true,
  })
  recipe: Recipe;
}

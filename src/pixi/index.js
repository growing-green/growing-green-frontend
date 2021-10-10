import * as PIXI from 'pixi.js';
import { imagePath } from './pixiConstants';

const loader = PIXI.Loader.shared;

export function imageLoader() {
  imagePath.forEach(({ alias, path }) => {
    loader.add(alias, path);
  });

  loader.load();
}

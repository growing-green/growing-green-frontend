import * as PIXI from 'pixi.js';
import { imagePath } from './pixiConstants';

const loader = PIXI.Loader.shared;

export function imageLoader() {
  imagePath.forEach(({ alias, path }) => {
    loader.add(alias, path);
  });

  loader.onProgress.add(showProgress);
  loader.onComplete.add(doneLoading);
  loader.onError.add(reportError);

  loader.load();
}

function showProgress(e) {
  //loading
}

function reportError(e) {
  console.log('errer', e);
  //onError
}

function doneLoading(e) {
  //loading done
  console.log('done', e);
}

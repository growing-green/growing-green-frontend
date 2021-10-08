import * as PIXI from 'pixi.js';
import { applyMiddleware } from 'redux';

const loader = PIXI.Loader.shared;
export const imagePath = [
  { alias: 'seedStageOfPlant', path: '../images/plants/plant1.png' },
  { alias: 'youngStageOfPlant', path: '../images/plants/plant2.png' },
  { alias: 'adultStageOfPlant', path: '../images/plants/plant2.png' },
  { alias: 'plantPot', path: '../images/plants/pot.png' },
  { alias: 'wateringCan', path: '../images/furniture/watering_can.png' },
  { alias: 'openWindow', path: '../images/furniture/open_window.png' },
  { alias: 'pullSwitch', path: '../images/furniture/pull_switch.png' },
  { alias: 'blindHead', path: '../images/furniture/blind_head.png' },
  { alias: 'dayTimeLandscape', path: '../images/landscapes/day.png' },
  { alias: 'nail', path: '../images/furniture/nail.png' },
  { alias: 'blind', path: '../images/furniture/blind.png' },
];

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
  //onError
}

function doneLoading(e) {
  //loading done
}

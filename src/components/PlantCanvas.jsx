import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import styled from 'styled-components';
import apiController from '../configs/apiController';

import PlantContainer from '../pixi/displayObjects/PlantContainer';
import Background from '../pixi/displayObjects/Background';
import WateringContainer from '../pixi/displayObjects/WateringContainer';
import GuageContainer from '../pixi/displayObjects/GuageContainer';

import { imagePath } from '../pixi/pixiConstants';
import { waterGuageValidator } from '../utils/waterGuageValidator';
import { penaltyPointValidator } from '../utils/penaltyPointValidator';

const loader = PIXI.Loader.shared;

window.__PIXI_INSPECTOR_GLOBAL_HOOK__ &&
  window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });

export default function PlantCanvas({ plant }) {
  const canvas = useRef(null);

  let app;
  let watering;
  let guage;
  let background;

  function loadImage() {
    return new Promise((resolve) => {
      loader.reset();
      PIXI.utils.clearTextureCache();
      imagePath.forEach(({ alias, path }) => {
        loader.add(alias, path);
      });

      loader.load();

      loader.onComplete.add(() => {
        resolve();
      });
    });
  }

  async function setup(myCanvas, plantInfo) {
    if (!plantInfo) return;
    await loadImage();

    app = new PIXI.Application({
      backgroundAlpha: 0,
      width: 1200,
      height: 700,
      resolution: window.devicePixelRatio,
      autoDensity: true,
      antialias: true,
    });

    myCanvas.appendChild(app.view);

    if (plantInfo.isLast === true) {
      const lastContainer = new PIXI.Container();

      app.stage.addChild(lastContainer);
    }

    const {
      _id,
      growthStage,
      isBlindUp,
      type,
      name,
      species,
      sunGuage,
      waterGuage,
    } = plantInfo;

    background = new Background(app, isBlindUp, _id);
    app.stage.addChild(background.container);

    const plant = new PlantContainer(app, name, species, type, growthStage);
    app.stage.addChild(plant.container);

    watering = new WateringContainer(app);
    app.stage.addChild(watering.container);

    guage = new GuageContainer(app, sunGuage, waterGuage);
    app.stage.addChild(guage.container);

    app.ticker.add(loop);
  }

  async function loop(e) {
    const totalGuageWidth = 400;
    const wateringPeriod = 5;
    const eachGuageWidth = totalGuageWidth / wateringPeriod;

    if (watering.wateringCan.isWatering === true) {
      guage.waterGuage.width = guage.waterGuage.width + eachGuageWidth;
      watering.wateringCan.isWatering = false;
      await increaseWaterGuage(plant);
    }
  }

  async function increaseWaterGuage(plant) {
    const isValid = waterGuageValidator(plant);

    if (isValid === true) {
      await apiController.put(`plants/${plant._id}`, {
        state: 'water',
        isIncrease: true,
      });
    } else {
      const isAlive = penaltyPointValidator(plant);

      if (isAlive === true) {
        await apiController.put(`plants/${plant._id}`, {
          state: 'penalty',
          isIncrease: true,
        });
      } else {
        // await apiController.delete(`plants/${plant._id}`);
      }
    }
  }

  useEffect(() => {
    (async (plant) => {
      const myCanvas = canvas?.current;
      setup(myCanvas, plant);
    })(plant);
  }, [plant]);

  return (
    <Wrapper>
      <div ref={canvas} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-attachment: fixed;
  width: 1200px;
  height: 700px;
  border-radius: 1.5rem;
  padding-top: 20px;
`;

import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import styled from 'styled-components';

import PlantContainer from '../pixi/displayObjects/PlantContainer';
import Background from '../pixi/displayObjects/Background';
import WateringContainer from '../pixi/displayObjects/WateringContainer';
import GuageContainer from '../pixi/displayObjects/GuageContainer';

import { imagePath } from '../pixi/pixiConstants';

const loader = PIXI.Loader.shared;

window.__PIXI_INSPECTOR_GLOBAL_HOOK__ &&
  window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });

export default function PlantCanvas({ plant }) {
  const canvas = useRef(null);

  let app;
  let watering;
  let guage;

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

    const {
      growth_stage,
      is_blind_up,
      type,
      name,
      species,
      sun_guage,
      water_guage,
    } = plantInfo;

    myCanvas.appendChild(app.view);

    const background = new Background(app, is_blind_up);
    app.stage.addChild(background.container);

    const plant = new PlantContainer(app, name, species, type, growth_stage);
    app.stage.addChild(plant.container);

    watering = new WateringContainer(app);
    app.stage.addChild(watering.container);

    guage = new GuageContainer(app, sun_guage, water_guage);
    app.stage.addChild(guage.container);

    app.ticker.add(increaseWaterGuage);
  }

  function increaseWaterGuage(e) {
    const totalGuageWidth = 400;
    const wateringPeriod = 5;
    const eachGuageWidth = totalGuageWidth / wateringPeriod;

    if (watering.wateringCan.isWatering === true) {
      guage.waterGuage.width = guage.waterGuage.width + eachGuageWidth;
      watering.wateringCan.isWatering = false;
    }
  }

  useEffect(() => {
    (async (plant) => {
      const myCanvas = canvas?.current;
      setup(myCanvas, plant);
    })(plant);

    return () => {
      canvas.current = null;
    };
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

import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import styled from 'styled-components';

import PlantContainer from '../pixi/displayObjects/PlantContainer';
import Background from '../pixi/displayObjects/Background';
import WateringContainer from '../pixi/displayObjects/WateringContainer';
import GuageContainer from '../pixi/displayObjects/GuageContainer';

window.__PIXI_INSPECTOR_GLOBAL_HOOK__ &&
  window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });

export default function RooomCanvas() {
  const canvas = useRef(null);

  let app;
  let watering;
  let guage;

  function setup() {
    app = new PIXI.Application({
      backgroundAlpha: 0,
      width: 1200,
      height: 700,
      resolution: window.devicePixelRatio,
      autoDensity: true,
      antialias: true,
    });

    canvas.current.appendChild(app.view);
    app.start();

    const background = new Background(app);
    app.stage.addChild(background.container);

    const plant = new PlantContainer(app);
    app.stage.addChild(plant.container);

    watering = new WateringContainer(app);
    app.stage.addChild(watering.container);

    guage = new GuageContainer(app);
    app.stage.addChild(guage.container);

    app.ticker.add(increaseWaterGuage);
  }

  function increaseWaterGuage(e) {
    const totalGuageWidth = 400;
    const wateringPeriod = 5;
    const eachGuageWidth = totalGuageWidth / wateringPeriod;

    if (watering.wateringCan.isWatering === true) {
      guage.waterGuage.width = guage.waterGuage.width + eachGuageWidth;
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setup();
    }, 1000);
    return () => {
      app.stop();
      canvas.current = null;
    };
  }, []);

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

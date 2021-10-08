import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import styled from 'styled-components';

import GrowingPlant from '../pixi/displayObjects/GrowingPlant';
import Background from '../pixi/displayObjects/Background';
import Watering from '../pixi/displayObjects/Watering';
import WaterAndSunGuage from '../pixi/displayObjects/WaterAndSunGuage';

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

    const background = new Background(app, true); // isBlindUp
    app.stage.addChild(background.container);

    const growingPlant = new GrowingPlant(app);
    app.stage.addChild(growingPlant.container);

    watering = new Watering(app);
    app.stage.addChild(watering.container);

    guage = new WaterAndSunGuage(app);
    app.stage.addChild(guage.container);

    app.ticker.add(increaseWateringGuage);
  }

  function increaseWateringGuage(e) {
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

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import * as PIXI from 'pixi.js';
import { imagePath } from '../pixi/pixiConstants';

import PlantGrowth from '../pixi/displayObjects/PlantGrowth';
import Modal from './Modal';
import background from '../assets/images/background/day.png';

const loader = PIXI.Loader.shared;

export default function PlantGrowthCanvas({ plantType, onGrowthEnd, theme }) {
  const canvas = useRef(null);
  let growthPlant;
  let app;

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

  useEffect(() => {
    (async (app) => {
      await loadImage();

      app = new PIXI.Application({
        backgroundAlpha: 0,
        width: 500,
        height: 500,
        resolution: window.devicePixelRatio,
        autoDensity: true,
        antialias: true,
      });

      canvas.current.appendChild(app.view);

      growthPlant = new PlantGrowth(app, plantType);
      app.stage.addChild(growthPlant.container);

      growthPlant.plant.play();

      app.start();
    })(app);

    return () => {
      canvas.current = null;
    };
  }, []);

  return (
    <Wrapper theme={theme}>
      <div ref={canvas}></div>
      <CloseButton onClick={() => onGrowthEnd()}>닫기</CloseButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;

  background: url(${background});
  background-size: cover;
  width: 600px;
  height: 500px;
  padding: 2rem;
  border-radius: 25px;
  border: ;
`;

const CloseButton = styled.div`
  position: absolute;
  width: 70px;
  height: 30px;
  top: 1rem;
  right: 1rem;
  background: black;
  color: white;
  padding: 1rem;
  cursor: pointer;
`;

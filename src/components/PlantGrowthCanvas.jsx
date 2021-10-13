import React, { useEffect, useRef, useState } from 'react';
import cloverPlant from '../assets/images/plants/clover_plant.png';
import defaultPlant from '../assets/images/plants/default_plant.png';
import treePlant from '../assets/images/plants/tree_plant.png';
import * as PIXI from 'pixi.js';
import { imagePath } from '../pixi/pixiConstants';
import styled from 'styled-components';
import chair from '../assets/images/furniture/chair.png';
import PlantGrowth from '../pixi/displayObjects/PlantGrowth';
import Modal from './Modal';

const loader = PIXI.Loader.shared;

export default function PlantGrowthCanvas({
  plantType,
  growthStart,
  onGrowthEnd,
}) {
  const canvas = useRef(null);

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

  function CloseModal() {
    onGrowthEnd();
  }

  useEffect(() => {
    if (growthStart === true) {
      (async () => {
        await loadImage();

        const app = new PIXI.Application({
          backgroundAlpha: 0,
          width: 1200,
          height: 700,
          resolution: window.devicePixelRatio,
          autoDensity: true,
          antialias: true,
        });

        const type = `${plantType}Plant`;

        const growthContainer = new PlantGrowth(app, type);
        app.stage.add(growthContainer);
      })();
    }
  }, [plantType]);

  return (
    <div>
      <Modal closeModal={CloseModal}>
        <div ref={canvas}></div>
      </Modal>
      <ChairImage src={chair} />

      <PlantImageWrapper>
        {plantType === 'clover' && <img src={cloverPlant} alt="clover plant" />}
        {plantType === 'default' && (
          <img src={defaultPlant} alt="default plant" />
        )}
        {plantType === 'tree' && <img src={treePlant} alt="alt plant" />}
      </PlantImageWrapper>
    </div>
  );
}

const PlantImageWrapper = styled.div`
  img {
    width: 100px;
  }
`;

const ChairImage = styled.img`
  position: absolute;
  bottom: -10px;
  right: 3rem;
  width: 140px;
  // z-index: -1;
`;

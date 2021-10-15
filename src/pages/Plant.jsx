import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import { getAllPlantsByUserId } from '../redux/modules/plants';

import Thermometer from '../components/Thermometer';
import CalendarIcon from '../components/CalendarIcon';
import PlantCanvas from '../components/PlantCanvas';
import ErrorBox from '../components/ErrorBox';
import Loading from '../components/Loading';

import leftArrow from '../assets/arrows/left_arrow.png';
import rightArrow from '../assets/arrows/right_arrow.png';
import newPlantIcon from '../assets/images/background/new_plant_icon.png';
import backButton from '../assets/arrows/back_arrow.png';

export default function Plant() {
  const { allPlants, isLoading, error } = useSelector((state) => state.plants);
  const { plantId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const plantIds = Object.keys(allPlants);
  const currentIndex = plantIds.indexOf(plantId);
  const prevPlantId = plantIds[currentIndex - 1];
  const nextPlantId = plantIds[currentIndex + 1];

  useEffect(() => {
    dispatch(getAllPlantsByUserId());
  }, [dispatch, plantId]);

  function renderError() {
    return <ErrorBox message={error} />;
  }

  function renderLoading() {
    return <Loading />;
  }

  function renderPage() {
    return (
      <>
        <TermometerAndCalendar>
          <CalendarIcon />
          <Thermometer height="120" temperature="30" icon />
        </TermometerAndCalendar>
        {prevPlantId && (
          <Link to={prevPlantId}>
            <LeftArrow src={leftArrow} alt="left arrow button" />
          </Link>
        )}
        <PlantCanvas plant={allPlants.plantId} />
        {nextPlantId && (
          <Link to={nextPlantId}>
            <RightArrow src={rightArrow} alr="right arrow" />
          </Link>
        )}
        <ButtonWrapper>
          <NewPlantButton onClick={() => history.push('/create')} />
        </ButtonWrapper>
        <BackButton onClick={() => history.push('/')} />
      </>
    );
  }

  return (
    <Container>
      {error ? renderError() : isLoading ? renderLoading() : renderPage()}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 1200px;
  height: 700px;
`;

const TermometerAndCalendar = styled.div`
  position: absolute;
  align-items: center;
  left: 4rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  align-self: flex-start;
`;

const LeftArrow = styled.img`
  position: absolute;
  left: 8rem;
  top: 14rem;
  width: 150px;
`;

const RightArrow = styled.img`
  position: absolute;
  right: 8rem;
  top: 14rem;
  width: 150px;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  right: 4.5rem;
  top: 6rem;
  width: 115px;
  height: 115px;
  background: #a9cf98;
  border-radius: 100px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(20, 20, 20, 0.2) 3px -3px 0px inset;
`;

const NewPlantButton = styled.button`
  background: url(${newPlantIcon});
  background-size: cover;
  position: absolute;
  right: -14px;
  top: -14px;
  width: 150px;
  height: 170px;
  border: none;
`;

const BackButton = styled.button`
  width: 74px;
  height: 50px;
  position: absolute;
  left: 2.5rem;
  border: none;
  bottom: 1rem;
  background: url(${backButton}) no-repeat;
  background-size: cover;
`;

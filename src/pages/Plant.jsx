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

export default function Plant() {
  const { allPlants, isLoading, error } = useSelector((state) => state.plants);
  const { plantId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const plantIds = Object.keys(allPlants);
  const currentIndex = plantIds.indexOf(plantId);
  const prevPlantId = plantIds[currentIndex - 1];
  const nextPlantId = plantIds[currentIndex + 1];

  const [currentPlant, setCurrentPlant] = useState(null);

  useEffect(() => {
    dispatch(getAllPlantsByUserId());
  }, [dispatch, plantId]);

  useEffect(() => {
    setCurrentPlant(allPlants[plantId]);
  }, [plantId, allPlants]);

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
          <Thermometer height="120" temperature="30" icon />
          <CalendarIcon />
        </TermometerAndCalendar>
        {prevPlantId && (
          <Link to={prevPlantId}>
            <LeftArrow src={leftArrow} alt="left arrow button" />
          </Link>
        )}
        <PlantCanvas plant={currentPlant} />
        {nextPlantId ? (
          <Link to={nextPlantId}>
            <RightArrow src={rightArrow} alr="right arrow" />
          </Link>
        ) : (
          <Link to={nextPlantId}>
            <RightArrow src={rightArrow} alr="right arrow" />
          </Link>
        )}
        <NewPlantButton onClick={() => history.push('/create')}>
          새로운 식물 추가하기
        </NewPlantButton>
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

const NewPlantButton = styled.button`
  position: absolute;
  right: 4rem;
  top: 8rem;
  width: 100px;
  height: 100px;
`;

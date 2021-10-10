import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import Thermometer from '../components/Thermometer';
import CalendarIcon from '../components/CalendarIcon';
import PlantCanvas from '../components/PlantCanvas';
import ErrorBox from '../components/ErrorBox';
import Loading from '../components/Loading';

import { fetchAllPlant } from '../redux/modules/plants';

export default function Plant() {
  const { allPlants, isLoading, error } = useSelector((state) => state.plants);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPlant());
  }, [allPlants, dispatch]);

  const renderError = () => {
    return <ErrorBox message={error} />;
  };

  const renderLoading = () => {
    return <Loading />;
  };

  const renderPage = () => {
    return (
      <>
        <TermometerAndCalendar>
          <Thermometer height="120" temperature="30" />
          <CalendarIcon />
        </TermometerAndCalendar>
        <PlantCanvas plants={allPlants} />
      </>
    );
  };

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
  left: 3rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  align-self: flex-start;
`;

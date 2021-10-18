import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { loginSuccess, logoutSuccess } from '../redux/modules/user';
import { getAllPlantsByUserId, updateAllPlant } from '../redux/modules/plants';
import { calculatePlantInfo } from '../utils/calcuatePlantInfo';

import DesciptionText from '../components/DescrptionText';
import Button from '../components/Button';
import PlantShelf from '../components/PlantShelf';
import ErrorBox from '../components/ErrorBox';

export default function Landing() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLogin, error } = useSelector((state) => state.user);
  const { allPlants } = useSelector((state) => state.plants);

  useEffect(() => {
    const user = localStorage.getItem('user');

    if (user) {
      dispatch(getAllPlantsByUserId());
    }
  }, [isLogin, dispatch]);

  useEffect(() => {
    const updatedAllPlants = [];

    if (Object.keys(allPlants).length) {
      for (const id in allPlants) {
        const updatedPlant = calculatePlantInfo(allPlants[id]);

        updatedAllPlants.push(updatedPlant);
      }
    }

    dispatch(updateAllPlant(updatedAllPlants));
  }, [allPlants, dispatch]);

  if (error) {
    return <ErrorBox message={error} />;
  }

  async function loginWithGoogle() {
    try {
      const auth = getAuth();
      const {
        user: { displayName, email, photoURL },
      } = await signInWithPopup(auth, new GoogleAuthProvider());

      dispatch(
        loginSuccess({
          email,
          name: displayName,
          photoURL,
        }),
      );
    } catch {}
  }

  function onStartButtonClick() {
    const allPlantIds = Object.keys(allPlants);

    if (allPlantIds.length > 0) {
      return history.push(`/plants/${allPlantIds[0]}`);
    }

    history.push('/create');
  }

  function logout() {
    return dispatch(logoutSuccess());
  }

  function renderLoginButton() {
    return (
      <Button
        onClick={loginWithGoogle}
        variant="outline"
        size="large"
        color="white"
        label="L O G I N"
        icon={FcGoogle}
      />
    );
  }

  function renderStartButton() {
    return (
      <>
        <Button
          variant="outline"
          color="green"
          size="large"
          label="S T A R T"
          onClick={onStartButtonClick}
        />
        <LogoutText onClick={logout}>logout</LogoutText>
      </>
    );
  }

  return (
    <Container>
      <PlantShelf />
      <DesciptionText>Touch the plant!</DesciptionText>
      <ButtonWrapper>
        {isLogin ? renderStartButton() : renderLoginButton()}
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  z-index: 1;
  border-radius: inherit;
  padding: 2rem;
  max-width: 100%;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  display: inline-block;
`;

const LogoutText = styled.h3`
  font-size: 1.2em;
  font-weight: 300;
  margin: 1rem;

  &:hover {
    color: red;
    cursor: pointer;
  }
`;

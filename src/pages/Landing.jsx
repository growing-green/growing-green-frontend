import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { loginSuccess, logoutSuccess } from '../redux/modules/user';
import { getAllPlantsByUserId } from '../redux/modules/plants';

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

    history.push('/new');
  }

  const logout = () => {
    return dispatch(logoutSuccess());
  };

  const renderLoginButton = () => {
    return (
      <Button
        onClick={loginWithGoogle}
        variant="outline"
        size="large"
        color="white"
        label="Log in"
        icon={FcGoogle}
      />
    );
  };

  const renderStartButton = () => {
    return (
      <Button
        variant="outline"
        color="green"
        size="large"
        label="S T A R T"
        onClick={onStartButtonClick}
      />
    );
  };

  return (
    <Container>
      <PlantShelf />
      <DesciptionText>Touch the plant!</DesciptionText>
      <ButtonWrapper>
        {isLogin ? renderStartButton() : renderLoginButton()}
        <Button
          onClick={logout}
          variant="outline"
          color="green"
          size="large"
          label="logout"
        />
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

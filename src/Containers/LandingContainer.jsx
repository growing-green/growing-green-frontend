import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { loginSuccess, logoutSuccess } from '../redux/modules/user';

import DesciptionText from '../components/DescrptionText';
import Button from '../components/Button';
import PlantShelf from '../components/PlantShelf';
import ErrorBox from '../components/ErrorBox';
import Loading from '../components/Loading';

export default function Landing() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.user);

  if (error) {
    return <ErrorBox message={error} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const loginWithGoogle = async () => {
    const auth = getAuth();
    const {
      user: { displayName, email, photoURL },
    } = await signInWithPopup(auth, new GoogleAuthProvider());

    dispatch(
      loginSuccess({
        email,
        name: displayName,
        photo_url: photoURL,
      }),
    );
  };

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
        onClick={() => {
          history.push('/plant');
        }}
      />
    );
  };

  return (
    <Container>
      <PlantShelf />
      <DesciptionText>Touch the plant!</DesciptionText>
      <ButtonWrapper>
        {user ? renderStartButton() : renderLoginButton()}
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
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ButtonWrapper = styled.div`
  margin-botton: 1rem;
  text-align: center;
`;

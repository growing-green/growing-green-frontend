import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { signInSuccess, signOutSuccess } from '../redux/modules/user';

import DesciptionText from '../components/DescrptionText';
import Button from '../components/Button';
import PlantShelf from '../components/PlantShelf';
import ErrorBox from '../components/ErrorBox';
import Loading from '../components/Loading';

export default function Landing() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);
  console.log('user in landing', user);
  if (error) {
    return <ErrorBox message={error} />;
  }

  if (loading) {
    return <Loading />;
  }

  const renderSignInButton = () => {
    return (
      <Button
        onClick={SignInWithGoogle}
        variant="outline"
        size="large"
        color="white"
        label="Sign in"
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
        label={`start ${user.name}`}
      />
    );
  };

  const SignInWithGoogle = async () => {
    const auth = getAuth();
    const {
      user: { displayName, email, photoURL },
    } = await signInWithPopup(auth, new GoogleAuthProvider());

    dispatch(
      signInSuccess({
        email,
        name: displayName,
        photo_url: photoURL,
      }),
    );
  };

  return (
    <Container>
      <PlantShelf />
      <DesciptionText>Touch the plant!</DesciptionText>
      <ButtonWrapper>
        {user ? renderStartButton() : renderSignInButton()}
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

import styled from 'styled-components';
import Main from './Main';
import WelcomeHeader from '@components/Header/WelcomeHeader';
import useLoginGuard from '../../hooks/auth/useLoginGuard';
const LoginPage = () => {
  useLoginGuard();
  return (
    <StContainerWrap>
      <StContainer>
        <WelcomeHeader />
        <Main />
      </StContainer>
    </StContainerWrap>
  );
};

export default LoginPage;

const StContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  max-width: 468px;
  gap: 64px;
  margin: 0 auto;
  align-items: center;
`;
const StContainerWrap = styled.div`
  background-color: #f1f4f9;
  width: 100%;
  height: 100%;
  padding: 64px 12px;
`;

// #ffffff   #fafbfd    #f6f8fb             #f1f4f9

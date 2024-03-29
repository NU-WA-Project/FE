import MainHeader from './MainHeader';
import MainCenter from './Maincenter';
import CustomerStories from './CustomerStories';
import MainCompany from './MainCompanyLogo';
import styled from 'styled-components';
import Percent from './Percent';

const MainPage = () => {
  return (
    <StContainer id="main">
      <MainHeader />
      <MainCompany />
      <MainCenter />
      <Percent />
      <CustomerStories />
    </StContainer>
  );
};

export default MainPage;

const StContainer = styled.div`
  width: 100%;
  //max-width: 1920px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`;

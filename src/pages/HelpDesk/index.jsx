import HelpDeskTop from './HelpDeskTop';
import HelpDeskBottom from './HelpDeskBottom';
import styled from 'styled-components';

const HelpDesk = () => {
  return (
    <StContentWrap>
      <StContentBox>
        <HelpDeskTop />
        <HelpDeskBottom />
      </StContentBox>
    </StContentWrap>
  );
};

export default HelpDesk;

const StContentWrap = styled.div`
  background-color: #f1f4f9;
  padding: 64px 12px;
`;
const StContentBox = styled.div`
  display: flex;
  flex-flow: column;
  max-width: 1000px;
  margin: 0 auto;
  gap: 50px;
  padding: 50px;
`;

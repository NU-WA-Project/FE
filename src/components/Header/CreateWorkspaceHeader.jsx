import React from 'react';
import WhiteLogo from '@components/Image/WhiteLogo.jsx';
import styled from 'styled-components';

const CreateWorkspaceHeader = () => {
  return (
    <StContainer>
      <WhiteLogo width={'87px'} height={'22px'} />
    </StContainer>
  );
};

export default CreateWorkspaceHeader;

const StContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  background-color: black;
  justify-content: center;
  padding: 20px;
`;

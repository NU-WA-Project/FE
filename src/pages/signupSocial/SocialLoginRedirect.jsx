import { Spinner } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { setTokenInStorage } from '../../utils/auth';

const SocialLoginRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const accessToken = searchParams.get('accessToken');
  setTokenInStorage(accessToken);
  useEffect(() => {
    setTimeout(navigate('/'), 1000);
  }, []);
  return (
    <div>
      <Spinner
        thickness="10px"
        speed="0.5s"
        emptyColor="gray.200"
        color="secondary.500"
        width={'200px'}
        height={'200px'}
      />
    </div>
  );
};

export default SocialLoginRedirect;
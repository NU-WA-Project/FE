import { ImgWrap } from '@components/Wrap/StWrap';
import Image from '@components/Image/Image';
import Logo from '@assets/logo.png';
import LinkImg from '@assets/link.svg';
import AgreementImg from '@assets/agreement.png';
import { Button, Text, ButtonGroup, Flex, Box, Checkbox } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';


const Agreement = () => {
  
  const navigate = useNavigate;
  const [isChecked, setIsChecked] = useState(false)
  
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }
  
  const handleButtonClick = () => {
    if(isChecked === true) {
    return navigate('create')
  } else return 
}
  return (
    <>
      <Flex alignItems="center" justifyContent="space-between" w="70%">
        <div>
          <div>
            <Flex alignItems="center">
              <ImgWrap>
                <Image src={Logo} alt="logo" />
              </ImgWrap>
              <Text as="span" fontSize="3xl" fontWeight="700" ml="10px">
                에서
              </Text>
            </Flex>
            <Box mb="16px">
              <Text as="p" fontSize="3xl" fontWeight="700">
                새로운{' '}
                <Text as="span" color="#575DFB">
                  워크페이스 생성
                </Text>
              </Text>
            </Box>
            <Text
              as="p"
              fontSize="xl"
              color="#898989"
              mb="30px"
              fontWeight={500}
            >
              팀 협업에 사용해보세요. 이메일 보다 빠르고 안전하게
              <br />
              무료로 사용해보기
            </Text>
          </div>
          <Flex flexDirection="row" justifyContent="space-between">
            <Box>
              <Checkbox size="md" borderColor='#898989' isChecked={isChecked} onChange={handleCheckboxChange}> 
              <Text as="span" color="#898989" fontWeight={400}>
                개인정보수집 및 이용에 동의합니다.
              </Text>
              </Checkbox>
  
            </Box>
            <Flex>
              <Image src={LinkImg} alt="link" />
              <Text
                as="span"
                color="#575DFB"
                textDecoration="underline"
                ml="4px"
                fontWeight={400}
              >
                자세하게 확인하기
              </Text>
            </Flex>
          </Flex>
          <ButtonGroup mt="40px">
            <Button
              rounded="50px"
              w="210px"
              p="12px 60px"
              bg="#5158FFCC"
              color="#fff"
              onClick={handleButtonClick}
            >
              워크스페이스 생성
            </Button>
            <Link to="/login">
              <Button
                rounded="50px"
                w="210px"
                p="12px 60px"
                bg="transparent"
                color="#5158FFCC"
                border="solid 2px #5158FFCC"
              >
                다른 이메일로 로그인
              </Button>
            </Link>
          </ButtonGroup>
        </div>
        <Box w={500}>
          <Image src={AgreementImg} alt="agreement-img" />
        </Box>
      </Flex>
    </>
  );
};

export default Agreement;

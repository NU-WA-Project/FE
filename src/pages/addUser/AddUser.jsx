import { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Text,
  Flex,
  Box,
  Button,
  Textarea,
  Image,
  Grid,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  useToast,
} from '@chakra-ui/react';
import IconImage from '@assets/workspace_card3.png';
import SearchBar from '@components/SearchBar/WorkspaceSearchBar';
import { useLoaderData, useParams } from 'react-router-dom';
import { workspaceMemberList } from '@apis/workspace/workspaceMemberList';
import { inviteLink } from '@apis/link/invitationLink';
import { createInviteLink } from '@apis/link/createInviteLink';
import { changeMemberRole } from '@apis/workspace/changeMemberRole';
import permission from '@assets/permission.png';

const AddUser = () => {
  const { workSpaceId } = useParams();
  const [members, setMembers] = useState([]);
  const [emailInput, setEmailInput] = useState('');
  const [createLink, setcreateLink] = useState('');
  const { userProfile } = useLoaderData();
  const [userAuth, setUserAuth] = useState('JOIN'); // CREATED
  const toast = useToast();

  const handleChangeRole = async (workSpaceMemberId, type) => {
    const { success, data, message } = await changeMemberRole(
      workSpaceMemberId,
      workSpaceId,
      type
    );
    if (success) {
      alert(`권한 변경 성공: ${data.message}`);
      // 성공 후 멤버 목록 업데이트 로직 필요 (예시로는 상태 업데이트 또는 다시 fetchMembers 호출)
      // fetchMembers(); // 멤버 목록 다시 가져오기 (이 함수는 이미 정의된 상태에서 호출)
    } else {
      alert(`권한 변경 실패: ${message}`);
    }
  };

  useEffect(() => {
    const generateInviteLink = async () => {
      try {
        const response = await createInviteLink(workSpaceId);
        if (response.status === 'success') {
          setcreateLink(response.data.link);
        } else {
          console.error('초대 링크 생성에 실패했습니다:', response.message);
        }
      } catch (error) {
        console.error('초대 링크 생성 과정에서 오류 발생:', error);
      }
    };

    generateInviteLink();
  }, [workSpaceId]);

  const handleInvite = async () => {
    const emailAddresses = emailInput
      .split(',')
      .map((email) => email.trim())
      .filter((email) => email !== ''); // 빈 문자열 제거

    if (emailAddresses.length === 0) {
      alert('유효한 이메일 주소를 입력하세요.');
      return;
    }

    try {
      const response = await inviteLink(workSpaceId, emailAddresses);
      console.log('초대 링크 생성 성공:', response);
      alert('초대 메일이 성공적으로 발송되었습니다.');
      setEmailInput('');
    } catch (error) {
      console.error('초대 링크 생성 실패', error);
      alert('초대 메일 발송에 실패하였습니다.');
    }
  };

  useEffect(() => {
    const fetchMembers = async () => {
      const data = await workspaceMemberList(workSpaceId);
      if (data && data.status === 'success') {
        setMembers(data.data);
        data.data.forEach((member) => {
          if (member.id === userProfile.id) {
            setUserAuth(member.workSpaceMemberType);
          }
        });
      } else {
        console.error('멤버를 조회할 수 없습니다.');
      }
    };

    fetchMembers();
  }, [workSpaceId]);

  //todo
  // 현재 유저 정보 가져와서
  // 자기 자신 빼고
  // join 권한이면 메뉴창은 안보이게.
  return (
    <StContainer>
      <TopSection>
        <Text fontSize={'28px'} fontWeight={'680'}>
          사용자 추가
        </Text>

        <Text fontSize={'15px'} fontWeight={'420'} color={'#5d5d5d'}>
          NUWA가 작동하는 걸 보려면, 사람들이 좀 더 필요합니다. 가장 이야기를
          많이 나누는 팀원 중 일부를 초대하세요.
        </Text>

        <Flex gap={'10px'}>
          <Textarea
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="예 :  example@email.com, example@email.com"
            border={'2px solid #F2F2F2'}
            color={'#606060'}
            size={'16px'}
            width={'70%'}
            height={'100%'}
            resize={'none'}
            sx={{
              '::placeholder': {
                color: '#5d5d5d',
                fontSize: '16px',
              },
            }}
          />

          <Button
            p={'0px 30px'}
            color={'white'}
            bg={'#575DFB'}
            borderRadius={'18px'}
            onClick={handleInvite}
          >
            추가
          </Button>
        </Flex>

        <Flex gap={'12px'} fontSize={'16px'} flexFlow={'wrap'}>
          <Text color={'#5d5d5d'} fontWeight={'380'}>
            또는 전체 팀에게 이 링크 전송:
          </Text>
          <Text color={'#5d5d5d'}>{createLink}</Text>
          <Text
            color={'#575DFB'}
            fontWeight={'510'}
            cursor={'pointer'}
            onClick={() => {
              navigator.clipboard.writeText(createLink);
              toast({
                title: '링크 복사 완료!',
                description: '초대 링크가 복사되었습니다!',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top',
              });
            }}
          >
            초대 링크 복사
          </Text>
        </Flex>
      </TopSection>

      <BottomSection>
        <Flex gap={'10px'} marginBottom={'-10px'}>
          <Button
            borderRadius={'full'}
            fontSize={'14px'}
            fontWeight={'500'}
            p={'12px 26px'}
            color={'#FFFFFF'}
            bgColor={'#575DFB'}
          >
            멤버
          </Button>
          <Button
            borderRadius={'full'}
            fontSize={'14px'}
            fontWeight={'500'}
            p={'12px 26px'}
            bgColor={'#FFFFFF'}
            border={'1px solid #575DFB'}
            color={'#575DFB'}
          >
            사용자 그룹
          </Button>
        </Flex>

        <SearchBar />

        <UserDataContainer>
          <Grid
            pb={'1rem'}
            templateColumns="repeat(auto-fill, minmax(180px, 1fr))"
            gap={'6'}
          >
            {members
              .filter((item) => item.id !== userProfile.id)
              .map((member, index) => (
                <Flex key={`member-${index}`} justify={'space-between'}>
                  <UserData>
                    <Box height={'160px'}>
                      {/* <Image src={IconImage} boxSize="full" /> */}
                      <Avatar
                        size={'2xl'}
                        name={member.name}
                        boxSize="full"
                        rounded={'sm'}
                        borderRadius={'0'}
                        src={member.image}
                      />
                    </Box>
                    <Flex>
                      <Box
                        p={' 10px 20px'}
                        //border={'1px solid red'}
                        width={'90%'}
                      >
                        <Text fontWeight={'700'}>{member.name}</Text>
                        <Text
                          fontSize={'12px'}
                          fontWeight={'500'}
                          color={'#797979'}
                        >
                          {member.email}
                        </Text>
                      </Box>
                      <Box width={'10%'}>
                        {userAuth === 'CREATED' && (
                          <Menu>
                            <MenuButton as={Button} variant="unstyled">
                              <img src={permission} alt="권한 변경" />
                            </MenuButton>
                            <MenuList>
                              <MenuItem
                                onClick={() =>
                                  handleChangeRole(member.id, 'CREATED')
                                }
                              >
                                관리자 임명
                              </MenuItem>
                              <MenuItem
                                onClick={() =>
                                  handleChangeRole(member.id, 'JOIN')
                                }
                              >
                                권한 제거
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        )}
                      </Box>
                    </Flex>
                  </UserData>
                </Flex>
              ))}
          </Grid>
        </UserDataContainer>
      </BottomSection>
    </StContainer>
  );
};

export default AddUser;

const StContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  gap: auto;
  margin: 0px 50px;
  justify-content: space-between;
`;

const TopSection = styled.div`
  display: flex;
  flex-flow: column;
  margin-top: 62px;
  gap: 10px;
`;

const BottomSection = styled.div`
  height: 62%;
  display: flex;
  flex-flow: column;
  background-color: #ffffff;
`;

const UserDataContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-right: 0.6rem;
`;

const UserData = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  border: 1px solid #d9d9d9;
  border-radius: 22px;
  overflow: hidden;
`;

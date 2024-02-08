import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import AtIcon from '@components/Image/AtIcon';
import FormErrorMessage from '@components/Text/FormErrorMessage';
import _ from 'lodash';
import { chekcDuplicateNickname } from '@apis/axios/auth';
import InputSpaceBox from '@components/Box/InputSpaceBox';

const NicknameInput = ({ register, errors }) => {
  return (
    <div>
      <InputGroup>
        <InputLeftElement pointerEvents="none" paddingTop={'12px'}>
          <AtIcon />
        </InputLeftElement>
        <Input
          width={'100%'}
          height={'52px'}
          borderRadius={'8px'}
          type="text"
          placeholder="닉네임"
          bg={'white'}
          border={'none'}
          maxLength={30}
          {...register('nickname', {
            required: '닉네임을 입력해주세요',
            validate: {
              isNicknameUnique: _.debounce(async (nickname) => {
                const { isValid, errorMessage } = await chekcDuplicateNickname(
                  nickname
                );
                return isValid || errorMessage;
              }, 500),
            },

            // maxLength: {
            //   value: 30,
            //   message: '30자를 초과 할 수 없습니다.',
            // },
          })}
        />
      </InputGroup>
      {errors.nickname ? (
        <FormErrorMessage>{errors.nickname?.message}</FormErrorMessage>
      ) : (
        <InputSpaceBox />
      )}
    </div>
  );
};

export default NicknameInput;
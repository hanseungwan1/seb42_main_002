import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HiOutlineBan } from 'react-icons/hi';
import { DELETE, POST } from '../../utils/axios';
import { genderTransformer, langTransformer } from '../../utils/common';
import Button from '../Common/Button/Button';
import ButtonGroup from '../Common/Button/ButtonGroup';
import Flex from '../Common/Flex/Flex';
import InfoGroup from '../Common/InfoGroup/InfoGroup';
import Label from '../Common/Label/Label';
import ProfileCard from '../Common/ProfileCard/ProfileCard.module';
import ProfileImage from '../Common/ProfileImage/ProfileImage';
import styles from './Profile.module.scss';
import { getAge } from '../../utils';
import useModals from '../../hooks/useModals';
import AlertModal, { AlertModalProps } from '../Common/Modal/AlertModal';
import { newLetterState, userState } from '../../recoil/atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { BiEdit } from 'react-icons/bi';
import { rerenderingTriggerState } from '../../recoil/atoms/common';
import { otherUserSelector } from '../../recoil/selectors/user/user';

const Profile = () => {
  const { openModal } = useModals();
  const { memberId } = useParams();
  const navigate = useNavigate();
  const setNewLetter = useSetRecoilState(newLetterState);
  const userInfo = useRecoilValue(otherUserSelector(memberId || ''));
  const myInfo = useRecoilValue(userState);
  const setRerenderingTrigger = useSetRecoilState(rerenderingTriggerState);

  /**
   * 내가 선택한 언어
   */
  const myInfoLanguages = useMemo(
    () => (myInfo && myInfo?.language?.map((tag) => tag.languageId)) || [],
    [myInfo?.language]
  );

  /**
   * 내가 선택한 태그
   */
  const myInfoTags = useMemo(
    () => (myInfo && myInfo?.tag?.map((tag) => tag.tagId)) || [],
    [myInfo?.tag]
  );

  /**
   * 친구 추가
   * @param followingId
   */
  const postFollowing = async (followingId: number) => {
    try {
      const request = await POST(`/users/me/follows`, {
        followingId: followingId,
      });
      if (request) {
        setRerenderingTrigger((prev) => prev + 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * 친구삭제
   * @param followingId
   */
  const deleteFollowing = async (followingId: number) => {
    try {
      const request = await DELETE(`/users/me/follows?target=${followingId}`);
      if (request) {
        setRerenderingTrigger((prev) => prev + 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * 친구차단
   * @param targetId
   */
  const postBlockUser = async (targetId: number) => {
    try {
      const request = await POST(`/users/me/blocks`, {
        targetId: targetId,
      });
      if (request) {
        setRerenderingTrigger((prev) => prev + 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * 친구차단해제
   * @param targetId
   */
  const deleteBlockUser = async (targetId: number) => {
    try {
      const request = await DELETE(`/users/me/blocks?target=${targetId}`);
      if (request) {
        setRerenderingTrigger((prev) => prev + 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const confirmBlockUserModal = ({ onSubmit, onClose }: AlertModalProps) => {
    return (
      <AlertModal title="친구 차단" onSubmit={onSubmit} onClose={onClose}>
        <p className="text_center">
          <span className="text_active">{userInfo?.name}</span>
          &nbsp;님을 차단하시겠습니까?
        </p>
      </AlertModal>
    );
  };

  const confirmBlackUserHandler = (targetId: number) => {
    openModal(confirmBlockUserModal, {
      onSubmit: () => {
        postBlockUser(targetId);
      },
    });
  };

  const onClickHandler = (
    event: React.MouseEvent<Element, MouseEvent>,
    memberId: number,
    receiver: string
  ) => {
    // 이벤트 전파 방지
    event.stopPropagation();
    setNewLetter((prev) => ({
      ...prev,
      memberId,
      receiver,
    }));
    navigate('/newLetter');
  };

  return (
    <>
      <ProfileCard>
        {userInfo && (
          <>
            <ProfileCard.BaseInfo>
              <ProfileCard.BaseInfo.ImageArea>
                <Flex dir="column" gap="sm">
                  <Flex.Col>
                    <ProfileImage
                      profile={userInfo.profile}
                      location={userInfo.location}
                    />
                  </Flex.Col>
                  <Flex.Col>
                    <ButtonGroup>
                      <Flex dir="column" gap="sm">
                        {/** 차단된 친구 일 경우 */}
                        {userInfo.block && (
                          <Button
                            size="sm"
                            variant="secondary"
                            full
                            onClick={() => deleteBlockUser(userInfo.memberId)}
                          >
                            차단해제
                          </Button>
                        )}
                        {/** 차단되지않은 친구 일 경우 */}
                        {!userInfo.block && (
                          <>
                            {/** 팔로잉 친구 조건 분기 */}
                            {!userInfo.friend ? (
                              <Button
                                size="sm"
                                variant="primary"
                                full
                                onClick={() => postFollowing(userInfo.memberId)}
                              >
                                친구추가
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="secondary"
                                full
                                onClick={() =>
                                  deleteFollowing(userInfo.memberId)
                                }
                              >
                                친구삭제
                              </Button>
                            )}
                          </>
                        )}
                      </Flex>
                    </ButtonGroup>
                  </Flex.Col>
                </Flex>
              </ProfileCard.BaseInfo.ImageArea>
              <ProfileCard.BaseInfo.InfoArea>
                <InfoGroup>
                  <InfoGroup.Label>별명</InfoGroup.Label>
                  <InfoGroup.Content>
                    <p>{userInfo.name}</p>
                  </InfoGroup.Content>
                </InfoGroup>
                {userInfo.gender && (
                  <InfoGroup>
                    <InfoGroup.Label>성별</InfoGroup.Label>
                    <InfoGroup.Content>
                      <p>{genderTransformer(userInfo.gender)}</p>
                    </InfoGroup.Content>
                  </InfoGroup>
                )}
                {userInfo.birthday && (
                  <InfoGroup>
                    <InfoGroup.Label>생년월일</InfoGroup.Label>
                    <InfoGroup.Content>
                      <p>
                        {userInfo.birthday} (
                        {getAge(new Date(userInfo.birthday || ''))}세)
                      </p>
                    </InfoGroup.Content>
                  </InfoGroup>
                )}
                <div className={styles.btn_accuse}>
                  {!userInfo?.block && (
                    <Button
                      size="sm"
                      variant="default"
                      iconBtn
                      color="secondary"
                      icon={<HiOutlineBan />}
                      full
                      onClick={() => {
                        confirmBlackUserHandler(userInfo.memberId);
                      }}
                    >
                      친구차단
                    </Button>
                  )}
                  {/* <Button
                    size="sm"
                    variant="default"
                    iconBtn
                    color="danger"
                    icon={<AiOutlineAlert />}
                  >
                    신고
                  </Button> */}
                </div>
              </ProfileCard.BaseInfo.InfoArea>
            </ProfileCard.BaseInfo>
            <ProfileCard.ExtraInfo>
              <InfoGroup className="extra_info">
                <InfoGroup.Label>자기소개</InfoGroup.Label>
                <InfoGroup.Content>
                  <p>{userInfo.introduce}</p>
                </InfoGroup.Content>
              </InfoGroup>
              <InfoGroup className="extra_info">
                <InfoGroup.Label>언어</InfoGroup.Label>
                <InfoGroup.Content>
                  <Flex gap="sm" wrap="wrap">
                    {userInfo.language &&
                      userInfo.language.map((language) => (
                        <Flex.Col key={language.nation}>
                          <Label
                            isActive={myInfoLanguages.includes(
                              language.languageId
                            )}
                          >
                            {langTransformer(language.nation)} Lv.
                            {language.level}
                          </Label>
                        </Flex.Col>
                      ))}
                  </Flex>
                </InfoGroup.Content>
              </InfoGroup>
              <InfoGroup className="extra_info">
                <InfoGroup.Label>태그</InfoGroup.Label>
                <InfoGroup.Content>
                  <Flex gap="sm" wrap="wrap">
                    {userInfo.tag &&
                      userInfo.tag.map((tag) => (
                        <Flex.Col key={tag.tagId}>
                          <Label isActive={myInfoTags.includes(tag.tagId)}>
                            {tag.name}
                          </Label>
                        </Flex.Col>
                      ))}
                  </Flex>
                </InfoGroup.Content>
              </InfoGroup>
            </ProfileCard.ExtraInfo>
          </>
        )}
      </ProfileCard>
      <Button
        variant="primary"
        size="md"
        iconBtn
        icon={<BiEdit />}
        className={styles.btn_newLetter}
        onClick={(event) => {
          onClickHandler(
            event,
            userInfo?.memberId as number,
            userInfo?.name as string
          );
        }}
      />
    </>
  );
};

export default Profile;

import defaultProfile from '../../../assets/img/common/default_owls_thumb.svg';
import {
  LocationIcons,
  locationTypes,
  onErrorImageHandler,
} from '../../../utils';
import { LOCATION_CODE } from '../../../utils/enums/common/common.enum';
import styles from './RoundProfile.module.scss';

type RoundProfileProps = {
  location: LOCATION_CODE; // 2자 국가 코드
  profile: string | null;
};

const RoundProfile = ({ location, profile }: RoundProfileProps) => {
  return (
    <div className={styles.round_profile}>
      <div
        style={{
          backgroundImage: `url(${
            LocationIcons[location as keyof locationTypes]
          })`,
        }}
        className={styles.location}
      ></div>
      <div className={styles.profile}>
        {profile && (
          <img src={profile} alt="프로필" onError={onErrorImageHandler} />
        )}
        {!profile && (
          <img
            className={styles.default_profile}
            src={defaultProfile}
            alt="프로필"
            onError={onErrorImageHandler}
          />
        )}
      </div>
    </div>
  );
};

export default RoundProfile;

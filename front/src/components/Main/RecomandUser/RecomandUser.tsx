import MainTitle from '../MainTitle';
import RecomandUserList from './RecomandUserList';
import styles from './RecomandUser.module.scss';

const RecomandUser = () => {
  return (
    <>
      <MainTitle title="추천친구" />
      <RecomandUserList />
    </>
  );
};

export default RecomandUser;

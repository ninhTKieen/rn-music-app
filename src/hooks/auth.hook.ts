import { useAppSelector } from './redux.hook';

import { selectedIsLoggedIn } from 'src/features/auth/auth.slice';

const useCheckAuth = () => {
  const isLoggedIn = useAppSelector(selectedIsLoggedIn);

  return { isLoggedIn };
};

export default useCheckAuth;

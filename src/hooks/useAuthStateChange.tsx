import {onAuthStateChanged} from 'firebase/auth';
import {useCallback, useEffect} from 'react';
import {fireAuth} from '../firebase';
import {useAppContext} from '../providers/AppProvider';

export function useAuthStateChange(): void {
  const {setUser, resetUser} = useAppContext();

  const checkAuthState = useCallback(() => {
    return onAuthStateChanged(fireAuth, (fireUser) => {
      if (!fireUser) {
        resetUser();

        return;
      }

      const {email} = fireUser;

      setUser({email: email || 'test'});
    });
    /* To prevent an infinite rerender */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const unSub = checkAuthState();

    return unSub;
  }, [checkAuthState]);
}

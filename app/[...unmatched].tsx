import {Redirect} from 'expo-router';
import type {ReactElement} from 'react';

/* 
  To deal with unmatched router error on android after authentication with expo-auth-session
*/
export default function UnMatched(): ReactElement {
  return <Redirect href="/" />;
}

import {Redirect} from 'expo-router';
import {ReactElement} from 'react';

/* 
  For android redirect. This looks like expo router bug.
  issue: https://github.com/expo/router/issues/157
*/
export default function Unmatched(): ReactElement {
  return <Redirect href="/" />;
}

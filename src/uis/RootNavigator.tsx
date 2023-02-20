import type {ReactElement} from 'react';
import React, {useMemo} from 'react';
import styled, {css} from '@emotion/native';
import {useRouter} from 'expo-router';
import {Icon, useDooboo} from 'dooboo-ui';
import type {IconName} from 'dooboo-ui';
import {Body1} from './Typography';
import type {StyleProp, ViewStyle} from 'react-native';
import {Platform, useWindowDimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Container = styled.View`
  border-color: ${({theme}) => theme.text.basic};
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-radius: 2px;
  blur-radius: 3px;
  spread-radius: rgba(0, 0, 0, 0.04);
  elevation: 1;

  flex-direction: row;
  justify-content: center;
  align-items: center;

  /* For desktop and tablet */
  ${({theme: {isMobile}}) =>
    !isMobile &&
    css`
      height: 100%;
      width: 160px;
      font-size: 18px;
      border-right-width: 0.2px;
      border-top-width: 0px;

      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    `}

  /* For tablet only */
  ${({theme: {isTablet}}) =>
    isTablet &&
    css`
      width: 50px;
      height: 100%;
      border-right-width: 0.2px;
    `}
`;

const NavHeader = styled.View`
  height: 48px;
  padding-left: 24px;

  flex-direction: row;
  align-items: center;

  ${({theme: {isTablet}}) =>
    isTablet &&
    css`
      padding-left: 0px;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    `};
`;

const NavWrapper = styled.View`
  width: 100%;
  height: 60px;

  flex-direction: row;
  align-items: center;

  ${({theme: {isDesktop}}) =>
    isDesktop &&
    css`
      padding: 24px 0px 0px 0px;

      flex-direction: column;
      align-items: flex-start;
    `};

  ${({theme: {isTablet}}) =>
    isTablet &&
    css`
      padding: 12px 0px 0px 0px;

      flex-direction: column;
      align-items: center;
    `};
`;

const StyledLink = styled.Pressable`
  flex: 1;
  align-self: stretch;
  font-size: 14px;
  color: ${({theme}) => theme.text.basic};

  justify-content: center;
  align-items: center;

  ${({theme: {isDesktop}}) =>
    isDesktop &&
    css`
      flex: 0;
      padding: 24px 0px 24px 14px;
      font-size: 18px;

      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
    `};

  ${({theme: {isTablet}}) =>
    isTablet &&
    css`
      padding: 24px 0px 24px 0px;
      font-size: 18px;
    `};
`;

function SectionItem({
  href,
  content,
  iconName,
  onMobile,
  style,
}: {
  href: string;
  content: string;
  onMobile: boolean;
  iconName: IconName;
  style?: StyleProp<ViewStyle>;
}): ReactElement {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const {
    media: {isDesktop, isPortrait},
  } = useDooboo();

  return (
    <StyledLink
      style={[
        style,
        onMobile && isPortrait && {paddingBottom: Math.min(insets.bottom, 10)},
      ]}
      onPress={() => router.push(href)}
    >
      <Icon name={iconName} size={16} />
      {isDesktop ? <Body1 style={{marginLeft: 8}}>{content}</Body1> : null}
    </StyledLink>
  );
}

export default function RootNavigator(): React.ReactElement {
  const {
    media: {isMobile, isDesktop},
  } = useDooboo();

  const {height: windowHeight} = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const onMobile = Platform.OS === 'android' || Platform.OS === 'ios';

  const data: Array<{route: string; iconName: IconName; text: string}> =
    useMemo(
      () => [
        {route: '/', iconName: 'HomeAlt', text: 'Home'},
        {route: '/temp', iconName: 'ExploreAlt', text: 'Explore'},
        {route: '/temp', iconName: 'Add', text: 'Create'},
        {route: '/temp', iconName: 'Search', text: 'Search'},
      ],
      [],
    );

  return (
    <Container style={{marginLeft: insets.left}}>
      {!isMobile ? (
        <NavHeader>
          <Icon name="Dooboo" size={16} />
          {isDesktop && <Body1 style={{marginLeft: 8}}>dooboo</Body1>}
        </NavHeader>
      ) : null}

      <NavWrapper style={[!isMobile && {height: windowHeight - 48}]}>
        {data.map(({route, iconName, text}, i) => (
          <SectionItem
            key={`${route}-${i}`}
            href={route}
            onMobile={onMobile}
            iconName={iconName}
            content={text}
          />
        ))}
        <SectionItem
          href="/"
          onMobile={onMobile}
          iconName="Menu"
          content="Menu"
          style={[!isMobile && {marginTop: 'auto', marginBottom: 15}]}
        />
      </NavWrapper>
    </Container>
  );
}

import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { PropsWithChildren } from 'react';
import { screenStyles } from './styles';

interface ScreenLayoutProps {
  header?: string;
  action?: JSX.Element;
  scroll?: boolean;
}

interface WrapperProps {
  scroll?: boolean;
}

function Wrapper({ scroll, children }: PropsWithChildren<WrapperProps>) {
  return (
    <>
      {scroll ? (
        <ScrollView
          style={screenStyles.contentContainer}
          contentContainerStyle={screenStyles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={screenStyles.contentContainer}>{children}</View>
      )}
    </>
  );
}

export function ScreenLayout({
  header,
  action,
  scroll = true,
  children,
}: PropsWithChildren<ScreenLayoutProps>) {
  return (
    <SafeAreaView style={screenStyles.container}>
      <View style={screenStyles.content}>
        <Wrapper scroll={scroll}>
          {header ? (
            <View style={screenStyles.header}>
              <Text style={screenStyles.headerText}>{header}</Text>
            </View>
          ) : null}
          <View style={screenStyles.body}>{children}</View>
        </Wrapper>
        {action ? <View style={screenStyles.action}>{action}</View> : null}
      </View>
    </SafeAreaView>
  );
}

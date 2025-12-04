import React, { type ReactNode } from 'react';
import Layout from '@theme-original/Layout';
import type LayoutType from '@theme/Layout';
import type { WrapperProps } from '@docusaurus/types';
import MainHome from '@site/src/components/HomepageFeatures/Home';
import { ChatProvider } from '@site/src/context/ChatKitContext';
import ErrorBoundary from '@site/src/components/ErrorBoundary';
import CursorEffect from '@site/src/components/CursorEffect';

type Props = WrapperProps<typeof LayoutType>;

export default function LayoutWrapper(props: Props): ReactNode {
  return (
    <>
      <CursorEffect />
      <ChatProvider>
        <Layout {...props} />
        <ErrorBoundary componentName="ChatKit/MainHome">
          <MainHome />
        </ErrorBoundary>
      </ChatProvider>
    </>
  );
}

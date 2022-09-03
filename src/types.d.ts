import 'styled-components';
import { theme } from '@/theme';

declare module 'styled-components' {
  type Theme = typeof theme;
  export interface DefaultTheme extends Theme {}
}

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      'pages/stores': undefined;
      'pages/store': { storeId: string };
      'pages/products': undefined;
      'pages/product': { productId?: string };
      'pages/session-step-one': undefined;
      'pages/session-step-two': { email: string };
    }
  }
}

import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../lib/hooks/useAuth';
import { Provider as AlertProvider, transitions, positions } from 'react-alert';
import { Alert } from '../components/Alert';

export const alertOptions = {
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: '5px',
  transition: transitions.SCALE,
};

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AlertProvider template={Alert} {...alertOptions}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </AlertProvider>
  );
}

export default MyApp;

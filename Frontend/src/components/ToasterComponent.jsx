import { Toaster } from 'react-hot-toast';

export const ToasterComponent = () => (
  <Toaster
    position="top-right"
    toastOptions={{
      duration: 2000,
      style: {
        background: '#333',
        color: '#fff',
      },
    }}
  />
);

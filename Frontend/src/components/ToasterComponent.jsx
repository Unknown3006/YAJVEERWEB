import { Toaster } from 'react-hot-toast';

export const ToasterComponent = () => (
  <Toaster
    position="top-right"
    toastOptions={{
      duration: 2000,
      style: {
        background: '#333',
        color: '#fff',
        padding: '16px 24px',
        fontSize: '14px',
        borderRadius: '8px',
      },
      // Remove default icon
      icon: null,
      // Custom success/error styling without icons
      success: {
        style: {
          background: '#22c55e',
        },
      },
      error: {
        style: {
          background: '#dc2626',
        },
      }
    }}
  />
);

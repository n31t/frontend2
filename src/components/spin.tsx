import React from 'react';

const SpinningLoader: React.FC = () => {
  return (
    <div
      style={{
        width: '4rem',
        height: '4rem',
        border: '8px dashed #3182CE', // Adjust border color and width as needed
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        borderTopColor: 'transparent',
      }}
    ></div>
  );
};

export default SpinningLoader;

<style>
  {`
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `}
</style>

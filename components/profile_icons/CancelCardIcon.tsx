import React from 'react';

const CancelCardIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Я убрал <rect>, так как белый фон и рамку мы уже рисуем в CSS */}
    <path 
      d="M24 10L10 24M10 10L24 24" 
      stroke="#3B3028" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>    
);

export default CancelCardIcon;
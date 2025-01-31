import React from 'react';

const css = `
  .graphic-logo {
    width: 150px;
    height: auto;    
  }
  .logo-text {
    font-style:normal;
    font-weight:normal;
    font-size:100px;
    line-height:1.25;
    font-family:sans-serif;
    letter-spacing:0px;
    word-spacing:0px;
    fill-opacity:1;
    stroke:none
    font-family:'Liberation Sans';
    -inkscape-font-specification:'Liberation Sans'
  }
  `;

export const Logo = () => {
  return (
    <svg
      className="graphic-logo"
      fill="#0F0F0F"
      viewBox="0 0 500 563"
      xmlns="http://www.w3.org/2000/svg">
      <style type="text/css">{css}</style>

      <g transform="translate(100, 230) scale(10,10)">
        <path
          d="M0 0 C5.28 0 10.56 0 16 0 C16 5.28 16 10.56 16 16 C10.72 16 5.44 16 0 16 C0 10.72 0 5.44 0 0 Z "
          fill="#CDDDDD"
          transform="translate(0,0)"
        />
        <path
          d="M0 0 C0 2.31 0 4.62 0 7 C2.41645782 7.16687448 2.41645782 7.16687448 5 7 C5.66 6.34 6.32 5.68 7 5 C7 6.98 7 8.96 7 11 C1.72 11 -3.56 11 -9 11 C-9 10.01 -9 9.02 -9 8 C-7.02 7.67 -5.04 7.34 -3 7 C-3 6.67 -3 6.34 -3 6 C-4.65 6 -6.3 6 -8 6 C-7.67 4.35 -7.34 2.7 -7 1 C-4.50935112 0.31292445 -2.62113708 0 0 0 Z "
          fill="#085A5A"
          transform="translate(9,5)"
        />
        <path
          d="M0 0 C5.28 0 10.56 0 16 0 C16 0.99 16 1.98 16 3 C15.01 3 14.02 3 13 3 C13.33 5.31 13.66 7.62 14 10 C13.01 10.33 12.02 10.66 11 11 C11 8.36 11 5.72 11 3 C10.37351562 3.08378906 9.74703125 3.16757812 9.1015625 3.25390625 C8.28429688 3.35574219 7.46703125 3.45757812 6.625 3.5625 C5.81289062 3.66691406 5.00078125 3.77132813 4.1640625 3.87890625 C2 4 2 4 0 3 C0 2.01 0 1.02 0 0 Z "
          fill="#0F5E5E"
          transform="translate(0,0)"
        />
      </g>
    </svg>
  );
};

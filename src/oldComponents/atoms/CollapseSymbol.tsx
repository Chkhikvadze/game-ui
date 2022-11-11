import React from 'react'

const CollapseSymbol = ({ opened }: { opened?: boolean } = {}) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="cross carDetail-icon"
  >
    {!opened && (
      <path
        d="M12 5V19"
        stroke="#19B3FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="c-minus"
      />
    )}

    <path
      d="M5 12H19"
      stroke="#19B3FF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default CollapseSymbol

import React from 'react'

type BellIconProps = {
  color?: string
}

const BellIcon = ({ color }: BellIconProps) => (
  <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill={color ? color : '#fff'} fillOpacity=".01" d="M0 0h16v16H0z" />
    <g clipPath="url(#a)">
      <path
        d="M8 15.999a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2Zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 5.998c0 1.099-.5 6-2 7h14c-1.5-1-2-5.901-2-7 0-2.42-1.72-4.44-4.005-4.9Z"
        fill={color ? color : '#fff'}
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill={color ? color : '#fff'} d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default BellIcon

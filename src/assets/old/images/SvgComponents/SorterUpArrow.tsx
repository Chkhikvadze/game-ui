import React from 'react'

type SorterUpArrowProps = {
  color?: string;
}

const SorterUpArrow = ({ color }: SorterUpArrowProps) => (
  <svg width="10" height="8" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.98232 0.341357L0.68507 4.10954C0.295945 4.55436 0.612195 5.25011 1.20276 5.25011H7.79726C7.92943 5.25022 8.05883 5.21223 8.16996 5.1407C8.28109 5.06916 8.36925 4.96711 8.42388 4.84676C8.4785 4.7264 8.49728 4.59286 8.47796 4.46211C8.45864 4.33136 8.40204 4.20895 8.31495 4.10954L5.0177 0.342044C4.95317 0.2682 4.87358 0.209016 4.7843 0.168465C4.69501 0.127913 4.59807 0.106934 4.50001 0.106934C4.40194 0.106934 4.30501 0.127913 4.21572 0.168465C4.12643 0.209016 4.04685 0.2682 3.98232 0.342044V0.341357Z" fill={color ? color : '#ADB5BD'}/>
  </svg>
)

export default SorterUpArrow
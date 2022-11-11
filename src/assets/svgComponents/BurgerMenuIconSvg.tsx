import * as React from "react"
import { SVGProps } from "react"

const BurgerMenuIconSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={12}
    height={10}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M.5 5h11M.5 1h11M.5 9h11"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default BurgerMenuIconSvg

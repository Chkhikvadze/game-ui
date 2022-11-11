import * as React from "react"

function ChevronIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={16}
      height={10}
      viewBox="0 0 16 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.999 8l-2 2-2-2-6-6 2-2 6 6 6-6 2 2-6 6z"
        fill="#002664"
      />
    </svg>
  )
}

export default ChevronIcon

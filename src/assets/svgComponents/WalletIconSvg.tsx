import * as React from 'react'
import { SVGProps } from 'react'

const WalletIconSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg width={17} height={16} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M12.97 1H4.988a2.998 2.998 0 0 0-2.544 1.41 2.799 2.799 0 0 0 2.41 1.376H14.812c.228 0 .446-.059.638-.164a2.055 2.055 0 0 0-.74-.457l-.314-.111a3.421 3.421 0 0 0-1.143-.197H4.116a.476.476 0 1 1 0-.952H13.5c.818 0 1.565.281 2.154.75A3 3 0 0 0 12.97 1Zm3.93 2.251A4.001 4.001 0 0 0 12.97 0H4.988a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h7.984a4 4 0 0 0 4-4V4c0-.197-.015-.391-.042-.581.02-.044.039-.09.056-.136l-.084-.032Zm-.93 1.225c-.345.199-.743.31-1.16.31H4.855a3.799 3.799 0 0 1-2.829-1.263A3.022 3.022 0 0 0 1.987 4v8a3 3 0 0 0 3 3h7.984a3 3 0 0 0 3-3v-.071H13.89a2.214 2.214 0 1 1 0-4.429h2.08V4.476Zm0 4.024h-2.08a1.214 1.214 0 0 0 0 2.429h2.08V8.5Z'
      fill='#fff'
      fillOpacity={0.6}
    />
  </svg>
)

export default WalletIconSvg

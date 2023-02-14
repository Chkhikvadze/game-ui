//eslint-disable-next-line
import { DefaultTheme } from 'styled-components'

const defaultTheme: DefaultTheme = {
  body: {
    //   backgroundColor:"radial-gradient(52.7% 52.7% at 50% 50%, #3e4ea9 0%, #111b52 100%)",
    backgroundColor: 'radial-gradient(52.7% 52.7% at 50% 50%,#50B1D7 0%,#01256e 100%)',
    boxShadow: '0px 4px 40px rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(50px)',
    textColor: 'rgba(255, 255, 255)',
  },
}

const lightTheme: DefaultTheme = {
  body: {
    backgroundColor: 'linear-gradient(330deg,hsl(272, 53%, 50%) 0%, hsl(226, 68%, 56%) 100%)',
    boxShadow: '0px 4px 40px rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(50px);',
    textColor: 'rgba(255, 255, 255)',
  },
}

export { defaultTheme, lightTheme }

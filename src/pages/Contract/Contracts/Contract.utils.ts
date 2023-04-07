import exampleImg from '../assets/exampleImg.png'
// import exampleImg2 from '../assets/exampleImg2.png'
import exampleImg3 from '../assets/exampleImg3.png'

export const CHAIN_ID_TO_CONTRACT: Record<
  number,
  { title: string; subtitle: string; image: string }
> = {
  5: {
    title: 'Goerli',
    subtitle: 'Support the most widely used Ethereum scaling ecosystem...',
    image: exampleImg,
  },
  11155111: {
    title: 'Sepolia',
    subtitle: 'Support the most widely used Ethereum scaling ecosystem...',
    image: exampleImg,
  },
  80001: {
    title: 'Polygon PoS',
    subtitle: 'Support the most widely used Ethereum scaling ecosystem...',
    image: exampleImg3,
  },
  1442: {
    title: 'Polygon zkEVM',
    subtitle: 'Support the most widely used Ethereum scaling ecosystem...',
    image: exampleImg3,
  },
  //TODO: starknet
}

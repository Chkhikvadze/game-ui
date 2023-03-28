import { tomorrowNightBlue } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import exampleImg from '../assets/exampleImg.png'
import exampleImg2 from '../assets/exampleImg2.png'
import exampleImg3 from '../assets/exampleImg3.png'

export const CHAIN_CARDS = [
  {
    title: 'Polygon PoS',
    image: exampleImg,
    subtitle: 'Support the most widely used Ethereum scaling ecosystem...',
    chainId: 80001,
  },
  {
    title: 'Polygon zkEVM',
    image: exampleImg3,
    subtitle: 'Polygon zkEVM',
    chainId: 0,
  },
  {
    title: 'Starknet',
    image: exampleImg2,
    subtitle: '',
    chainId: 0,
  },
]

export const CODE_HIGHLIGHTER_STYLE = {
  ...tomorrowNightBlue,
  hljs: { background: 'transparent' },
  ['hljs-comment']: { color: '#66BB6A' },
  ['hljs-keyword']: { color: '#BA68C8' },
  ['hljs-built_in']: { color: '#FFFFFFCC' },
  ['hljs-string']: { color: '#FFFFFFCC' },
}

export const SAMPLE_CODE = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import './WeaponSupply.sol';

contract Main is ERC1155, Ownable, WeaponSupply {
  constructor() ERC1155('{{token_uri}}') {}

  function setURI(string memory newuri) public onlyOwner {
    _setURI(newuri);
  }

  function mint(address account, uint256 id, uint256 amount, bytes memory data)
    public onlyOwner {
    _mint(account, id, amount, data);
  }

  function mintBatch(
    address to,
    uint256[] memory ids,
    uint256[] memory amounts,
    bytes memory data
  ) public onlyOwner {
    _mintBatch(to, ids, amounts, data);
  }
}
`

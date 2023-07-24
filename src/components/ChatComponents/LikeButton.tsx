import { useState } from 'react'
import likeBtn from './assets/like_icon.svg'
import LikeButtonSvg from './assets/LikeButton'

const LikeButton = () => {
  const [count, set_count] = useState(0)

  return (
    <div>
      {count > 0 && count}
      <LikeButtonSvg />
    </div>
  )
}

export default LikeButton

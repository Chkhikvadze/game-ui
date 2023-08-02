import { useContext, useEffect, useState } from 'react'
import { LayoutContext } from 'contexts'

export const useChatSwitcher = () => {
  const { expand } = useContext(LayoutContext)
  const [showSwitcher, setShowSwitcher] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      // Check the window width and update the state accordingly
      setShowSwitcher(window.innerWidth >= 1000) // Adjust the breakpoint as needed
    }

    // Set the initial state on component mount
    handleResize()

    // Add a resize event listener to handle changes
    window.addEventListener('resize', handleResize)

    // Remove the event listener on component unmount to avoid memory leaks
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (expand) {
      setShowSwitcher(false)
    } else {
      setShowSwitcher(true)
    }
  }, [expand])

  const handleMouseHover = () => {
    setTimeout(() => {
      setShowSwitcher(true)
    }, 500)
  }

  const handleMouseLeave = () => {
    if (window.innerWidth <= 1000 || expand) {
      setTimeout(() => {
        setShowSwitcher(false)
      }, 1000)
    }
  }

  return {
    showSwitcher,
    setShowSwitcher,
    handleMouseHover,
    handleMouseLeave,
  }
}

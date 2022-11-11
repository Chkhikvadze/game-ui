import React from 'react'
import PropTypes from 'prop-types'

type ImageWithFallbackProps = {
  alt: string,
  url: string,
  height?: number,
  width?: number | string,
  fallbackUrl: string,
}

const ImageWithFallback = ({ alt, url, fallbackUrl, ...rest }: ImageWithFallbackProps) => (
  <img
    src={`${process.env.REACT_APP_STATIC_URL}/${url}`}
    onError={(error: any) => { error.target?.setAttribute('src', `${process.env.REACT_APP_STATIC_URL}/${fallbackUrl}`) }}
    alt={alt}
    {...rest}
  />
)

ImageWithFallback.propTypes = {
  url: PropTypes.string,
  fallbackUrl: PropTypes.string,
  alt: PropTypes.string,
}

export default ImageWithFallback

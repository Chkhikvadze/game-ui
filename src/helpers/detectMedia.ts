function isImage(url: string) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url)
}

function isVideo(url: string) {
  return /\.(mpg|mp2|mpeg|mpe|mpv|mp4|)$/.test(url)
}

const findVideo = (arr: any) => {
  const res = arr.length ? arr?.find((item: any) => isVideo(item.url)) : {}
  return res
}

export { isImage, isVideo, findVideo }

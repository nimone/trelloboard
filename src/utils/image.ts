import { getItem, setItem } from "./persist"

const IMG_STORE_KEY = "IMAGE_STORE",
  RAND_IMAGE_SRC = "https://source.unsplash.com/random"

interface Params {
  width: number
  height: number
  seeds: string[]
}

export function getRandomImage({
  width = window.screen.width,
  height = window.screen.height,
  seeds = [],
}: Partial<Params>): string {
  const imgUrl = getItem<string>(IMG_STORE_KEY)
  cacheRandomImage({ width, height, seeds })

  return imgUrl || getRandomImageUrl({ width, height, seeds })
}

async function cacheRandomImage(params: Params) {
  const resp = await fetch(getRandomImageUrl(params))
  const imgBlob = await resp.blob()

  var reader = new FileReader()
  reader.onload = function () {
    setItem(IMG_STORE_KEY, this.result)
  }
  reader.readAsDataURL(imgBlob)
}

const getRandomImageUrl = ({ width, height, seeds }: Params) =>
  `${RAND_IMAGE_SRC}/${width}x${height}?${seeds.join()}`

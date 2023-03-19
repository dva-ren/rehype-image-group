import type { Root } from 'hast'
import { h } from 'hastscript'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'
import { getImageSizeFromUrl, resizeImgUrl } from './utils'
export interface RehypeEmojiOptions {
  emojis: Record<string, string>
  className?: string
  ignore?: string | string[]
  alt?: boolean
}

const defaultOptions: RehypeEmojiOptions = {
  emojis: {},
  className: 'emoji',
  ignore: 'code',
  alt: true,
}

const rehypeCustomEmoji: Plugin<any, Root> = (
  options: RehypeEmojiOptions,
) => {
  const opts = { ...defaultOptions, ...options }
  function buildFigure({ properties }: any) {
    const src = properties.src
    const size = getImageSizeFromUrl(src)
    const figure = h('figure', {
      class: 'image-container',
      // style: `${size ? (`width:${size.width}px;aspect-ratio:${size.width / size.height}`) : ''}`,
      style: `${size ? (`--aspect-ratio:${size.width / size.height}`) : ''}`,
    }, [
      h('img', {
        ...properties,
        src: '',
        dataSrc: resizeImgUrl(src, 720),
        dataLoading: resizeImgUrl(src, 48),
      }),
      properties.alt?.trim()?.length > 0
        ? h('figcaption', properties.alt)
        : '',
    ])
    return figure
  }

  return (tree: any) => {
    visit(tree, 'element', (node, index) => {
      const images = node.children
        .filter((n: any) => n.tagName === 'img')
        .map((img: any) => buildFigure(img))
      if (images.length === 0 || !index)
        return
      tree.children[index]
        = images.length === 1
          ? images[0]
          : (tree.children[index] = h(
              'div',
              { class: 'image-group-container' }, [
                h('div', { class: 'image-group' }, images),
              ],
            ))
    })
  }
}

export default rehypeCustomEmoji

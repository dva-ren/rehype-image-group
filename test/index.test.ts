import { unified } from 'unified'
import gfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import remark2rehype from 'remark-rehype'
import remarkParse from 'remark-parse'
import stringify from 'rehype-stringify'
import { describe, expect, it } from 'vitest'
import rehypeImageGroup from '../src'

const parser = (content: string, options?: any) => {
  return unified()
    .use(remarkParse)
    .use(gfm)
    .use(remark2rehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeImageGroup, options)
    .use(stringify)
    .processSync(content)
    .toString()
}

describe('index.ts', () => {
  it('image group', async () => {
    const input = `
      #111

      ![](https://iiu.oss-cn-chengdu.aliyuncs.com/ohmycat/pictures/TEQfy2_1679046679133_w_4141x5864_.jpg?x-oss-process=image/resize,w_800)
      ![](https://iiu.oss-cn-chengdu.aliyuncs.com/ohmycat/pictures/n57RQM_1679046682208_w_5864x7820_.jpg?x-oss-process=image/resize,w_800)
      ![](https://iiu.oss-cn-chengdu.aliyuncs.com/ohmycat/pictures/5c8CHy_1679046680336_w_5864x7820_.jpg?x-oss-process=image/resize,w_800)
    `
    expect(parser(input)).toMatchInlineSnapshot(`
      "<pre><code>  #111

        ![](https://iiu.oss-cn-chengdu.aliyuncs.com/ohmycat/pictures/TEQfy2_1679046679133_w_4141x5864_.jpg?x-oss-process=image/resize,w_800)
        ![](https://iiu.oss-cn-chengdu.aliyuncs.com/ohmycat/pictures/n57RQM_1679046682208_w_5864x7820_.jpg?x-oss-process=image/resize,w_800)
        ![](https://iiu.oss-cn-chengdu.aliyuncs.com/ohmycat/pictures/5c8CHy_1679046680336_w_5864x7820_.jpg?x-oss-process=image/resize,w_800)
      </code></pre>"
    `)
  })
})

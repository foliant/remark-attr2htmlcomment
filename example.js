import {stream} from 'unified-stream'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkAttr from 'remark-attr2htmlcomment'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import rehypeAttr from 'rehype-attr'
 
const processor = unified()
  .use(remarkParse)
  .use(remarkAttr)
  .use(remarkRehype, {allowDangerousHtml: true})
  .use(rehypeRaw)
  .use(rehypeAttr, {properties: 'attr'})
  .use(rehypeStringify)

process.stdin.pipe(stream(processor)).pipe(process.stdout)
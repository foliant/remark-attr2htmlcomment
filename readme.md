# remark-attr2htmlcomment

Proof of concept remark plugin to replace custom markdown attributes with html comments.

Currently only supports single custom class attributes on blockquotes, headings and lists. 

## Rationale

The new remark parser [broke](https://github.com/arobase-che/remark-attr/issues/22) the remark-attr plugin.
There exists a similar [rehype plugin](https://github.com/jaywclove/rehype-attr), but it uses html comments instead of curly braces. 

## Usage:

~~~javascript
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
~~~

~~~shell
node example.js <example.md
~~~
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis'
import RehypeExternalLinks from 'rehype-external-links'
import RehypeSanitize from 'rehype-sanitize'
import RemarkEmoji from 'remark-emoji'

import { cn } from '@/utils/cn'

interface Props {
  readonly children?: string | null
  readonly className?: string
}

export function Markdown({ children: markdown, className }: Props) {
  return (
    <article className={cn('prose dark:prose-invert', className)}>
      <ReactMarkdown
        rehypePlugins={[
          RehypeSanitize,
          RehypeExternalLinks,
          rehypeAccessibleEmojis,
        ]}
        remarkPlugins={[RemarkEmoji]}
        components={{
          a: ({ className, children, href, node: _node, ...props }) => {
            return (
              <Link
                className={cn(className, 'underline')}
                to={href ?? ''}
                target="_blank"
                {...props}
              >
                {children}
              </Link>
            )
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </article>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface Props {
  readonly className?: string
  readonly header: React.ReactNode
  readonly children: React.ReactNode
}

export function BookCard({
  className = 'h-full w-full',
  header,
  children,
}: Props) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="relative flex flex-row">{header}</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>{children}</CardContent>
    </Card>
  )
}

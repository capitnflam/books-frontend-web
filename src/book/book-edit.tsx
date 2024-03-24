import {
  BookRequest,
  BookResult,
  bookRequestSchema,
} from '@flaminc/books-types'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Pencil as PencilIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Markdown } from '@/components/markdown'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { getBookQuery } from '../queries/book/get'
import { updateBook } from '../services/book/update'

interface Props {
  readonly id: string
}

export function BookEdit({ id }: Props) {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()
  const getQuery = getBookQuery(`/book/${id}`, {
    retry: false,
    refetchOnWindowFocus: false,
    enabled: open,
    staleTime: Number.POSITIVE_INFINITY,
  })

  const { data: book } = useQuery(getQuery)

  const { mutate } = useMutation({
    mutationFn: updateBook,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: getQuery.queryKey }),
  })

  const form = useForm<BookResult>({
    mode: 'onBlur',
    values: book,
    resolver: zodResolver(bookRequestSchema),
    disabled: !book,
  })
  const currentSynopsisMarkdown = form.watch('synopsis')
  const onSubmit = (values: BookRequest) => {
    mutate(values)
    setOpen(false)
  }
  const onReset = () => {
    form.reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} modal>
      <DialogTrigger asChild>
        <Button variant="link" className="m-0 p-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <PencilIcon className="h-6 w-6 hover:cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>Edit</TooltipContent>
          </Tooltip>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[80vh] min-h-[80vh] min-w-[80vw] max-w-[80vw] flex-col">
        <DialogHeader className="mx-auto">
          <DialogTitle>Edit {book?.title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} onReset={onReset}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Book title" {...field} />
                  </FormControl>
                  <FormDescription>The title of the book</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isbn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ISBN</FormLabel>
                  <FormControl>
                    <Input placeholder="0-553-29335-4" {...field} />
                  </FormControl>
                  <FormDescription>The ISBN of the book</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Tabs defaultValue="raw" className="max-h-full">
              <TabsList>
                <TabsTrigger value="raw">Synopsis</TabsTrigger>
                <TabsTrigger value="rendered">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="raw" className="max-h-full">
                <FormField
                  control={form.control}
                  name="synopsis"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          className="h-96 rounded-md"
                          placeholder="Book synopsis"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        The synopsis of the book
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent value="rendered" className="max-h-full">
                <Markdown className="mx-auto h-96 max-w-full overflow-auto rounded-md bg-primary-foreground px-3 py-2">
                  {currentSynopsisMarkdown}
                </Markdown>
              </TabsContent>
            </Tabs>
            <DialogFooter className="absolute bottom-6 right-6">
              <Button type="reset" variant="secondary">
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
        <DevTool control={form.control} placement="top-left" />
      </DialogContent>
    </Dialog>
  )
}

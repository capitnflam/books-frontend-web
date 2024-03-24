import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import { ThemeProvider } from '@/components/theme-provider'

import { route as appRoute } from './app'
import { route as authorRoute } from './author'
import { route as bookRoute } from './book'
import { route as booksRoute } from './books'
import { ErrorLayout, Layout } from './components/layout'
import { TooltipProvider } from './components/ui/tooltip'

// eslint-disable-next-line import/order
import 'react-toastify/dist/ReactToastify.min.css'
// eslint-disable-next-line import/order
import './index.css'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    element: <Layout />,
    path: '/',
    errorElement: <ErrorLayout />,
    children: [appRoute, booksRoute, bookRoute, authorRoute],
  },
])

const root = ReactDOM.createRoot(document.querySelector('#root')!)
root.render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark">
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <RouterProvider router={router} />
          </TooltipProvider>
          <ReactQueryDevtools
            initialIsOpen={false}
            buttonPosition="bottom-right"
          />
        </QueryClientProvider>
      </RecoilRoot>
    </ThemeProvider>
  </StrictMode>,
)

import { Landmark as LandmarkIcon } from 'lucide-react'
import { useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { ModeToggle } from '@/components/mode-toggle'
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { cn } from '@/utils/cn'
import { startsWithPlural } from '@/utils/starts-with-plural'

const menus = [
  { path: '/collections', name: 'Collections' },
  { path: '/books', name: 'Books' },
  { path: '/authors', name: 'Authors' },
]

export function Header() {
  const { pathname: currentPathname } = useLocation()
  const isActive = useCallback(
    (pathname: string) => {
      return (
        pathname === currentPathname ||
        startsWithPlural(currentPathname, pathname)
      )
    },
    [currentPathname],
  )

  return (
    <header className="sticky top-0 z-40 flex h-10 w-full flex-row flex-nowrap items-center justify-between gap-4 bg-background px-6 shadow-lg">
      <Link className="justify-start" to="/" aria-label="Home">
        <LandmarkIcon className="h-9" />
      </Link>
      <NavigationMenu className="justify-center">
        <NavigationMenuList
          className={cn(
            'h-9 w-max items-center justify-center gap-6',
            'text-sm font-medium transition-colors',
            // 'inline-flex rounded-md bg-white px-4 py-2 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50',
          )}
        >
          {menus.map((menuItem) => (
            <NavigationMenuLink
              key={menuItem.path}
              active={isActive(menuItem.path)}
              className={cn(
                'rounded-md p-1 focus:outline-none',
                'disabled:pointer-events-none disabled:opacity-50',
                'hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 data-[active]:bg-gray-900/50',
                'dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-100/50',
              )}
              asChild
            >
              <Link to={menuItem.path}>{menuItem.name}</Link>
            </NavigationMenuLink>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="justify-end">
        <ModeToggle />
      </div>
    </header>
  )
}

/**
 * Topbar — header navigation
 * Showcases: craft + polymorphic `as` on the notification button
 */
import { craft, embroider } from '@dennerrondinely/tailor'
import { Bell, Search, Moon, Sun } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useState } from 'react'

const TopbarRoot = craft('header')({
  base: 'flex h-16 items-center justify-between border-b bg-card px-6 gap-4',
})

const SearchBar = craft('div')({
  base: 'flex items-center gap-2 rounded-lg border bg-background px-3 py-1.5 text-sm text-muted-foreground w-64',
})

const IconButton = craft('button')({
  ...embroider({
    base:     'relative flex items-center justify-center rounded-lg h-9 w-9 transition-colors',
    hover:    'bg-accent',
    focus:    'outline-none ring-2 ring-ring',
    active:   'scale-95',
  }),
})

export function Topbar() {
  const [dark, setDark] = useState(false)

  const toggleDark = () => {
    setDark((d) => !d)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <TopbarRoot>
      <SearchBar>
        <Search className="h-4 w-4 shrink-0" />
        <span>Search…</span>
      </SearchBar>

      <div className="flex items-center gap-2">
        <IconButton onClick={toggleDark} aria-label="Toggle theme">
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </IconButton>

        <IconButton aria-label="Notifications">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
        </IconButton>

        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarImage src="https://github.com/dennerrondinely.png" alt="User" />
          <AvatarFallback>DR</AvatarFallback>
        </Avatar>
      </div>
    </TopbarRoot>
  )
}

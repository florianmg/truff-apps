import { useState } from 'react'
import { MenuIcon } from 'lucide-react'
import { Outlet, useRouterState } from '@tanstack/react-router'

import { AppSidebar } from '@/components/app_sidebar'

export function AppLayout() {
  const pathname = useRouterState({ select: state => state.location.pathname })
  const [navOpen, setNavOpen] = useState(false)

  function closeNav() {
    setNavOpen(false)
  }

  return (
    <div className="min-h-svh bg-background">
      <div className="flex min-h-svh">
        <aside className="sticky top-0 hidden h-svh w-64 shrink-0 bg-card md:block">
          <AppSidebar url={pathname} />
        </aside>

        {navOpen ? (
          <div className="fixed inset-0 z-40 md:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-foreground/10"
              aria-label="Fermer le menu"
              onClick={closeNav}
            />
            <aside className="relative flex h-full w-64 flex-col bg-card shadow-md">
              <AppSidebar url={pathname} onClose={closeNav} />
            </aside>
          </div>
        ) : null}

        <main className="flex min-w-0 flex-1 flex-col p-2 md:p-10">
          <button
            type="button"
            className="mb-4 flex size-10 items-center justify-center rounded-lg text-muted-foreground outline-none hover:bg-foreground/4 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 md:hidden"
            aria-label="Ouvrir le menu"
            onClick={() => setNavOpen(true)}
          >
            <MenuIcon className="size-5" />
          </button>
          <div className="mx-auto flex w-full max-w-[1500px] flex-1 flex-col">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

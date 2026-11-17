import {
  PaletteIcon,
  PawPrintIcon,
  SettingsIcon,
  UserIcon,
  XIcon,
  type LucideIcon,
} from 'lucide-react'
import { Link } from '@tanstack/react-router'

import { BrandLogo } from '@/components/brand_logo'
import { NavUser } from '@/components/nav_user'
import { cn } from '@/lib/utils'

type NavItem = {
  title: string
  to: '/clients' | '/animals' | '/brand' | '/settings'
  icon: LucideIcon
}

const navItems: NavItem[] = [
  { title: 'Clients', to: '/clients', icon: UserIcon },
  { title: 'Animaux', to: '/animals', icon: PawPrintIcon },
  { title: 'Ma marque', to: '/brand', icon: PaletteIcon },
]

const settingsItem: NavItem = {
  title: 'Paramètres',
  to: '/settings',
  icon: SettingsIcon,
}

function isActivePath(url: string, path: string) {
  return url === path || url.startsWith(`${path}/`) || url.startsWith(`${path}?`)
}

function navLinkClass(active: boolean) {
  return cn(
    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-normal text-foreground outline-none transition duration-100 focus-visible:ring-3 focus-visible:ring-ring/50',
    active ? 'bg-primary-soft text-primary' : 'hover:bg-foreground/4',
  )
}

type AppSidebarProps = {
  url: string
  onClose?: () => void
}

export function AppSidebar({ url, onClose }: AppSidebarProps) {
  return (
    <div className="flex h-full flex-col px-4 py-6">
      <div className="flex items-center justify-between px-3 pb-8">
        <Link to="/clients" className="flex items-center gap-2 text-foreground" onClick={onClose}>
          <BrandLogo variant="wordmark" />
        </Link>
        {onClose ? (
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-lg text-muted-foreground outline-none hover:bg-foreground/4 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
            aria-label="Fermer le menu"
            onClick={onClose}
          >
            <XIcon className="size-5" />
          </button>
        ) : null}
      </div>

      <nav className="flex flex-1 flex-col gap-1" aria-label="Navigation">
        {navItems.map(item => (
          <Link
            key={item.to}
            to={item.to}
            className={navLinkClass(isActivePath(url, item.to))}
            onClick={onClose}
          >
            <item.icon className="size-4 shrink-0" />
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-8 flex flex-col gap-1">
        <Link
          to={settingsItem.to}
          className={navLinkClass(isActivePath(url, settingsItem.to))}
          onClick={onClose}
        >
          <settingsItem.icon className="size-4 shrink-0" />
          <span>{settingsItem.title}</span>
        </Link>
        <NavUser />
      </div>
    </div>
  )
}

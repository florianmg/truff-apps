import { LogOutIcon } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown_menu'
import { getMeQueryOptions } from '@/hooks/auth'
import { queryClient } from '@/lib/query_client'
import { query } from '@/lib/tuyau'

function userInitials(fullName: string | null, email: string) {
  const source = fullName?.trim() || email
  const parts = source.split(/[\s@._-]+/).filter(Boolean)
  const initials = parts
    .slice(0, 2)
    .map(part => part.charAt(0).toUpperCase())
    .join('')

  return initials || '?'
}

export function NavUser() {
  const navigate = useNavigate()
  const { data: user } = useSuspenseQuery(getMeQueryOptions())

  const logout = useMutation(
    query.auth.logout.mutationOptions({
      onSuccess: async () => {
        queryClient.clear()
        await navigate({ to: '/' })
      },
    }),
  )

  const name = user.fullName?.trim() || user.email

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left outline-none hover:bg-foreground/4 focus-visible:ring-3 focus-visible:ring-ring/50">
        <Avatar>
          <AvatarFallback>{userInitials(user.fullName, user.email)}</AvatarFallback>
        </Avatar>
        <span className="grid min-w-0 flex-1 text-sm leading-tight">
          <span className="truncate font-medium">{name}</span>
          {user.fullName ? (
            <span className="truncate text-xs text-muted-foreground">{user.email}</span>
          ) : null}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="start" className="min-w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout.mutate({})} disabled={logout.isPending}>
          <LogOutIcon />
          Se déconnecter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

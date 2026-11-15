import { cn } from '@/lib/utils'

const sources = {
  horizontal: '/brand/truff-logo.svg',
  stacked: '/brand/truff-logo-stacked.svg',
} as const

type BrandLogoProps = {
  variant?: keyof typeof sources
  className?: string
}

export function BrandLogo({ variant = 'horizontal', className }: BrandLogoProps) {
  return (
    <img
      src={sources[variant]}
      alt="Truff"
      className={cn(variant === 'stacked' ? 'h-48' : 'h-10', 'w-auto', className)}
    />
  )
}

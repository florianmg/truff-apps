import { cn } from '@/lib/utils'

const sources = {
  horizontal: '/brand/truff-logo.svg',
  stacked: '/brand/truff-logo-stacked.svg',
} as const

type BrandLogoProps = {
  variant?: keyof typeof sources | 'wordmark'
  className?: string
}

export function BrandLogo({ variant = 'horizontal', className }: BrandLogoProps) {
  if (variant === 'wordmark') {
    return (
      <span className={cn('inline-flex items-center gap-2', className)}>
        <img src="/brand/truff-app.svg" alt="" className="size-8" />
        <span className="font-logo text-3xl leading-none font-semibold tracking-[-0.02em] text-primary">
          tru<span className="tracking-[-0.12em]">f</span>f
        </span>
      </span>
    )
  }

  return (
    <img
      src={sources[variant]}
      alt="Truff"
      className={cn(variant === 'stacked' ? 'h-48' : 'h-10', 'w-auto', className)}
    />
  )
}

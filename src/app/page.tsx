import { cn } from '@/lib/utils'
import Actions from '@/components/Actions'
import Balance from '@/components/Balance'

export default function Home() {
  return (
    <main
      className={cn(
        'flex',
        'flex-col',
        'w-full',
        'bg-secondary',
        'max-w-[600px]',
        'rounded-sm',
        'p-4',
        'gap-4'
      )}
    >
      <Balance />
      <Actions />
    </main>
  )
}

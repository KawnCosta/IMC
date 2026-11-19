import type { BmiCategoryId } from '@/lib/bmi'

/** Cores são decisão de interface, por isso ficam fora de lib/bmi.ts. O nome da faixa sempre aparece em texto. */
export const CATEGORY_STYLES: Record<BmiCategoryId, { bar: string; badge: string }> = {
  underweight: {
    bar: 'bg-sky-400',
    badge: 'bg-sky-100 text-sky-900 dark:bg-sky-950 dark:text-sky-100',
  },
  healthy: {
    bar: 'bg-emerald-500',
    badge: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100',
  },
  overweight: {
    bar: 'bg-amber-400',
    badge: 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-100',
  },
  obesity: {
    bar: 'bg-orange-500',
    badge: 'bg-orange-100 text-orange-900 dark:bg-orange-950 dark:text-orange-100',
  },
}

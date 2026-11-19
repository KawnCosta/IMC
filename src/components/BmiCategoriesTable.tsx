import { CATEGORY_STYLES } from '@/components/bmiCategoryStyles'
import { BMI_CATEGORIES, formatCategoryRange } from '@/lib/bmi'
import { cn } from '@/lib/utils'

/** Gerada a partir de BMI_CATEGORIES: a tabela nunca diverge do cálculo. */
export function BmiCategoriesTable() {
  return (
    <table className="w-full border-collapse text-left text-base">
      <caption className="sr-only">Classificação do IMC para adultos</caption>
      <thead>
        <tr className="border-b">
          <th scope="col" className="py-2 pr-4 font-semibold">
            IMC (kg/m²)
          </th>
          <th scope="col" className="py-2 font-semibold">
            Classificação
          </th>
        </tr>
      </thead>
      <tbody>
        {BMI_CATEGORIES.map((category) => (
          <tr key={category.id} className="border-b last:border-b-0">
            <td className="py-2 pr-4 tabular-nums">{formatCategoryRange(category)}</td>
            <td className="flex items-center gap-2 py-2">
              <span aria-hidden="true" className={cn('size-3 shrink-0 rounded-full', CATEGORY_STYLES[category.id].bar)} />
              {category.label}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

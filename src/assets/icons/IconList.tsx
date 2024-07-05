import { IconType } from '@/types/IconType'

export function IconList({ size, fill1, fill2 }: IconType) {
  return (
    <svg
      width={size ?? '12'}
      height={size ?? '12'}
      viewBox={`"0 0 ${size ?? '12'} ${size ?? '12'}`}
      fill={fill1 ?? 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.00015 -0.000161807L0 6L6.00015 12.0002L12.0003 6L6.00015 -0.000161807Z"
        fill={fill2 ?? '#7D95A1'}
      />
    </svg>
  )
}

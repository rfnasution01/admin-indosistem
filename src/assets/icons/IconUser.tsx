import { IconType } from '@/types/IconType'

export function IconUser({ size, fill1, fill2, fill3 }: IconType) {
  return (
    <svg
      width={size ?? '12'}
      height={size ?? '12'}
      viewBox={`0 0 ${size ?? '12'} ${size ?? '12'}`}
      fill={fill1 ?? 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_3_395)">
        <path
          d="M8.0215 7H3.9785C3.3214 7.00079 2.69145 7.26218 2.22681 7.72681C1.76218 8.19145 1.50079 8.82141 1.5 9.4785V12H10.5V9.4785C10.4992 8.82141 10.2378 8.19145 9.77319 7.72681C9.30855 7.26218 8.6786 7.00079 8.0215 7Z"
          fill={fill2 ?? '#195EE5'}
        />
        <path
          d="M6 6C7.65685 6 9 4.65685 9 3C9 1.34315 7.65685 0 6 0C4.34315 0 3 1.34315 3 3C3 4.65685 4.34315 6 6 6Z"
          fill={fill2 ?? '#195EE5'}
        />
      </g>
      <defs>
        <clipPath id="clip0_3_395">
          <rect
            width={size ?? '12'}
            height={size ?? '12'}
            fill={fill3 ?? 'white'}
          />
        </clipPath>
      </defs>
    </svg>
  )
}

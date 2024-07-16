import ReactLoading, { LoadingProps } from 'react-loading'

export const Loading = ({
  width = '6rem',
  height = '6rem',
  color = '#400053',
}: LoadingProps) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <ReactLoading width={width} height={height} color={color} type="spin" />
    </div>
  )
}

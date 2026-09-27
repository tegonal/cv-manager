import { iconMarkPaths } from '../icon-mark-paths'

export const Icon: React.FC = () => {
  return (
    <svg
      className={'h-[18px] w-auto'}
      fill="none"
      height="96"
      viewBox="0 0 96 96"
      width="96"
      xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1">
        {iconMarkPaths.map((d) => (
          // vector-effect is not inherited, so it is set on every path
          <path d={d} key={d} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
    </svg>
  )
}

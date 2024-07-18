export function ListData({ listData }: { listData: string[] }) {
  return (
    <div className="flex flex-col gap-12">
      <p className="font-roboto text-[2.6rem] text-primary-100">List Data</p>
      <div className="scrollbar flex w-full items-center gap-32 overflow-x-auto">
        {listData?.map((item, idx) => (
          <div
            className="text-nowrap rounded-2xl border border-primary-100 px-24 py-12 text-primary-100 hover:cursor-pointer hover:bg-primary-100 hover:text-white"
            key={idx}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

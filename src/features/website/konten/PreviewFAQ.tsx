export function PreviewFAQ({
  pertanyaan,
  jawaban,
  name_jenis,
}: {
  pertanyaan?: string
  jawaban?: string
  name_jenis?: string
}) {
  return (
    <div className="scrollbar flex h-full gap-48 overflow-y-auto phones:flex-col phones:items-start phones:gap-32">
      <div className="flex flex-1 flex-col gap-16">
        {pertanyaan && <p className="font-roboto">{pertanyaan}</p>}
        <div className="flex flex-wrap items-center  gap-24">
          {name_jenis && (
            <p className="rounded-2xl bg-warna-grey px-24 py-12 text-[1.8rem] text-white">
              {name_jenis}
            </p>
          )}
          {jawaban && (
            <div
              style={{ lineHeight: '130%' }}
              dangerouslySetInnerHTML={{ __html: jawaban }}
              className="article-content"
            />
          )}
        </div>
      </div>
    </div>
  )
}

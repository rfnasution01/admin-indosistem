export function PreviewPolicy({ policy }: { policy?: string }) {
  return (
    <div className="scrollbar flex h-full gap-48 overflow-y-auto phones:flex-col phones:items-start phones:gap-32">
      <div
        className="article-content"
        style={{ lineHeight: '130%' }}
        dangerouslySetInnerHTML={{ __html: policy }}
      />
    </div>
  )
}

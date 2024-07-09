import { Dispatch, Fragment, SetStateAction, useState } from 'react'
import clsx from 'clsx'
import { Loading } from '../Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { MenubarAction } from '../Menubar/MenubarAction'
import { ActiveContent } from '../ActiveContent'

export type Column<T> = {
  header: string
  key?: string | number
  renderCell?: (rowData: T) => React.ReactNode
  width?: string
}

export interface Pengumuman {
  id: string
  publish: string
}

type Props<T extends Pengumuman, P> = {
  data: T[]
  columns: Column<T>[] | ((props: P) => Column<T>[])
  containerClasses?: string
  maxHeight?: string
  loading?: boolean
  columnProps?: P
  onItemClick?: (rowData: T) => void
  collapseComponent?: React.ReactNode
  checkbox?: boolean
  isNumber?: boolean
  currentPage?: number
  pageSize?: number
  isPengumuman?: boolean
  handleSubmitDelete?: (id: string) => Promise<void>
  setIsShow?: Dispatch<SetStateAction<boolean>>
  isShow?: boolean
  isLoadingDelete?: boolean
  handleSubmitPublish: (id: string, publish: string) => Promise<void>
  setIsShowPublish?: Dispatch<SetStateAction<boolean>>
  isShowPublish?: boolean
  isLoadingPublish?: boolean
}

export function TablePengumuman<T extends Pengumuman, P>({
  data,
  columns,
  containerClasses = '',
  maxHeight = 'max-h-[70vh]',
  loading,
  columnProps,
  onItemClick,
  collapseComponent,
  checkbox,
  isNumber,
  currentPage,
  pageSize,
  isPengumuman,
  handleSubmitDelete,
  isShow,
  isLoadingDelete,
  setIsShow,
  handleSubmitPublish,
  setIsShowPublish,
  isLoadingPublish,
  isShowPublish,
}: Props<T, P>) {
  const [rowIsOpen, setRowIsOpen] = useState<number | null>(null)
  const [id, setId] = useState<number>()

  const columnArray =
    typeof columns === 'function' ? columns(columnProps as P) : columns

  return (
    <div className={`h-full rounded-2xl ${containerClasses}`}>
      {/* ----- Loading UI ----- */}
      {loading ? (
        <Loading width="6.4rem" height="6.4rem" />
      ) : (
        <div
          className={`scrollbar flex flex-col overflow-auto ${maxHeight}`}
          style={{ scrollbarGutter: 'stable', borderRadius: '3rem' }}
        >
          {/* ----- No Data/Fallback UI ----- */}
          {!data || data.length === 0 ? (
            <p className="text-[2rem] text-typography-disabled">No data.</p>
          ) : (
            <table className="flex-1 border-collapse text-[2rem]">
              <thead className="relative z-10 align-top leading-medium text-warna-primary">
                <tr className="border-b-[1.6rem] border-transparent">
                  {/* --- NO --- */}
                  {isNumber && pageSize && currentPage && (
                    <th className="text-sim-primary sticky top-0 border-b-2 bg-warna-pale-blue px-24 py-24 text-left uppercase">
                      #
                    </th>
                  )}

                  {/* ----- Table Headers ----- */}
                  {columnArray
                    .filter((column) => !column.header.includes('Aksi'))
                    .map((column, colIndex) => (
                      <th
                        className={`text-sim-primary sticky top-0 text-nowrap border-b-2 bg-warna-pale-blue px-24 py-24 text-left uppercase ${column.width}`}
                        key={column.key || colIndex.toString()}
                      >
                        {column.header}
                      </th>
                    ))}

                  {/* --- Pengumuman --- */}
                  {isPengumuman && (
                    <th className="text-sim-primary sticky top-0 border-b-2 bg-warna-pale-blue px-24 py-24 text-center uppercase">
                      Publish
                    </th>
                  )}
                  {isPengumuman && (
                    <th className="text-sim-primary sticky top-0 border-b-2 bg-warna-pale-blue px-24 py-24 text-left uppercase"></th>
                  )}
                  {/* ----- Detail Header ----- */}
                  {collapseComponent && (
                    <th className="sticky right-0 top-0 bg-white p-16 text-left">
                      <span className="shadow-[-2.4rem_0_0.4rem_rgb(255,255,255)]">
                        Detail
                      </span>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <Fragment key={rowIndex}>
                    <tr
                      className={clsx(
                        'border-b-[1.6rem] border-transparent text-warna-dark transition-all ease-in odd:bg-surface-disabled hover:cursor-pointer hover:bg-warna-pale-grey',
                      )}
                      onClick={onItemClick ? () => onItemClick(row) : undefined}
                    >
                      {/* ----- Nomor ----- */}
                      {isNumber && currentPage && pageSize && (
                        <td className="px-24 py-12 align-top leading-medium">
                          {currentPage * pageSize + (rowIndex + 1 - pageSize)}
                        </td>
                      )}

                      {/* ----- Table Data ----- */}
                      {columnArray
                        .filter((column) => !column.header.includes('Aksi'))
                        .map((column, colIndex) => (
                          <td
                            className={`px-24 py-12 align-top leading-medium ${column.width}`}
                            key={column.key || colIndex.toString()}
                          >
                            {column.renderCell
                              ? column.renderCell(row)
                              : (row[
                                  column.key as keyof T
                                ] as React.ReactNode) || '-'}
                          </td>
                        ))}

                      {/* ----- Pengumuman ----- */}
                      {isPengumuman && (
                        <td className="px-24 py-12 text-center align-top leading-medium">
                          <ActiveContent
                            setIsShow={setIsShowPublish}
                            isShow={isShowPublish}
                            isLoadingPublish={isLoadingPublish}
                            handleSubmitPublish={handleSubmitPublish}
                            data={row}
                            setId={setId}
                            index={rowIndex}
                            id={id}
                          />
                        </td>
                      )}
                      {isPengumuman && (
                        <td className="px-24 py-12 align-top leading-medium">
                          <MenubarAction
                            data={row}
                            handleSubmitDelete={handleSubmitDelete}
                            isLoadingDelete={isLoadingDelete}
                            isShow={isShow}
                            setIsShow={setIsShow}
                          />
                        </td>
                      )}

                      {/* ----- Collapse Trigger ----- */}
                      {collapseComponent && (
                        <td className="sticky right-0 bg-white p-16">
                          <div className="shadow-[-2.4rem_0_0.4rem_rgb(255,255,255)]">
                            <button
                              className="rounded-full p-4 transition-all ease-in hover:bg-neutral-100"
                              onClick={() => {
                                if (rowIsOpen === rowIndex) {
                                  setRowIsOpen(null)
                                } else {
                                  setRowIsOpen(rowIndex)
                                }
                              }}
                            >
                              <span
                                className={clsx('', {
                                  'rotate-180': rowIsOpen === rowIndex,
                                  'rotate-0': rowIsOpen !== rowIndex,
                                })}
                              >
                                <FontAwesomeIcon icon={faCaretDown} />
                              </span>
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>

                    {/* ----- Collapse Content ----- */}
                    {collapseComponent && (
                      <tr>
                        <td colSpan={columnArray.length + (checkbox ? 2 : 1)}>
                          <div
                            className={clsx(
                              'overflow-hidden border-b bg-neutral-100 bg-opacity-[0.15] px-8 transition-all ease-in',
                              {
                                'max-h-full translate-y-0 py-16 opacity-100':
                                  rowIsOpen === rowIndex,
                                'max-h-0 -translate-y-16 opacity-0':
                                  rowIsOpen !== rowIndex,
                              },
                            )}
                          >
                            {collapseComponent}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  )
}

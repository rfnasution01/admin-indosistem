import { Dispatch, Fragment, SetStateAction, useState } from 'react'
import clsx from 'clsx'
import { Loading } from '../Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCaretDown,
  faEye,
  faEyeSlash,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import { MenubarAction } from '../Menubar/MenubarAction'
import { ActiveContent } from '../ActiveContent'
import { ValidasiIsCheck } from '../Dialog/ValidasiIsCheck'

export type Column<T> = {
  header: string
  key?: string | number
  renderCell?: (rowData: T) => React.ReactNode
  width?: string
}

export interface Kategori {
  id: string
  publish?: string
}

type Props<T extends Kategori, P> = {
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
  isKategori?: boolean
  handleSubmitDelete?: (id: string) => Promise<void>
  setIsShowDelete?: Dispatch<SetStateAction<boolean>>
  isShowDelete?: boolean
  isLoadingDelete?: boolean
  handleSubmitPublish: (id: string, publish: string) => Promise<void>
  setIsShowPublish?: Dispatch<SetStateAction<boolean>>
  isShowPublish?: boolean
  isLoadingPublish?: boolean
  isUbah?: boolean
  isHapus?: boolean
}

export function TableKategori<T extends Kategori, P>({
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
  isKategori,
  handleSubmitDelete,
  isShowDelete,
  isLoadingDelete,
  setIsShowDelete,
  handleSubmitPublish,
  setIsShowPublish,
  isLoadingPublish,
  isShowPublish,
  isUbah,
  isHapus,
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

                  {/* --- Kategori --- */}
                  {isKategori && (
                    <th className="text-sim-primary sticky top-0 border-b-2 bg-warna-pale-blue px-24 py-24 text-center uppercase">
                      Publish
                    </th>
                  )}
                  {isKategori && (
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

                      {/* ----- Kategori ----- */}
                      {isKategori && (
                        <td className="px-24 py-12 text-center align-top leading-medium">
                          <ActiveContent
                            setIsShow={setIsShowPublish}
                            data={row}
                            setId={setId}
                            index={rowIndex}
                          />
                        </td>
                      )}
                      {isKategori && (
                        <td className="px-24 py-12 align-top leading-medium">
                          <MenubarAction
                            data={row}
                            handleSubmitDelete={handleSubmitDelete}
                            isLoadingDelete={isLoadingDelete}
                            isShowDelete={isShowDelete}
                            setIsShowDelete={setIsShowDelete}
                            isHapus={isHapus}
                            isUbah={isUbah}
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

                    {id === rowIndex && (
                      <ValidasiIsCheck
                        isOpen={isShowPublish}
                        setIsOpen={setIsShowPublish}
                        publish={row?.publish}
                        child={
                          <button
                            type="button"
                            disabled={isLoadingPublish}
                            onClick={() =>
                              handleSubmitPublish(
                                row?.id,
                                row?.publish === '1' ? '0' : '1',
                              )
                            }
                            className={clsx(
                              'flex items-center gap-12 rounded-2xl px-24 py-12 text-white hover:bg-opacity-80',
                              {
                                'bg-warna-red': row?.publish === '1',
                                'bg-warna-primary': row?.publish !== '1',
                              },
                            )}
                          >
                            {isLoadingPublish ? (
                              <span className="animate-spin duration-300">
                                <FontAwesomeIcon icon={faSpinner} />
                              </span>
                            ) : row?.publish === '1' ? (
                              <FontAwesomeIcon icon={faEyeSlash} />
                            ) : (
                              <FontAwesomeIcon icon={faEye} />
                            )}
                            <p className="font-sf-pro">
                              {row?.publish === '1' ? 'Draft' : 'Publish'}
                            </p>
                          </button>
                        }
                      />
                    )}

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

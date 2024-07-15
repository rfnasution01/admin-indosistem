import { Dispatch, Fragment, SetStateAction, useState } from 'react'
import clsx from 'clsx'
import { Loading } from '../Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleDown,
  faAngleUp,
  faCaretDown,
  faEye,
  faEyeSlash,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import { ValidasiIsCheck } from '../Dialog/ValidasiIsCheck'
import { MenubarActionMenu } from '../Menubar/MenubarActionMenu'
import { ActiveContentSlider } from '../ActiveContent/KontenSlider'
import { GetMenuType } from '@/types/website/konten/menuType'

export type Column<T> = {
  header: string
  key?: string | number
  renderCell?: (rowData: T) => React.ReactNode
  width?: string
}

export interface Menu {
  id: string
  aktif?: number | string
  id_parent?: string
  jenis_menu?: string
  children?: GetMenuType[]
}

type Props<T extends Menu, P> = {
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
  isMenu?: boolean
  handleSubmitDelete?: (id: string) => Promise<void>
  setIsShowDelete?: Dispatch<SetStateAction<boolean>>
  isShowDelete?: boolean
  isLoadingDelete?: boolean
  handleSubmitStatus: (id: string, status: number) => Promise<void>
  setIsShowStatus?: Dispatch<SetStateAction<boolean>>
  isShowStatus?: boolean
  isLoadingStatus?: boolean
  isDetail?: boolean
  posisi?: string
  isAccordion?: boolean
  isHapus: boolean
  isTambah: boolean
  isUbah: boolean
}

export function TableMenu<T extends Menu, P>({
  data,
  columns,
  containerClasses = '',
  maxHeight = 'max-h-[70vh]',
  loading,
  columnProps,
  collapseComponent,
  isNumber,
  currentPage,
  pageSize,
  isMenu,
  isDetail,
  handleSubmitDelete,
  isShowDelete,
  isLoadingDelete,
  setIsShowDelete,
  handleSubmitStatus,
  setIsShowStatus,
  isLoadingStatus,
  isShowStatus,
  posisi,
  isAccordion,
  isHapus,
  isTambah,
  isUbah,
}: Props<T, P>) {
  const [rowIsOpen, setRowIsOpen] = useState<number | null>(null)
  const [expandedRowIndex, setExpandedRowIndex] = useState<number | null>(null)
  const [expandedRowIndexs, setExpandedRowIndexs] = useState<number | null>(
    null,
  )
  const [id, setId] = useState<number>()

  const columnArray =
    typeof columns === 'function' ? columns(columnProps as P) : columns

  const toggleRow = (index: number) => {
    setExpandedRowIndex(expandedRowIndex === index ? null : index)
  }

  const toggleRows = (index: number) => {
    setExpandedRowIndexs(expandedRowIndexs === index ? null : index)
  }
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
                    <th className="sticky top-0 w-[5%] border-b-2 bg-warna-pale-blue px-24 py-24 text-left uppercase">
                      #
                    </th>
                  )}

                  {/* ----- Table Headers ----- */}
                  {columnArray
                    .filter((column) => !column.header.includes('Aksi'))
                    .map((column, colIndex) => (
                      <th
                        className={`sticky top-0 text-nowrap border-b-2 bg-warna-pale-blue px-24 py-24 text-left uppercase ${column.width}`}
                        key={column.key || colIndex.toString()}
                      >
                        {column.header}
                      </th>
                    ))}

                  {/* --- Menu --- */}
                  {isMenu && (
                    <th className="sticky top-0 w-[10%] border-b-2 bg-warna-pale-blue px-24 py-24 text-center uppercase">
                      Status
                    </th>
                  )}
                  {isDetail && (
                    <th className="sticky top-0 w-[5%] border-b-2 bg-warna-pale-blue px-24 py-24 text-left uppercase"></th>
                  )}
                  {/* ----- Detail Header ----- */}
                  {collapseComponent && (
                    <th className="sticky right-0 top-0 w-[10%] bg-white p-16 text-left">
                      <span className="shadow-[-2.4rem_0_0.4rem_rgb(255,255,255)]">
                        Detail
                      </span>
                    </th>
                  )}

                  {isAccordion && (
                    <th className="sticky top-0 border-b-2 bg-warna-pale-blue px-24 py-24 text-left uppercase"></th>
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
                      onClick={() => {
                        if (row?.children?.length > 0) {
                          toggleRow(rowIndex)
                        }
                      }}
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

                      {/* ----- Menu ----- */}
                      {isMenu && (
                        <td className="px-24 py-12 text-center align-top leading-medium">
                          <ActiveContentSlider
                            setIsShow={setIsShowStatus}
                            data={row}
                            setId={setId}
                            index={rowIndex}
                            isUbah={isUbah}
                          />
                        </td>
                      )}
                      {isDetail && (
                        <td className="px-24 py-12 align-top leading-medium">
                          <MenubarActionMenu
                            data={row}
                            handleSubmitDelete={handleSubmitDelete}
                            isLoadingDelete={isLoadingDelete}
                            isShowDelete={isShowDelete}
                            setIsShowDelete={setIsShowDelete}
                            posisi={posisi}
                            isHapus={isHapus}
                            isTambah={isTambah}
                            isUbah={isUbah}
                          />
                        </td>
                      )}

                      {isAccordion && (
                        <td className="px-24 py-12 align-top leading-medium">
                          <div className="flex items-center gap-24">
                            <p
                              className={clsx(
                                'rounded-2xl  px-16 py-8 text-[1.8rem] text-white',
                                {
                                  'bg-warna-dark': row?.children?.length > 0,
                                  'bg-warna-pale-grey': !(
                                    row?.children?.length > 0
                                  ),
                                },
                              )}
                            >
                              {row?.children?.length ?? 0}+
                            </p>
                            <span>
                              {expandedRowIndex === rowIndex ? (
                                <FontAwesomeIcon icon={faAngleUp} />
                              ) : (
                                <FontAwesomeIcon icon={faAngleDown} />
                              )}
                            </span>
                          </div>
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
                        isOpen={isShowStatus}
                        setIsOpen={setIsShowStatus}
                        publish={row?.aktif.toString()}
                        child={
                          <button
                            type="button"
                            disabled={isLoadingStatus}
                            onClick={() => {
                              handleSubmitStatus(row?.id, Number(row?.aktif))
                            }}
                            className={clsx(
                              'flex items-center gap-12 rounded-2xl px-24 py-12 text-white hover:bg-opacity-80',
                              {
                                'bg-warna-red': Number(row?.aktif) === 1,
                                'bg-warna-primary': Number(row?.aktif) !== 1,
                              },
                            )}
                          >
                            {isLoadingStatus ? (
                              <span className="animate-spin duration-300">
                                <FontAwesomeIcon icon={faSpinner} />
                              </span>
                            ) : Number(row?.aktif) === 1 ? (
                              <FontAwesomeIcon icon={faEyeSlash} />
                            ) : (
                              <FontAwesomeIcon icon={faEye} />
                            )}
                            <p className="font-sf-pro">
                              {Number(row?.aktif) === 1 ? 'Draft' : 'Publish'}
                            </p>
                          </button>
                        }
                      />
                    )}

                    {expandedRowIndex === rowIndex &&
                      row?.children?.map((item: GetMenuType, idx) => (
                        <Fragment key={idx}>
                          <tr
                            className={clsx(
                              'border-b-[1.6rem] border-transparent text-warna-dark transition-all ease-in odd:bg-surface-disabled hover:cursor-pointer hover:bg-warna-pale-grey',
                            )}
                            onClick={() => {
                              if (item?.children?.length > 0) {
                                toggleRows(idx)
                              }
                            }}
                          >
                            <td className="px-24 py-12 align-top leading-medium"></td>
                            <td className="px-24 py-12 align-top leading-medium">
                              <div className="flex w-full justify-end">
                                <div className="flex w-full gap-12">
                                  <p className="w-1/12">{idx + 1}</p>
                                  <p className="w-11/12">{item?.nama_menu}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-24 py-12 align-top leading-medium">
                              {item?.jenis_menu}
                            </td>
                            <td className="px-24 py-12 align-top leading-medium">
                              <div className="flex flex-col gap-32">
                                {item?.url_gambar && (
                                  <img
                                    src={item?.url_gambar}
                                    alt={item?.nama_menu}
                                    className="h-[10rem] w-[20rem] rounded-2xl object-cover filter phones:h-[6rem]"
                                    loading="lazy"
                                  />
                                )}
                              </div>
                            </td>
                            <td className="px-24 py-12 align-top leading-medium">
                              {item?.id_konten}
                            </td>
                            <td className="px-24 py-12 text-center align-top leading-medium">
                              <ActiveContentSlider
                                setIsShow={setIsShowStatus}
                                data={item}
                                setId={setId}
                                index={idx}
                                isUbah={isUbah}
                              />
                            </td>
                            <td className="px-24 py-12 align-top leading-medium">
                              <MenubarActionMenu
                                data={item}
                                handleSubmitDelete={handleSubmitDelete}
                                isLoadingDelete={isLoadingDelete}
                                isShowDelete={isShowDelete}
                                setIsShowDelete={setIsShowDelete}
                                posisi={posisi}
                                isHapus={isHapus}
                                isTambah={isTambah}
                                isUbah={isUbah}
                              />
                            </td>
                            <td className="px-24 py-12 align-top leading-medium">
                              <div className="flex items-center gap-24">
                                <p
                                  className={clsx(
                                    'rounded-2xl  px-16 py-8 text-[1.8rem] text-white',
                                    {
                                      'bg-warna-dark':
                                        item?.children?.length > 0,
                                      'bg-warna-pale-grey': !(
                                        item?.children?.length > 0
                                      ),
                                    },
                                  )}
                                >
                                  {item?.children?.length ?? 0}+
                                </p>
                                <span>
                                  {expandedRowIndexs === idx ? (
                                    <FontAwesomeIcon icon={faAngleUp} />
                                  ) : (
                                    <FontAwesomeIcon icon={faAngleDown} />
                                  )}
                                </span>
                              </div>
                            </td>
                          </tr>
                          {id === idx && (
                            <ValidasiIsCheck
                              isOpen={isShowStatus}
                              setIsOpen={setIsShowStatus}
                              publish={item?.aktif.toString()}
                              child={
                                <button
                                  type="button"
                                  disabled={isLoadingStatus}
                                  onClick={() => {
                                    handleSubmitStatus(
                                      item?.id,
                                      Number(item?.aktif),
                                    )
                                  }}
                                  className={clsx(
                                    'flex items-center gap-12 rounded-2xl px-24 py-12 text-white hover:bg-opacity-80',
                                    {
                                      'bg-warna-red': Number(item?.aktif) === 1,
                                      'bg-warna-primary':
                                        Number(item?.aktif) !== 1,
                                    },
                                  )}
                                >
                                  {isLoadingStatus ? (
                                    <span className="animate-spin duration-300">
                                      <FontAwesomeIcon icon={faSpinner} />
                                    </span>
                                  ) : Number(item?.aktif) === 1 ? (
                                    <FontAwesomeIcon icon={faEyeSlash} />
                                  ) : (
                                    <FontAwesomeIcon icon={faEye} />
                                  )}
                                  <p className="font-sf-pro">
                                    {Number(item?.aktif) === 1
                                      ? 'Draft'
                                      : 'Publish'}
                                  </p>
                                </button>
                              }
                            />
                          )}

                          {expandedRowIndexs === idx &&
                            item?.children?.map((list: GetMenuType, index) => (
                              <Fragment key={index}>
                                <tr
                                  className={clsx(
                                    'border-b-[1.6rem] border-transparent text-warna-dark transition-all ease-in odd:bg-surface-disabled hover:cursor-pointer hover:bg-warna-pale-grey',
                                  )}
                                >
                                  <td className="px-24 py-12 align-top leading-medium"></td>
                                  <td className="px-24 py-12 align-top leading-medium">
                                    <div className="flex w-full justify-end">
                                      <div className="flex w-[80%] gap-12">
                                        <p className="w-1/12">{index + 1}</p>
                                        <p className="w-11/12">
                                          {list?.nama_menu}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-24 py-12 align-top leading-medium">
                                    {list?.jenis_menu}
                                  </td>
                                  <td className="px-24 py-12 align-top leading-medium">
                                    <div className="flex flex-col gap-32">
                                      {list?.url_gambar && (
                                        <img
                                          src={list?.url_gambar}
                                          alt={list?.nama_menu}
                                          className="h-[10rem] w-[20rem] rounded-2xl object-cover filter phones:h-[6rem]"
                                          loading="lazy"
                                        />
                                      )}
                                    </div>
                                  </td>
                                  <td className="px-24 py-12 align-top leading-medium">
                                    {list?.id_konten}
                                  </td>
                                  <td className="px-24 py-12 text-center align-top leading-medium">
                                    <ActiveContentSlider
                                      setIsShow={setIsShowStatus}
                                      data={list}
                                      setId={setId}
                                      index={index}
                                      isUbah={isUbah}
                                    />
                                  </td>
                                  <td className="px-24 py-12 align-top leading-medium">
                                    <MenubarActionMenu
                                      data={list}
                                      handleSubmitDelete={handleSubmitDelete}
                                      isLoadingDelete={isLoadingDelete}
                                      isShowDelete={isShowDelete}
                                      setIsShowDelete={setIsShowDelete}
                                      posisi={posisi}
                                      isHapus={isHapus}
                                      isTambah={isTambah}
                                      isUbah={isUbah}
                                    />
                                  </td>
                                  <td className="px-24 py-12 align-top leading-medium">
                                    <div className="flex items-center gap-24">
                                      <p
                                        className={clsx(
                                          'rounded-2xl  px-16 py-8 text-[1.8rem] text-white',
                                          {
                                            'bg-warna-dark':
                                              list?.children?.length > 0,
                                            'bg-warna-pale-grey': !(
                                              list?.children?.length > 0
                                            ),
                                          },
                                        )}
                                      >
                                        {list?.children?.length ?? 0}+
                                      </p>
                                      <span>
                                        {expandedRowIndexs === index ? (
                                          <FontAwesomeIcon icon={faAngleUp} />
                                        ) : (
                                          <FontAwesomeIcon icon={faAngleDown} />
                                        )}
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                                {id === index && (
                                  <ValidasiIsCheck
                                    isOpen={isShowStatus}
                                    setIsOpen={setIsShowStatus}
                                    publish={list?.aktif.toString()}
                                    child={
                                      <button
                                        type="button"
                                        disabled={isLoadingStatus}
                                        onClick={() => {
                                          handleSubmitStatus(
                                            list?.id,
                                            Number(list?.aktif),
                                          )
                                        }}
                                        className={clsx(
                                          'flex items-center gap-12 rounded-2xl px-24 py-12 text-white hover:bg-opacity-80',
                                          {
                                            'bg-warna-red':
                                              Number(list?.aktif) === 1,
                                            'bg-warna-primary':
                                              Number(list?.aktif) !== 1,
                                          },
                                        )}
                                      >
                                        {isLoadingStatus ? (
                                          <span className="animate-spin duration-300">
                                            <FontAwesomeIcon icon={faSpinner} />
                                          </span>
                                        ) : Number(list?.aktif) === 1 ? (
                                          <FontAwesomeIcon icon={faEyeSlash} />
                                        ) : (
                                          <FontAwesomeIcon icon={faEye} />
                                        )}
                                        <p className="font-sf-pro">
                                          {Number(list?.aktif) === 1
                                            ? 'Draft'
                                            : 'Publish'}
                                        </p>
                                      </button>
                                    }
                                  />
                                )}
                              </Fragment>
                            ))}
                        </Fragment>
                      ))}
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

export type GetDashboardType = {
  nama_organisasi: string
  jlh_pegawai: number
  chart: GetChartType[]
}

export type GetChartType = {
  nama: string
  jlh: string
}

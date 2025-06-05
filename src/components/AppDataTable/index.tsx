'use client'

import { DataTable, DataTableProps } from 'mantine-datatable'

import 'mantine-datatable/styles.layer.css'

interface AppDataTableProps<T> {
  records: DataTableProps<T>['records']
  columns: any[]
  onRowClick?: DataTableProps<T>['onRowClick']
  fetching?: boolean
  noRecordsText?: string
}

function AppDataTable<T>({
  records,
  columns,
  onRowClick,
  fetching,
  noRecordsText = 'No records found'
}: AppDataTableProps<T>) {
  return (
    <DataTable
      borderRadius='sm'
      noRecordsText={noRecordsText}
      withTableBorder
      withColumnBorders
      striped
      highlightOnHover
      records={records ?? []}
      columns={columns ?? []}
      onRowClick={onRowClick}
      fetching={fetching}
    />
  )
}

export default AppDataTable

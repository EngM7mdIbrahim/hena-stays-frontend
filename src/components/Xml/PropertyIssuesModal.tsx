import { Alert } from '@mantine/core'

import AppModal from '@components/Modals/AppModal'

export interface PropertyIssuesModalProps {
  issues: string[]
  setIssues: React.Dispatch<React.SetStateAction<string[]>>
}

function PropertyIssuesModal({ issues, setIssues }: PropertyIssuesModalProps) {
  return (
    <AppModal open={issues.length > 0} setOpen={() => setIssues([])} title=''>
      <Alert color='red' variant='light'>
        <ul className='list-disc pl-5'>
          {issues?.map((issue: string) => <li key={issue}>{issue}</li>)}
        </ul>
      </Alert>
    </AppModal>
  )
}

export default PropertyIssuesModal

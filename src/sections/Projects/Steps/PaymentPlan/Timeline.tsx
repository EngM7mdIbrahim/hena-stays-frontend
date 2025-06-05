import { Box } from '@mantine/core'

function Timeline() {
  return (
    <Box className='relative hidden md:block'>
      <Box className='h-[80%] w-[1px] bg-neutral-200' />
      <ul className='absolute -start-3 top-0 flex flex-col gap-12'>
        <li>
          <Box className='-ms-[5px] me-3 flex w-[35px] items-center justify-center rounded-full bg-gray-100 p-1 text-primary dark:bg-neutral-500'>
            1
          </Box>
        </li>

        <li>
          <Box className='-ms-[5px] me-3 flex w-[35px] items-center justify-center rounded-full bg-gray-100 p-1 text-primary dark:bg-neutral-500'>
            2
          </Box>
        </li>

        <li>
          <Box className='-ms-[5px] me-3 flex w-[35px] items-center justify-center rounded-full bg-gray-100 p-1 text-primary dark:bg-neutral-500'>
            3
          </Box>
        </li>

        <li>
          <Box className='-ms-[5px] me-3 flex w-[35px] items-center justify-center rounded-full bg-gray-100 p-1 text-primary dark:bg-neutral-500'>
            4
          </Box>
        </li>
      </ul>
    </Box>
  )
}

export default Timeline

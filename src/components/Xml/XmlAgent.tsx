import { useState } from 'react'
import { AddPropertyXMLResponse, XMLAgent } from '@commonTypes'
import { useUpdateAgentEmail } from '@hooks'
import { Avatar, Box, Button, Flex, Input, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { BiCheck } from 'react-icons/bi'
import { FaPencilAlt } from 'react-icons/fa'

export interface XMLAgentProps {
  agent: XMLAgent
  dataId: string
  setData: React.Dispatch<React.SetStateAction<AddPropertyXMLResponse>>
}

function XmlAgent({ agent, dataId, setData }: XMLAgentProps) {
  const t = useTranslations()
  const [isEditingEmail, setIsEditingEmail] = useState(false)
  const [newEmail, setNewEmail] = useState(agent?.email)

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value?.trim())
  }

  const updateAgentEmail = useUpdateAgentEmail({
    onSuccess: (res) => {
      setData(res)
      setIsEditingEmail(false)
    }
  })

  const handleSaveEmail = (e: React.FormEvent) => {
    e.preventDefault()
    const dataToSend = {
      newAgentEmail: newEmail,
      previousAgentEmail: agent?.email
    }

    updateAgentEmail.mutate({ id: dataId, ...dataToSend })
  }

  return (
    <Box className='my-8 w-full space-y-3 md:w-[80%]'>
      <Flex className='flex gap-5'>
        {agent?._id ? (
          <Avatar
            src={(agent as XMLAgent & { photo: { url: string } })?.photo?.url}
            name={agent?.name}
            radius='xl'
          />
        ) : (
          <Avatar src={agent?.image} name={agent?.name} radius='xl' />
        )}

        <Text fw={500} className='text-sm capitalize md:text-base'>
          {agent?.name}
        </Text>
      </Flex>

      {isEditingEmail ? (
        <form
          onSubmit={handleSaveEmail}
          className='flex w-full items-center gap-2'
        >
          <Input
            classNames={{
              input: 'rounded border border-gray-300 px-2 py-1'
            }}
            type='email'
            value={newEmail}
            onChange={handleEmailChange}
            required
          />
          <Button
            loading={updateAgentEmail.isPending}
            type='submit'
            className='rounded-full bg-blue-500 p-1 text-white disabled:opacity-60'
          >
            <BiCheck size={25} />
          </Button>
        </form>
      ) : (
        <Flex className='flex items-center gap-2'>
          <Text className='rounded bg-default-background px-2 py-1 shadow-md'>
            {agent?.email}
          </Text>

          <FaPencilAlt
            className='cursor-pointer'
            onClick={() => setIsEditingEmail(true)}
          />
        </Flex>
      )}
      <Box
        className={`px-3 font-semibold ${
          !agent?._id ? 'text-error-500' : 'text-neutral-700'
        }`}
      >
        {`*${agent?._id ? t('xml.agents.registered') : t('xml.agents.unregistered')}`}
      </Box>
    </Box>
  )
}

export default XmlAgent

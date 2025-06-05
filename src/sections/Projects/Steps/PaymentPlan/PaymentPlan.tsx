import React from 'react'
import { DEFAULT_PROJECT_FORM_DATA } from '@constants'
import { ProjectFormContext } from '@context'
import { Box, Button, Flex, Group, Radio, Stack, Text } from '@mantine/core'
import { randomId } from '@mantine/hooks'
import { DetailsProps } from '@sections/Blog/Steps/Details'
import { useTranslations } from 'next-intl'
import { BiMinus, BiPlus } from 'react-icons/bi'

import PrimaryButton from '@components/Buttons/PrimaryButton'
import CheckboxField from '@components/CustomFields/CheckboxField'
import NumberField from '@components/CustomFields/NumberField'
import { cn } from '@utils'

import FullPricePayment from './FullPricePayment'
import ProjectCompletionPayment from './ProjectCompletionPayment'
import Timeline from './Timeline'

const { useProjectFormContext } = ProjectFormContext

function PaymentPlan({ onBack, loading = false }: DetailsProps) {
  const form = useProjectFormContext()
  const t = useTranslations()

  const handleAppend = () => {
    form.insertListItem('paymentPlan.projectCompletion', {
      preHandOverPercentage: '',
      mileStonePercentage: '',
      key: randomId()
    })
  }

  const handleRemove = (index: number) => {
    form.removeListItem('paymentPlan.projectCompletion', index)
  }

  return (
    <Stack className='py-6'>
      <Flex className='gap-8 font-lexend'>
        <Timeline />
        <Box className='flex-1 space-y-4'>
          <Flex className='w-full gap-4'>
            <CheckboxField
              value=''
              label=''
              checked
              onChange={() => {}}
              backgroundColor='bg-primary-gradient'
              boxClassName='h-[20px] w-[20px] rounded-[4px]'
            />

            <NumberField
              withAsterisk={false}
              hideControls
              className='w-full'
              size='md'
              label={t(
                'projects.projectForm.paymentPlan.fields.downPaymentPercentage'
              )}
              placeholder={t(
                'projects.projectForm.paymentPlan.placeholders.downPaymentPercentage'
              )}
              {...form.getInputProps('paymentPlan.downPaymentPercentage')}
              required
            />
          </Flex>

          <Flex className='items-baseline gap-4'>
            <CheckboxField
              value=''
              label=''
              checked
              onChange={() => {}}
              backgroundColor='bg-primary-gradient'
              boxClassName='h-[20px] w-[20px] rounded-[4px]'
            />

            <Box className='w-full space-y-2'>
              <Box className='w-full space-y-2'>
                <Flex className='flex items-center gap-2'>
                  <Radio.Group
                    withAsterisk={false}
                    name='paymentType'
                    label={
                      <Text
                        component='span'
                        className='text-sm font-bold text-neutral-500'
                      >
                        {t(
                          'projects.projectForm.paymentPlan.fields.percentageBasedOn'
                        )}
                      </Text>
                    }
                    {...form.getInputProps('paymentType')}
                    required
                  >
                    <Group mt='xs'>
                      <Radio
                        value='projectCompletion'
                        label={t(
                          'projects.projectForm.paymentPlan.fields.projectCompletion.label'
                        )}
                        color='primary'
                        variant='outline'
                        className='capitalize'
                      />
                      <Radio
                        id='fullPrice'
                        value='fullPrice'
                        label={t(
                          'projects.projectForm.paymentPlan.fields.fullPrice.label'
                        )}
                        color='primary'
                        variant='outline'
                        className='capitalize'
                      />
                    </Group>
                  </Radio.Group>
                </Flex>
              </Box>
              {(form.getValues() as typeof DEFAULT_PROJECT_FORM_DATA)
                ?.paymentType === 'fullPrice' && <FullPricePayment />}
              {(form.getValues() as typeof DEFAULT_PROJECT_FORM_DATA)
                ?.paymentType === 'projectCompletion' && (
                <>
                  {(
                    form.getValues() as typeof DEFAULT_PROJECT_FORM_DATA
                  )?.paymentPlan.projectCompletion.map((field, index) => (
                    <Flex key={field.key} className='items-end gap-4'>
                      <ProjectCompletionPayment key={field.key} index={index} />

                      {(form.getValues() as typeof DEFAULT_PROJECT_FORM_DATA)
                        ?.paymentPlan.projectCompletion.length > 1 && (
                        <button
                          type='button'
                          onClick={() => handleRemove(index)}
                          className='flex h-10 w-10 items-center justify-center rounded-md border border-neutral-400 bg-default-background'
                        >
                          <BiMinus className='text-error-500' size={20} />
                        </button>
                      )}

                      <button
                        type='button'
                        onClick={handleAppend}
                        className={cn(
                          'flex h-10 w-10 items-center justify-center rounded-md border border-neutral-400 bg-default-background',
                          index ===
                            ((
                              form.getValues() as typeof DEFAULT_PROJECT_FORM_DATA
                            )?.paymentPlan.projectCompletion?.length ?? 0) -
                              1
                            ? 'visible opacity-100'
                            : 'invisible opacity-0'
                        )}
                      >
                        <BiPlus className='text-primary' size={20} />
                      </button>
                    </Flex>
                  ))}
                  {form.errors?.[`paymentPlan.projectCompletionUnique`] && (
                    <Text className='mt-4 text-center text-sm text-error-500'>
                      {form.errors?.[`paymentPlan.projectCompletionUnique`]}
                    </Text>
                  )}
                </>
              )}
            </Box>
          </Flex>
          <Flex className='gap-4'>
            <CheckboxField
              value=''
              label=''
              checked
              onChange={() => {}}
              backgroundColor='bg-primary-gradient'
              boxClassName='h-[20px] w-[20px] rounded-[4px]'
            />

            <NumberField
              withAsterisk={false}
              size='md'
              hideControls
              className='w-full'
              label={t(
                'projects.projectForm.paymentPlan.fields.onHandoverPercentage'
              )}
              placeholder={t(
                'projects.projectForm.paymentPlan.placeholders.onHandoverPercentage'
              )}
              {...form.getInputProps('paymentPlan.onHandOverPercentage')}
              required
            />
          </Flex>
          <Flex className='gap-4'>
            <CheckboxField
              value=''
              label=''
              checked
              onChange={() => {}}
              backgroundColor='bg-primary-gradient'
              boxClassName='h-[20px] w-[20px] rounded-[4px]'
            />

            <NumberField
              withAsterisk={false}
              className='w-full'
              hideControls
              size='md'
              label={t(
                'projects.projectForm.paymentPlan.fields.postHandoverPercentage'
              )}
              placeholder={t(
                'projects.projectForm.paymentPlan.placeholders.postHandoverPercentage'
              )}
              {...form.getInputProps('paymentPlan.postHandOverPercentage')}
              required
            />
          </Flex>
        </Box>
      </Flex>
      <Group>
        <Button
          onClick={onBack}
          variant='light'
          color='gray'
          className='w-full rounded-lg font-semibold text-primary md:flex-1'
          size='lg'
        >
          {t('shared.buttons.back')}
        </Button>
        <PrimaryButton
          loading={loading}
          type='submit'
          size='lg'
          className='w-full rounded-lg font-semibold text-secondary md:flex-1'
        >
          {(form.getValues() as { _id: string })?._id
            ? t('shared.buttons.update')
            : t('shared.buttons.add')}
        </PrimaryButton>
      </Group>
    </Stack>
  )
}

export default PaymentPlan

'use client'

import React from 'react'
import { AddPropertyXMLResponse } from '@commonTypes'
import { Accordion } from '@mantine/core'
import { useTranslations } from 'next-intl'

export interface WarningsProps {
  warnings?: AddPropertyXMLResponse['warnings']
}

function Warnings({ warnings }: WarningsProps) {
  const t = useTranslations()

  return (
    <Accordion>
      {warnings &&
        Object.keys(warnings).map((warningKey, index) => (
          <Accordion.Item key={warningKey} value={warningKey}>
            <Accordion.Control>
              {index + 1}- {warningKey} (
              {t('xml.warnings.issueCount', {
                count: warnings[warningKey].length
              })}
              )
            </Accordion.Control>
            <Accordion.Panel>
              {warnings[warningKey].map((warning: string) => (
                <ul key={warning} className='list-disc ps-6 text-neutral-700'>
                  <li>{warning}</li>
                </ul>
              ))}
            </Accordion.Panel>
          </Accordion.Item>
        ))}
    </Accordion>
  )
}

export default Warnings

'use client'

import React from 'react'
import { Accordion, AccordionProps } from '@mantine/core'
import DOMPurify from 'dompurify'
import { BiPlus } from 'react-icons/bi'

export interface FaqProps {
  items: {
    question?: string
    answer?: string
    value?: string
    description?: string
  }[]
  isOfficialBlog?: boolean
}

function Faq({
  items,
  isOfficialBlog = false,
  ...rest
}: AccordionProps & FaqProps) {
  return (
    <Accordion
      className='w-full'
      {...rest}
      defaultValue={items[0].value || items[0]?.question}
      classNames={{
        chevron: 'chevron',
        control:
          'text-xl font-extrabold [&[data-active]]:text-primary text-black'
      }}
      chevron={
        <div className='text-xl'>
          <BiPlus />
        </div>
      }
    >
      {items.map((item, index) => (
        <Accordion.Item
          // eslint-disable-next-line react/no-array-index-key
          key={item.value || index}
          value={item.value || (item?.question || '') + index}
        >
          <Accordion.Control className='text-xl font-extrabold text-primary'>
            {isOfficialBlog ? (
              <div
                className='prose mt-8 max-w-full dark:prose-invert'
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(item.question || '')
                }}
              />
            ) : (
              item.value
            )}
          </Accordion.Control>
          <Accordion.Panel className='text-neutral-700'>
            {isOfficialBlog ? (
              <div
                className='prose mt-8 max-w-full dark:prose-invert'
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(item?.answer || '')
                }}
              />
            ) : (
              item.description
            )}
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}

export default Faq

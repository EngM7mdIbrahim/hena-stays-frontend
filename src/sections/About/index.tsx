import React from 'react'
import { Box, Container, Stack, Text } from '@mantine/core'
import AboutHeader from '@sections/About/AboutHeader'
import ContactUs from '@sections/About/ContactUs'
import WhyUs from '@sections/About/WhyUs'

import PrimaryButton from '@components/Buttons/PrimaryButton'
import Faq from '@components/Faq'
import HeaderSection from '@components/HeaderSection'

function About() {
  const faqs = [
    {
      value: 'How do I list my property for sale?',
      description:
        'You can easily list your property by creating an account on our platform, filling out the property details, and uploading photos. Our team will review and publish your listing.'
    },
    {
      value: 'What documents do I need to buy a property?',
      description:
        "You'll typically need a valid ID, proof of income, tax returns, and bank statements. For specific requirements, our agents can guide you through the process."
    },
    {
      value: 'How long does the property buying process take?',
      description:
        'The process usually takes 30-60 days from offer acceptance to closing, depending on financing and legal requirements.'
    },
    {
      value: 'What fees are involved in selling a property?',
      description:
        'Common fees include agent commissions, closing costs, and transfer taxes. We provide a detailed breakdown of all costs upfront.'
    },
    {
      value: 'Can I view properties online?',
      description:
        "Yes, we offer virtual tours and high-quality photos for all our listings. You can schedule in-person viewings for properties you're interested in."
    },
    {
      value: 'How do I know the right price for my property?',
      description:
        'Our agents will conduct a comparative market analysis to determine the optimal listing price based on recent sales of similar properties in your area.'
    }
  ]

  return (
    <Stack className='items-center justify-center gap-20 px-2 py-4 md:px-10'>
      <AboutHeader />
      <WhyUs />
      <Container className='flex w-full flex-col justify-between gap-4 border-t pt-10 md:flex-row'>
        <Box className='md:flex-1'>
          <Text className='text-lg font-bold text-neutral-700'>
            Are you ready to find the talent needed to make your next project a
            success?
          </Text>
          <Text className='text-neutral-600'>
            With so many unique blocks, you can easily create a page without
            programming.Create your next landing page.
          </Text>
        </Box>
        <PrimaryButton
          className='w-full rounded-xl capitalize text-secondary md:w-fit'
          size='lg'
        >
          start now for free
        </PrimaryButton>
      </Container>

      <HeaderSection
        title='Frequently asked questions'
        badgeClassName='mx-auto'
        badgeTitle='FAQs'
      />
      <Faq className='w-full md:w-[80%]' items={faqs} />
      <ContactUs />
    </Stack>
  )
}

export default About

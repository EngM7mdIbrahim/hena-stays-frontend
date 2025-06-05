import TermsOfUse from '@sections/TermsOfUse'

export const metadata = {
  title: 'Terms of Use | TrueDar Real Estate Platform',
  description:
    'Read the Terms of Use for TrueDar’s real estate platform. Understand the rules and regulations governing the use of our services, ensuring a seamless and transparent experience.',
  robots: {
    index: true,
    follow: true
  }
}

function TermsOfUsePage() {
  return <TermsOfUse />
}

export default TermsOfUsePage

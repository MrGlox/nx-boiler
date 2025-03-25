import { Section, Text, Link } from '@react-email/components'

export function Footer({ cancel }: { cancel?: boolean }) {
  return (
    <Section className="text-center">
      <Text className="m-0 text-xs text-gray-600">
        {cancel
          ? 'The refund of the paid amount will be processed shortly. For any inquiries, please contact us'
          : 'For any inquiries, please contact us'}
      </Text>
      <Link className="text-xs text-gray-600 underline" href="mailto:contact@studiookkino.com">
        contact@studiookkino.com
      </Link>
    </Section>
  )
}

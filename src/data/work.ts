// Featured work. Status labels are deliberately conservative: "dev-validated" or "in progress", never "production".
export const work = [
  {
    slug: 'twinfra',
    name: 'Twinfra',
    kicker: 'AWS-compatible private cloud · MIT',
    summary:
      'Your AWS twin, on your own infrastructure. The AWS CLI, SDKs and CloudFormation run on your own hardware and switch to AWS by changing one profile.',
    status: { label: 'Development environment running · AWS API layer next', tone: 'live' },
    repo: { label: 'github.com/amazen33/vCloud (being renamed to twinfra)', href: 'https://github.com/amazen33/vCloud' }
  },
  {
    slug: 'streaming-rag',
    name: 'Hybrid Streaming RAG',
    kicker: 'Reference architecture',
    summary:
      'Streaming retrieval-augmented generation with PII tokenization, immutable audit and compensating workflows.',
    status: { label: 'Reference implementation', tone: 'neutral' },
    repo: { label: 'github.com/amazen33/omni-stream-RAG-mesh', href: 'https://github.com/amazen33/omni-stream-RAG-mesh' }
  },
  {
    slug: 'iot-ee',
    name: 'IOT-EE',
    kicker: 'Multi-tenant IoT platform',
    summary:
      'An enterprise IoT platform on Spring Boot, with ThingsBoard CE behind a replaceable boundary and a Migration Manager that brings existing ThingsBoard rule chains and data across.',
    status: { label: 'Implemented and tested locally', tone: 'plan' },
    repo: { label: 'github.com/amazen33/IOT-EE', href: 'https://github.com/amazen33/IOT-EE' }
  }
] as const;

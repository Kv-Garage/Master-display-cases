import { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'FAQ | Shipping, Lead Times & Warranty | Master Display Cases',
  description:
    'Frequently asked questions about shipping, lead times, assembly, warranty, and bulk pricing for commercial display cases.',
};

const faqCategories = [
  {
    name: 'Shipping',
    questions: [
      {
        question: 'How does freight shipping work?',
        answer:
          'Freight shipping is used for all display cases due to their size and weight. Your case will be securely crated and shipped via LTL (Less Than Truckload) freight. Delivery is to your business address with curbside drop-off. The freight carrier will call to schedule a delivery appointment. For an additional fee, you can add liftgate service (for locations without a loading dock) and inside delivery.',
      },
      {
        question: 'How much does freight shipping cost?',
        answer:
          'Freight costs vary based on distance, weight, and any additional services (liftgate, inside delivery). Shipping is calculated at checkout based on your location. Typical shipping costs range from $149-$399 for single cases. Bulk orders may qualify for discounted freight rates — contact us for a custom quote.',
      },
      {
        question: 'How long does shipping take?',
        answer:
          'Standard freight shipping typically takes 7-14 business days from the time your order ships. Expedited options (3-5 business days) are available for an additional cost. You\'ll receive tracking information and the freight carrier will contact you to schedule a delivery appointment.',
      },
      {
        question: 'Do you ship internationally?',
        answer:
          'Currently, we ship to addresses within the continental United States. For international orders or shipments to Hawaii, Alaska, or Puerto Rico, please contact our sales team for a custom quote.',
      },
      {
        question: 'What if my case arrives damaged?',
        answer:
          'All shipments are fully insured. If your case arrives damaged, note the damage on the delivery receipt before signing, take photos, and contact us within 24 hours. We\'ll arrange for a replacement or repair at no additional cost to you.',
      },
    ],
  },
  {
    name: 'Lead Times',
    questions: [
      {
        question: 'Are display cases in stock or made to order?',
        answer:
          'Most of our popular display cases are kept in stock and ship within 1-3 business days. Custom configurations or large bulk orders may require additional lead time (typically 2-4 weeks). Product pages will indicate current availability.',
      },
      {
        question: 'Can I expedite my order?',
        answer:
          'Yes, expedited processing is available for in-stock items. Contact our sales team to discuss rush order options. Expedited freight shipping is also available for faster delivery once your order ships.',
      },
      {
        question: 'How do I check the status of my order?',
        answer:
          'Once your order ships, you\'ll receive tracking information via email. For order status updates or questions, contact our customer service team at info@masterdisplaycases.com or 1-800-555-0123.',
      },
    ],
  },
  {
    name: 'Assembly',
    questions: [
      {
        question: 'How difficult is assembly?',
        answer:
          'Most display cases arrive 90% assembled and require minimal setup. Typical assembly involves attaching the base, installing shelves, and connecting the lighting. Most customers complete assembly in 30-45 minutes with basic tools (Phillips head screwdriver, level).',
      },
      {
        question: 'Are assembly instructions included?',
        answer:
          'Yes, detailed step-by-step instructions with diagrams are included with every display case. We also provide video assembly guides on our YouTube channel. If you need additional support, our customer service team can walk you through any step.',
      },
      {
        question: 'Do you offer professional assembly?',
        answer:
          'For bulk orders (3+ cases), we can arrange professional assembly services in most areas. This is particularly popular for multi-location retailers or store remodels. Contact our sales team for pricing and availability.',
      },
      {
        question: 'What tools do I need?',
        answer:
          'Basic assembly requires a Phillips head screwdriver and a level. All necessary hardware (screws, bolts, anchors) is included. For wall-mounted cases, you may need a drill for mounting into studs or masonry.',
      },
    ],
  },
  {
    name: 'Warranty',
    questions: [
      {
        question: 'What does the warranty cover?',
        answer:
          'All display cases come with a 5-year structural warranty covering the frame, glass, and shelving. LED/RGB lighting components are covered for 2 years. The warranty covers defects in materials and workmanship under normal commercial use.',
      },
      {
        question: 'What is not covered?',
        answer:
          'The warranty does not cover damage from misuse, accidents, improper installation, or normal wear and tear. Glass breakage due to impact is not covered. Lighting components that fail due to power surges or improper voltage are not covered.',
      },
      {
        question: 'How do I make a warranty claim?',
        answer:
          'Contact our customer service team with photos of the defect and your order number. We\'ll evaluate the claim and, if approved, ship replacement parts or arrange for a replacement unit. Most warranty claims are processed within 5 business days.',
      },
      {
        question: 'Is the warranty transferable?',
        answer:
          'Yes, the warranty is transferable to a new owner if the display case is sold or the business changes ownership. Proof of original purchase is required.',
      },
    ],
  },
  {
    name: 'Bulk Pricing',
    questions: [
      {
        question: 'What quantity qualifies for bulk pricing?',
        answer:
          'Bulk pricing starts at 3 units of the same display case model. Discounts increase with quantity: 3-5 units (10% off), 6-10 units (15% off), 11-20 units (20% off), 21+ units (25% off). Custom quotes are available for larger orders.',
      },
      {
        question: 'How do I request a bulk quote?',
        answer:
          'Use our Contact page or email info@masterdisplaycases.com with your desired quantities and models. Our sales team will provide a detailed quote within 24 business hours. You can also call 1-800-555-0123 for immediate assistance.',
      },
      {
        question: 'Do bulk orders ship together?',
        answer:
          'Yes, we coordinate shipments to ensure all cases arrive together when possible. For very large orders, we may ship in multiple trucks but will coordinate delivery timing. Freight costs for bulk orders are often lower per unit due to better freight class rates.',
      },
      {
        question: 'Can I mix and match different display case models?',
        answer:
          'Yes, bulk discounts apply to mixed orders as well. The discount tier is based on total units ordered. For example, ordering 3 floor-standing cases and 3 countertop cases would qualify for the 6-unit discount tier.',
      },
      {
        question: 'Do you offer Net 30 terms for business accounts?',
        answer:
          'Yes, qualified businesses can apply for Net 30 payment terms. This requires a credit application and approval. Net 30 terms are typically available for orders over $2,500. Contact our sales team for details.',
      },
    ],
  },
  {
    name: 'Products',
    questions: [
      {
        question: 'Can I customize the display case dimensions?',
        answer:
          'Yes, we offer custom sizing for orders of 5+ units. Custom dimensions may affect pricing and lead time. Contact our sales team with your specifications for a quote.',
      },
      {
        question: 'What lighting options are available?',
        answer:
          'All display cases include integrated LED lighting. RGB (color-changing) lighting is available as an upgrade on most models. RGB systems include a remote control with 16 color options and multiple modes (fade, flash, strobe). You can also set a static color to match your brand.',
      },
      {
        question: 'Are display cases lockable?',
        answer:
          'Yes, all display cases include lockable doors or access panels. Two keys are included with each case. Additional keys can be ordered if needed. For high-security applications, we can install upgraded locking mechanisms.',
      },
      {
        question: 'Can shelves be adjusted?',
        answer:
          'Yes, all display cases feature adjustable glass shelves. Shelf positions can be modified without tools in most models. Additional shelves can be purchased separately if needed.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-gray-50 section-padding">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Help Center
            </span>
            <h1 className="heading-lg mt-4 mb-6">Frequently Asked Questions</h1>
            <p className="body-lg text-gray-600">
              Everything you need to know about ordering, shipping, and owning 
              Master Display Cases products. Can't find what you're looking for? 
              Contact our team.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="border-b border-gray-200">
        <div className="container-custom">
          <div className="flex flex-wrap gap-4 py-8">
            <Link href="#shipping" className="text-sm font-medium text-black hover:text-gray-600">
              Shipping
            </Link>
            <Link href="#lead-times" className="text-sm font-medium text-black hover:text-gray-600">
              Lead Times
            </Link>
            <Link href="#assembly" className="text-sm font-medium text-black hover:text-gray-600">
              Assembly
            </Link>
            <Link href="#warranty" className="text-sm font-medium text-black hover:text-gray-600">
              Warranty
            </Link>
            <Link href="#bulk-pricing" className="text-sm font-medium text-black hover:text-gray-600">
              Bulk Pricing
            </Link>
            <Link href="#products" className="text-sm font-medium text-black hover:text-gray-600">
              Products
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      {faqCategories.map((category) => (
        <section key={category.name} id={category.name.toLowerCase().replace(' ', '-')} className="section-padding border-b border-gray-100">
          <div className="container-custom max-w-4xl">
            <h2 className="heading-md mb-8">{category.name}</h2>
            <div className="space-y-4">
              {category.questions.map((faq, index) => (
                <details key={index} className="bg-gray-50 rounded-lg group">
                  <summary className="p-6 font-medium cursor-pointer hover:bg-gray-100 transition-colors flex items-center justify-between">
                    {faq.question}
                    <svg
                      className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6 text-gray-600">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Contact CTA */}
      <section className="section-padding bg-black text-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="heading-lg mb-4">Still Have Questions?</h2>
            <p className="text-gray-400 mb-8">
              Our team is here to help. Contact us for personalized assistance with your display case needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" size="lg">
                Contact Us
              </Button>
              <Button href="tel:1-800-555-0123" variant="secondary" size="lg">
                Call 1-800-555-0123
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
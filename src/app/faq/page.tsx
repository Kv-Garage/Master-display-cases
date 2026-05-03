import { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import FeaturedProductAd from '@/components/sections/FeaturedProductAd';

export const metadata: Metadata = {
  title: 'FAQ | Display Cases for Smoke Shops & Retail Stores | Master Display Cases',
  description:
    'Frequently asked questions about our LED display cases for smoke shops, vape stores, and retail businesses. Learn about shipping, returns, product details, and more.',
  keywords:
    'display cases for smoke shops, LED display cases, retail display cases, commercial display cases, vape shop displays, glass display cabinets',
};

const faqSections = [
  {
    title: 'General Questions',
    id: 'general',
    questions: [
      {
        question: 'What types of display cases do you offer?',
        answer:
          'We offer premium LED display cases, glass display cabinets, countertop displays, and lockable retail showcases designed specifically for smoke shops, vape stores, and retail environments.',
      },
      {
        question: 'Who are your display cases designed for?',
        answer:
          'Our display cases are built for retail business owners, including smoke shops, vape stores, jewelry stores, and specialty retailers who want to improve product visibility and increase sales.',
      },
      {
        question: 'Are your display cases commercial grade?',
        answer:
          'Yes. All of our display cases are designed for commercial use, built with durable materials, and made to handle daily retail environments.',
      },
    ],
  },
  {
    title: 'Shipping & Delivery',
    id: 'shipping-delivery',
    questions: [
      {
        question: 'How long does shipping take?',
        answer:
          'Most orders are processed within 1–3 business days and delivered within 5–10 business days depending on location and freight scheduling.',
      },
      {
        question: 'How are display cases shipped?',
        answer:
          'Due to size and weight, most display cases are shipped via freight carriers. Delivery is typically curbside, and the carrier will contact you to schedule delivery.',
      },
      {
        question: 'Do I need to be present for delivery?',
        answer:
          'Yes. A signature is required for most freight deliveries, and we recommend inspecting your order upon arrival.',
      },
      {
        question: 'Do you offer liftgate or inside delivery?',
        answer:
          'Additional delivery services such as liftgate or inside delivery may be available. Contact us before placing your order for special arrangements.',
      },
    ],
  },
  {
    title: 'Returns & Damage',
    id: 'returns-damage',
    questions: [
      {
        question: 'What if my display case arrives damaged?',
        answer:
          'Please inspect your order upon delivery. If there is damage, note it with the carrier and contact us within 48 hours with photos so we can assist you with a replacement or claim.',
      },
      {
        question: 'Do you accept returns?',
        answer:
          'Due to the size and nature of our products, returns may be subject to approval and restocking fees. Contact us for details before initiating a return.',
      },
    ],
  },
  {
    title: 'Product Details',
    id: 'product-details',
    questions: [
      {
        question: 'Are your display cases lockable?',
        answer:
          'Yes. Many of our display cases include built-in locking systems to help secure high-value inventory.',
      },
      {
        question: 'Do your display cases include lighting?',
        answer:
          'Yes. Many of our models feature integrated LED lighting designed to improve product visibility and enhance store presentation.',
      },
      {
        question: 'Can I use these display cases for high-value items?',
        answer:
          'Absolutely. Our display cases are commonly used for high-value products such as vape devices, glass pieces, jewelry, and collectibles.',
      },
    ],
  },
  {
    title: 'Ordering & Payments',
    id: 'ordering-payments',
    questions: [
      {
        question: 'Do you offer bulk or wholesale pricing?',
        answer:
          'Yes. We offer bulk pricing for multi-store owners and larger orders. Contact us for a custom quote.',
      },
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept all major payment methods available at checkout.',
      },
    ],
  },
  {
    title: 'Business & Trust',
    id: 'business-trust',
    questions: [
      {
        question: 'Why should I choose your display cases?',
        answer: (
          <>
            Our display cases are designed to:
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Increase product visibility</li>
              <li>Improve store aesthetics</li>
              <li>Help drive higher sales</li>
              <li>Secure high-value inventory</li>
            </ul>
          </>
        ),
      },
      {
        question: 'How do display cases increase sales?',
        answer:
          'Well-designed display cases improve product visibility and perceived value, leading to more customer engagement and higher average order value.',
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
            <h1 className="heading-lg mt-4 mb-6">
              Frequently Asked Questions About Display Cases
            </h1>
            <p className="body-lg text-gray-600">
              Everything you need to know about our LED display cases for smoke
              shops, vape stores, and retail businesses. Can't find what
              you're looking for? Contact our team.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="border-b border-gray-200">
        <div className="container-custom">
          <div className="flex flex-wrap gap-4 py-8">
            {faqSections.map((section) => (
              <Link
                key={section.id}
                href={`#${section.id}`}
                className="text-sm font-medium text-black hover:text-gray-600"
              >
                {section.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      {faqSections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="section-padding border-b border-gray-100"
        >
          <div className="container-custom max-w-4xl">
            <h2 className="heading-md mb-8">{section.title}</h2>
            <div className="space-y-4">
              {section.questions.map((faq, index) => (
                <details
                  key={index}
                  className="bg-gray-50 rounded-lg group"
                  id={`faq-${section.id}-${index}`}
                >
                  <summary className="p-6 font-medium cursor-pointer hover:bg-gray-100 transition-colors flex items-center justify-between">
                    {faq.question}
                    <svg
                      className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6 text-gray-600">
                    {typeof faq.answer === 'string' ? faq.answer : faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Shop Our Most Popular Display - BOTTOM SECTION */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Shop Our Most Popular Display
            </span>
            <h2 className="heading-lg mt-2">48" LED Retail Wrap Counter (RGB)</h2>
            <p className="text-gray-600 mt-3">
              The display case trusted by hundreds of retailers for its quality, durability, and visual impact.
            </p>
          </div>
          <FeaturedProductAd variant="default" />
          <div className="text-center mt-8">
            <Link 
              href="/products/products-48-led-retail-wrap-counter-rgb"
              className="inline-flex items-center px-8 py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors text-lg"
            >
              View Product Details
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-black text-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="heading-lg mb-4">Still Have Questions?</h2>
            <p className="text-gray-400 mb-8">
              Our team is here to help you choose the right display setup for
              your store.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" size="lg">
                Contact Us
              </Button>
              <Button href="/collections/retail-displays" variant="secondary" size="lg">
                Shop Display Cases
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqSections.flatMap((section) =>
              section.questions.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:
                    typeof faq.answer === 'string'
                      ? faq.answer
                      : extractTextFromReact(faq.answer),
                },
              }))
            ),
          }),
        }}
      />
    </div>
  );
}

// Helper function to extract plain text from React elements for JSON-LD
function extractTextFromReact(element: any): string {
  if (typeof element === 'string') return element;
  if (Array.isArray(element))
    return element.map(extractTextFromReact).join(' ');
  if (element?.props?.children) {
    if (element.props.children.props?.className?.includes('list-disc')) {
      // Extract list items
      const items = element.props.children.props.children;
      if (Array.isArray(items)) {
        return items
          .map((item: any) => extractTextFromReact(item.props?.children))
          .join(', ');
      }
      return extractTextFromReact(items.props?.children);
    }
    return extractTextFromReact(element.props.children);
  }
  return '';
}
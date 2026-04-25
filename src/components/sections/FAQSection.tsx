'use client';

import { useState } from 'react';

export default function FAQSection() {
  const faqs = [
    {
      question: 'How much is shipping?',
      answer:
        'Freight shipping typically ranges from $349–$459 depending on your location. These are large commercial units that require specialized freight delivery. We provide exact shipping quotes before you complete your order, so there are no surprises.',
    },
    {
      question: 'Why is shipping not free?',
      answer:
        'Unlike small consumer products, our display cases are large, heavy commercial units that require freight delivery with liftgate service. Rather than inflating our product prices to hide shipping costs, we keep our pricing transparent. You pay for the product, and shipping is calculated separately based on your location.',
    },
    {
      question: 'Are these truly commercial-grade?',
      answer:
        'Yes. Every display case we sell is built for retail environments and high-traffic commercial use. We use tempered glass, commercial-grade hardware, and reinforced frames designed to withstand years of daily use. These are not consumer-grade display units.',
    },
    {
      question: 'Does the case come assembled?',
      answer:
        'Display cases ship knocked down (KD) to minimize shipping costs and prevent damage during transit. Assembly is straightforward with included instructions. Professional assembly services are available for an additional fee—contact us for details.',
    },
    {
      question: 'What is the delivery time?',
      answer:
        'Most orders ship within 5–10 business days. Freight delivery typically takes an additional 3–7 business days depending on your location. If you need a faster timeline, contact our team about expedited options.',
    },
    {
      question: 'Do you offer bulk pricing?',
      answer:
        'Yes, we offer significant discounts for bulk orders. If you are outfitting an entire store or multiple locations, contact us for a custom quote. We regularly work with retail chains and can accommodate large-scale orders.',
    },
    {
      question: 'What about warranties?',
      answer:
        'All our display cases come with a manufacturer warranty covering defects in materials and workmanship. LED lighting systems are covered for 2 years. Extended warranty options are available for commercial installations.',
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Common Questions
            </span>
            <h2 className="heading-lg mt-2">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-1">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-200 bg-white"
              >
                <button
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  aria-expanded={openIndex === index}
                >
                  <span className="text-base font-medium pr-8">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
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
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Still have questions? We are here to help.
            </p>
            <a
              href="/contact"
              className="text-black font-semibold underline underline-offset-4 hover:text-gray-600 transition-colors"
            >
              Contact our team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
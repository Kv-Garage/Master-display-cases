import Button from '@/components/ui/Button';
import ContactForm from '@/components/sections/ContactForm';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Contact Us | Bulk Pricing & Custom Quotes | Master Display Cases',
  description:
    'Request bulk pricing for your store. Contact our team for custom quotes on commercial display cases. Freight shipping available nationwide from Grand Rapids, Michigan.',
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-gray-50 section-padding">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Get in Touch
            </span>
            <h1 className="heading-lg mt-4 mb-6">
              Request Bulk Pricing for Your Store
            </h1>
            <p className="body-lg text-gray-600">
              Outfitting an entire store or multiple locations? We offer
              significant discounts for bulk orders and can accommodate
              large-scale commercial projects.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-2">
              <h2 className="heading-md mb-8">Send Us a Message</h2>
              <Suspense fallback={<div>Loading form...</div>}>
                <ContactForm />
              </Suspense>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="heading-sm mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <svg
                      className="w-6 h-6 text-gray-400 flex-shrink-0 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-black">Email</p>
                      <a
                        href="mailto:info@masterdisplaycases.com"
                        className="text-sm text-gray-600 hover:text-black"
                      >
                        info@masterdisplaycases.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <svg
                      className="w-6 h-6 text-gray-400 flex-shrink-0 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3.5 14.784 3.5 8V5z"
                      />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-black">Phone</p>
                      <a
                        href="tel:1-800-555-0123"
                        className="text-sm text-gray-600 hover:text-black"
                      >
                        1-800-555-0123
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <svg
                      className="w-6 h-6 text-gray-400 flex-shrink-0 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-black">
                        Business Hours
                      </p>
                      <p className="text-sm text-gray-600">
                        Monday - Friday: 8am - 6pm EST
                        <br />
                        Saturday: 9am - 2pm EST
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <svg
                      className="w-6 h-6 text-gray-400 flex-shrink-0 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-black">Location</p>
                      <p className="text-sm text-gray-600">
                        Grand Rapids, Michigan
                        <br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Work With Us */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="heading-sm mb-4">Why Work With Us?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <svg
                      className="w-5 h-5 text-black flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm text-gray-700">
                      Dedicated account managers for bulk orders
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg
                      className="w-5 h-5 text-black flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm text-gray-700">
                      Volume discounts up to 25%
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg
                      className="w-5 h-5 text-black flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm text-gray-700">
                      Custom configuration options
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg
                      className="w-5 h-5 text-black flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm text-gray-700">
                      Coordinated freight delivery
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg
                      className="w-5 h-5 text-black flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm text-gray-700">
                      Net 30 terms available for qualified businesses
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
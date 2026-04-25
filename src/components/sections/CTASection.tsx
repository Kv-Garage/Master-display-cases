import Button from '@/components/ui/Button';

export default function CTASection() {
  return (
    <section className="bg-black text-white section-padding">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Ready to Upgrade?
          </span>
          <h2 className="heading-lg mt-4 mb-6">
            Upgrade Your Store Display Today
          </h2>
          <p className="body-lg text-gray-400 max-w-2xl mx-auto mb-10">
            Join hundreds of retailers who have transformed their stores with
            our commercial-grade display systems. Increase product visibility,
            perceived value, and sales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/collections/display-cases" size="lg">
              View Products
            </Button>
            <Button
              href="/contact"
              variant="secondary"
              size="lg"
              className="bg-transparent border-white text-white hover:bg-white hover:text-black"
            >
              Request Bulk Pricing
            </Button>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-gray-500 text-sm">
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span>Commercial Grade Quality</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 14.66V20a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h2.34M20 14.66l-2.34 2.34A2 2 0 0017 18.34V20m3-5.34V6a2 2 0 00-2-2h-1.66M17 18.34V16a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m-6 0h12"
                />
              </svg>
              <span>Nationwide Freight Shipping</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 10h18M7 15h1m4 0h1m-7 0h1m7 0h1m-7 0h1M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>Transparent Pricing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
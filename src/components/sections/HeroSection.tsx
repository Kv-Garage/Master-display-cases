import Button from '@/components/ui/Button';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative bg-gray-50 overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-20 lg:py-32">
          {/* Content */}
          <div className="space-y-8">
            <h1 className="heading-xl max-w-xl">
              Commercial Display Cases Built to Increase Store Revenue
            </h1>

            <p className="body-lg text-gray-600 max-w-lg">
              Premium glass display systems engineered for visibility, durability,
              and higher-value sales.
            </p>

            {/* Feature Bullets */}
            <ul className="space-y-4">
              {[
                'Designed for high-traffic retail environments',
                'Increase product visibility & perceived value',
                'Durable commercial-grade construction',
                'Freight shipping available nationwide',
              ].map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
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
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button href="/collections/display-cases" size="lg">
                View Display Cases
              </Button>
              <Button
                href="/contact"
                variant="secondary"
                size="lg"
              >
                Get Bulk Pricing
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-8 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-gray-400"
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
                <span className="text-xs text-gray-500 uppercase tracking-wider">
                  Commercial Grade
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span className="text-xs text-gray-500 uppercase tracking-wider">
                  LED / RGB Options
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-gray-400"
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
                <span className="text-xs text-gray-500 uppercase tracking-wider">
                  Nationwide Shipping
                </span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[4/5] lg:aspect-square rounded-lg overflow-hidden bg-white shadow-2xl">
              {/* Placeholder image - in production, use actual product image */}
              <Image
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80"
                alt="Premium RGB-lit display case"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-black/5 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
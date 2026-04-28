import Image from 'next/image';

export default function BenefitsSection() {
  const benefits = [
    {
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      title: 'Commercial Grade',
      description: 'Built for demanding retail environments',
    },
    {
      icon: (
        <svg
          className="w-10 h-10"
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
      ),
      title: '5-Year Warranty',
      description: 'Industry-leading protection',
    },
    {
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1H8a1 1 0 01-1-1v-1H5a1 1 0 01-1-1V5a1 1 0 011-1h2m0 0V3m0 2a1 1 0 011-1h4a1 1 0 011 1v1m0 2h2m-2 0h-2m2 0v1a1 1 0 01-1 1h-4a1 1 0 01-1-1v-1m0 0H5"
          />
        </svg>
      ),
      title: 'Nationwide Freight',
      description: 'Shipping to all 50 states',
    },
  ];

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Why It Matters
          </span>
          <h2 className="heading-lg mt-4 mb-6">
            Turn Your Display Into a Revenue Driver
          </h2>
          <p className="body-lg text-gray-600">
            Your display case isn't just furniture—it's a sales tool.
            The right display system directly impacts how customers perceive your
            products and their willingness to pay premium prices.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="text-center space-y-4 p-6"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full text-black">
                {benefit.icon}
              </div>
              <h3 className="heading-sm">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Visual Section */}
        <div className="relative aspect-[16/9] lg:aspect-[21/9] rounded-lg overflow-hidden bg-gray-100">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80"
            alt="Modern retail store with premium display cases"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
            <div className="max-w-2xl">
              <p className="text-white text-lg lg:text-xl font-medium">
                &ldquo;After upgrading to Master Display Cases, our average
                transaction value increased by 34%. Customers treat our products
                differently when they're presented properly.&rdquo;
              </p>
              <p className="text-gray-300 text-sm mt-4">
                — Boutique Owner, Chicago IL
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
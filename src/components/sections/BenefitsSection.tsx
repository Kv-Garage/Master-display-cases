import Image from 'next/image';

export default function BenefitsSection() {
  const benefits = [
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: 'Higher Perceived Value',
      description:
        'Premium display cases elevate your products, allowing you to command higher prices. Customers perceive items in quality displays as more valuable and trustworthy.',
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ),
      title: 'Better Product Visibility',
      description:
        'Strategic lighting and glass clarity ensure every product is seen at its best. RGB and LED options create eye-catching displays that draw customers in.',
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
      title: 'Increased Conversions',
      description:
        'Professional displays create an environment of trust and quality. When products look premium, customers are more likely to make purchasing decisions.',
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
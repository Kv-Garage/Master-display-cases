import Image from 'next/image';
import Link from 'next/link';

export default function UseCasesSection() {
  const useCases = [
    {
      title: 'Smoke Shops',
      description:
        'Secure, well-lit displays perfect for premium tobacco products, vaping supplies, and accessories. Lockable cases protect high-value inventory while showcasing products beautifully.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      features: ['Lockable security', 'UV-protected glass', 'Custom lighting'],
      href: '/collections/smoke-shop',
    },
    {
      title: 'Boutiques',
      description:
        'Elegant display solutions that elevate jewelry, accessories, and fashion items. Create an upscale shopping experience that justifies premium pricing.',
      image: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80',
      features: ['Minimal design', 'LED accent lighting', 'Velvet interiors'],
      href: '/collections/boutique',
    },
    {
      title: 'Electronics Stores',
      description:
        'Heavy-duty cases designed for high-traffic electronics retail. Protect valuable devices while allowing customers to view products from every angle.',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      features: ['Anti-theft design', 'Cable management', 'RGB lighting'],
      href: '/collections/electronics',
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Applications
          </span>
          <h2 className="heading-lg mt-2">Built for Your Industry</h2>
          <p className="text-gray-600 mt-2">
            Whatever you sell, we have display solutions designed specifically
            for your retail environment.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <Link
              key={index}
              href={useCase.href}
              className="group block"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100 mb-6">
                <Image
                  src={useCase.image}
                  alt={useCase.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>

              <h3 className="heading-md mb-3 group-hover:text-gray-600 transition-colors">
                {useCase.title}
              </h3>

              <p className="text-gray-600 mb-4 line-clamp-3">
                {useCase.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {useCase.features.map((feature) => (
                  <span
                    key={feature}
                    className="text-xs bg-gray-100 text-gray-600 px-3 py-1 uppercase tracking-wider"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
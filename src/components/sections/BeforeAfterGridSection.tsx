import Image from 'next/image';

interface GridItemProps {
  imageSrc: string;
  altText: string;
  productName: string;
  beforeText: string;
  afterText: string;
  valueProps: string[];
}

function GridItem({
  imageSrc,
  altText,
  productName,
  beforeText,
  afterText,
  valueProps,
}: GridItemProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-black">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={imageSrc}
          alt={altText}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* BEFORE Label - Left Side */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <div className="bg-black/60 backdrop-blur-md rounded-lg px-4 py-3 border-l-2 border-gray-500">
            <span className="text-white text-xs font-bold uppercase tracking-wider block">
              Before
            </span>
            <span className="text-gray-300 text-xs block mt-1">
              {beforeText}
            </span>
          </div>
        </div>

        {/* AFTER Label - Right Side */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <div className="bg-black/60 backdrop-blur-md rounded-lg px-4 py-3 border-r-2 border-green-500">
            <span className="text-green-400 text-xs font-bold uppercase tracking-wider block">
              After
            </span>
            <span className="text-gray-300 text-xs block mt-1">
              {afterText}
            </span>
          </div>
        </div>

        {/* VS Badge in center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="bg-black/80 backdrop-blur-md rounded-full w-12 h-12 flex items-center justify-center border border-gray-600">
            <span className="text-white text-xs font-bold">VS</span>
          </div>
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/90 to-transparent">
        <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-2">
          {productName}
        </h3>
        
        {/* Value Propositions */}
        <div className="space-y-1">
          {valueProps.map((prop, index) => (
            <div key={index} className="flex items-center space-x-2">
              <svg
                className="w-4 h-4 text-green-500 flex-shrink-0"
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
              <span className="text-gray-300 text-xs">{prop}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-green-500/10" />
      </div>
    </div>
  );
}

export default function BeforeAfterGridSection() {
  const gridItems = [
    {
      imageSrc: '/Before and after of 48".png',
      altText: '48" Display Case Before and After',
      productName: '48" Floor Display Case',
      beforeText: 'Standard Display',
      afterText: 'RGB Premium Display',
      valueProps: [
        'Increase perceived value by 35%',
        'Drive impulse purchases',
        'Premium product positioning',
      ],
    },
    {
      imageSrc: '/Before and after of 72".png',
      altText: '72" Display Case Before and After',
      productName: '72" Floor Display Case',
      beforeText: 'Basic Shelving',
      afterText: 'Revenue-Boosting RGB Display',
      valueProps: [
        'Turn displays into profit centers',
        'Enhanced product visibility',
        'Higher average order value',
      ],
    },
    {
      imageSrc: '/Before and after of the 70W.png',
      altText: '70W Display Case Before and After',
      productName: '70" Wide Showcase',
      beforeText: 'Standard Setup',
      afterText: 'Master Display System',
      valueProps: [
        'Create premium in-store experience',
        'Increase customer dwell time',
        'Showcase high-margin items',
      ],
    },
    {
      imageSrc: '/Before and after of the counter 48".png',
      altText: 'Counter 48" Display Case Before and After',
      productName: '48" Countertop Display',
      beforeText: 'Basic Counter',
      afterText: 'Revenue-Boosting RGB Display',
      valueProps: [
        'Maximize counter space value',
        'Drive checkout impulse buys',
        'Premium brand presentation',
      ],
    },
  ];

  return (
    <section className="section-padding bg-black">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-4">
            Visual Proof
          </span>
          <h2 className="heading-lg text-white mb-4">
            See How Premium Displays{' '}
            <span className="rgb-gradient">Transform Your Revenue</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            The difference isn't just design — it's perceived value. 
            Professional displays turn browsers into buyers and products into must-haves.
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {gridItems.map((item, index) => (
            <GridItem
              key={index}
              imageSrc={item.imageSrc}
              altText={item.altText}
              productName={item.productName}
              beforeText={item.beforeText}
              afterText={item.afterText}
              valueProps={item.valueProps}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm mb-6">
            Every display case is engineered to increase perceived value and drive sales.
          </p>
          <a
            href="/collections/display-cases"
            className="inline-flex items-center space-x-2 bg-white text-black px-8 py-4 rounded-lg font-semibold uppercase tracking-wider hover:bg-gray-200 transition-colors"
          >
            <span>Explore All Display Cases</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
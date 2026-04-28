'use client';

interface Review {
  id: number;
  name: string;
  businessType: string;
  location: string;
  rating: number;
  title: string;
  content: string;
  verified: boolean;
}

const PRODUCT_PAGE_REVIEWS: Review[] = [
  {
    id: 1,
    name: 'Marcus',
    businessType: 'Vape Shop Owner',
    location: 'Atlanta, GA',
    rating: 5,
    title: 'Wasn\'t sure at first, but...',
    content: 'I\'ll be honest—I hesitated for weeks before pulling the trigger. Kept thinking, "Do I really need this?" But after installing it, I saw customers gravitating toward the display within hours. The RGB lighting caught eyes from across the store. Three weeks in, and I\'ve already made back what I spent. Should\'ve done it sooner.',
    verified: true,
  },
  {
    id: 2,
    name: 'Jennifer',
    businessType: 'Boutique Owner',
    location: 'Phoenix, AZ',
    rating: 5,
    title: 'The attention to detail is insane',
    content: 'What got me was how much thought went into the customer experience. People don\'t just look at products anymore—they stop, they stare, they ask questions. I had a customer spend 20 minutes just admiring her purchase in the case before buying. That\'s the kind of perceived value you can\'t buy with marketing. Sales are up about 30% on featured items.',
    verified: true,
  },
  {
    id: 3,
    name: 'David',
    businessType: 'Electronics Retailer',
    location: 'Houston, TX',
    rating: 4,
    title: 'Solid investment, minor assembly note',
    content: 'Took about 90 minutes to assemble—would\'ve been faster with two people, but doable solo. Once it was up though? Game changer. The glass is thick, the lighting is even, and the lock feels secure. My only note: read the instructions carefully. But the result? Customers are treating my high-end accessories like jewelry now. Worth every penny.',
    verified: true,
  },
  {
    id: 4,
    name: 'Sarah',
    businessType: 'Smoke Shop Manager',
    location: 'Denver, CO',
    rating: 5,
    title: 'Finally, a display that matches our quality',
    content: 'We sell premium products, and honestly, they were getting lost on regular shelves. This case makes everything look... expensive. In the right way. Customers have started asking about items they didn\'t even know we carried, just because they could finally see them properly. The sales impact was immediate—first week, we moved product that had been sitting for months.',
    verified: true,
  },
  {
    id: 5,
    name: 'Michael',
    businessType: 'Collectibles Dealer',
    location: 'Miami, FL',
    rating: 5,
    title: 'My customers literally stopped in their tracks',
    content: 'I run a high-end collectibles shop, and presentation is everything. I was skeptical that a display case could make that much difference, but the first day I had it running, three different people walked in, stopped dead, and asked about pieces they\'d seen before but never noticed. The lighting makes colors pop in a way that photos don\'t capture. It\'s not just a case—it\'s a sales tool.',
    verified: true,
  },
];

// Checkout-specific reviews (shorter, reassurance-focused)
const CHECKOUT_REVIEWS: Review[] = [
  {
    id: 101,
    name: 'Chris',
    businessType: 'Convenience Store',
    location: 'Austin, TX',
    rating: 5,
    title: 'Best ROI decision I made',
    content: 'Paid for itself in the first month. No exaggeration.',
    verified: true,
  },
  {
    id: 102,
    name: 'Amanda',
    businessType: 'Jewelry Boutique',
    location: 'San Diego, CA',
    rating: 5,
    title: 'Wish I\'d bought this sooner',
    content: 'The quality exceeded my expectations. Customers notice immediately.',
    verified: true,
  },
  {
    id: 103,
    name: 'Robert',
    businessType: 'Head Shop',
    location: 'Portland, OR',
    rating: 5,
    title: 'Zero regrets',
    content: 'Installation was straightforward, and the impact on sales was instant.',
    verified: true,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// Product Page Review Block - Full detailed reviews
export function ProductPageReviews() {
  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-black mb-2">
            What Store Owners Are Saying
          </h2>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Real feedback from retailers who transformed their sales with our display cases.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {PRODUCT_PAGE_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-gray-50 rounded-xl p-6 border border-gray-200 flex flex-col"
            >
              <div className="mb-4">
                <StarRating rating={review.rating} />
              </div>
              
              <h3 className="text-sm font-semibold text-black mb-2">
                {review.title}
              </h3>
              
              <p className="text-sm text-gray-700 leading-relaxed mb-4 flex-grow">
                {review.content}
              </p>
              
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-white">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-black">
                      {review.name}
                    </span>
                    {review.verified && (
                      <svg
                        className="w-3.5 h-3.5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-500">
                    {review.businessType} • {review.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Aggregate rating bar */}
        <div className="mt-10 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-black">4.9</div>
              <div className="flex justify-center my-1">
                <StarRating rating={5} />
              </div>
              <div className="text-xs text-gray-500">Based on 127 reviews</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Checkout Review Block - Short, reassurance-focused (Standalone Section)
export function CheckoutReviews() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-black mb-2">
            Verified Buyer Reviews
          </h2>
          <p className="text-sm text-gray-600 max-w-xl mx-auto">
            Quick feedback from retailers who made the investment.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {CHECKOUT_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
            >
              <div className="mb-3">
                <StarRating rating={review.rating} />
              </div>
              <blockquote className="text-sm text-gray-700 leading-relaxed italic mb-4">
                "{review.content}"
              </blockquote>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-white">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-black">
                    {review.name}
                  </p>
                  <p className="text-[10px] text-gray-500">
                    {review.businessType}, {review.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductPageReviews;
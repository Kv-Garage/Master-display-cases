'use client';

import Button from '@/components/ui/Button';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ContactForm() {
  const searchParams = useSearchParams();
  const [prefilledProduct, setPrefilledProduct] = useState('');
  const [isBulkRequest, setIsBulkRequest] = useState(false);

  useEffect(() => {
    const product = searchParams.get('product') || '';
    const bulk = searchParams.get('bulk') === 'true';
    setPrefilledProduct(product);
    setIsBulkRequest(bulk);
  }, [searchParams]);

  return (
    <form className="space-y-6" action="/api/contact" method="POST">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium mb-2"
          >
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black transition-colors"
            placeholder="John"
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium mb-2"
          >
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black transition-colors"
            placeholder="Doe"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-2"
          >
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black transition-colors"
            placeholder="john@company.com"
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium mb-2"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black transition-colors"
            placeholder="(555) 123-4567"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="company"
          className="block text-sm font-medium mb-2"
        >
          Business Name *
        </label>
        <input
          type="text"
          id="company"
          name="company"
          required
          className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black transition-colors"
          placeholder="Your Company, Inc."
        />
      </div>

      <div>
        <label
          htmlFor="orderSize"
          className="block text-sm font-medium mb-2"
        >
          Estimated Order Size *
        </label>
        <select
          id="orderSize"
          name="orderSize"
          required
          defaultValue={isBulkRequest ? '6-10' : ''}
          className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black transition-colors"
        >
          <option value="">Select order size</option>
          <option value="1-2">1-2 display cases</option>
          <option value="3-5">3-5 display cases</option>
          <option value="6-10">6-10 display cases</option>
          <option value="11-25">11-25 display cases</option>
          <option value="26+">26+ display cases</option>
          <option value="full-store">Full store outfitting</option>
          <option value="multi-location">Multiple locations</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="interest"
          className="block text-sm font-medium mb-2"
        >
          Products of Interest
        </label>
        <select
          id="interest"
          name="interest"
          defaultValue={prefilledProduct ? 'specific' : ''}
          className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black transition-colors"
        >
          <option value="">Select product type</option>
          <option value="floor">Floor Standing Displays</option>
          <option value="countertop">Countertop Displays</option>
          <option value="wall">Wall Mounted Displays</option>
          <option value="showcase">Full Vision Showcases</option>
          <option value="specific">Specific Product (see below)</option>
          <option value="custom">Custom Solution</option>
          <option value="mixed">Mixed / Not Sure</option>
        </select>
      </div>

      {prefilledProduct && (
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm font-medium text-black mb-1">
            Product of Interest:
          </p>
          <p className="text-sm text-gray-600">
            {prefilledProduct}
          </p>
          <input
            type="hidden"
            name="productHandle"
            value={prefilledProduct}
          />
        </div>
      )}

      <div>
        <label
          htmlFor="timeline"
          className="block text-sm font-medium mb-2"
        >
          Project Timeline
        </label>
        <select
          id="timeline"
          name="timeline"
          className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black transition-colors"
        >
          <option value="">Select timeline</option>
          <option value="asap">ASAP</option>
          <option value="1-2-weeks">1-2 weeks</option>
          <option value="2-4-weeks">2-4 weeks</option>
          <option value="1-2-months">1-2 months</option>
          <option value="planning">Still planning</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium mb-2"
        >
          Project Details
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          defaultValue={isBulkRequest ? 'I am interested in bulk pricing for multiple units. Please provide a quote with volume discounts.' : ''}
          className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black transition-colors resize-none"
          placeholder="Tell us about your project, specific requirements, or any questions you have..."
        />
      </div>

      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          id="newsletter"
          name="newsletter"
          className="mt-1"
        />
        <label htmlFor="newsletter" className="text-sm text-gray-600">
          I would like to receive product updates and promotional
          offers via email.
        </label>
      </div>

      <Button type="submit" size="lg" fullWidth>
        Request Quote
      </Button>
    </form>
  );
}
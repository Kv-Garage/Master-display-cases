import { Metadata } from 'next';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Terms of Service | Master Display Cases',
  description:
    'Terms of service for Master Display Cases. Learn about our policies for commercial display case purchases, warranties, and business relationships.',
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-gray-50 section-padding">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Policies
            </span>
            <h1 className="heading-lg mt-4 mb-6">Terms of Service</h1>
            <p className="body-lg text-gray-600">
              These terms govern your purchase of commercial display cases from 
              Master Display Cases. By placing an order, you agree to these terms.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg max-w-none">
            {/* Agreement */}
            <h2 className="heading-md">Agreement to Terms</h2>
            <p className="text-gray-600">
              By accessing this website and purchasing products from Master Display Cases, you agree to be bound by these Terms of Service. These terms apply to all transactions, including but not limited to the purchase of display cases, accessories, and related services.
            </p>

            {/* Products & Pricing */}
            <h2 className="heading-md">Products & Pricing</h2>
            
            <h3>Product Descriptions</h3>
            <p className="text-gray-600">
              We strive to provide accurate product descriptions, dimensions, and images. However, we do not warrant that product descriptions, images, or other content on this site are accurate, complete, reliable, or error-free. Colors may vary due to monitor settings and lighting conditions.
            </p>

            <h3>Pricing</h3>
            <p className="text-gray-600">
              All prices are in US Dollars (USD). Prices are subject to change without notice. We reserve the right to correct pricing errors and to refuse or cancel orders placed at incorrect prices. If a pricing error is discovered after your order is placed, we will contact you before processing your order.
            </p>

            <h3>Taxes</h3>
            <p className="text-gray-600">
              Sales tax is calculated based on the ship-to address and applicable state/local tax rates. Business customers with a valid resale certificate may submit it for tax-exempt purchases.
            </p>

            {/* Orders & Payment */}
            <h2 className="heading-md">Orders & Payment</h2>
            
            <h3>Order Acceptance</h3>
            <p className="text-gray-600">
              Your placement of an order constitutes an offer to purchase. Master Display Cases reserves the right to accept or decline your order for any reason, including product availability, errors in product or pricing information, or suspected fraud.
            </p>

            <h3>Payment Terms</h3>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Standard Orders:</strong> Payment in full required at time of order</li>
              <li><strong>Credit Cards:</strong> Visa, Mastercard, American Express accepted</li>
              <li><strong>Wire Transfer:</strong> Available for orders over $2,500</li>
              <li><strong>Net 30 Terms:</strong> Available for qualified business accounts (application required)</li>
            </ul>

            <h3>Order Cancellation</h3>
            <p className="text-gray-600">
              Orders may be cancelled by the customer before shipment for a full refund. Once an order has shipped, it must be returned following our Return Policy. Master Display Cases reserves the right to cancel orders in cases of pricing errors, product unavailability, or suspected fraud.
            </p>

            {/* Shipping & Delivery */}
            <h2 className="heading-md">Shipping & Delivery</h2>
            
            <h3>Shipping Methods</h3>
            <p className="text-gray-600">
              All display cases ship via LTL freight carrier. Shipping costs are calculated based on destination, weight, and current freight rates. Additional services (liftgate, inside delivery) are available for an extra fee.
            </p>

            <h3>Delivery Estimates</h3>
            <p className="text-gray-600">
              Delivery timeframes are estimates and are not guaranteed. Master Display Cases is not liable for delays caused by freight carriers, weather, or other circumstances beyond our control.
            </p>

            <h3>Risk of Loss</h3>
            <p className="text-gray-600">
              Risk of loss transfers to the customer upon delivery to the freight carrier. All shipments are insured. If damage occurs during transit, we will assist with filing a claim and arranging replacement or refund.
            </p>

            {/* Warranty */}
            <h2 className="heading-md">Warranty</h2>
            
            <h3>Limited Warranty</h3>
            <p className="text-gray-600">
              All display cases come with a <strong>5-year structural warranty</strong> covering defects in materials and workmanship under normal commercial use. LED/RGB lighting components are covered for <strong>2 years</strong>.
            </p>

            <h3>Warranty Exclusions</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Damage from misuse, accidents, or improper installation</li>
              <li>Normal wear and tear</li>
              <li>Glass breakage from impact</li>
              <li>Lighting failure due to power surges or improper voltage</li>
              <li>Unauthorized modifications or repairs</li>
            </ul>

            <h3>Warranty Claims</h3>
            <p className="text-gray-600">
              To make a warranty claim, contact our customer service team with photos of the defect and your order number. We will evaluate the claim and, if approved, ship replacement parts or arrange for a replacement unit.
            </p>

            {/* Liability */}
            <h2 className="heading-md">Limitation of Liability</h2>
            <p className="text-gray-600">
              Master Display Cases shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your purchase or use of our products. Our total liability for any claim related to your order shall not exceed the purchase price of the product.
            </p>

            {/* Intellectual Property */}
            <h2 className="heading-md">Intellectual Property</h2>
            <p className="text-gray-600">
              All content on this website, including text, images, logos, and designs, is the property of Master Display Cases and is protected by copyright and trademark laws. You may not reproduce, distribute, or create derivative works from our content without written permission.
            </p>

            {/* Privacy */}
            <h2 className="heading-md">Privacy</h2>
            <p className="text-gray-600">
              Your use of this website is also governed by our <a href="/policies/privacy" className="text-black underline">Privacy Policy</a>. By using this site, you consent to the collection and use of your information as described in that policy.
            </p>

            {/* Modifications */}
            <h2 className="heading-md">Modifications to Terms</h2>
            <p className="text-gray-600">
              Master Display Cases reserves the right to modify these Terms of Service at any time. Changes will be effective upon posting on this page. Your continued use of this website after changes are posted constitutes acceptance of the modified terms.
            </p>

            {/* Governing Law */}
            <h2 className="heading-md">Governing Law</h2>
            <p className="text-gray-600">
              These Terms of Service are governed by the laws of the State of Michigan, without regard to conflict of law principles. Any disputes arising from these terms or your purchase shall be resolved in the state or federal courts of Michigan.
            </p>

            {/* Contact */}
            <h2 className="heading-md">Contact Information</h2>
            <p className="text-gray-600">
              For questions about these Terms of Service, please contact us:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Email:</strong> legal@masterdisplaycases.com</li>
              <li><strong>Address:</strong> Grand Rapids, Michigan, United States</li>
            </ul>

            <div className="bg-gray-50 rounded-lg p-8 mt-12">
              <p className="text-sm text-gray-500">
                Last updated: January 2024
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
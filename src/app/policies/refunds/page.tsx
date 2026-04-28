import { Metadata } from 'next';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Return & Refund Policy | Master Display Cases',
  description:
    'Master Display Cases return and refund policy. Learn about our satisfaction guarantee, return process, and warranty coverage for commercial display cases.',
};

export default function RefundPolicyPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-gray-50 section-padding">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Policies
            </span>
            <h1 className="heading-lg mt-4 mb-6">Return & Refund Policy</h1>
            <p className="body-lg text-gray-600">
              We stand behind the quality of our display cases. If you're not 
              completely satisfied, we'll work with you to make it right.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg max-w-none">
            {/* Satisfaction Guarantee */}
            <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
              <h3 className="font-bold text-green-800 mb-2">Our Promise</h3>
              <p className="text-green-700">
                We build commercial-grade display cases designed to last. If you experience any issues with your purchase, we're committed to finding a solution that works for your business.
              </p>
            </div>

            {/* Returns */}
            <h2 className="heading-md">Return Policy</h2>
            
            <h3>30-Day Return Window</h3>
            <p className="text-gray-600">
              Display cases may be returned within <strong>30 days</strong> of delivery for a full refund, minus shipping costs. The display case must be in original condition, unassembled, and in the original packaging.
            </p>

            <h3>Return Conditions</h3>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Unused & Unassembled:</strong> Items must be in original packaging with all parts and hardware included</li>
              <li><strong>Original Condition:</strong> No scratches, dents, or signs of installation</li>
              <li><strong>All Parts Included:</strong> Glass shelves, lighting components, keys, and hardware must be present</li>
              <li><strong>Original Packaging:</strong> The original crate/packaging must be intact for safe return shipping</li>
            </ul>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 my-8">
              <h4 className="font-semibold text-yellow-800 mb-2">Important: Keep Your Packaging</h4>
              <p className="text-yellow-700 text-sm">
                Please do not discard the original packaging until you're certain you're keeping the display case. Return shipping requires the original crate for safe transport. Customers are responsible for return shipping costs if the original packaging has been discarded.
              </p>
            </div>

            <h3>Return Process</h3>
            <ol className="space-y-4 text-gray-600">
              <li className="flex items-start space-x-3">
                <span className="font-bold text-black">1.</span>
                <span>Contact us at info@masterdisplaycases.com to initiate a return. Include your order number and reason for return.</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="font-bold text-black">2.</span>
                <span>We'll provide a Return Authorization (RA) number and return shipping instructions.</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="font-bold text-black">3.</span>
                <span>Package the display case securely in the original crate. Include all parts, hardware, and documentation.</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="font-bold text-black">4.</span>
                <span>Ship via freight carrier (we can arrange pickup). Return shipping costs are the customer's responsibility unless the item is defective.</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="font-bold text-black">5.</span>
                <span>Once we receive and inspect the return, we'll process your refund within 5-7 business days.</span>
              </li>
            </ol>

            {/* Refunds */}
            <h2 className="heading-md">Refund Details</h2>
            
            <h3>Refund Amount</h3>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Product Price:</strong> Full refund of product purchase price</li>
              <li><strong>Original Shipping:</strong> Non-refundable (unless item was defective)</li>
              <li><strong>Return Shipping:</strong> Customer responsibility (unless item was defective)</li>
              <li><strong>Restocking Fee:</strong> No restocking fee for returns in original condition</li>
            </ul>

            <h3>Refund Timeline</h3>
            <p className="text-gray-600">
              Refunds are processed within <strong>5-7 business days</strong> of receiving your returned item. The refund will be credited to your original payment method. Please allow an additional 3-5 business days for the refund to appear in your account.
            </p>

            {/* Damaged Items */}
            <h2 className="heading-md">Damaged or Defective Items</h2>
            
            <h3>Shipping Damage</h3>
            <p className="text-gray-600">
              If your display case arrives damaged, <strong>note the damage on the delivery receipt before signing</strong> and take photos of the damage. Contact us within <strong>24 hours</strong> of delivery. We'll arrange for a replacement or full refund at no additional cost to you.
            </p>

            <h3>Manufacturing Defects</h3>
            <p className="text-gray-600">
              If you discover a manufacturing defect (broken hinge, faulty lighting, etc.), contact us immediately. We'll ship replacement parts or arrange for a replacement unit under our warranty. Defective items do not incur return shipping charges.
            </p>

            {/* Non-Returnable Items */}
            <h2 className="heading-md">Non-Returnable Items</h2>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Custom Orders:</strong> Display cases with custom dimensions, colors, or configurations</li>
              <li><strong>Assembled Items:</strong> Display cases that have been assembled or installed</li>
              <li><strong>Used Items:</strong> Items showing signs of use, wear, or installation</li>
              <li><strong>Missing Parts:</strong> Items with missing hardware, shelves, or components</li>
              <li><strong>Clearance Items:</strong> Items purchased at clearance or closeout prices</li>
            </ul>

            {/* Exchanges */}
            <h2 className="heading-md">Exchanges</h2>
            <p className="text-gray-600">
              Need a different size or model? We can arrange an exchange for any of our standard display cases. Contact us to discuss exchange options. Price differences will be charged or refunded as applicable.
            </p>

            {/* Cancellations */}
            <h2 className="heading-md">Order Cancellations</h2>
            <p className="text-gray-600">
              Orders can be cancelled for a full refund if requested before the item ships. Once an order has been processed and shipped, it must be returned following our standard return process. Contact us as soon as possible if you need to cancel an order.
            </p>

            {/* Questions */}
            <div className="bg-gray-50 rounded-lg p-8 mt-12">
              <h3 className="heading-sm mb-4">Questions About Returns?</h3>
              <p className="text-gray-600 mb-6">
                Our customer service team is here to help with any return or refund questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/contact">Contact Us</Button>
                <Button href="mailto:info@masterdisplaycases.com" variant="outline">
                  Email Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
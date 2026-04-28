import { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Shipping Policy | Freight Delivery Information | Master Display Cases',
  description:
    'Complete shipping policy for Master Display Cases. Learn about freight shipping, delivery timelines, shipping costs, and what to expect when your display case arrives.',
};

export default function ShippingPolicyPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-gray-50 section-padding">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Policies
            </span>
            <h1 className="heading-lg mt-4 mb-6">Shipping Policy</h1>
            <p className="body-lg text-gray-600">
              We ship commercial display cases nationwide via freight delivery. 
              Here's everything you need to know about getting your order from our 
              facility to your business.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg max-w-none">
            {/* Shipping Methods */}
            <h2 className="heading-md">Freight Shipping</h2>
            <p className="text-gray-600">
              All display cases ship via LTL (Less Than Truckload) freight due to their size, weight, and value. Freight shipping provides secure, tracked delivery with appointment scheduling to ensure someone is available to receive your order.
            </p>

            <h3>Standard Freight Shipping</h3>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Delivery Time:</strong> 7-14 business days from ship date</li>
              <li><strong>Service:</strong> Curbside delivery to business address</li>
              <li><strong>Tracking:</strong> Full tracking and appointment scheduling included</li>
              <li><strong>Insurance:</strong> All shipments fully insured</li>
            </ul>

            <h3>Expedited Freight Shipping</h3>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Delivery Time:</strong> 3-5 business days from ship date</li>
              <li><strong>Availability:</strong> Contact us for pricing and availability</li>
              <li><strong>Service:</strong> Same delivery options as standard freight</li>
            </ul>

            {/* Shipping Costs */}
            <h2 className="heading-md">Shipping Costs</h2>
            <p className="text-gray-600">
              Shipping costs are calculated at checkout based on your location, the weight of your order, and current freight rates. Typical shipping costs for single display cases range from <strong>$149 to $399</strong>.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 my-8">
              <h4 className="font-semibold mb-3">Factors Affecting Shipping Cost:</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><strong>Distance:</strong> Shipping from Grand Rapids, Michigan to your location</li>
                <li><strong>Weight & Size:</strong> Larger/heavier cases cost more to ship</li>
                <li><strong>Additional Services:</strong> Liftgate or inside delivery add to cost</li>
                <li><strong>Freight Class:</strong> Display cases ship as Class 85 freight</li>
              </ul>
            </div>

            {/* Additional Services */}
            <h2 className="heading-md">Additional Delivery Services</h2>
            
            <h3>Liftgate Service</h3>
            <p className="text-gray-600">
              Liftgate service is required if your delivery location does not have a loading dock. The liftgate is a hydraulic platform on the freight truck that lowers your crate to ground level. Cost: <strong>$75-$125</strong> depending on weight.
            </p>

            <h3>Inside Delivery</h3>
            <p className="text-gray-600">
              Inside delivery means the freight carrier will bring your crate inside your building (ground floor only, no stairs or elevator). This service requires an appointment and may take longer than curbside delivery. Cost: <strong>$100-$200</strong> depending on location.
            </p>

            <h3>Residential Delivery</h3>
            <p className="text-gray-600">
              Residential delivery is available for home-based businesses. This requires a limited access appointment and may have additional fees. Contact us for residential delivery pricing.
            </p>

            {/* Delivery Process */}
            <h2 className="heading-md">What to Expect</h2>
            
            <h3>1. Order Processing</h3>
            <p className="text-gray-600">
              Once you place your order, we'll process it within 1-3 business days (for in-stock items). You'll receive an order confirmation email with your order details.
            </p>

            <h3>2. Shipping Notification</h3>
            <p className="text-gray-600">
              When your order ships, you'll receive a shipping confirmation email with tracking information and the freight carrier's contact details.
            </p>

            <h3>3. Delivery Appointment</h3>
            <p className="text-gray-600">
              The freight carrier will call you to schedule a delivery appointment. Someone must be present to sign for the delivery. Appointments are typically scheduled during business hours (8am-5pm, Monday-Friday).
            </p>

            <h3>4. Delivery Day</h3>
            <p className="text-gray-600">
              On delivery day, the freight truck will arrive at your business address. The driver will lower the crate using the liftgate (if selected) or unload from the truck bed. You or your representative must sign the delivery receipt.
            </p>

            {/* Important Notes */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 my-8">
              <h4 className="font-semibold text-yellow-800 mb-2">Important: Inspect Before Signing</h4>
              <p className="text-yellow-700 text-sm">
                Before signing the delivery receipt, inspect the crate for any visible damage. If you notice damage, note it on the delivery receipt and take photos. Contact us within 24 hours if damage is found. All shipments are fully insured.
              </p>
            </div>

            {/* Geographic Restrictions */}
            <h2 className="heading-md">Geographic Restrictions</h2>
            <p className="text-gray-600">
              We currently ship to addresses within the <strong>continental United States</strong> (48 states). Shipping to Hawaii, Alaska, Puerto Rico, and international destinations is available on a case-by-case basis — contact our sales team for a custom quote.
            </p>

            {/* Bulk Orders */}
            <h2 className="heading-md">Bulk Order Shipping</h2>
            <p className="text-gray-600">
              For orders of 3+ display cases, we coordinate shipments to ensure all items arrive together when possible. Bulk orders may ship on multiple trucks but we'll coordinate delivery timing. Freight costs for bulk orders are often lower per unit due to better freight class rates.
            </p>

            {/* Questions */}
            <div className="bg-gray-50 rounded-lg p-8 mt-12">
              <h3 className="heading-sm mb-4">Questions About Shipping?</h3>
              <p className="text-gray-600 mb-6">
                Our team is here to help. Contact us for shipping quotes, delivery questions, or to discuss your specific needs.
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
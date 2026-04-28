import { Metadata } from 'next';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Privacy Policy | Master Display Cases',
  description:
    'Privacy policy for Master Display Cases. Learn how we collect, use, and protect your personal information when you visit our website or make a purchase.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-gray-50 section-padding">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Policies
            </span>
            <h1 className="heading-lg mt-4 mb-6">Privacy Policy</h1>
            <p className="body-lg text-gray-600">
              We respect your privacy and are committed to protecting your 
              personal information. This policy explains how we collect, use, 
              and safeguard your data.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg max-w-none">
            {/* Information We Collect */}
            <h2 className="heading-md">Information We Collect</h2>
            
            <h3>Personal Information</h3>
            <p className="text-gray-600">
              When you make a purchase or contact us, we may collect personal information including:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Contact Information:</strong> Name, email address, phone number</li>
              <li><strong>Billing Information:</strong> Billing address, payment information (credit card numbers are processed securely and not stored)</li>
              <li><strong>Shipping Information:</strong> Delivery address, business name</li>
              <li><strong>Business Information:</strong> Company name, tax ID (for business accounts)</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <p className="text-gray-600">
              When you visit our website, we automatically collect certain information:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Device Information:</strong> Browser type, operating system, device type</li>
              <li><strong>Usage Data:</strong> Pages viewed, time spent on site, click patterns</li>
              <li><strong>Location Data:</strong> IP address, general geographic location</li>
              <li><strong>Referral Data:</strong> Website that referred you to our site</li>
            </ul>

            {/* How We Use Your Information */}
            <h2 className="heading-md">How We Use Your Information</h2>
            <p className="text-gray-600">
              We use your personal information for the following purposes:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Order Fulfillment:</strong> Processing orders, arranging shipping, providing order updates</li>
              <li><strong>Customer Service:</strong> Responding to inquiries, providing support, handling returns</li>
              <li><strong>Marketing:</strong> Sending promotional emails (with your consent), sharing product updates</li>
              <li><strong>Business Operations:</strong> Analyzing website usage, improving our products and services</li>
              <li><strong>Legal Compliance:</strong> Meeting legal obligations, preventing fraud</li>
            </ul>

            {/* Information Sharing */}
            <h2 className="heading-md">Information Sharing</h2>
            <p className="text-gray-600">
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Service Providers:</strong> Payment processors, shipping carriers, website hosting</li>
              <li><strong>Business Partners:</strong> With your consent, for joint marketing or product offerings</li>
              <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            </ul>

            {/* Cookies & Tracking */}
            <h2 className="heading-md">Cookies & Tracking Technologies</h2>
            <p className="text-gray-600">
              We use cookies and similar tracking technologies to enhance your experience:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Essential Cookies:</strong> Required for website functionality (shopping cart, secure login)</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements (with your consent)</li>
            </ul>
            <p className="text-gray-600">
              You can control cookies through your browser settings. Disabling cookies may affect some website functionality.
            </p>

            {/* Data Security */}
            <h2 className="heading-md">Data Security</h2>
            <p className="text-gray-600">
              We implement security measures to protect your personal information:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li><strong>SSL Encryption:</strong> All data transmitted on our website is encrypted</li>
              <li><strong>Secure Payment Processing:</strong> Payment information is processed through PCI-compliant systems</li>
              <li><strong>Access Controls:</strong> Employee access to personal data is restricted to those with a business need</li>
              <li><strong>Regular Security Reviews:</strong> We regularly review our security practices and update our systems</li>
            </ul>

            {/* Your Rights */}
            <h2 className="heading-md">Your Rights</h2>
            <p className="text-gray-600">
              You have certain rights regarding your personal information:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails at any time</li>
              <li><strong>Data Portability:</strong> Request transfer of your data to another service</li>
            </ul>
            <p className="text-gray-600">
              To exercise these rights, contact us at privacy@masterdisplaycases.com.
            </p>

            {/* Email Communications */}
            <h2 className="heading-md">Email Communications</h2>
            <p className="text-gray-600">
              We respect your inbox. You may receive emails from us for the following reasons:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Order Updates:</strong> Order confirmations, shipping notifications (cannot opt-out)</li>
              <li><strong>Customer Service:</strong> Responses to your inquiries and support requests</li>
              <li><strong>Marketing:</strong> Promotional offers, new product announcements (opt-in, can unsubscribe anytime)</li>
            </ul>
            <p className="text-gray-600">
              To unsubscribe from marketing emails, click the "unsubscribe" link at the bottom of any email or contact us directly.
            </p>

            {/* Data Retention */}
            <h2 className="heading-md">Data Retention</h2>
            <p className="text-gray-600">
              We retain your personal information for as long as necessary to:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>Fulfill the purposes for which it was collected</li>
              <li>Comply with legal obligations (tax records, warranty claims)</li>
              <li>Resolve disputes and enforce our agreements</li>
            </ul>
            <p className="text-gray-600">
              Order information is typically retained for 7 years for tax and warranty purposes. Marketing data is retained until you unsubscribe or request deletion.
            </p>

            {/* Third-Party Links */}
            <h2 className="heading-md">Third-Party Links</h2>
            <p className="text-gray-600">
              Our website may contain links to third-party websites (manufacturer sites, shipping carriers, etc.). We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing personal information.
            </p>

            {/* Children's Privacy */}
            <h2 className="heading-md">Children's Privacy</h2>
            <p className="text-gray-600">
              Our website is intended for business customers and is not directed at individuals under 18 years of age. We do not knowingly collect personal information from children.
            </p>

            {/* Changes to This Policy */}
            <h2 className="heading-md">Changes to This Policy</h2>
            <p className="text-gray-600">
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date. We encourage you to review this policy periodically. Continued use of our website after changes are posted constitutes acceptance of the updated policy.
            </p>

            {/* Contact */}
            <h2 className="heading-md">Contact Us</h2>
            <p className="text-gray-600">
              If you have questions about this Privacy Policy or our privacy practices, please contact us:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Email:</strong> privacy@masterdisplaycases.com</li>
              <li><strong>Mail:</strong> Grand Rapids, Michigan, United States</li>
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
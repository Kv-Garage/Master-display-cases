import { NextRequest, NextResponse } from 'next/server';
import { createDraftOrder } from '@/lib/shopify';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      company: formData.get('company') as string,
      orderSize: formData.get('orderSize') as string,
      interest: formData.get('interest') as string,
      productHandle: formData.get('productHandle') as string,
      timeline: formData.get('timeline') as string,
      message: formData.get('message') as string,
      newsletter: formData.get('newsletter') ? 'Yes' : 'No',
    };

    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email || !data.company) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create a draft order in Shopify for tracking
    const lineItems: any[] = [];
    
    // If a specific product was selected, we could add it to the draft order
    // For now, we'll just create a note with the inquiry details
    const note = `
Quote Request Details:
- Name: ${data.firstName} ${data.lastName}
- Company: ${data.company}
- Email: ${data.email}
- Phone: ${data.phone}
- Order Size: ${data.orderSize}
- Interest: ${data.interest}
- Product: ${data.productHandle || 'Not specified'}
- Timeline: ${data.timeline}
- Newsletter: ${data.newsletter}

Message: ${data.message}
    `.trim();

    // In a production environment, you would:
    // 1. Send an email notification
    // 2. Create a customer in Shopify
    // 3. Create a draft order for tracking
    // 4. Add to a CRM system

    console.log('Quote Request:', note);

    // Try to create a draft order in Shopify (optional)
    try {
      await createDraftOrder(lineItems, data.email);
    } catch (shopifyError) {
      console.error('Failed to create draft order:', shopifyError);
      // Don't fail the request if draft order creation fails
    }

    return NextResponse.json({
      success: true,
      message: 'Quote request submitted successfully. We will contact you within 24 hours.',
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
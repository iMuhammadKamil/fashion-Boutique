'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Code2,
  Globe,
  Smartphone,
  Cloud,
  ShieldCheck,
  HeadphonesIcon,
  ArrowRight,
  CheckCircle2,
  Star,
  Menu,
  X,
  ShoppingCart,
  CreditCard,
  Truck,
  Mail,
  Phone,
  MapPin,
  Building2,
  ChevronRight,
  Zap,
  Users,
  TrendingUp,
  Clock,
} from 'lucide-react';

/* ============================================================
   BUSINESS INFORMATION (Airwallex Requirement)
   ============================================================ */
const BUSINESS = {
  name: 'NexaSoft Solutions Limited',
  shortName: 'NexaSoft',
  registrationNumber: '80954108',
  address: 'Suite 1205, 12/F, Tower B, 88 Queensway, Admiralty, Hong Kong',
  email: 'info@nexasoft.io',
  phone: '+852 5800 1234',
  governingLaw: 'Hong Kong SAR',
  website: 'www.nexasoft.io',
};

/* ============================================================
   SERVICES DATA
   ============================================================ */
const SERVICES = [
  {
    icon: Code2,
    title: 'Custom Software Development',
    description:
      'Tailored software solutions built from the ground up to address your unique business challenges. From enterprise systems to specialized tools, we deliver robust, scalable applications designed for long-term performance and maintainability.',
    features: ['Requirements Analysis', 'Architecture Design', 'Agile Development', 'Quality Assurance'],
  },
  {
    icon: Globe,
    title: 'Web Application Development',
    description:
      'Modern, responsive web applications using cutting-edge frameworks and technologies. We build everything from content-managed websites to complex SaaS platforms that drive engagement and conversions.',
    features: ['React & Next.js', 'Full-Stack Solutions', 'E-Commerce Platforms', 'Progressive Web Apps'],
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description:
      'Native and cross-platform mobile applications for iOS and Android. Our team creates intuitive, high-performance apps that provide seamless user experiences across all devices and screen sizes.',
    features: ['iOS & Android', 'Cross-Platform (React Native)', 'App Store Optimization', 'Push Notifications'],
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions & DevOps',
    description:
      'Comprehensive cloud infrastructure design, migration, and management services. We help businesses leverage AWS, Google Cloud, and Azure to reduce costs, improve scalability, and enhance security.',
    features: ['Cloud Migration', 'CI/CD Pipelines', 'Infrastructure as Code', 'Monitoring & Logging'],
  },
  {
    icon: ShieldCheck,
    title: 'Cybersecurity Services',
    description:
      'Protect your digital assets with our end-to-end cybersecurity solutions. We conduct security audits, implement protective measures, and provide ongoing monitoring to safeguard your business against evolving threats.',
    features: ['Security Audits', 'Penetration Testing', 'Compliance (GDPR, SOC2)', 'Incident Response'],
  },
  {
    icon: HeadphonesIcon,
    title: 'IT Consulting & Support',
    description:
      'Strategic IT consulting to help you make informed technology decisions. Our experts provide ongoing technical support, system maintenance, and technology roadmaps aligned with your business objectives.',
    features: ['Technology Strategy', 'System Integration', '24/7 Support Plans', 'Performance Optimization'],
  },
];

/* ============================================================
   PRICING / PRODUCTS DATA
   ============================================================ */
const PRODUCTS = [
  {
    id: 'starter',
    name: 'Starter Package',
    price: 499,
    description: 'Perfect for small businesses needing a professional online presence with essential features.',
    features: [
      'Custom responsive website (up to 5 pages)',
      'Mobile-friendly design',
      'Basic SEO setup',
      'Contact form integration',
      'SSL certificate setup',
      '1 month of free support',
    ],
    popular: false,
  },
  {
    id: 'professional',
    name: 'Professional Package',
    price: 1499,
    description: 'Ideal for growing businesses that need advanced features and a scalable web application.',
    features: [
      'Custom web application (up to 15 pages)',
      'Admin dashboard & CMS',
      'Advanced SEO & analytics',
      'E-commerce functionality',
      'Third-party API integrations',
      'Performance optimization',
      '3 months of free support',
    ],
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise Package',
    price: 3999,
    description: 'Comprehensive solution for established businesses requiring enterprise-grade applications.',
    features: [
      'Full-stack custom application',
      'Cloud deployment & DevOps',
      'Multi-tenant architecture',
      'Advanced security features',
      'Custom API development',
      'Load testing & QA',
      '12 months of priority support',
      'Dedicated project manager',
    ],
    popular: false,
  },
];

/* ============================================================
   TESTIMONIALS DATA
   ============================================================ */
const TESTIMONIALS = [
  {
    name: 'James Richardson',
    role: 'CEO, Meridian Logistics',
    text: 'NexaSoft transformed our logistics operations with a custom tracking platform. The team understood our requirements perfectly and delivered a solution that reduced our processing time by 40%. Their ongoing support has been exceptional.',
    rating: 5,
  },
  {
    name: 'Sarah Chen',
    role: 'Founder, Bloom Retail',
    text: 'We needed an e-commerce platform that could handle high traffic during sales events. NexaSoft built us a scalable solution that has processed over 50,000 orders without a single downtime incident. Highly recommend their services.',
    rating: 5,
  },
  {
    name: 'David Okonkwo',
    role: 'CTO, FinEdge Africa',
    text: 'The cybersecurity audit and infrastructure overhaul NexaSoft provided gave us the confidence to scale our fintech platform across three new markets. Their expertise in compliance and secure architecture is outstanding.',
    rating: 5,
  },
  {
    name: 'Maria Vasquez',
    role: 'Operations Director, Verde Foods',
    text: 'From initial consultation to final deployment, the NexaSoft team was professional and responsive. Our inventory management system now runs seamlessly, and the mobile app they built for our field staff is a game-changer.',
    rating: 5,
  },
];

/* ============================================================
   POLICIES CONTENT (Airwallex Compliant)
   ============================================================ */
const PRIVACY_POLICY = `
**Last Updated: August 1, 2026**
**Effective Date: August 1, 2026**

NexaSoft Solutions Limited ("NexaSoft," "we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (www.nexasoft.io) or use our services. This policy is designed to comply with applicable data protection laws including the Hong Kong Personal Data (Privacy) Ordinance (PDPO), GDPR, and other relevant regulations.

## 1. Data Controller Information

**Company Name:** NexaSoft Solutions Limited
**Business Registration Number:** 80954108
**Registered Address:** Suite 1205, 12/F, Tower B, 88 Queensway, Admiralty, Hong Kong
**Email:** info@nexasoft.io
**Phone:** +852 5800 1234
**Governing Law:** Hong Kong SAR

## 2. Information We Collect

### 2.1 Personal Information
We may collect the following personal information when you interact with our services:
- Full name, email address, phone number
- Company name, business registration details
- Billing address and shipping address
- Payment information (processed securely via third-party payment providers)
- Project requirements and specifications

### 2.2 Technical Information
Automatically collected through cookies and similar technologies:
- IP address, browser type, and operating system
- Device identifiers and screen resolution
- Pages visited, time spent on pages, and referring URLs
- Search queries and navigation patterns

### 2.3 Communication Data
- Records of correspondence via email, phone, or contact forms
- Support tickets and feedback submissions
- Marketing preferences and consent records

## 3. Legal Basis for Processing

We process your personal data based on the following legal grounds:
- **Contract Performance:** To fulfill our obligations under service agreements
- **Legitimate Interest:** To improve our services, prevent fraud, and ensure security
- **Consent:** For marketing communications and optional cookies
- **Legal Obligation:** To comply with applicable laws and regulations

## 4. How We Use Your Information

We use the information we collect to:
- Process and fulfill your orders for software development services
- Provide customer support and respond to your inquiries
- Send order confirmations, invoices, and service updates
- Improve our website, services, and user experience
- Send promotional communications (only with your consent)
- Comply with legal obligations and enforce our agreements
- Detect, prevent, and address fraud and security issues
- Process payments securely through our payment service providers

## 5. Information Sharing and Disclosure

We do not sell, trade, or rent your personal information to third parties. We may share your information with:

- **Payment Service Providers:** Airwallex and other secure payment processors for transaction processing
- **Service Providers:** Trusted third parties who assist us in operating our website, processing payments, or delivering services, subject to confidentiality agreements
- **Legal Requirements:** When required by law, regulation, legal process, or governmental request
- **Business Transfers:** In connection with any merger, acquisition, or sale of company assets

## 6. Data Security

We implement industry-standard security measures including:
- SSL/TLS encryption for all data in transit
- AES-256 encryption for sensitive data at rest
- Secure server infrastructure with regular security audits
- Access controls and authentication mechanisms
- Regular penetration testing and vulnerability assessments

However, no method of internet transmission or electronic storage is 100% secure. We cannot guarantee absolute security but will promptly notify you in the event of a data breach.

## 7. Cookies and Tracking Technologies

Our website uses the following types of cookies:

- **Essential Cookies:** Required for basic website functionality
- **Analytics Cookies:** To understand how visitors interact with our website
- **Marketing Cookies:** To deliver relevant advertisements (only with consent)

You can control cookie settings through your browser. Disabling cookies may affect some website functionality.

## 8. Data Retention

We retain your personal information for as long as necessary to fulfill the purposes described in this policy:
- **Account Information:** Duration of the business relationship plus 7 years
- **Financial Records:** 7 years as required by Hong Kong tax regulations
- **Marketing Data:** Until consent is withdrawn
- **Technical Logs:** 12 months for security purposes

When data is no longer needed, it is securely deleted or anonymized.

## 9. Your Rights

Depending on your location, you may have the right to:
- **Access:** Request a copy of the personal data we hold about you
- **Rectification:** Request correction of inaccurate or incomplete data
- **Erasure:** Request deletion of your personal data (subject to legal obligations)
- **Restriction:** Request limitation of processing in certain circumstances
- **Portability:** Receive your data in a structured, machine-readable format
- **Objection:** Object to processing based on legitimate interests
- **Withdraw Consent:** Withdraw consent for processing at any time

To exercise these rights, please contact us at ${BUSINESS.email}. We will respond to your request within 30 days.

## 10. International Data Transfers

Your information may be transferred to and processed in countries outside Hong Kong. We ensure appropriate safeguards are in place, including standard contractual clauses approved by relevant authorities.

## 11. Third-Party Links

Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those external sites. We encourage you to review their privacy policies before providing any personal information.

## 12. Children's Privacy

Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected personal data from a child, we will take steps to delete it promptly.

## 13. Changes to This Policy

We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date and, where appropriate, notified to you by email. Your continued use of the website after any changes constitutes acceptance of the updated policy.

## 14. Contact Us

If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:

**NexaSoft Solutions Limited**
Business Registration No.: ${BUSINESS.registrationNumber}
${BUSINESS.address}
Email: ${BUSINESS.email}
Phone: ${BUSINESS.phone}

For data protection inquiries, please email: privacy@nexasoft.io
`;

const REFUND_POLICY = `
**Last Updated: August 1, 2026**
**Effective Date: August 1, 2026**

At NexaSoft Solutions Limited ("NexaSoft," "we," "us," or "our"), we strive to deliver exceptional software development services. This Refund Policy outlines the conditions under which refunds may be issued for our products and services. This policy complies with applicable consumer protection laws and Airwallex payment method requirements.

## 1. Company Information

**Company Name:** NexaSoft Solutions Limited
**Business Registration Number:** 80954108
**Registered Address:** Suite 1205, 12/F, Tower B, 88 Queensway, Admiralty, Hong Kong
**Email:** info@nexasoft.io
**Phone:** +852 5800 1234
**Governing Law:** Hong Kong SAR

## 2. Service Deposits and Milestone Payments

For custom software development projects:

- **Project Deposits:** Deposits paid to initiate a project are non-refundable once work has commenced. Before work begins, you may request a full refund of any deposit within 48 hours of payment.

- **Milestone Payments:** Milestone payments are released upon client approval of completed deliverables. Once a milestone has been approved and payment processed, refunds for that milestone are not available.

- **Project Cancellation:** If you choose to cancel a project after work has begun, you will be billed for all completed work up to the date of cancellation. Any remaining balance will be refunded within 30 business days via the original payment method.

- **Scope Changes:** If project scope changes result in additional costs, these will be communicated in writing before proceeding. Refunds for scope changes follow the same milestone-based policy.

## 3. Pre-Built Software Products

For pre-built software packages and licenses:

- **30-Day Money-Back Guarantee:** If you are not satisfied with a pre-built software product, you may request a full refund within 30 calendar days of purchase, provided the software has not been extensively customized or deployed in a production environment.

- **Refund Process:** To initiate a refund, contact our support team at ${BUSINESS.email} with your order number and reason for the refund request. Refunds are processed within 14 business days after approval.

- **License Revocation:** Upon refund approval, any software licenses issued will be revoked and you must cease all use of the refunded product.

## 4. Subscription Services

For ongoing subscription and support plans:

- **Monthly Subscriptions:** You may cancel your subscription at any time. Upon cancellation, you will retain access to the service until the end of the current billing period. No partial-month refunds are provided.

- **Annual Subscriptions:** If you cancel an annual subscription within the first 30 days, you will receive a prorated refund for the unused months. After 30 days, cancellations take effect at the end of the current subscription period.

- **Free Trial Periods:** If a free trial is offered, you may cancel at any time during the trial period without incurring charges. After the trial period ends, standard subscription terms apply.

## 5. Non-Refundable Items

The following are not eligible for refunds:

- Domain registration fees once registered
- Third-party service licenses purchased on your behalf
- Custom branding or design work that has been delivered
- Training sessions that have been attended
- Work completed and approved under milestone-based agreements
- Administrative or setup fees

## 6. How to Request a Refund

To request a refund, please:

1. Email us at ${BUSINESS.email} with the subject line "Refund Request – [Your Order Number]"
2. Include your full name, company name, and contact information
3. Provide the order number and date of purchase
4. Describe the reason for your refund request
5. Attach any relevant documentation or evidence

Our team will review your request and respond within 5 business days. Refunds will be processed using the original payment method within 14 business days of approval.

## 7. Shipping and Delivery (For Physical Products)

While our primary services are digital, if any physical products or materials are shipped:

- **Delivery Times:** Delivery times are estimates and may vary based on location and customs processing. Standard delivery is typically 5-10 business days for domestic shipments and 10-20 business days for international shipments.

- **Shipping Costs:** Shipping costs are non-refundable unless the product is defective or incorrect. Return shipping for defective products will be covered by NexaSoft.

- **Customs and Duties:** International shipments may be subject to customs duties and taxes, which are the responsibility of the recipient.

- **Risk of Loss:** Risk of loss and title for physical products pass to you upon delivery to the carrier. We recommend purchasing shipping insurance for high-value items.

- **Damaged or Defective Products:** If you receive a damaged or defective product, contact us within 7 days of receipt with photographic evidence. We will arrange for replacement or refund at our discretion.

- **Returns:** Physical products may be returned within 14 days of receipt in original condition. Return shipping costs are the responsibility of the customer unless the product is defective.

## 8. Dispute Resolution

If you are unsatisfied with our refund decision, you may:

1. Request a review by our management team
2. Contact us to discuss alternative solutions
3. Pursue resolution through the Hong Kong Consumer Council
4. File a complaint with relevant regulatory authorities

## 9. Changes to This Policy

We reserve the right to modify this Refund Policy at any time. Changes will be effective upon posting to our website. Your continued use of our services after changes are posted constitutes acceptance of the updated policy.

## 10. Contact Us

For any questions about this Refund Policy, please contact:

**NexaSoft Solutions Limited**
Business Registration No.: ${BUSINESS.registrationNumber}
${BUSINESS.address}
Email: ${BUSINESS.email}
Phone: ${BUSINESS.phone}
`;

const TERMS_CONDITIONS = `
**Last Updated: August 1, 2026**
**Effective Date: August 1, 2026**

These Terms and Conditions ("Terms") govern your access to and use of the website (www.nexasoft.io) and services provided by NexaSoft Solutions Limited ("NexaSoft," "we," "us," or "our"). By accessing or using our website and services, you agree to be bound by these Terms. These Terms comply with applicable laws of Hong Kong SAR and Airwallex payment method requirements.

## 1. Company Information

**Company Name:** NexaSoft Solutions Limited
**Business Registration Number:** 80954108
**Registered Address:** Suite 1205, 12/F, Tower B, 88 Queensway, Admiralty, Hong Kong
**Email:** info@nexasoft.io
**Phone:** +852 5800 1234
**Website:** www.nexasoft.io
**Governing Law:** Hong Kong SAR

## 2. Definitions

- **"Services"** means custom software development, web development, mobile app development, cloud solutions, cybersecurity services, IT consulting, and any other services provided by NexaSoft.
- **"Client"** or **"you"** means the individual or entity accessing or using our services.
- **"Website"** means www.nexasoft.io and all associated pages.
- **"Deliverables"** means the work products, code, documentation, and materials provided to the client as part of the services.
- **"Intellectual Property"** means patents, copyrights, trademarks, trade secrets, and other proprietary rights.

## 3. Services Agreement

By purchasing our services, you agree to:
- Provide accurate and complete information necessary for service delivery
- Cooperate with our team during the development process
- Review and provide timely feedback on deliverables
- Comply with all applicable laws and regulations
- Maintain the confidentiality of any access credentials provided

## 4. Project Engagement

- **Proposals and Quotes:** All project proposals and quotes are valid for 30 days from the date of issue unless otherwise stated.
- **Scope Changes:** Any changes to the agreed project scope may result in adjustments to the timeline and cost. Change requests must be submitted in writing and approved by both parties.
- **Timeline:** Project timelines are estimates based on the scope agreed upon at the start of the engagement. NexaSoft will make reasonable efforts to meet agreed deadlines but is not liable for delays caused by factors beyond our control.
- **Client Responsibilities:** The client is responsible for providing timely access to necessary systems, data, and personnel. Delays caused by the client may extend project timelines proportionally.

## 5. Intellectual Property

- **Client IP:** All intellectual property developed specifically for the client during a project engagement shall be transferred to the client upon full payment.
- **NexaSoft IP:** Pre-existing tools, frameworks, libraries, and methodologies used in delivering services remain the intellectual property of NexaSoft. Clients receive a perpetual, non-exclusive license to use these components.
- **Third-Party Components:** Third-party open-source or licensed components are subject to their respective license terms.
- **Portfolio Rights:** NexaSoft may include the client's name and logo in its portfolio and marketing materials unless the client objects in writing.

## 6. Payment Terms

- Invoices are issued according to the payment schedule agreed upon in the project proposal.
- Payment is due within 14 days of invoice date unless otherwise specified.
- Late payments may incur interest at a rate of 1.5% per month on the outstanding balance.
- NexaSoft reserves the right to suspend work on any project with overdue payments.
- All prices are quoted in USD unless otherwise specified.
- Currency conversion fees and bank transfer charges are the responsibility of the client.

## 7. Confidentiality

Both parties agree to keep confidential any proprietary or sensitive information shared during the course of the engagement. This obligation survives the termination of these Terms for a period of 3 years. Confidential information includes but is not limited to:
- Business strategies and financial information
- Technical specifications and source code
- Customer data and lists
- Trade secrets and proprietary processes

## 8. Data Protection

- Both parties must comply with applicable data protection laws, including the Hong Kong Personal Data (Privacy) Ordinance.
- NexaSoft will process personal data only as necessary to provide the services and in accordance with client instructions.
- The client warrants that it has obtained all necessary consents for the processing of personal data.
- Data processing addendums may be executed for projects involving personal data processing.

## 9. Warranties and Disclaimers

- **Service Warranty:** NexaSoft warrants that services will be performed in a professional and workmanlike manner. For custom development, we provide a 90-day warranty period from project delivery to address any bugs or defects at no additional cost.
- **Warranty Exclusions:** The warranty does not cover issues caused by modifications made by the client, third-party software, or changes in third-party platform requirements.
- **AS-IS:** Except as expressly stated, our website and services are provided "as is" without warranties of any kind, either express or implied.

## 10. Limitation of Liability

To the maximum extent permitted by law:
- NexaSoft's total liability for any claims arising from or related to these Terms or our services shall not exceed the total amount paid by the client for the specific service giving rise to the claim.
- NexaSoft shall not be liable for indirect, incidental, special, consequential, or punitive damages.
- NexaSoft shall not be liable for loss of profits, data, business opportunities, or goodwill.

## 11. Indemnification

The client agrees to indemnify and hold harmless NexaSoft from any claims, losses, or damages arising from:
- The client's use of the services in violation of these Terms
- The client's violation of applicable laws or regulations
- Any content or data provided by the client to NexaSoft
- Infringement of third-party intellectual property rights by the client

## 12. Termination

- Either party may terminate a service engagement with 30 days' written notice.
- NexaSoft may terminate immediately if the client breaches any material term of these Terms.
- Upon termination, the client is responsible for payment of all work completed up to the termination date.
- NexaSoft will provide all completed deliverables and source code upon receipt of outstanding payments.
- Confidentiality obligations survive termination.

## 13. Force Majeure

Neither party shall be liable for delays or failures in performance resulting from causes beyond reasonable control, including natural disasters, pandemics, government actions, or other force majeure events.

## 14. Governing Law and Dispute Resolution

These Terms are governed by and construed in accordance with the laws of ${BUSINESS.governingLaw}. Any disputes arising from these Terms shall be resolved through good-faith negotiation. If negotiation fails within 30 days, disputes shall be submitted to the exclusive jurisdiction of the courts of ${BUSINESS.governingLaw}.

## 15. Severability

If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect.

## 16. Entire Agreement

These Terms, together with any applicable project proposals, statements of work, and data processing agreements, constitute the entire agreement between the parties and supersede all prior communications, representations, or agreements.

## 17. Modifications

NexaSoft reserves the right to modify these Terms at any time. Changes will be effective upon posting to our website. Continued use of our services after modifications constitutes acceptance of the revised Terms. Material changes will be notified via email to existing clients.

## 18. Contact Information

For questions about these Terms and Conditions, please contact:

**NexaSoft Solutions Limited**
Business Registration No.: ${BUSINESS.registrationNumber}
${BUSINESS.address}
Email: ${BUSINESS.email}
Phone: ${BUSINESS.phone}
`;

const SHIPPING_POLICY = `
**Last Updated: August 1, 2026**
**Effective Date: August 1, 2026**

This Shipping Policy outlines the terms and conditions for delivery of physical products, materials, and documentation provided by NexaSoft Solutions Limited ("NexaSoft," "we," "us," or "our"). This policy complies with Airwallex payment method requirements and applicable consumer protection laws.

## 1. Company Information

**Company Name:** NexaSoft Solutions Limited
**Business Registration Number:** 80954108
**Registered Address:** Suite 1205, 12/F, Tower B, 88 Queensway, Admiralty, Hong Kong
**Email:** info@nexasoft.io
**Phone:** +852 5800 1234
**Governing Law:** Hong Kong SAR

## 2. Products and Services Covered

This Shipping Policy applies to:
- Physical hardware devices (servers, networking equipment, security tokens)
- Documentation and training materials in physical format
- Promotional materials and branded merchandise
- Replacement parts and components

Note: Our primary services are digital software development and consulting. Physical shipping is limited to specific project requirements and hardware deliveries.

## 3. Shipping Methods and Timeframes

### 3.1 Domestic Shipping (Hong Kong SAR)

- **Standard Delivery:** 3-5 business days
- **Express Delivery:** 1-2 business days
- **Same-Day Delivery:** Available for orders placed before 12:00 PM HKT (subject to availability)
- **Weekend/Holiday Delivery:** Not available for standard shipping

### 3.2 International Shipping

- **Asia-Pacific Region:** 5-10 business days
- **Europe & North America:** 10-15 business days
- **Rest of World:** 15-20 business days
- **Remote Areas:** Additional 3-5 business days may apply

Note: Delivery times are estimates and may vary based on customs processing, local postal services, and other factors beyond our control.

## 4. Shipping Costs

### 4.1 Cost Calculation

Shipping costs are calculated based on:
- Package weight and dimensions
- Destination country and region
- Shipping method selected
- Any special handling requirements

### 4.2 Free Shipping

Free standard shipping is available for:
- Orders exceeding $500 USD (within Asia-Pacific region)
- Replacement items under warranty
- Promotional offers as specified

### 4.3 Customs and Duties

- International shipments may be subject to customs duties and taxes
- Customs fees are the responsibility of the recipient
- NexaSoft is not responsible for delays caused by customs processing
- We recommend checking with local customs authorities for applicable fees

## 5. Order Processing

### 5.1 Processing Time

- Orders are typically processed within 1-2 business days
- Custom-configured items may require additional processing time
- Orders placed on weekends or holidays will be processed the next business day

### 5.2 Order Confirmation

You will receive:
- Order confirmation email upon purchase
- Shipping confirmation with tracking number when dispatched
- Delivery confirmation upon successful delivery

## 6. Tracking and Delivery

### 6.1 Tracking Information

- Tracking numbers are provided via email upon shipment
- Track your order through our website or the carrier's website
- Tracking updates may take 24-48 hours to appear

### 6.2 Delivery Requirements

- Signature may be required for high-value items
- Valid photo ID may be required for international shipments
- Someone must be available to receive the package at the delivery address

### 6.3 Failed Delivery Attempts

- Carriers may make up to 3 delivery attempts
- Packages may be held at a local pickup point after failed attempts
- Additional delivery charges may apply for re-delivery

## 7. International Shipping

### 7.1 Restricted Countries

We currently ship to most countries worldwide. However, some restrictions may apply due to:
- Trade sanctions and embargoes
- Export control regulations
- Local import restrictions

### 7.2 Documentation

International shipments may require:
- Commercial invoice
- Packing list
- Export declarations
- Certificates of origin

### 7.3 Compliance

- All shipments comply with Hong Kong export regulations
- Recipients are responsible for compliance with local import laws
- Prohibited items will not be shipped

## 8. Damaged or Lost Shipments

### 8.1 Damaged Items

If your shipment arrives damaged:
1. Document the damage with photographs immediately upon receipt
2. Note any visible damage when signing for delivery
3. Contact us within 7 days of receipt at ${BUSINESS.email}
4. Retain all packaging materials for inspection

### 8.2 Lost Shipments

If your shipment is lost:
1. Contact us if tracking shows no movement for 7 business days
2. We will initiate an investigation with the carrier
3. Replacement or refund will be provided within 14 business days of confirmed loss

### 8.3 Insurance

- Shipments valued over $1,000 USD are automatically insured
- Additional insurance is available upon request at checkout
- Insurance claims must be filed within 30 days of delivery or expected delivery

## 9. Returns and Exchanges

### 9.1 Return Eligibility

Physical products may be returned within 14 days of receipt if:
- Items are in original, unused condition
- Packaging is intact and undamaged
- All accessories and documentation are included

### 9.2 Return Shipping

- Return shipping costs are the responsibility of the customer
- NexaSoft will cover return shipping for defective or incorrect items
- Returns must be shipped with tracking and insurance

### 9.3 Exchanges

- Exchanges are available for different sizes, colors, or configurations
- Price differences will be charged or refunded accordingly
- Exchange items are subject to availability

## 10. Special Shipping Requirements

### 10.1 Temperature-Sensitive Items

Some electronic components may require temperature-controlled shipping:
- Additional charges may apply
- Transit times may be extended
- Special handling instructions will be provided

### 10.2 Hazardous Materials

We do not ship hazardous materials or items requiring special permits unless:
- Specifically authorized by the client
- All necessary permits are obtained
- Proper packaging and labeling are used

## 11. Cancellation of Shipments

- Orders may be cancelled before shipment at no charge
- Once shipped, orders must be received and returned per our return policy
- Cancellation requests should be sent to ${BUSINESS.email}

## 12. Contact Information

For shipping inquiries, please contact:

**NexaSoft Solutions Limited**
Business Registration No.: ${BUSINESS.registrationNumber}
${BUSINESS.address}
Email: ${BUSINESS.email}
Phone: ${BUSINESS.phone}

For urgent shipping matters, please call our support line or email shipping@nexasoft.io.
`;

/* ============================================================
   NAVIGATION ITEMS
   ============================================================ */
const NAV_ITEMS = [
  { label: 'Home', href: 'home' },
  { label: 'Services', href: 'services' },
  { label: 'Pricing', href: 'pricing' },
  { label: 'About', href: 'about' },
  { label: 'Contact', href: 'contact' },
];

/* ============================================================
   HELPER: Render Markdown-like Policy Text
   ============================================================ */
function PolicyContent({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      if (inList) {
        elements.push(<ul key={`ul-end-${i}`} />);
        inList = false;
      }
      continue;
    }

    if (trimmed.startsWith('## ')) {
      if (inList) {
        elements.push(<ul key={`ul-sec-${i}`} />);
        inList = false;
      }
      elements.push(
        <h2 key={`h2-${i}`} className="text-lg font-semibold mt-8 mb-3 text-foreground">
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
      if (inList) {
        elements.push(<ul key={`ul-bold-${i}`} />);
        inList = false;
      }
      elements.push(
        <p key={`bold-${i}`} className="font-semibold mt-4 mb-2 text-foreground">
          {trimmed.slice(2, -2)}
        </p>
      );
    } else if (trimmed.startsWith('- ')) {
      if (!inList) {
        elements.push(<ul key={`ul-start-${i}`} className="list-disc list-inside space-y-1 ml-4 mb-3 text-muted-foreground" />);
        inList = true;
      }
      elements.push(
        <li key={`li-${i}`} className="text-muted-foreground leading-relaxed">
          {renderInlineBold(trimmed.slice(2))}
        </li>
      );
    } else if (trimmed.startsWith('# ')) {
      elements.push(
        <h1 key={`h1-${i}`} className="text-2xl font-bold mt-6 mb-4 text-foreground">
          {trimmed.slice(2)}
        </h1>
      );
    } else {
      if (inList) {
        elements.push(<ul key={`ul-p-${i}`} />);
        inList = false;
      }
      elements.push(
        <p key={`p-${i}`} className="text-muted-foreground leading-relaxed mb-2">
          {renderInlineBold(trimmed)}
        </p>
      );
    }
  }

  if (inList) elements.push(<ul key="ul-final" />);
  return <div className="space-y-1">{elements}</div>;
}

function renderInlineBold(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <span key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </span>
      );
    }
    return part;
  });
}

/* ============================================================
   STAR RATING COMPONENT
   ============================================================ */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}`}
        />
      ))}
    </div>
  );
}

/* ============================================================
   SECTION HEADER COMPONENT
   ============================================================ */
function SectionHeader({
  badge,
  title,
  subtitle,
}: {
  badge: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
      <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-xs font-medium tracking-wider uppercase">
        {badge}
      </Badge>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{title}</h2>
      <p className="text-muted-foreground text-base md:text-lg leading-relaxed">{subtitle}</p>
    </div>
  );
}

/* ============================================================
   MAIN PAGE COMPONENT
   ============================================================ */
export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [policyModal, setPolicyModal] = useState<string | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<(typeof PRODUCTS)[0] | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    city: '',
    country: '',
    notes: '',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const servicesRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const map: Record<string, React.RefObject<HTMLDivElement | null>> = {
      home: { current: null },
      services: servicesRef,
      pricing: pricingRef,
      about: aboutRef,
      contact: contactRef,
    };
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      map[id]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBuyNow = (product: (typeof PRODUCTS)[0]) => {
    setSelectedProduct(product);
    setCheckoutStep(1);
    setOrderPlaced(false);
    setFormData({ fullName: '', email: '', phone: '', company: '', address: '', city: '', country: '', notes: '' });
    setCheckoutOpen(true);
  };

  const handlePlaceOrder = () => {
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast({ title: 'Missing Information', description: 'Please fill in all required fields.', variant: 'destructive' });
      return;
    }
    setOrderPlaced(true);
    setCartCount(0);
    toast({ title: 'Order Placed Successfully', description: `Your ${selectedProduct?.name} order has been received. We will contact you within 24 hours.` });
  };

  /* ---- Policy content map ---- */
  const policyMap: Record<string, { title: string; content: string }> = {
    privacy: { title: 'Privacy Policy', content: PRIVACY_POLICY },
    refund: { title: 'Refund Policy', content: REFUND_POLICY },
    terms: { title: 'Terms & Conditions', content: TERMS_CONDITIONS },
    shipping: { title: 'Shipping Policy', content: SHIPPING_POLICY },
  };

  const PolicyDialog = isMobile
    ? ({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) => (
        <Sheet open={open} onOpenChange={onOpenChange}>
          <SheetContent side="bottom" className="h-[90vh] rounded-t-2xl">
            <SheetHeader className="mb-4">
              <SheetTitle>{policyModal ? policyMap[policyModal]?.title : ''}</SheetTitle>
              <SheetDescription>Review our policies below.</SheetDescription>
            </SheetHeader>
            <div className="overflow-y-auto flex-1 pr-2 -mr-2">
              {policyModal && <PolicyContent content={policyMap[policyModal]?.content || ''} />}
            </div>
          </SheetContent>
        </Sheet>
      )
    : ({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) => (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle>{policyModal ? policyMap[policyModal]?.title : ''}</DialogTitle>
              <DialogDescription>Review our policies below.</DialogDescription>
            </DialogHeader>
            <div className="overflow-y-auto flex-1 pr-2 -mr-2 mt-4">
              {policyModal && <PolicyContent content={policyMap[policyModal]?.content || ''} />}
            </div>
          </DialogContent>
        </Dialog>
      );

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* ==================== HEADER ==================== */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button onClick={() => scrollTo('home')} className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <Code2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold tracking-tight">NexaSoft</span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === item.href ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* CTA + Cart + Mobile Menu */}
            <div className="flex items-center gap-2">
              <Button
                onClick={() => scrollTo('pricing')}
                className="hidden sm:inline-flex"
                size="sm"
              >
                Get Started
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => scrollTo('pricing')}
                aria-label="Shopping cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Nav */}
          {mobileMenuOpen && (
            <nav className="md:hidden border-t border-border py-3 space-y-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className={`block w-full text-left px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    activeSection === item.href ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <Button className="w-full mt-2" size="sm" onClick={() => { scrollTo('pricing'); setMobileMenuOpen(false); }}>
                Get Started
              </Button>
            </nav>
          )}
        </div>
      </header>

      {/* ==================== MAIN CONTENT ==================== */}
      <main className="flex-1">
        {/* ---- HERO SECTION ---- */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-xs font-medium tracking-wider uppercase">
                Trusted by 200+ Businesses Worldwide
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
                We Build Software{' '}
                <span className="text-primary">That Drives</span> Your Business Forward
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl">
                From custom web applications to enterprise-grade cloud solutions, NexaSoft delivers reliable, scalable software tailored to your business needs. Our team of experienced developers turns your vision into reality.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={() => scrollTo('pricing')} className="text-base">
                  View Our Packages
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollTo('services')} className="text-base">
                  Explore Services
                </Button>
              </div>
              <div className="flex items-center gap-8 mt-12 pt-8 border-t border-border/50">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>90-Day Warranty</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Free Consultation</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Agile Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---- STATS BAR ---- */}
        <section className="border-y border-border bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { icon: Users, value: '200+', label: 'Clients Served' },
                { icon: Code2, value: '350+', label: 'Projects Delivered' },
                { icon: TrendingUp, value: '98%', label: 'Client Satisfaction' },
                { icon: Clock, value: '8+', label: 'Years of Experience' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                  <div className="text-2xl md:text-3xl font-bold tracking-tight">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- SERVICES SECTION ---- */}
        <section ref={servicesRef} id="services" className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              badge="Our Services"
              title="Comprehensive Software Solutions"
              subtitle="We offer a full spectrum of software development and IT services to help businesses innovate, scale, and succeed in the digital landscape."
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((service) => (
                <Card key={service.title} className="group hover:shadow-md transition-shadow border-border/60">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg leading-tight">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ---- PRICING SECTION ---- */}
        <section ref={pricingRef} id="pricing" className="py-20 md:py-28 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              badge="Pricing"
              title="Transparent, Fixed-Price Packages"
              subtitle="Choose a package that fits your needs. Every package includes a free initial consultation, detailed project proposal, and our 90-day warranty on all deliverables."
            />
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {PRODUCTS.map((product) => (
                <Card
                  key={product.id}
                  className={`relative flex flex-col ${product.popular ? 'border-primary shadow-lg scale-[1.02]' : 'border-border/60'}`}
                >
                  {product.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="pb-2 pt-6">
                    <CardTitle className="text-xl">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="mb-4">
                      <span className="text-4xl font-bold">${product.price}</span>
                      <span className="text-muted-foreground text-sm ml-1">one-time</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">{product.description}</p>
                    <Separator className="mb-6" />
                    <ul className="space-y-3">
                      {product.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-4">
                    <Button
                      className={`w-full ${product.popular ? '' : 'variant-outline'}`}
                      variant={product.popular ? 'default' : 'outline'}
                      onClick={() => handleBuyNow(product)}
                    >
                      Buy Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ---- ABOUT SECTION ---- */}
        <section ref={aboutRef} id="about" className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              badge="About Us"
              title="Built on Trust, Driven by Innovation"
              subtitle="NexaSoft Solutions Limited is a Hong Kong-registered software development company delivering world-class IT solutions to businesses across the globe."
            />
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Founded with a mission to democratize access to high-quality software development, NexaSoft Solutions Limited has grown from a small team of passionate developers into a trusted technology partner for over 200 businesses worldwide. Our Hong Kong headquarters serves as the hub for our global operations, enabling us to serve clients across Asia, Europe, North America, and beyond.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We specialize in custom software development, web and mobile application development, cloud infrastructure, and cybersecurity services. Every project we undertake is guided by our core principles: transparent communication, agile delivery, and an unwavering commitment to quality. We believe that great software is built through deep collaboration with our clients, understanding their business inside out before writing a single line of code.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our team comprises senior engineers, architects, and designers with decades of combined experience across industries including fintech, e-commerce, logistics, healthcare, and education. Whether you are a startup building your first MVP or an enterprise modernizing legacy systems, NexaSoft has the expertise and the dedication to deliver results that exceed expectations.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Badge variant="secondary" className="px-3 py-1.5">Agile Methodology</Badge>
                  <Badge variant="secondary" className="px-3 py-1.5">ISO 27001 Compliant</Badge>
                  <Badge variant="secondary" className="px-3 py-1.5">SOC2 Ready</Badge>
                  <Badge variant="secondary" className="px-3 py-1.5">GDPR Compliant</Badge>
                </div>
              </div>
              <Card className="border-border/60">
                <CardContent className="p-6 space-y-5">
                  <div className="flex items-start gap-3">
                    <Building2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-sm">Company Name</div>
                      <div className="text-sm text-muted-foreground">{BUSINESS.name}</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-sm">Business Registration No.</div>
                      <div className="text-sm text-muted-foreground">{BUSINESS.registrationNumber}</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-sm">Registered Address</div>
                      <div className="text-sm text-muted-foreground">{BUSINESS.address}</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-sm">Email</div>
                      <div className="text-sm text-muted-foreground">{BUSINESS.email}</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-sm">Phone</div>
                      <div className="text-sm text-muted-foreground">{BUSINESS.phone}</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-sm">Website</div>
                      <div className="text-sm text-muted-foreground">{BUSINESS.website}</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-sm">Governing Law</div>
                      <div className="text-sm text-muted-foreground">{BUSINESS.governingLaw}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ---- TESTIMONIALS ---- */}
        <section className="py-20 md:py-28 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              badge="Testimonials"
              title="What Our Clients Say"
              subtitle="Do not just take our word for it. Here is what business leaders around the world have to say about working with NexaSoft."
            />
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {TESTIMONIALS.map((t) => (
                <Card key={t.name} className="border-border/60">
                  <CardContent className="p-6">
                    <StarRating rating={t.rating} />
                    <p className="text-sm text-muted-foreground leading-relaxed mt-4 mb-5">&ldquo;{t.text}&rdquo;</p>
                    <div>
                      <div className="font-semibold text-sm">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ---- CONTACT SECTION ---- */}
        <section ref={contactRef} id="contact" className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              badge="Contact Us"
              title="Ready to Start Your Project?"
              subtitle="Get in touch with our team for a free consultation. We will discuss your requirements and provide a detailed project proposal within 48 hours."
            />
            <div className="max-w-2xl mx-auto">
              <Card className="border-border/60">
                <CardContent className="p-6 md:p-8">
                  <div className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="contact-name" className="text-sm font-medium">Full Name *</label>
                        <Input id="contact-name" placeholder="John Smith" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="contact-email" className="text-sm font-medium">Email Address *</label>
                        <Input id="contact-email" type="email" placeholder="john@company.com" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="contact-phone" className="text-sm font-medium">Phone Number</label>
                        <Input id="contact-phone" type="tel" placeholder="+1 234 567 890" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="contact-company" className="text-sm font-medium">Company Name</label>
                        <Input id="contact-company" placeholder="Your Company" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-service" className="text-sm font-medium">Service Interested In</label>
                      <Select>
                        <SelectTrigger id="contact-service">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {SERVICES.map((s) => (
                            <SelectItem key={s.title} value={s.title}>{s.title}</SelectItem>
                          ))}
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-message" className="text-sm font-medium">Project Details</label>
                      <Textarea id="contact-message" placeholder="Tell us about your project, goals, and timeline..." rows={5} />
                    </div>
                    <Button className="w-full" size="lg" onClick={() => toast({ title: 'Message Sent', description: 'We will get back to you within 24 hours.' })}>
                      Send Message
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ---- WHY CHOOSE US (Trust Signals) ---- */}
        <section className="py-20 md:py-28 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              badge="Why NexaSoft"
              title="The NexaSoft Advantage"
              subtitle="We combine technical excellence with a client-first approach to deliver software solutions that make a real difference for your business."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { icon: ShieldCheck, title: 'Secure & Reliable', desc: 'Enterprise-grade security practices and 99.9% uptime guarantee for all deployed solutions.' },
                { icon: Zap, title: 'Rapid Delivery', desc: 'Agile development methodology ensures fast turnaround without compromising on quality.' },
                { icon: HeadphonesIcon, title: 'Dedicated Support', desc: '24/7 technical support and a dedicated project manager for every engagement.' },
                { icon: TrendingUp, title: 'Scalable Solutions', desc: 'Architecture designed to grow with your business, from startup to enterprise scale.' },
              ].map((item) => (
                <Card key={item.title} className="text-center border-border/60">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-base mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ---- BUSINESS IDENTIFICATION (Airwallex Requirement) ---- */}
        <section className="py-16 md:py-20 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              badge="Business Information"
              title="Company Details & Legal Information"
              subtitle="As required by payment service providers, the following business information is publicly available on our website."
            />
            <div className="max-w-4xl mx-auto">
              <Card className="border-border/60">
                <CardContent className="p-6 md:p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Left Column - Company Info */}
                    <div className="space-y-6">
                      <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-primary" />
                        Company Information
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Building2 className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-foreground">Company Name</div>
                            <div className="text-sm text-muted-foreground">{BUSINESS.name}</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Zap className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-foreground">Business Registration Number</div>
                            <div className="text-sm text-muted-foreground">{BUSINESS.registrationNumber}</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <MapPin className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-foreground">Registered Address</div>
                            <div className="text-sm text-muted-foreground">{BUSINESS.address}</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <ShieldCheck className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-foreground">Governing Law</div>
                            <div className="text-sm text-muted-foreground">{BUSINESS.governingLaw}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Contact Info */}
                    <div className="space-y-6">
                      <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
                        <Phone className="h-5 w-5 text-primary" />
                        Contact Information
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Mail className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-foreground">Email Address</div>
                            <div className="text-sm text-muted-foreground">
                              <a href={`mailto:${BUSINESS.email}`} className="hover:text-foreground transition-colors underline underline-offset-2">
                                {BUSINESS.email}
                              </a>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Phone className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-foreground">Phone Number</div>
                            <div className="text-sm text-muted-foreground">
                              <a href={`tel:${BUSINESS.phone}`} className="hover:text-foreground transition-colors underline underline-offset-2">
                                {BUSINESS.phone}
                              </a>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Globe className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-foreground">Website</div>
                            <div className="text-sm text-muted-foreground">
                              <a href={`https://${BUSINESS.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors underline underline-offset-2">
                                {BUSINESS.website}
                              </a>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Clock className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-foreground">Business Hours</div>
                            <div className="text-sm text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM (HKT)</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Methods Notice */}
                  <div className="mt-8 pt-6 border-t border-border">
                    <div className="flex items-start gap-3">
                      <CreditCard className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <div className="font-semibold text-sm text-foreground mb-2">Accepted Payment Methods</div>
                        <div className="text-sm text-muted-foreground mb-3">
                          We accept the following payment methods for our services:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" className="px-3 py-1 text-xs">Visa</Badge>
                          <Badge variant="secondary" className="px-3 py-1 text-xs">Mastercard</Badge>
                          <Badge variant="secondary" className="px-3 py-1 text-xs">FPX Online Banking</Badge>
                          <Badge variant="secondary" className="px-3 py-1 text-xs">Bank Transfer</Badge>
                          <Badge variant="secondary" className="px-3 py-1 text-xs">Apple Pay</Badge>
                          <Badge variant="secondary" className="px-3 py-1 text-xs">Google Pay</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Legal Links */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="flex flex-wrap gap-4 text-sm">
                      <button onClick={() => setPolicyModal('privacy')} className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2">
                        Privacy Policy
                      </button>
                      <button onClick={() => setPolicyModal('refund')} className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2">
                        Refund Policy
                      </button>
                      <button onClick={() => setPolicyModal('terms')} className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2">
                        Terms & Conditions
                      </button>
                      <button onClick={() => setPolicyModal('shipping')} className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2">
                        Shipping Policy
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* ==================== FOOTER ==================== */}
      <footer className="border-t border-border bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                  <Code2 className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold tracking-tight">NexaSoft</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Professional software development and IT consulting services for businesses worldwide.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <Building2 className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>{BUSINESS.name}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>{BUSINESS.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0" />
                  <a href={`mailto:${BUSINESS.email}`} className="hover:text-foreground transition-colors">{BUSINESS.email}</a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0" />
                  <a href={`tel:${BUSINESS.phone}`} className="hover:text-foreground transition-colors">{BUSINESS.phone}</a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-sm mb-4">Quick Links</h4>
              <ul className="space-y-2.5">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <button
                      onClick={() => scrollTo(item.href)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                    >
                      {item.label}
                      <ChevronRight className="h-3 w-3" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-sm mb-4">Services</h4>
              <ul className="space-y-2.5">
                {SERVICES.slice(0, 5).map((s) => (
                  <li key={s.title}>
                    <button
                      onClick={() => scrollTo('services')}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                    >
                      {s.title}
                      <ChevronRight className="h-3 w-3" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-sm mb-4">Legal</h4>
              <ul className="space-y-2.5">
                <li>
                  <button
                    onClick={() => setPolicyModal('privacy')}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    Privacy Policy
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setPolicyModal('refund')}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    Refund Policy
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setPolicyModal('terms')}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    Terms & Conditions
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setPolicyModal('shipping')}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    Shipping Policy
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </li>
              </ul>
              <div className="mt-6 p-3 rounded-lg bg-muted/50">
                <div className="text-xs text-muted-foreground">Governing Law</div>
                <div className="text-sm font-medium">{BUSINESS.governingLaw}</div>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <div className="text-center sm:text-left">
              &copy; {new Date().getFullYear()} {BUSINESS.name}. All rights reserved. Business Registration No.: {BUSINESS.registrationNumber}.
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setPolicyModal('privacy')} className="hover:text-foreground transition-colors">Privacy Policy</button>
              <button onClick={() => setPolicyModal('refund')} className="hover:text-foreground transition-colors">Refund Policy</button>
              <button onClick={() => setPolicyModal('terms')} className="hover:text-foreground transition-colors">Terms & Conditions</button>
              <button onClick={() => setPolicyModal('shipping')} className="hover:text-foreground transition-colors">Shipping Policy</button>
            </div>
          </div>
        </div>
      </footer>

      {/* ==================== POLICY MODAL ==================== */}
      <PolicyDialog open={!!policyModal} onOpenChange={(v) => !v && setPolicyModal(null)} />

      {/* ==================== CHECKOUT MODAL ==================== */}
      {isMobile ? (
        <Sheet open={checkoutOpen} onOpenChange={setCheckoutOpen}>
          <SheetContent side="bottom" className="h-[92vh] rounded-t-2xl">
            <SheetHeader className="mb-4">
              <SheetTitle>{orderPlaced ? 'Order Confirmed' : 'Checkout'}</SheetTitle>
              <SheetDescription>
                {orderPlaced
                  ? 'Thank you for your order!'
                  : selectedProduct
                  ? `Complete your purchase of ${selectedProduct.name}`
                  : ''}
              </SheetDescription>
            </SheetHeader>
            <CheckoutContent />
          </SheetContent>
        </Sheet>
      ) : (
        <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle>{orderPlaced ? 'Order Confirmed' : 'Checkout'}</DialogTitle>
              <DialogDescription>
                {orderPlaced
                  ? 'Thank you for your order!'
                  : selectedProduct
                  ? `Complete your purchase of ${selectedProduct.name}`
                  : ''}
              </DialogDescription>
            </DialogHeader>
            <CheckoutContent />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );

  /* ---- CHECKOUT INNER CONTENT ---- */
  function CheckoutContent() {
    if (orderPlaced) {
      return (
        <div className="text-center py-10 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          </div>
          <h3 className="text-xl font-semibold">Order Placed Successfully!</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Thank you for choosing {BUSINESS.name}. We have received your order for the{' '}
            <span className="font-semibold text-foreground">{selectedProduct?.name}</span>.
            Our team will contact you within 24 hours at {formData.email} to begin your project.
          </p>
          <p className="text-sm text-muted-foreground">Order reference will be sent to your email.</p>
          <Button onClick={() => setCheckoutOpen(false)} className="mt-4">
            Back to Website
          </Button>
        </div>
      );
    }

    return (
      <div className="overflow-y-auto flex-1 -mr-2 pr-2 mt-4 space-y-6">
        {/* Order Summary */}
        <Card className="border-border/60">
          <CardContent className="p-4">
            <h3 className="font-semibold text-sm mb-3">Order Summary</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{selectedProduct?.name}</span>
              <span className="font-semibold">${selectedProduct?.price}</span>
            </div>
            <Separator className="my-3" />
            <div className="flex items-center justify-between">
              <span className="font-semibold">Total</span>
              <span className="text-xl font-bold">${selectedProduct?.price}</span>
            </div>
          </CardContent>
        </Card>

        {/* Step Indicators */}
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={() => setCheckoutStep(1)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              checkoutStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}
          >
            1. Details
          </button>
          <ChevronRight className="h-3 w-3 text-muted-foreground" />
          <button
            onClick={() => { if (formData.fullName && formData.email) setCheckoutStep(2); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              checkoutStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}
          >
            2. Payment
          </button>
        </div>

        {checkoutStep === 1 && (
          <div className="space-y-4">
            <h3 className="font-semibold">Your Details</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Full Name *</label>
                <Input
                  placeholder="John Smith"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Email Address *</label>
                <Input
                  type="email"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Phone Number *</label>
                <Input
                  type="tel"
                  placeholder="+1 234 567 890"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Company Name</label>
                <Input
                  placeholder="Your Company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Address</label>
              <Input
                placeholder="123 Business Street"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">City</label>
                <Input
                  placeholder="Hong Kong"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Country</label>
                <Input
                  placeholder="Hong Kong SAR"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Project Notes (Optional)</label>
              <Textarea
                placeholder="Any specific requirements or details about your project..."
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
            <Button
              className="w-full"
              onClick={() => {
                if (!formData.fullName || !formData.email || !formData.phone) {
                  toast({ title: 'Missing Information', description: 'Please fill in all required fields.', variant: 'destructive' });
                  return;
                }
                setCheckoutStep(2);
              }}
            >
              Continue to Payment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {checkoutStep === 2 && (
          <div className="space-y-4">
            <h3 className="font-semibold">Payment Method</h3>
            
            {/* Product Details Summary */}
            <Card className="border-border/60 bg-muted/30">
              <CardContent className="p-4">
                <h4 className="font-semibold text-sm mb-2">Product Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Package:</span>
                    <span className="font-medium">{selectedProduct?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Description:</span>
                    <span className="text-right max-w-[60%]">{selectedProduct?.description}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery:</span>
                    <span className="font-medium">Digital delivery within 24-48 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Options */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Select Payment Method</h4>
              
              {/* Credit Card Option */}
              <Card className="border-border/60 cursor-pointer hover:border-primary/50 transition-colors" onClick={handlePlaceOrder}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">Credit / Debit Card</div>
                    <div className="text-xs text-muted-foreground">Visa, Mastercard, and other major cards accepted. Secure payment via Airwallex.</div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </CardContent>
              </Card>

              {/* Bank Transfer Option */}
              <Card className="border-border/60 cursor-pointer hover:border-primary/50 transition-colors" onClick={handlePlaceOrder}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">Bank Transfer</div>
                    <div className="text-xs text-muted-foreground">Direct bank transfer via FPX or wire transfer. Processing time: 1-2 business days.</div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </CardContent>
              </Card>

              {/* Digital Wallet Option */}
              <Card className="border-border/60 cursor-pointer hover:border-primary/50 transition-colors" onClick={handlePlaceOrder}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Smartphone className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">Digital Wallet</div>
                    <div className="text-xs text-muted-foreground">Apple Pay, Google Pay, and other digital wallets. Instant payment confirmation.</div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </CardContent>
              </Card>

              {/* Cash on Delivery Option */}
              <Card className="border-border/60 cursor-pointer hover:border-primary/50 transition-colors" onClick={handlePlaceOrder}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">Cash on Delivery (COD)</div>
                    <div className="text-xs text-muted-foreground">Pay when the project milestones are delivered. No upfront online payment required.</div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </CardContent>
              </Card>
            </div>

            {/* Security Notice */}
            <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/30 p-4 border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                <div className="text-sm">
                  <div className="font-semibold text-emerald-800 dark:text-emerald-300 mb-1">Secure Payment</div>
                  <div className="text-emerald-700 dark:text-emerald-400">
                    All transactions are encrypted with SSL/TLS and processed through secure payment gateways. 
                    Your payment information is never stored on our servers.
                  </div>
                </div>
              </div>
            </div>

            <Separator />
            
            {/* Terms and Conditions */}
            <div className="text-xs text-muted-foreground space-y-2">
              <p>By placing this order, you agree to our{' '}
                <button onClick={() => { setCheckoutOpen(false); setPolicyModal('terms'); }} className="underline hover:text-foreground font-medium">Terms & Conditions</button>
                ,{' '}
                <button onClick={() => { setCheckoutOpen(false); setPolicyModal('privacy'); }} className="underline hover:text-foreground font-medium">Privacy Policy</button>
                , and{' '}
                <button onClick={() => { setCheckoutOpen(false); setPolicyModal('refund'); }} className="underline hover:text-foreground font-medium">Refund Policy</button>.
              </p>
              <p>Your information is secured with SSL encryption. {BUSINESS.name} is registered in {BUSINESS.governingLaw} (Reg. No.: {BUSINESS.registrationNumber}).</p>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => setCheckoutStep(1)}
            >
              Back to Details
            </Button>
          </div>
        )}
      </div>
    );
  }
}

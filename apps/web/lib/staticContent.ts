export interface StaticPage {
  title: string;
  updated?: string;
  sections: { heading: string; body: string }[];
}

export const legalPages: Record<string, StaticPage> = {
  termos: {
    title: "Terms of Service",
    updated: "Last updated: July 2026",
    sections: [
      {
        heading: "1. Acceptance of terms",
        body: "By accessing or purchasing from LINEA, you agree to these Terms of Service and to our Privacy and Refund policies.",
      },
      {
        heading: "2. Orders and pricing",
        body: "Prices are shown in your local currency where available and are converted at the exchange rate in effect at checkout. LINEA reserves the right to correct pricing errors before an order ships.",
      },
      {
        heading: "3. Shipping and international orders",
        body: "LINEA ships to 40+ countries. Import duties and taxes, where applicable, are the responsibility of the customer unless stated otherwise at checkout.",
      },
      {
        heading: "4. Account responsibility",
        body: "You are responsible for keeping your account credentials secure and for all activity under your account.",
      },
      {
        heading: "5. Contact",
        body: "Questions about these terms can be directed to our Support Center.",
      },
    ],
  },
  privacidade: {
    title: "Privacy Policy",
    updated: "Last updated: July 2026",
    sections: [
      {
        heading: "1. Information we collect",
        body: "We collect account information (name, email, country), order details, and basic usage data to operate the store and fulfill orders.",
      },
      {
        heading: "2. How we use your data",
        body: "Your data is used to process orders, provide customer support, and improve the LINEA experience. We do not sell personal data to third parties.",
      },
      {
        heading: "3. Payment information",
        body: "Payments are processed by Stripe. LINEA does not store your full card details on its own servers.",
      },
      {
        heading: "4. Your rights",
        body: "You can request access to, correction of, or deletion of your personal data at any time by contacting Support.",
      },
    ],
  },
  reembolso: {
    title: "Refund Policy",
    updated: "Last updated: July 2026",
    sections: [
      {
        heading: "1. Eligibility",
        body: "Unused items in original packaging can be returned within 30 days of delivery for a full refund.",
      },
      {
        heading: "2. How to request a refund",
        body: "Start a return from your Account or the Support Center with your order number. We'll provide a prepaid label where available.",
      },
      {
        heading: "3. Processing time",
        body: "Refunds are issued to the original payment method within 5-10 business days of us receiving the returned item.",
      },
      {
        heading: "4. Non-returnable items",
        body: "Custom or clearance items marked as final sale are not eligible for return.",
      },
    ],
  },
};

export const empresaPages: Record<string, StaticPage> = {
  sobre: {
    title: "About LINEA",
    sections: [
      {
        heading: "Our mission",
        body: "LINEA builds professional-grade PDR (paintless dent repair) and automotive tools for technicians who can't afford to work with anything less than shop-floor tested equipment.",
      },
      {
        heading: "Where we operate",
        body: "We ship to 40+ countries from regional hubs, equipping over 12,000 technicians worldwide.",
      },
      {
        heading: "How we build tools",
        body: "Every product is specced together with working technicians and tested on real jobs before it goes on sale.",
      },
    ],
  },
  carreiras: {
    title: "Careers",
    sections: [
      {
        heading: "Working at LINEA",
        body: "We're a small, focused team building tools for a global technician base. We hire for product, engineering, operations and support.",
      },
      {
        heading: "Open roles",
        body: "We don't have open roles listed right now. Check back soon, or reach out via the Support Center if you'd like to introduce yourself.",
      },
    ],
  },
  imprensa: {
    title: "Press",
    sections: [
      {
        heading: "Media inquiries",
        body: "For interviews, product images, or company information, please reach out through our Support Center and mention 'Press' in your message.",
      },
    ],
  },
};

export const suportePages: Record<string, StaticPage> = {
  rastreio: {
    title: "Track Order",
    sections: [
      {
        heading: "Find your order",
        body: "Log in to My Account to see the status of your orders. Tracking numbers are emailed as soon as a shipment leaves the warehouse.",
      },
      {
        heading: "Delivery times",
        body: "Most orders ship same-day on best-sellers, with estimated delivery of 3-6 days depending on destination.",
      },
    ],
  },
  distribuidor: {
    title: "Become a Distributor",
    sections: [
      {
        heading: "Distributor and fleet pricing",
        body: "LINEA offers volume rates for shops, mobile technicians, and dealership networks in 40+ countries.",
      },
      {
        heading: "How to apply",
        body: "Send your shop or company details through the Support Center with the subject 'Distributor application' and our team will follow up.",
      },
    ],
  },
};

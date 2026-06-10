import { Metadata } from 'next';
import { ContactPageClient } from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact Us | Let\'s Build Something Great | Adruva Solution',
  description: 'Have a project in mind? Book a free 30-minute discovery call or send us a message. We specialize in Web development, Mobile apps, AI Automation, Ads, and local SEO.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}

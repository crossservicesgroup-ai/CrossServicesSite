import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Cross Services Group collects, uses and shares your information, and the choices you have.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <Section as="article" tone="paper">
      <div
        className="mx-auto max-w-[72ch]
          [&_h1]:text-[38px] [&_h1]:leading-[1.1] md:[&_h1]:text-[52px]
          [&_h2]:mt-10 [&_h2]:text-[26px] [&_h2]:leading-[1.2] md:[&_h2]:text-[32px]
          [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6
          [&_address]:mt-4 [&_address]:not-italic
          [&_a]:break-words [&_a]:text-cross-blue [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-cross-blue-hover"
      >
        <h1>Privacy Policy</h1>
        <p><em>Cross Services Group, Inc. &middot; Effective September 28, 2026</em></p>
        
        <p>This policy explains what information Cross Services Group, Inc. and its service divisions (&quot;Cross Services Group,&quot; &quot;we,&quot; &quot;us&quot;) collect when you contact us or request service, how we use it, and the choices you have. It applies to requests made through our website, by phone, and through forms on Facebook and Instagram.</p>
        
        <h2>Information we collect</h2>
        <ul>
          <li>Contact details you give us, such as your name, phone number, email address, and ZIP code or service address.</li>
          <li>Details about the service you are asking about, such as your answers to questions on a request form.</li>
          <li>Records of the work we do for you, including appointments, estimates, invoices and service history.</li>
        </ul>
        
        <h2>How we use it</h2>
        <ul>
          <li>To respond to your request and contact you about it by phone, text message or email.</li>
          <li>To schedule and perform service, send estimates, invoices and appointment reminders, and follow up afterward.</li>
          <li>To improve our services and our advertising, including measuring which ads lead to requests.</li>
          <li>To send you occasional offers and seasonal reminders. You can opt out at any time.</li>
        </ul>
        
        <h2>Text messages</h2>
        <p>If you give us your mobile number, we may call or text you about your request and your service. Message and data rates may apply. Message frequency varies. Reply STOP to opt out or HELP for help. We do not sell or share your mobile number or your text messaging consent with third parties for their own marketing.</p>
        
        <h2>How we share information</h2>
        <p>We do not sell your personal information. We share it only as needed to run our business:</p>
        <ul>
          <li>With service providers that work for us, such as our scheduling and customer management software, and our email, phone and text messaging providers.</li>
          <li>With advertising platforms such as Meta (Facebook and Instagram) to deliver and measure our ads. This can include a hashed (encrypted) version of your contact information, used to show you relevant ads or to avoid showing you ads for services you already use.</li>
          <li>When required by law, or to protect our rights, our customers or the public.</li>
        </ul>
        
        <h2>How long we keep it</h2>
        <p>We keep your information for as long as we need it to provide service and to meet our legal, tax and accounting obligations, then delete it or keep it in a form that no longer identifies you.</p>
        
        <h2>How we protect it</h2>
        <p>We use reasonable administrative, technical and physical safeguards to protect your information. No method of storage or transmission is completely secure, so we cannot guarantee absolute security.</p>
        
        <h2>Your choices</h2>
        <p>You can ask us to show you, correct or delete the personal information we hold about you, or to stop contacting you for marketing, by using the contact details below. Reply STOP to any text message to stop texts.</p>
        
        <h2>Children</h2>
        <p>Our services are meant for adults. We do not knowingly collect personal information from anyone under 18.</p>
        
        <h2>Changes to this policy</h2>
        <p>If we change this policy, we will post the new version on this page and update the effective date above.</p>
        
        <h2>Contact us</h2>
        <address>
          Cross Services Group, Inc.<br />
          19 Tech Circle, Natick, MA 01760<br />
          <a href="tel:+15086521910">(508) 652-1910</a><br />
          <a href="mailto:CSG@CrossServicesGroup.com">CSG@CrossServicesGroup.com</a>
        </address>
      </div>
    </Section>
  );
}

import Link from 'next/link';
import Logo from '../shared/Logo';
import { Button } from '../ui/button';
import { contactLinks, footerLinks, socialLinks } from '@/lib/constants/footer-links';

type FooterColumnProps = {
  title: string;
  links: { label: string; href: string }[];
};

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="text-primary mb-4 font-semibold">{title}</h3>
      <ul className="text-muted-foreground space-y-3 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="hover:text-primary w-fit font-medium transition">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-primary/5 border-primary/10 border-t">
      <div className="app-container grid grid-cols-1 gap-8 py-14 md:grid-cols-4">
        {/* Brand */}
        <div>
          <Logo />
          <p className="text-muted-foreground mt-4 max-w-xs text-sm leading-relaxed">
            A reliable hotel booking platform for your travels. Ensuring the best prices, safe and
            comfortable stays—wherever you go, however you travel{' '}
          </p>
        </div>

        {/* Help */}
        <FooterColumn title="Help" links={footerLinks.help} />

        {/* Legal */}
        <FooterColumn title="Legal & Support" links={footerLinks.legal} />

        {/* Social */}
        <div>
          <h3 className="text-primary mb-4 font-semibold">Contact Us</h3>

          <ul className="text-muted-foreground space-y-3 text-sm">
            {contactLinks.map(({ label, icon: Icon }) => (
              <li key={label} className="flex items-center gap-3">
                <Icon className="size-4 shrink-0" />
                <span className="block leading-relaxed font-medium">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-brand-100 border-t" />

      <div className="app-container text-muted-foreground flex flex-col items-center justify-between gap-3 py-4 sm:flex-row">
        <small>© 2026 wanderstay. All rights reserved.</small>
        <div className="flex items-center gap-3">
          {socialLinks.map(({ name, href, icon: Icon }) => (
            <Button key={name} asChild className="size-8 min-w-8 rounded-full">
              <Link href={href} aria-label={name} target="_blank">
                <Icon size={16} />
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </footer>
  );
}

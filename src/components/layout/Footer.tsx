import Link from 'next/link';
import Logo from '../shared/Logo';
import { Button } from '../ui/button';
import { footerLinks, socialLinks } from '@/lib/constants/footer-links';

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
        <div className="space-y-3">
          <Logo />
          <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
            Buy and sell quality pre-owned items easily and securely on one trusted marketplace.
          </p>
        </div>

        {/* Help */}
        <FooterColumn title="Help" links={footerLinks.help} />

        {/* Legal */}
        <FooterColumn title="Legal" links={footerLinks.legal} />

        {/* Social */}
        <div>
          <h3 className="text-primary mb-4 font-semibold">Connect With Us</h3>
          <p className="text-muted-foreground mb-5 max-w-xs text-sm">
            Follow our journey through the broken world on social media.
          </p>

          <div className="flex gap-3">
            {socialLinks.map(({ name, href, icon: Icon }) => (
              <Button key={name} asChild className="size-8 min-w-8 rounded-full">
                <Link href={href} aria-label={name} target="_blank">
                  <Icon size={16} />
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="border-brand-100 border-t" />

      <div className="app-container text-muted-foreground py-4">
        <small>© 2026 RELO. All rights reserved.</small>
      </div>
    </footer>
  );
}

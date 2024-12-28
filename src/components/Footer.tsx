import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  const aboutLinks = [
    { label: 'About Us', href: '/about#about' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms and Conditions', href: '/terms' },
    { label: 'Collaborate', href: '/about#collaborate' },
    { label: 'Contact Us', href: '/about#contact' },
  ];

  const helpLinks = [
    { label: 'Sizing Guide', href: '/about#sizing' },
    { label: 'Affiliate Disclosure', href: '/about#affiliate' },
    { label: 'Our Brands', href: '/about#brands' },
  ];

  const socialLinks = [
    { Icon: Facebook, href: '#', label: 'Facebook' },
    { Icon: Instagram, href: '#', label: 'Instagram' },
    { Icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <footer className="bg-[#333333] text-[#f7e9d5]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Column */}
          <div>
            <h3 className="text-lg font-medium mb-4">
              About Stood Apart
            </h3>
            <ul className="space-y-2">
              {aboutLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Column */}
          <div>
            <h3 className="text-lg font-medium mb-4">
              Help & Info
            </h3>
            <ul className="space-y-2">
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Column */}
          <div>
            <h3 className="text-lg font-medium mb-4">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.Icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
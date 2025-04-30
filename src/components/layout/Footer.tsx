import React from 'react';
import { Gauge, Linkedin, Twitter, Github } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <Gauge className="h-6 w-6 text-primary-600 dark:text-primary-500" />
              <span className="text-lg font-bold text-gray-900 dark:text-white">SpeedPulse</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Modern internet speed testing with beautiful visualizations and detailed analytics.
            </p>
          </div>
          
          <div className="md:col-span-2 md:ml-auto">
            <div className="flex flex-col space-y-8 md:flex-row md:space-y-0 md:space-x-12">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
                  Product
                </h3>
                <ul className="mt-4 space-y-2">
                  <FooterLink href="/">Speed Test</FooterLink>
                  <FooterLink href="/results">Results</FooterLink>
                  <FooterLink href="/about">About</FooterLink>
                  <FooterLink href="/faq">FAQ</FooterLink>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
                  Legal
                </h3>
                <ul className="mt-4 space-y-2">
                  <FooterLink href="/privacy">Privacy Policy</FooterLink>
                  <FooterLink href="/terms">Terms of Service</FooterLink>
                  <FooterLink href="/cookies">Cookie Policy</FooterLink>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
                  Connect
                </h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <a
                      href="https://www.linkedin.com/in/debashishbordoloi/"
                      className="flex items-center text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-500"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin size={16} className="mr-2" />
                      <span>LinkedIn</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://x.com/d43a_io"
                      className="flex items-center text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-500"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter size={16} className="mr-2" />
                      <span>Twitter</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/d43ash1sh"
                      className="flex items-center text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-500"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={16} className="mr-2" />
                      <span>GitHub</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} SpeedPulse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => {
  return (
    <li>
      <a
        href={href}
        className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-500"
      >
        {children}
      </a>
    </li>
  );
};
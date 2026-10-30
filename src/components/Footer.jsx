
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">

        {/* Brand */}
        <div>
          <Link to="/" className="text-2xl font-bold text-text-main">
            Task<span className="text-primary">Flow</span>
          </Link>

          <p className="mt-4 max-w-xs text-sm leading-6 text-text-secondary">
            Simple project and task management for modern teams.
          </p>
        </div>

        {/* Product */}
        <div>
          <h3 className="mb-4 font-semibold text-text-main">
            Product
          </h3>

          <div className="flex flex-col gap-3 text-sm text-text-secondary">
            <a href="/#features" className="hover:text-primary">
              Features
            </a>
            <a href="/#how-it-works" className="hover:text-primary">
              How It Works
            </a>
            <a href="/#pricing" className="hover:text-primary">
              Pricing
            </a>
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="mb-4 font-semibold text-text-main">
            Company
          </h3>

          <div className="flex flex-col gap-3 text-sm text-text-secondary">
            <Link to="/" className="hover:text-primary">
              About
            </Link>
            <Link to="/" className="hover:text-primary">
              Contact
            </Link>
          </div>
        </div>

        {/* Resources */}
        <div>
          <h3 className="mb-4 font-semibold text-text-main">
            Resources
          </h3>

          <div className="flex flex-col gap-3 text-sm text-text-secondary">
            <Link to="/" className="hover:text-primary">
              Documentation
            </Link>
            <Link to="/" className="hover:text-primary">
              Help Center
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border px-6 py-5 text-center">
        <p className="text-xs text-text-secondary">
          © {currentYear} TaskFlow. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

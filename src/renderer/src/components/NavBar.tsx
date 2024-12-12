import React, { useState } from 'react'
import { Link } from 'react-router-dom';

type NavItem = {
  label: string
  path: string
}

const navItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Applications', path: '/applications' },
  { label: 'Providers', path: '/providers' },
  { label: 'Logs', path: '/logs' },
  { label: 'Settings', path: '/settings' }
]

const NavBar = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = (): void => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Branding */}
          <div className="flex items-center">
            <span className="text-white font-semibold text-lg">MyElectronApp</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            {navItems.map((item, index) => (
                <NavLink key={index} to={item.path} active={index === 0}>
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isOpen ? (
                  <path fillRule="evenodd" clipRule="evenodd" d="M4 5h16v2H4zm0 12h16v2H4z" />
                ) : (
                  <path fillRule="evenodd" clipRule="evenodd" d="M4 5h16v2H4zm0 12h16v2H4z" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-gray-800">
          {navItems.map((item, index) => (
            <NavLink key={index} to={item.path} active={index === 0} mobile>
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  )
}

type Props = {
    to: string;
    children: React.ReactNode;
    active?: boolean;
    mobile?: boolean;
  };

const NavLink = ({ to, children, active = false, mobile = false }: Props): JSX.Element => {
  const baseClasses =
    'block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out'
  const activeClasses = 'bg-gray-700 text-white'
  const inactiveClasses = 'text-gray-300 hover:bg-gray-700 hover:text-white'

  // Adjust styling based on whether it's in mobile menu or desktop
  const finalClasses = `${baseClasses} ${active ? activeClasses : inactiveClasses} ${
    mobile ? 'w-full' : ''
  }`;

  return (
    <Link to={to} className={finalClasses}>
      {children}
    </Link>
  );
}

export default NavBar

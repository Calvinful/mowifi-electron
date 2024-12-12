const NavBar = (): JSX.Element => {
    return (
      <nav className="fixed top-0 left-0 right-0 bg-gray-900 shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-white font-semibold text-lg">MyElectronApp</span>
            </div>
            <div className="flex space-x-4">
              <NavLink href="#" active>
                Home
              </NavLink>
              <NavLink href="#">Features</NavLink>
              <NavLink href="#">Settings</NavLink>
              <NavLink href="#">About</NavLink>
            </div>
          </div>
        </div>
      </nav>
    )
  }
  
  type Props = {
    href: string
    children: React.ReactNode
    active?: boolean
  }
  
  const NavLink = ({ href, children, active = false }: Props): JSX.Element => {
    const baseClasses = 'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out'
    const activeClasses = 'bg-gray-700 text-white'
    const inactiveClasses = 'text-gray-300 hover:bg-gray-700 hover:text-white'
  
    return (
      <a href={href} className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}>
        {children}
      </a>
    )
  }
  
  export default NavBar
  
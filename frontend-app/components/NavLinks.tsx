import Link from 'next/link'

const NavLinks = () => {

  const menuItems = [
    { title: 'Home', path: '/' },
    { title: 'Spark', path: '/spark' },
    { title: 'Notifications', path: 'https://app.obscurity.org/', target: '_blank' },
  ]

  return (
    <div>
      {/* On click menu drops down with a list of menu options */}
      {menuItems.length ?
        <ul className='flex flex-col p-4 lg:flex-row lg:p-0 lg:gap-3'>
          {menuItems.map((item) => (
            <li className='mb-4 lg:mb-0' key={item.title}>
              <Link 
                href={item.path}
                aria-label={`Link to ${item.title} page`}
                className="py-1 text-xl text-foreground transition-colors hover:text-secondary lg:py-0"
                target={item.target ? item.target : ''}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        : null
      }
    </div>
  )
}

export default NavLinks

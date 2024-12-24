import { useLocation } from 'react-router-dom'; 
import logo from '../../assets/afrifoodarchive 1.svg';

const NavBar = () => {
  const location = useLocation(); 

  return (
    <nav className='flex justify-between items-center text-base md:text-xl text-[#1D1D1F]'>
      <img src={logo} alt="" className='w-[32px] h-[28px] md:w-[64px] md:h-[54px]' />
      <ul className='flex gap-5 md:gap-10'>
        <li
          className={`${location.pathname === '/' ? 'text-[#FF0800]' : ''} cursor-pointer hidden md:block`}
        >
          Foods
        </li>
        <li className={`${location.pathname === '/favourites' ? 'text-[#FF0800]' : ''} cursor-pointer`}>Favourites</li>
        <li className={`${location.pathname === '/about' ? 'text-[#FF0800]' : ''} cursor-pointer`}>About</li>
      </ul>
    </nav>
  );
};

export default NavBar;

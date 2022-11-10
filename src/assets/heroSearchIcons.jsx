import { GiChickenOven } from 'react-icons/gi';
import { TbFish, TbPlant, TbPig } from 'react-icons/tb';

export default [
  {
    name: 'chicken',
    icon: <GiChickenOven className='w-10 h-10' />,
    url: '/categories/chicken',
  },
  {
    name: 'seafood',
    icon: <TbFish className='w-10 h-10' />,
    url: '/categories/seafood',
  },
  {
    name: 'vegetarian',
    icon: <TbPlant className='w-10 h-10' />,
    url: '/categories/vegetarian',
  },
  {
    name: 'pork',
    icon: <TbPig className='w-10 h-10' />,
    url: '/categories/pork',
  },
];

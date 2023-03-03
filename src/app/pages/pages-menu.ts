import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'In Out List',
    icon: 'home-outline',
    link: '/pages/in-out-list',
  },
  {
    title: 'Payment',
    icon: 'home-outline',
    link: '/pages/payment',
  },
  {
    title: 'Door Management',
    icon: 'home-outline',
    link: '/pages/admin',
  },
  {
    title: 'User Management',
    icon: 'home-outline',
    link: '/pages/user',
    hidden: localStorage.getItem('userType') === 'user',
  },
  {
    title: 'Statistic',
    icon: 'layout-outline',
    children: [
      {
        title: 'Vehicle',
        link: '/pages/statistic/vehicle',
      },
      {
        title: 'Profit',
        link: '/pages/statistic/profit',
      },
    ],
  },
];

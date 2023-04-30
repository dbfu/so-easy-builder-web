import { UserOutlined, HomeOutlined } from '@ant-design/icons';
import Home from '../pages/home';
import User from '../pages/user';



export const routeConfig = [
   {
      path: '/home',
      element: <Home />,
      title: 'home',
      icon: <HomeOutlined />,
   },
   {
      path: '/user',
      element: <User />,
      title: 'user',
      icon: <UserOutlined />,
   },
]

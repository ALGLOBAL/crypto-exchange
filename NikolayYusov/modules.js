import { configSite } from 'src/config/config';
import constants from 'src/js/constants';

const more = {
    isActive: true,
    contentMoreList: [
        {
            key: 'myAccount',
            isActive: true,
        },
        {
            key: 'orders',
            isActive: true,
        },
        {
            key: 'alerts',
            isActive: true,
        },
        {
            key: 'contacts',
            isActive: false,
        },
        {
            key: 'notifications',
            isActive: true,
        },
        {
            key: 'settings',
            isActive: true,
        },
        {
            key: 'aboutUs',
            isActive: false,
        },
        {
            key: 'support',
            isActive: true,
        },
        {
            key: 'personalVolume',
            isActive: true,
        },
        {
            key: 'logout',
            isActive: true,
        },
    ],
};

export default {
    more,
};

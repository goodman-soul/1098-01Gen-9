import type { Resort } from '@/types';

export const resorts: Resort[] = [
  {
    id: 'resort-1',
    name: '长白山万达滑雪场',
    location: '吉林省白山市',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=snowy%20mountain%20ski%20resort%20with%20chairlifts%20winter%20landscape&image_size=landscape_16_9',
    pickupPoints: [
      {
        id: 'pickup-1-1',
        name: '万达小镇滑雪服务中心',
        address: '长白山万达度假区小镇入口处',
        openTime: '07:00 - 20:00',
        phone: '400-123-4567',
      },
      {
        id: 'pickup-1-2',
        name: '北区雪具大厅',
        address: '长白山万达北区雪道入口',
        openTime: '06:30 - 21:00',
        phone: '400-123-4568',
      },
    ],
  },
  {
    id: 'resort-2',
    name: '崇礼云顶滑雪场',
    location: '河北省张家口市',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mountain%20ski%20resort%20with%20snow%20trails%20and%20lodge%20winter&image_size=landscape_16_9',
    pickupPoints: [
      {
        id: 'pickup-2-1',
        name: '云顶雪具租赁中心',
        address: '云顶滑雪场主入口大厅',
        openTime: '07:30 - 20:30',
        phone: '400-234-5678',
      },
    ],
  },
  {
    id: 'resort-3',
    name: '亚布力阳光度假村',
    location: '黑龙江省哈尔滨市',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=alpine%20ski%20resort%20snowy%20peaks%20pine%20trees%20winter%20scenery&image_size=landscape_16_9',
    pickupPoints: [
      {
        id: 'pickup-3-1',
        name: '阳光度假村雪具厅',
        address: '亚布力阳光度假村主楼一层',
        openTime: '07:00 - 21:00',
        phone: '400-345-6789',
      },
    ],
  },
  {
    id: 'resort-4',
    name: '北大壶滑雪场',
    location: '吉林省吉林市',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=powder%20snow%20ski%20resort%20mountain%20vista%20winter%20wonderland&image_size=landscape_16_9',
    pickupPoints: [
      {
        id: 'pickup-4-1',
        name: '北大壶雪具服务中心',
        address: '北大壶滑雪场综合服务楼',
        openTime: '06:30 - 20:00',
        phone: '400-456-7890',
      },
    ],
  },
];

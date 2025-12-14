import { CelestialData } from './types';

export const SOLAR_SYSTEM: CelestialData[] = [
  {
    id: 'sun',
    name: {
      en: 'Sun',
      zh: '太阳'
    },
    description: {
      en: 'The star at the center of our Solar System.',
      zh: '太阳系中心的恒星，为整个星系提供光和热。'
    },
    diameterRatio: 0.85,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/600px-The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg',
    colors: {
      shadow: '#F57F17',
      atmosphere: 'rgba(253, 184, 19, 0.6)',
    },
    tilt: 0,
  },
  {
    id: 'mercury',
    name: {
      en: 'Mercury',
      zh: '水星'
    },
    description: {
      en: 'The smallest planet, closest to the Sun.',
      zh: '太阳系最小且最靠近太阳的行星。'
    },
    diameterRatio: 0.4,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Mercury_in_color_-_Prockter07_centered.jpg/600px-Mercury_in_color_-_Prockter07_centered.jpg',
    colors: {
      shadow: '#808080',
      atmosphere: 'rgba(165, 165, 165, 0.2)',
    },
    tilt: 2,
  },
  {
    id: 'venus',
    name: {
      en: 'Venus',
      zh: '金星'
    },
    description: {
      en: 'Spinning in the opposite direction to most planets.',
      zh: '自转方向与大多数行星相反，拥有极其浓厚的大气层。'
    },
    diameterRatio: 0.6,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Venus-real_color.jpg/600px-Venus-real_color.jpg',
    colors: {
      shadow: '#8B7355',
      atmosphere: 'rgba(227, 187, 118, 0.3)',
    },
    tilt: 177,
  },
  {
    id: 'earth',
    name: {
      en: 'Earth',
      zh: '地球'
    },
    description: {
      en: 'Our home, the only world known to harbor life.',
      zh: '我们的家园，目前已知宇宙中唯一孕育生命的星球。'
    },
    diameterRatio: 0.62,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/600px-The_Earth_seen_from_Apollo_17.jpg',
    colors: {
      shadow: '#0a1d36',
      atmosphere: 'rgba(64, 156, 255, 0.4)',
    },
    tilt: 23.5,
  },
  {
    id: 'mars',
    name: {
      en: 'Mars',
      zh: '火星'
    },
    description: {
      en: 'The dusty, cold, desert world with a very thin atmosphere.',
      zh: '寒冷干燥的沙漠世界，大气稀薄，表面布满氧化铁沙尘。'
    },
    diameterRatio: 0.5,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/600px-OSIRIS_Mars_true_color.jpg',
    colors: {
      shadow: '#8B3A28',
      atmosphere: 'rgba(226, 123, 88, 0.3)',
    },
    tilt: 25,
  },
  {
    id: 'jupiter',
    name: {
      en: 'Jupiter',
      zh: '木星'
    },
    description: {
      en: 'A gas giant and the largest planet in our solar system.',
      zh: '气态巨行星，太阳系中体积最大的行星，拥有著名的大红斑。'
    },
    diameterRatio: 0.8,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg/600px-Jupiter_and_its_shrunken_Great_Red_Spot.jpg',
    colors: {
      shadow: '#5C3A16',
      atmosphere: 'rgba(200, 139, 58, 0.25)',
    },
    tilt: 3,
  },
  {
    id: 'saturn',
    name: {
      en: 'Saturn',
      zh: '土星'
    },
    description: {
      en: 'Adorned with a dazzling, complex system of icy rings.',
      zh: '拥有绚丽且复杂的冰环系统，是太阳系中最美丽的行星之一。'
    },
    diameterRatio: 0.6,
    aspectRatio: 2.3,
    hasRings: true,
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg',
    colors: {
      shadow: '#8C7D64',
      atmosphere: 'rgba(234, 214, 184, 0.2)',
    },
    tilt: 27,
  },
  {
    id: 'uranus',
    name: {
      en: 'Uranus',
      zh: '天王星'
    },
    description: {
      en: 'Rotates at a nearly 90-degree angle from the plane of its orbit.',
      zh: '以近90度倾角侧躺运行的冰巨星，呈现独特的青绿色。'
    },
    diameterRatio: 0.65,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Uranus2.jpg/600px-Uranus2.jpg',
    colors: {
      shadow: '#5F9EA0',
      atmosphere: 'rgba(209, 243, 245, 0.4)',
    },
    tilt: 98,
  },
  {
    id: 'neptune',
    name: {
      en: 'Neptune',
      zh: '海王星'
    },
    description: {
      en: 'Dark, cold, and whipped by supersonic winds.',
      zh: '黑暗寒冷的冰巨星，表面伴有超音速风暴。'
    },
    diameterRatio: 0.64,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Neptune_Full.jpg/600px-Neptune_Full.jpg',
    colors: {
      shadow: '#191970',
      atmosphere: 'rgba(75, 112, 221, 0.4)',
    },
    tilt: 28,
  },
];

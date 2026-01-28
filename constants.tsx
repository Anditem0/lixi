
import { LixiItem } from './types';

export const LIXI_LIST: LixiItem[] = [
  { id: '1', title: 'An Khang', icon: 'celebration', amount: 0 },
  { id: '2', title: 'Thịnh Vượng', icon: 'redeem', amount: 0 },
  { id: '3', title: 'Vạn Sự Như Ý', icon: 'auto_awesome', amount: 0 },
  { id: '4', title: 'Phát Tài', icon: 'monetization_on', amount: 0 },
  { id: '5', title: 'Tấn Tới', icon: 'trending_up', amount: 0 },
  { id: '6', title: 'Bình An', icon: 'volunteer_activism', amount: 0 },
];

export const getRandomPrizeAmount = (): number => {
  const rand = Math.random() * 100;
  
  if (rand < 2) return 500000;   // 2%
  if (rand < 5) return 200000;   // 3%
  if (rand < 10) return 100000;  // 5%
  if (rand < 20) return 50000;   // 10%
  if (rand < 40) return 20000;   // 20%
  return 10000;                  // 60% (50% yêu cầu + 10% bù cho đủ 100%)
};

export const FORMAT_CURRENCY = (val: number) => {
  return new Intl.NumberFormat('vi-VN').format(val);
};

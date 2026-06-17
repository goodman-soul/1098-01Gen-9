import type { SafetyTip } from '@/types';

export const safetyTips: SafetyTip[] = [
  {
    id: 'tip-1',
    title: '佩戴头盔',
    content: '滑雪必须佩戴专业头盔，可有效降低头部受伤风险70%以上。',
    icon: 'hard-hat',
  },
  {
    id: 'tip-2',
    title: '做好热身',
    content: '滑雪前请充分热身，活动关节，避免肌肉拉伤和运动损伤。',
    icon: 'activity',
  },
  {
    id: 'tip-3',
    title: '量力而行',
    content: '选择与自己水平相符的雪道，不要贸然尝试高级道。',
    icon: 'trending-up',
  },
  {
    id: 'tip-4',
    title: '防晒保暖',
    content: '雪地紫外线强烈，请佩戴雪镜并涂抹防晒霜，注意保暖。',
    icon: 'sun',
  },
];

export const beginnerNotice = {
  title: '新手安全须知',
  content: '欢迎加入滑雪运动！为了您的安全，请务必佩戴头盔和护具，在初级道练习，听从教练指导，牢记安全第一。',
};

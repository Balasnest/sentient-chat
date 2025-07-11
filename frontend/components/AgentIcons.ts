
import { ImageSourcePropType } from 'react-native';
import BaseballIcon from '../assets/agent-icons/Baseball.png';
import CannabisIcon from '../assets/agent-icons/Cannabis.png';
import DNAIcon from '../assets/agent-icons/DNA.png';
import DumbbellIcon from '../assets/agent-icons/Dumbbell.png';
import FootballIcon from '../assets/agent-icons/football.png';
import HeartIcon from '../assets/agent-icons/heart.png';
import TwitterIcon from '../assets/agent-icons/logo-twitter.png';
import MusicIcon from '../assets/agent-icons/music.png';
import TelegramIcon from '../assets/agent-icons/paper-plane.png';
import PillIcon from '../assets/agent-icons/Pill.png';
import TikTokIcon from '../assets/agent-icons/Tiktok.png';



export const AgentIconMap: Record<string, ImageSourcePropType> = {
  'Tiktok': TikTokIcon,
  'Telegram': TelegramIcon,
  'Twitter': TwitterIcon,
  'Cannabis': CannabisIcon,
  'DNA': DNAIcon,
  'Pill': PillIcon,
  'dumbbell': DumbbellIcon,
  'baseball': BaseballIcon, // TODO: Change to globe
  'football': FootballIcon,
  'Music': MusicIcon,
  'heart': HeartIcon,
  'Health': HeartIcon,
  'Sports': FootballIcon,
  'paper-plane': TwitterIcon,
  'logo-twitter': TwitterIcon, // TODO: Change to twitter in BE
  // Add more as needed
};
import React from 'react';
import {
  ShoppingBag,
  Store,
  Sparkles,
  Boxes,
  Zap,
  Gem,
  Award,
  Layers,
  ShieldCheck,
  Compass,
  Package,
  Flame,
  Heart,
  Truck,
  CheckCircle2,
  Home,
  TrendingUp,
  Tag,
  BookOpen,
  Grid,
  Clock,
  Star,
  Percent,
  Phone,
  Mail,
  MapPin,
  LogIn,
  UserPlus,
  Settings,
  HelpCircle,
  Share2,
  Building2,
  Code
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  ShoppingBag,
  Store,
  Sparkles,
  Boxes,
  Zap,
  Gem,
  Award,
  Layers,
  ShieldCheck,
  Compass,
  Package,
  Flame,
  Heart,
  Truck,
  CheckCircle2,
  Home,
  TrendingUp,
  Tag,
  BookOpen,
  Grid,
  Clock,
  Star,
  Percent,
  Phone,
  Mail,
  MapPin,
  LogIn,
  UserPlus,
  Settings,
  HelpCircle,
  Share2,
  Building2,
  Code
};

interface IconRendererProps {
  name: string;
  className?: string;
  size?: number;
}

export const IconRenderer: React.FC<IconRendererProps> = ({ name, className = 'w-4 h-4', size }) => {
  const IconComponent = ICON_MAP[name] || ShoppingBag;
  return <IconComponent className={className} size={size} />;
};

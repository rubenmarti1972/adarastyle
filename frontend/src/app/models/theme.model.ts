export interface Theme {
  id: number;
  name: string;
  displayName: string;
  description: string;
  slug: string;
  isActive: boolean;
  colors: ThemeColors;
  fonts: ThemeFonts;
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
  shadows: ThemeShadows;
  animations: ThemeAnimations;
  customCSS?: string;
  preview?: any;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  backgroundAlt: string;
  text: string;
  textLight: string;
  border: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

export interface ThemeFonts {
  primary: string;
  secondary: string;
  headingWeight: string;
  bodyWeight: string;
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

export interface ThemeBorderRadius {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

export interface ThemeShadows {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ThemeAnimations {
  duration: string;
  easing: string;
}

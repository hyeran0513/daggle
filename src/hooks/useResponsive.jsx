import { useMediaQuery } from "react-responsive";
import { theme } from "../styles/theme";

export const useResponsive = () => {
  const isMobile = useMediaQuery({
    maxWidth: parseInt(theme.breakpoints.mobile),
  });
  const isTablet = useMediaQuery({
    maxWidth: parseInt(theme.breakpoints.tablet),
  });
  const isDesktop = useMediaQuery({
    minWidth: parseInt(theme.breakpoints.web),
  });

  return { isMobile, isTablet, isDesktop };
};

import { useMediaQuery } from "react-responsive";
import { theme } from "../styles/theme";

export const useResponsive = () => {
  const isMobile = useMediaQuery({
    maxWidth: parseInt(theme.breakpoints.mobile),
    ssr: false,
  });
  const isTablet = useMediaQuery({
    maxWidth: parseInt(theme.breakpoints.tablet),
    ssr: false,
  });
  const isDesktop = useMediaQuery({
    minWidth: parseInt(theme.breakpoints.web),
    ssr: false,
  });

  return { isMobile, isTablet, isDesktop };
};

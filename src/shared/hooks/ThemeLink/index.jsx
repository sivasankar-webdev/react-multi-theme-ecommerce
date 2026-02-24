// hooks/useThemeLink.js
import { useParams } from "react-router-dom";

export default function useThemeLink(path) {
  const { theme } = useParams();
  if (path === "/" || path === "#") return "/";   // anchors stay as-is
  return `/${theme}${path}`;
}
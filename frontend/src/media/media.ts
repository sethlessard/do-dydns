import { css, CSSObject } from "styled-components";

export enum ScreenType {
  Phone = 420,
  Tablet = 768,
  Desktop = 992,
  Giant = 1170
};

export const media = (screenType: ScreenType) => {
  const emSize = _getEmSize(screenType);
  return (style: CSSObject | TemplateStringsArray) => `@media(max-width: ${emSize}em) { ${css(style)} }`;
};

const _getEmSize = (screenType: ScreenType) => {
  return screenType.valueOf() / 16;
};

export default media;
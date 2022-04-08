import React, { ReactNode } from 'react';
import { colors } from '../../utils/theme';

const fontVariantType = {
  textBlack: 'SourceSansPro-Black',
  textBlackItalic: 'SourceSansPro-BlackItalic',
  textBold: 'SourceSansPro-Bold',
  textBoldItalic: 'SourceSansPro-BoldItalic',
  textExtraLight: 'SourceSansPro-ExtraLight',
  textExtraLightItalic: 'SourceSansPro-ExtraLightItalic',
  textItalic: 'SourceSansPro-Italic',
  textLight: 'SourceSansPro-Light',
  textLightItalic: 'SourceSansPro-LightItalic',
  text: 'SourceSansPro-Regular',
  textSemiBold: 'SourceSansPro-SemiBold',
  textSemiBoldItalic: 'SourceSansPro-SemiBoldItalic',
  title: 'FjallaOne-Regular',
};

interface Props {
  align?: 'left' | 'center' | 'right' | 'justify';
  children: ReactNode;
  color?: string;
  numberOfLines?: number;
  size?: number;
  fontVariant?: keyof typeof fontVariantType;
  weight?: string;
}

const getTextStyle = ({
  align,
  color,
  size,
  fontVariant = 'title',
  weight,
}: Pick<Props, 'align' | 'color' | 'size' | 'fontVariant' | 'weight'>) => {
  const textStyle = {
    color,
    fontSize: size,
    textAlign: align,
    fontFamily: fontVariantType[fontVariant],
  };
  return textStyle;
};

const Typography = ({
  align,
  children,
  color,
  size,
  fontVariant,
  weight,
}: Props) => {
  const textStyle = getTextStyle({ align, color, size, fontVariant, weight });
  return <span style={textStyle}>{children}</span>;
};

Typography.defaultProps = {
  align: 'left',
  color: colors.mainBlack,
  size: 18,
  weight: '100',
};

export default Typography;

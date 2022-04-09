import React from 'react';
import { colors } from '../../utils/theme';
import Typography from '../Typography';
import CSS from 'csstype';
import './styles.css';

interface Props {
  additionalStyle?: CSS.Properties;
  color?: string;
  onClick: () => void;
  text: string;
  textSize?: number;
  variant?: 'primary' | 'secondary' | 'clicked';
}

const buttonTextColors = {
  primary: colors.mainBlack,
  secondary: colors.mainBlack,
  clicked: colors.secondaryPink,
};

const Button = ({
  additionalStyle = {},
  onClick,
  text,
  textSize = 18,
  variant,
}: Props) => {
  return (
    <button
      className={'buttonContainer ' + variant}
      style={additionalStyle}
      onClick={onClick}
    >
      <Typography
        color={variant && buttonTextColors[variant]}
        size={textSize}
        fontVariant="title"
      >
        {text}
      </Typography>
    </button>
  );
};

Button.defaultProps = {
  additionalStyle: {},
  textSize: 18,
  variant: 'primary',
};

export default Button;

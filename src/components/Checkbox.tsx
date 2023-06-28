import { styled } from '@/theme';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { CSS } from '@stitches/react';
import { Tooltip } from './common';

type CheckboxProps = {
  checked: boolean;
  onChange: () => void;
  tooltip?: string;
  size?: Size;
  css?: CSS;
};

type Size = 'small' | 'medium' | 'large';

const Checkbox: React.FC<CheckboxProps> = (props) => {
  const Content = (
    <CheckboxRoot
      size={props.size}
      checked={props.checked}
      onCheckedChange={props.onChange}
      css={props.css}
    >
      <CheckboxIndicator>
        <CheckIcon width={'100%'} height={'100%'} />
      </CheckboxIndicator>
    </CheckboxRoot>
  );

  if (props.tooltip) {
    return <Tooltip text={props.tooltip}>{Content}</Tooltip>;
  } else {
    return Content;
  }
};

const CheckboxRoot = styled(RadixCheckbox.Root, {
  all: 'unset',
  backgroundColor: '$background',
  width: 25,
  height: 25,
  borderRadius: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: `$small`,
  cursor: 'pointer',
  boxSizing: 'border-box',
  '&:hover': {
    scale: 1.02,
    border: '1px solid $primary',
  },
  '&:focus': {
    border: '1px solid $primary',
  },
  variants: {
    size: {
      small: {
        width: 25,
        height: 25,
      },
      medium: {
        width: 35,
        height: 35,
      },
      large: {
        width: 45,
        height: 45,
      },
    },
  },
});

const CheckboxIndicator = styled(RadixCheckbox.Indicator, {
  color: '$primary',
});

export default Checkbox;

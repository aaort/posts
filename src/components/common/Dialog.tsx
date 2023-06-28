import { styled } from '@/theme';
import * as RadixDialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { keyframes } from '@stitches/react';
import React from 'react';
import Button from './Button';
import IconButton from './IconButton';
import Row from './Row';

type DialogProps = {
  title: string;
  description?: string;
  isOpen: boolean;
  onClose?: () => void;
  onOk?: () => void;
};

const Dialog: React.FC<DialogProps> = (props) => {
  return (
    <RadixDialog.Root open={props.isOpen} defaultOpen={false}>
      <RadixDialog.Portal>
        <DialogOverlay />
        <DialogContent>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
          <RadixDialog.Close asChild onClick={props.onClose}>
            <IconButton
              css={{ position: 'absolute', top: 10, right: 10 }}
              aria-label="Close"
            >
              <Cross2Icon width={'90%'} height={'90%'} />
            </IconButton>
          </RadixDialog.Close>
          <Actions>
            <Button title="Cancel" type="success" onClick={props.onClose} />
            <Button title="OK" type="dangerous" onClick={props.onOk} />
          </Actions>
        </DialogContent>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const contentShow = keyframes({
  '0%': { opacity: 0, translate: '-5% -50%', scale: 0.9 },
  '100%': { opacity: 1, transform: 0, scale: 1 },
});

const DialogOverlay = styled(RadixDialog.Overlay, {
  position: 'fixed',
  inset: 0,
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
});

const DialogContent = styled(RadixDialog.Content, {
  backgroundColor: '$background',
  borderRadius: '$small',
  boxShadow: '$medium',
  position: 'absolute',
  top: '5%',
  right: '5%',
  width: '90vw',
  maxWidth: '550px',
  maxHeight: '85vh',
  padding: 25,
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  '&:focus': { outline: 'none' },
});

const DialogTitle = styled(RadixDialog.Title, {
  margin: 0,
  fontWeight: '$2',
  color: '$primary',
  fontSize: 'calc($1 + 0.4rem)',
});

const DialogDescription = styled(RadixDialog.Description, {
  color: '$primary',
  fontSize: '$1',
  lineHeight: 1.5,
});

const Actions = styled(Row, {
  justifyContent: 'flex-end',
  gap: '$2',
  mt: '$2',
});

export default Dialog;

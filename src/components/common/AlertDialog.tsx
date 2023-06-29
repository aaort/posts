import * as RadixAlertDialog from '@radix-ui/react-alert-dialog';
import { keyframes, styled } from '@stitches/react';
import IconButton from './IconButton';
import { Cross1Icon } from '@radix-ui/react-icons';

type AlertDialogProps = React.PropsWithChildren & {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
};

const AlertDialog: React.FC<AlertDialogProps> = (props) => (
  <>
    <CloseButton onClick={props.onClose}>
      <Cross1Icon />
    </CloseButton>
    <RadixAlertDialog.Root
      open={props.isOpen}
      onOpenChange={props.onOpenChange}
    >
      <RadixAlertDialog.Portal>
        <AlertDialogOverlay />
        <AlertDialogContent>{props.children}</AlertDialogContent>
      </RadixAlertDialog.Portal>
    </RadixAlertDialog.Root>
  </>
);

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

const AlertDialogOverlay = styled(RadixAlertDialog.Overlay, {
  backgroundColor: '$background',
  position: 'fixed',
  inset: 0,
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  zIndex: 5,
});

const AlertDialogContent = styled(RadixAlertDialog.Content, {
  backgroundColor: '$background',
  borderRadius: 6,
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '500px',
  maxHeight: '85vh',
  padding: 25,
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,

  '&:focus': { outline: 'none' },
  zIndex: 6,
});

const CloseButton = styled(IconButton, {
  position: 'absolute',
  top: 0,
  right: 0,
  zIndex: 7,
  cursor: 'pointer',
  pointerEvents: 'all',
  '&:hover': {
    backgroundColor: 'initial',
  },
  '& svg': {
    color: '$primary',
    width: 50,
    height: 50,
  },
});

export default AlertDialog;

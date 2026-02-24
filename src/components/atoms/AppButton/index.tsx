import { Button, type ButtonProps } from '@mui/material';
import clsx from 'clsx';
import styles from './AppButton.module.css';

interface AppButtonProps extends ButtonProps {
  label: string;
}

/** Atom – re-usable styled button wrapper */
export default function AppButton({ label, className, ...rest }: AppButtonProps) {
  return (
    <Button className={clsx(styles.button, className)} {...rest}>
      {label}
    </Button>
  );
}

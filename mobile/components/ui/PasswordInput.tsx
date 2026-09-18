import { useState } from 'react';
import { TextInputProps } from 'react-native';
import { Eye, EyeIcon, EyeSlashIcon } from 'phosphor-react-native';

import { Input } from './Input';

interface PasswordInputProps extends TextInputProps {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  error?: boolean;
}

export function PasswordInput({
  label,
  helperText,
  errorMessage,
  error = false,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      label={label}
      helperText={helperText}
      errorMessage={errorMessage}
      error={error}
      secureTextEntry={!showPassword}
      rightIcon={showPassword ? EyeSlashIcon : EyeIcon}
      onRightIconPress={() =>
        setShowPassword((previous) => !previous)
      }
      {...props}
    />
  );
}
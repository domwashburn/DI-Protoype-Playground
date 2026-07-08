/**
 * ModalAdapter — Phase 3B
 *
 * Wraps @carbon/react ComposedModal + ModalHeader + ModalBody + ModalFooter
 * with the existing custom Modal API so that all 4 consumers keep working
 * with zero visual regression.
 *
 * Prop mapping:
 *   isOpen             -> open
 *   onClose            -> onClose (ComposedModal)
 *   title              -> ModalHeader label
 *   primaryButtonText  -> ModalFooter primaryButtonText
 *   secondaryButtonText-> ModalFooter secondaryButtonText
 *   onPrimaryClick     -> onRequestSubmit
 *   onSecondaryClick   -> onRequestClose fallback (calls onClose if absent)
 *   size               -> size mapping (small→sm, medium→md, large→lg)
 *   children           -> ModalBody children
 */

import React, { useCallback } from 'react';
import {
  ComposedModal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@carbon/react';

interface ModalAdapterProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  size?: 'small' | 'medium' | 'large';
}

/** Map our size names to Carbon's size prop values. */
const sizeMap: Record<string, 'xs' | 'sm' | 'md' | 'lg'> = {
  small: 'sm',
  medium: 'md',
  large: 'lg',
};

export default function ModalAdapter({
  isOpen,
  onClose,
  title,
  children,
  primaryButtonText = 'Save',
  secondaryButtonText = 'Cancel',
  onPrimaryClick,
  onSecondaryClick,
  size = 'medium',
}: ModalAdapterProps) {
  const handleSecondary = useCallback(() => {
    if (onSecondaryClick) {
      onSecondaryClick();
    } else {
      onClose();
    }
  }, [onSecondaryClick, onClose]);

  return (
    <ComposedModal
      open={isOpen}
      onClose={onClose}
      size={sizeMap[size] ?? 'md'}
    >
      <ModalHeader key="modal-header" label="" title={title} />
      <ModalBody key="modal-body">{children}</ModalBody>
      {(onPrimaryClick || secondaryButtonText) && (
        <ModalFooter
          key="modal-footer"
          primaryButtonText={onPrimaryClick ? primaryButtonText : undefined}
          secondaryButtonText={secondaryButtonText}
          onRequestSubmit={onPrimaryClick}
          onRequestClose={handleSecondary}
        />
      )}
    </ComposedModal>
  );
}
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './index';

/** Use instead of plain `useDispatch` for fully typed dispatch */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/** Use instead of plain `useSelector` for typed state access */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// ── Selectors ─────────────────────────────────────────────────────────────────
export const selectFormData = (state: RootState) => state.createEvent.formData;
export const selectCurrentStep = (state: RootState) => state.createEvent.currentStep;
export const selectIsDirty = (state: RootState) => state.createEvent.isDirty;
export const selectIsSubmitting = (state: RootState) => state.createEvent.isSubmitting;

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { EventFormData, ImpactedLocation, ExternalSource } from '../../types/event.types';
import { initialFormData } from '../../types/event.types';
import { TOTAL_STEPS } from '../../data/stepConfig';

// ── Slice State ───────────────────────────────────────────────────────────────
export interface CreateEventState {
  formData: EventFormData;
  currentStep: number;
  isDirty: boolean;
  isSubmitting: boolean;
}

const initialState: CreateEventState = {
  formData: initialFormData,
  currentStep: 1,
  isDirty: false,
  isSubmitting: false,
};

// ── Slice ─────────────────────────────────────────────────────────────────────
const createEventSlice = createSlice({
  name: 'createEvent',
  initialState,
  reducers: {
    /** Update a single string field on the form */
    updateField(
      state,
      action: PayloadAction<{ field: keyof EventFormData; value: string }>
    ) {
      const { field, value } = action.payload;
      (state.formData as Record<string, unknown>)[field] = value;
      state.isDirty = true;
    },

    /** Toggle a country selection inside an impacted region */
    toggleRegion(
      state,
      action: PayloadAction<{ regionId: string; countryCode: string; checked: boolean }>
    ) {
      const { regionId, countryCode, checked } = action.payload;
      const regions: ImpactedLocation[] = state.formData.impactedRegions;
      const idx = regions.findIndex((r) => r.region === regionId);

      if (checked) {
        if (idx === -1) {
          regions.push({ region: regionId, countries: [countryCode] });
        } else {
          if (!regions[idx].countries.includes(countryCode)) {
            regions[idx].countries.push(countryCode);
          }
        }
      } else {
        if (idx !== -1) {
          regions[idx].countries = regions[idx].countries.filter(
            (c) => c !== countryCode
          );
          if (regions[idx].countries.length === 0) {
            regions.splice(idx, 1);
          }
        }
      }
      state.isDirty = true;
    },

    /** Toggle a peril on/off */
    togglePeril(state, action: PayloadAction<string>) {
      const peril = action.payload;
      const idx = state.formData.perils.indexOf(peril);
      if (idx === -1) {
        state.formData.perils.push(peril);
      } else {
        state.formData.perils.splice(idx, 1);
      }
      state.isDirty = true;
    },

    /** Navigate to any step directly (e.g. scroll-spy or sidebar back-navigation) */
    setStep(state, action: PayloadAction<number>) {
      const target = action.payload;
      if (target >= 1 && target <= TOTAL_STEPS) {
        state.currentStep = target;
      }
    },

    /** Advance to the next step */
    nextStep(state) {
      if (state.currentStep < TOTAL_STEPS) {
        state.currentStep += 1;
      }
    },

    /** Go back to the previous step */
    prevStep(state) {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },

    /** Add an external source entry (Step 3) */
    addExternalSource(state, action: PayloadAction<ExternalSource>) {
      state.formData.externalSources.push(action.payload);
      state.isDirty = true;
    },

    /** Remove an external source by its id */
    removeExternalSource(state, action: PayloadAction<string>) {
      state.formData.externalSources = state.formData.externalSources.filter(
        (s) => s.id !== action.payload
      );
      state.isDirty = true;
    },

    /** Mark form as being submitted */
    setSubmitting(state, action: PayloadAction<boolean>) {
      state.isSubmitting = action.payload;
    },

    /** Reset the entire form back to initial state */
    resetForm() {
      return initialState;
    },
  },
});

export const {
  updateField,
  toggleRegion,
  togglePeril,
  setStep,
  nextStep,
  prevStep,
  addExternalSource,
  removeExternalSource,
  setSubmitting,
  resetForm,
} = createEventSlice.actions;

export default createEventSlice.reducer;

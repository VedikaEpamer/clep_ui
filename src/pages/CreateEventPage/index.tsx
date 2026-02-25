import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateEventTemplate from '../../components/templates/CreateEventTemplate';
import EventIdentitySection from '../../components/organisms/EventIdentitySection';
import ImpactRegionsSection from '../../components/organisms/ImpactRegionsSection';
import OtherIDsSection from '../../components/organisms/OtherIDsSection';
import IndustryMarketLossSection from '../../components/organisms/IndustryMarketLossSection';
import DeadlinesTrackingSection from '../../components/organisms/DeadlinesTrackingSection';
import ReviewPublishSection from '../../components/organisms/ReviewPublishSection';
import {
  useAppDispatch,
  useAppSelector,
  selectFormData,
  selectCurrentStep,
} from '../../store/hooks';
import {
  updateField,
  toggleRegion,
  togglePeril,
  nextStep,
  prevStep,
  setStep,
  setSubmitting,
  resetForm,
  addExternalSource,
  removeExternalSource,
} from '../../store/slices/createEventSlice';
import type { EventFormData, ExternalSource } from '../../types/event.types';
import { TOTAL_STEPS } from '../../data/stepConfig';

/** Page – orchestrates the 5-step Create Event workflow via Redux Toolkit */
export default function CreateEventPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // ── Selectors ──────────────────────────────────────────────────────────────
  const formData = useAppSelector(selectFormData);
  const currentStep = useAppSelector(selectCurrentStep);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleFieldChange = useCallback(
    (field: keyof EventFormData, value: string) => {
      dispatch(updateField({ field, value }));
    },
    [dispatch]
  );

  const handleRegionChange = useCallback(
    (regionId: string, countryCode: string, checked: boolean) => {
      dispatch(toggleRegion({ regionId, countryCode, checked }));
    },
    [dispatch]
  );

  const handlePerilToggle = useCallback(
    (peril: string) => {
      dispatch(togglePeril(peril));
    },
    [dispatch]
  );

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      dispatch(nextStep());
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => dispatch(prevStep());

  // Sidebar: navigate to any step
  const handleStepClick = (step: number) => {
    dispatch(setStep(step));
  };

  const handleClose = () => {
    dispatch(resetForm());
    navigate('/');
  };

  const handleCancel = () => {
    dispatch(resetForm());
    navigate('/');
  };

  const handleSaveDraft = () => {
    console.info('Draft saved', formData);
  };

  const handleExportPDF = () => {
    console.info('Export PDF', formData);
  };

  const handleAddSource = useCallback(
    (source: ExternalSource) => dispatch(addExternalSource(source)),
    [dispatch]
  );

  const handleRemoveSource = useCallback(
    (id: string) => dispatch(removeExternalSource(id)),
    [dispatch]
  );

  const handlePublish = async () => {
    dispatch(setSubmitting(true));
    try {
      console.info('Event published', formData);
      // TODO: call publish API
    } finally {
      dispatch(setSubmitting(false));
    }
  };

  const handleSubmit = async () => {
    dispatch(setSubmitting(true));
    try {
      console.info('Form submitted', formData);
      // TODO: call API here
    } finally {
      dispatch(setSubmitting(false));
    }
  };

  return (
    <CreateEventTemplate
      currentStep={currentStep}
      eventId={formData.eventId}
      onStepClick={handleStepClick}
      onScrollStep={(step) => dispatch(setStep(step))}
      onSaveDraft={handleSaveDraft}
      onExportPDF={handleExportPDF}
      onClose={handleClose}
      onCancel={handleCancel}
      onBack={handleBack}
      onNext={handleNext}
    >
      {/* Each section is wrapped with data-step so the scroll-spy can detect it */}
      <div data-step={1}>
        <EventIdentitySection
          data={formData}
          onChange={handleFieldChange}
          isActive={currentStep === 1}
        />
      </div>
      <div data-step={2}>
        <ImpactRegionsSection
          data={formData}
          onRegionChange={handleRegionChange}
          onPerilToggle={handlePerilToggle}
          isActive={currentStep === 2}
        />
      </div>
      <div data-step={3}>
        <OtherIDsSection
          data={formData}
          onChange={handleFieldChange}
          onAddSource={handleAddSource}
          onRemoveSource={handleRemoveSource}
          isActive={currentStep === 3}
        />
      </div>
      <div data-step={4}>
        <IndustryMarketLossSection
          data={formData}
          onChange={handleFieldChange}
          isActive={currentStep === 4}
        />
      </div>
      <div data-step={5}>
        <DeadlinesTrackingSection
          data={formData}
          onChange={handleFieldChange}
          isActive={currentStep === 5}
        />
      </div>

      {/* Review & Publish — not a numbered step, no data-step wrapper */}
      <ReviewPublishSection
        data={formData}
        onPublish={handlePublish}
        onSaveDraft={handleSaveDraft}
      />
    </CreateEventTemplate>
  );
}

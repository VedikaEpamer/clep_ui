import { useRef, useEffect, type ReactNode } from 'react';
import Sidebar from '../../organisms/Sidebar';
import FormHeader from '../../organisms/FormHeader';
import FormFooter from '../../organisms/FormFooter';
import { PAGE_LABELS } from '../../../constants/uiLabels';
import styles from './CreateEventTemplate.module.css';

interface CreateEventTemplateProps {
  currentStep: number;
  eventId: string;
  onStepClick: (step: number) => void;   // sidebar: back-navigation only
  onScrollStep: (step: number) => void;  // scroll-spy: unrestricted
  onSaveDraft: () => void;
  onExportPDF: () => void;
  onClose: () => void;
  onCancel: () => void;
  onBack: () => void;
  onNext: () => void;
  children: ReactNode;
}

/**
 * Template – defines the full-screen two-column layout:
 *   • Left: sticky Sidebar with step navigation
 *   • Right: scrollable content area (FormHeader → step sections → FormFooter)
 */
export default function CreateEventTemplate({
  currentStep,
  eventId,
  onStepClick,
  onScrollStep,
  onSaveDraft,
  onExportPDF,
  onClose,
  onCancel,
  onBack,
  onNext,
  children,
}: CreateEventTemplateProps) {
  const scrollRef = useRef<HTMLElement>(null);
  // Keep a stable ref to onScrollStep so the observer never stales
  const onScrollStepRef = useRef(onScrollStep);
  onScrollStepRef.current = onScrollStep;

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    // Track the latest intersection ratio for every step section
    const ratioMap = new Map<number, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const step = Number((entry.target as HTMLElement).dataset.step);
          if (step) ratioMap.set(step, entry.intersectionRatio);
        });

        // The step whose section is most visible wins
        let bestStep = 1;
        let bestRatio = -1;
        ratioMap.forEach((ratio, step) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestStep = step;
          }
        });

        if (bestRatio > 0) onScrollStepRef.current(bestStep);
      },
      {
        root: scrollEl,
        // Fire callbacks at every 10 % increment so transitions feel immediate
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      }
    );

    const sections = scrollEl.querySelectorAll<HTMLElement>('[data-step]');
    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.root}>
      {/* Left Sidebar */}
      <Sidebar
        currentStep={currentStep}
        eventId={eventId}
        onStepClick={onStepClick}
        onSaveDraft={onSaveDraft}
        onExportPDF={onExportPDF}
      />

      {/* Right content */}
      <div className={styles.contentArea}>
        <FormHeader
          title={PAGE_LABELS.CREATE_EVENT_TITLE}
          subtitle={PAGE_LABELS.CREATE_EVENT_SUBTITLE}
          onClose={onClose}
          onCancel={onCancel}
        />

        {/* Scrollable form body – scroll-spy watches this element */}
        <main ref={scrollRef} className={styles.scrollBody}>
          {children}
        </main>

        <FormFooter currentStep={currentStep} onBack={onBack} onNext={onNext} />
      </div>
    </div>
  );
}

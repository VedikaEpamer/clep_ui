import { useRef, useEffect, useCallback, type ReactNode } from 'react';
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

  // While true the scroll-spy is suppressed (programmatic scroll in progress).
  const suppressSpyRef = useRef(false);
  // Debounce timer ref to detect when scroll animation ends.
  const scrollEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Whether the next step change should trigger a programmatic scroll.
  const pendingScrollRef = useRef(false);

  /** Arm a programmatic scroll and suppress the spy until scrolling settles. */
  const armScroll = useCallback(() => {
    suppressSpyRef.current = true;
    pendingScrollRef.current = true;
  }, []);

  const handleNextWithScroll = useCallback(() => {
    armScroll();
    onNext();
  }, [onNext, armScroll]);

  const handleBackWithScroll = useCallback(() => {
    armScroll();
    onBack();
  }, [onBack, armScroll]);

  const handleStepClickWithScroll = useCallback(
    (step: number) => {
      armScroll();
      onStepClick(step);
    },
    [onStepClick, armScroll]
  );

  // Scroll to the active section when a button triggered the step change.
  useEffect(() => {
    if (!pendingScrollRef.current) return;
    pendingScrollRef.current = false;
    const section = scrollRef.current?.querySelector<HTMLElement>(
      `[data-step="${currentStep}"]`
    );
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [currentStep]);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    // Re-enable the scroll-spy ~150 ms after scrolling stops.
    const onScroll = () => {
      if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current);
      scrollEndTimerRef.current = setTimeout(() => {
        suppressSpyRef.current = false;
      }, 150);
    };
    scrollEl.addEventListener('scroll', onScroll, { passive: true });

    // Track the latest intersection ratio for every step section
    const ratioMap = new Map<number, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const step = Number((entry.target as HTMLElement).dataset.step);
          if (step) ratioMap.set(step, entry.intersectionRatio);
        });

        // Suppress spy updates while a programmatic scroll is animating.
        if (suppressSpyRef.current) return;

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
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      }
    );

    const sections = scrollEl.querySelectorAll<HTMLElement>('[data-step]');
    sections.forEach((s) => observer.observe(s));

    return () => {
      observer.disconnect();
      scrollEl.removeEventListener('scroll', onScroll);
      if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current);
    };
  }, []);

  return (
    <div className={styles.root}>
      {/* Left Sidebar */}
      <Sidebar
        currentStep={currentStep}
        eventId={eventId}
        onStepClick={handleStepClickWithScroll}
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

        <FormFooter currentStep={currentStep} onBack={handleBackWithScroll} onNext={handleNextWithScroll} />
      </div>
    </div>
  );
}

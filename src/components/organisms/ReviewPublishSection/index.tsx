import ArticleIcon from '@mui/icons-material/Article';
import SendIcon from '@mui/icons-material/Send';
import SaveIcon from '@mui/icons-material/Save';
import type { EventFormData } from '../../../types/event.types';
import { REVIEW_LABELS, BUTTON_LABELS } from '../../../constants/uiLabels';
import styles from './ReviewPublishSection.module.css';

interface ReviewPublishSectionProps {
  data: EventFormData;
  onPublish: () => void;
  onSaveDraft: () => void;
}

/** Organism – Review & Publish (not a numbered step) */
export default function ReviewPublishSection({
  onPublish,
  onSaveDraft,
}: ReviewPublishSectionProps) {
  return (
    <section className={styles.card}>
      <div className={styles.inner}>
        <div className={styles.iconWrap}>
          <ArticleIcon className={styles.icon} />
        </div>
        <h2 className={styles.title}>{REVIEW_LABELS.SECTION_TITLE}</h2>
        <p className={styles.desc}>{REVIEW_LABELS.SECTION_DESCRIPTION}</p>
        <div className={styles.actions}>
          <button className={styles.draftBtn} onClick={onSaveDraft}>
            <SaveIcon className={styles.btnIcon} />
            {BUTTON_LABELS.SAVE_DRAFT}
          </button>
          <button className={styles.publishBtn} onClick={onPublish}>
            <SendIcon className={styles.btnIcon} />
            {BUTTON_LABELS.PUBLISH}
          </button>
        </div>
      </div>
    </section>
  );
}

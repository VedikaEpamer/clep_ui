import clsx from 'clsx';
import styles from './SectionDescription.module.css';

interface SectionDescriptionProps {
  /** Bold heading text */
  title: string;
  /** Muted supporting text below the title */
  description: string;
  /**
   * Wrap in a bordered box – used in EventIdentitySection
   * where the description sits inside its own outlined card.
   * @default false
   */
  bordered?: boolean;
  /**
   * 'md' – main section heading (larger, bolder)
   * 'sm' – sub-section heading (smaller, used e.g. for External Sources)
   * @default 'md'
   */
  size?: 'md' | 'sm';
}

/**
 * Molecule – section title + supporting description paragraph pair.
 *
 * Usage (plain – most sections):
 *   <SectionDescription title={SECTION_LABELS.FOO_HEADING} description={SECTION_LABELS.FOO_DESCRIPTION} />
 *
 * Usage (bordered box – EventIdentitySection):
 *   <SectionDescription bordered title={...} description={...} />
 *
 * Usage (sub-section – OtherIDsSection External Sources):
 *   <SectionDescription size="sm" title={...} description={...} />
 */
export default function SectionDescription({
  title,
  description,
  bordered = false,
  size = 'md',
}: SectionDescriptionProps) {
  const isSmall = size === 'sm';
  return (
    <div className={clsx({ [styles.bordered]: bordered })}>
      <p className={clsx(styles.title, { [styles['title--sm']]: isSmall })}>{title}</p>
      <p className={clsx(styles.description, { [styles['description--sm']]: isSmall })}>
        {description}
      </p>
    </div>
  );
}

import Image from 'next/image';
import styles from './featureList.module.css';

const FeatureItem = ({ icon, title, description }: { icon: string; title: string; description: string }) => {
  return (
    <div className={styles.feature}>
      <div className={styles.featureIcon}>
        <Image src={icon} alt={`${title} icon`} width={0} height={0} />
      </div>
      <div className={styles.featureText}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section className={styles.features}>
      <FeatureItem icon="/images/icons/suggest.svg" title="7 days" description="Personalized suggestions" />
      <FeatureItem icon="/images/icons/track.svg" title="Percentage" description="Track your progress" />
      <FeatureItem icon="/images/icons/clubs.svg" title="Diverse topics" description="Join book clubs" />
    </section>
  );
};

export default Features;
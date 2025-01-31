import { FC } from 'react';
import styles from './Tabs.module.css';

interface TabsProps {
  activeTab: 'all' | 'completed' | 'pending' | 'favourites';
  setActiveTab: (tab: 'all' | 'completed' | 'pending' | 'favourites') => void;
}

const Tabs: FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className={styles.tabs_container}>
      <button
        className={`${styles.tab} ${activeTab === 'all' ? styles.active : ''}`}
        onClick={() => setActiveTab('all')}
      >
        All
      </button>
      <button
        className={`${styles.tab} ${activeTab === 'completed' ? styles.active : ''}`}
        onClick={() => setActiveTab('completed')}
      >
        Completed
      </button>
      <button
        className={`${styles.tab} ${activeTab === 'pending' ? styles.active : ''}`}
        onClick={() => setActiveTab('pending')}
      >
        Pending
      </button>
      <button
        className={`${styles.tab} ${activeTab === 'favourites' ? styles.active : ''}`}
        onClick={() => setActiveTab('favourites')}
      >
        Favourites
      </button>
    </div>
  );
};

export default Tabs;

import React, { FC } from 'react';
import styles from './StatsNav.module.scss';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { StatsTabsType } from '../../interfaces/statsNav';

interface IProps {
  activeKey: StatsTabsType;
  setKey: (key: StatsTabsType | null) => void;
}

const StatsNav: FC<IProps> = ({ activeKey, setKey }) => {
  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={activeKey}
      onSelect={(activeKey) => setKey(activeKey as StatsTabsType | null)}
      className={` ${styles.statsNavContainer} my-3`}
    >
      <Tab eventKey="progress" title="Progress"></Tab>
      <Tab eventKey="statistics" title="Statistics"></Tab>
    </Tabs>
  );
};

export default StatsNav;

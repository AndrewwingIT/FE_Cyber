import React from 'react';
import { Box, Paper, Tabs, Tab } from '@mui/material';
import {
  People as PeopleIcon,
  Security as SecurityIcon,
  Subscriptions as SubscribeIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Link as LinkIcon
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

interface AdminTabsProps {
  currentTab: number;
  onTabChange: (event: React.SyntheticEvent, newValue: number) => void;
  children: React.ReactNode;
}

const AdminTabs: React.FC<AdminTabsProps> = ({ currentTab, onTabChange, children }) => {
  return (
    <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={currentTab} 
          onChange={onTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              minWidth: 120,
              fontWeight: 500
            }
          }}
        >
          <Tab 
            label="Users" 
            icon={<PeopleIcon />}
            iconPosition="start"
          />
          <Tab 
            label="Features" 
            icon={<SecurityIcon />}
            iconPosition="start"
          />
          <Tab 
            label="Subscriptions" 
            icon={<SubscribeIcon />}
            iconPosition="start"
          />
          <Tab 
            label="Suspicious Links" 
            icon={<WarningIcon />}
            iconPosition="start"
          />
          <Tab 
            label="Trusted Links" 
            icon={<CheckCircleIcon />}
            iconPosition="start"
          />
          <Tab 
            label="Tenants" 
            icon={<LinkIcon />}
            iconPosition="start"
          />
        </Tabs>
      </Box>
      {children}
    </Paper>
  );
};

export { TabPanel };
export default AdminTabs;

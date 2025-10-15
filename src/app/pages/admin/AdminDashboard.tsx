import React, { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import AdminLayout from '../../layouts/AdminLayout';
import DashboardStats from '../../../components/Admin/DashboardStats';
import AdminTabs, { TabPanel } from '../../../components/Admin/AdminTabs';
import AdminContent from '../../../components/Admin/AdminContent';
import AdminDialog from '../../../components/Admin/AdminDialog';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

interface Feature {
  id: number;
  name: string;
  description: string;
  status: string;
  type: string;
}

interface Subscription {
  id: number;
  userId: number;
  plan: string;
  status: string;
  startDate: string;
  endDate: string;
  amount: string;
}

interface SuspiciousLink {
  id: number;
  url: string;
  reportedBy: string;
  riskLevel: string;
  status: string;
  reportDate: string;
}

interface TrustedLink {
  id: number;
  url: string;
  addedBy: string;
  category: string;
  status: string;
  addedDate: string;
}

interface Tenant {
  id: number;
  name: string;
  domain: string;
  status: string;
  users: number;
  createdDate: string;
}

const AdminDashboard: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedItem, setSelectedItem] = useState<User | Feature | Subscription | SuspiciousLink | TrustedLink | Tenant | null>(null);

  // Mock data - Replace with actual API calls
  const [users] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active', createdAt: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', status: 'Active', createdAt: '2024-01-20' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive', createdAt: '2024-02-01' }
  ]);

  const [features] = useState<Feature[]>([
    { id: 1, name: 'Anti-Phishing', description: 'Phát hiện và chặn trang web lừa đảo', status: 'Active', type: 'Security' },
    { id: 2, name: 'Link Scanner', description: 'Quét và phân tích độ an toàn của liên kết', status: 'Active', type: 'Scanner' },
    { id: 3, name: 'Real-time Protection', description: 'Bảo vệ thời gian thực', status: 'Development', type: 'Security' }
  ]);

  const [subscriptions] = useState<Subscription[]>([
    { id: 1, userId: 1, plan: 'BASIC', status: 'Active', startDate: '2024-01-15', endDate: '2024-02-15', amount: '$28' },
    { id: 2, userId: 2, plan: 'PREMIUM', status: 'Active', startDate: '2024-01-20', endDate: '2024-02-20', amount: '$49' },
    { id: 3, userId: 3, plan: 'PLUS', status: 'Expired', startDate: '2024-01-01', endDate: '2024-02-01', amount: '$35' }
  ]);

  const [suspiciousLinks] = useState<SuspiciousLink[]>([
    { id: 1, url: 'https://fake-bank.com', reportedBy: 'John Doe', riskLevel: 'High', status: 'Under Review', reportDate: '2024-03-01' },
    { id: 2, url: 'https://phishing-site.net', reportedBy: 'Jane Smith', riskLevel: 'Critical', status: 'Blocked', reportDate: '2024-03-02' },
    { id: 3, url: 'https://suspicious-link.org', reportedBy: 'System', riskLevel: 'Medium', status: 'Approved', reportDate: '2024-03-03' }
  ]);

  const [trustedLinks] = useState<TrustedLink[]>([
    { id: 1, url: 'https://google.com', addedBy: 'Admin', category: 'Search Engine', status: 'Active', addedDate: '2024-01-01' },
    { id: 2, url: 'https://github.com', addedBy: 'Admin', category: 'Development', status: 'Active', addedDate: '2024-01-02' },
    { id: 3, url: 'https://stackoverflow.com', addedBy: 'Admin', category: 'Development', status: 'Active', addedDate: '2024-01-03' }
  ]);

  const [tenants] = useState<Tenant[]>([
    { id: 1, name: 'Cyber Rampart Main', domain: 'cyberrampart.com', status: 'Active', users: 150, createdDate: '2024-01-01' },
    { id: 2, name: 'Enterprise Client A', domain: 'client-a.com', status: 'Active', users: 75, createdDate: '2024-01-15' },
    { id: 3, name: 'Demo Environment', domain: 'demo.cyberrampart.com', status: 'Inactive', users: 10, createdDate: '2024-02-01' }
  ]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleOpenDialog = (type: 'add' | 'edit' | 'view', item?: User | Feature | Subscription | SuspiciousLink | TrustedLink | Tenant) => {
    setDialogType(type);
    setSelectedItem(item || null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItem(null);
  };

  return (
    <AdminLayout>
      <Box sx={{ 
        minHeight: 'calc(100vh - 64px)', 
        bgcolor: '#f5f5f5',
        pt: 3,
        pb: 3
      }}>
        <Container maxWidth="xl">
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1e293b', mb: 1 }}>
              Admin Dashboard
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Quản lý hệ thống Cyber Rampart
            </Typography>
          </Box>

          {/* Dashboard Stats */}
          <DashboardStats 
            totalUsers={users.length}
            activeSubscriptions={subscriptions.filter(s => s.status === 'Active').length}
            suspiciousLinks={suspiciousLinks.filter(l => l.status === 'Under Review').length}
            trustedLinks={trustedLinks.length}
          />

          {/* Main Content */}
          <AdminTabs currentTab={currentTab} onTabChange={handleTabChange}>
            <TabPanel value={currentTab} index={0}>
              <AdminContent
                currentTab={0}
                onOpenDialog={handleOpenDialog}
                users={users}
                features={features}
                subscriptions={subscriptions}
                suspiciousLinks={suspiciousLinks}
                trustedLinks={trustedLinks}
                tenants={tenants}
              />
            </TabPanel>
            <TabPanel value={currentTab} index={1}>
              <AdminContent
                currentTab={1}
                onOpenDialog={handleOpenDialog}
                users={users}
                features={features}
                subscriptions={subscriptions}
                suspiciousLinks={suspiciousLinks}
                trustedLinks={trustedLinks}
                tenants={tenants}
              />
            </TabPanel>
            <TabPanel value={currentTab} index={2}>
              <AdminContent
                currentTab={2}
                onOpenDialog={handleOpenDialog}
                users={users}
                features={features}
                subscriptions={subscriptions}
                suspiciousLinks={suspiciousLinks}
                trustedLinks={trustedLinks}
                tenants={tenants}
              />
            </TabPanel>
            <TabPanel value={currentTab} index={3}>
              <AdminContent
                currentTab={3}
                onOpenDialog={handleOpenDialog}
                users={users}
                features={features}
                subscriptions={subscriptions}
                suspiciousLinks={suspiciousLinks}
                trustedLinks={trustedLinks}
                tenants={tenants}
              />
            </TabPanel>
            <TabPanel value={currentTab} index={4}>
              <AdminContent
                currentTab={4}
                onOpenDialog={handleOpenDialog}
                users={users}
                features={features}
                subscriptions={subscriptions}
                suspiciousLinks={suspiciousLinks}
                trustedLinks={trustedLinks}
                tenants={tenants}
              />
            </TabPanel>
            <TabPanel value={currentTab} index={5}>
              <AdminContent
                currentTab={5}
                onOpenDialog={handleOpenDialog}
                users={users}
                features={features}
                subscriptions={subscriptions}
                suspiciousLinks={suspiciousLinks}
                trustedLinks={trustedLinks}
                tenants={tenants}
              />
            </TabPanel>
          </AdminTabs>

          {/* Dialog */}
          <AdminDialog
            open={openDialog}
            onClose={handleCloseDialog}
            dialogType={dialogType}
            selectedItem={selectedItem}
          />
        </Container>
      </Box>
    </AdminLayout>
  );
};

export default AdminDashboard;
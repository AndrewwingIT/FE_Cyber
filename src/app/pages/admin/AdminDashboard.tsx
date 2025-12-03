import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
import AdminLayout from '../../layouts/AdminLayout';
import DashboardStats from '../../../components/Admin/DashboardStats';
import AdminTabs, { TabPanel } from '../../../components/Admin/AdminTabs';
import AdminContent from '../../../components/Admin/AdminContent';
import AdminDialog from '../../../components/Admin/AdminDialog';
import AdminPaymentManagement from '../../../components/Admin/AdminPaymentManagement';
import FeatureService from '../../../app/services/FeatureService';
import type { Feature } from '../../../app/services/FeatureService';
import TrustedLinkService from '../../../app/services/TrustedLinkService';
import SuspiciousLinkService from '../../../app/services/SuspiciousLinkService';
import type { RecentSuspicious, PhishingSuspicious } from '../../../app/services/SuspiciousLinkService';

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
  const [selectedItem, setSelectedItem] = useState<Feature | Subscription | SuspiciousLink | TrustedLink | Tenant | null>(null);
  
  // Features from API
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loadingFeatures, setLoadingFeatures] = useState(false);

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

  const [trustedLinks, setTrustedLinks] = useState<TrustedLink[]>([]);
  const [loadingTrustedLinks, setLoadingTrustedLinks] = useState(false);

  const [tenants] = useState<Tenant[]>([
    { id: 1, name: 'Cyber Rampart Main', domain: 'cyberrampart.com', status: 'Active', users: 150, createdDate: '2024-01-01' },
    { id: 2, name: 'Enterprise Client A', domain: 'client-a.com', status: 'Active', users: 75, createdDate: '2024-01-15' },
    { id: 3, name: 'Demo Environment', domain: 'demo.cyberrampart.com', status: 'Inactive', users: 10, createdDate: '2024-02-01' }
  ]);

  // Suspicious lists from API
  const [suspiciousRecent, setSuspiciousRecent] = useState<RecentSuspicious[]>([]);
  const [loadingSuspiciousRecent, setLoadingSuspiciousRecent] = useState(false);
  const [suspiciousPhishing, setSuspiciousPhishing] = useState<PhishingSuspicious[]>([]);
  const [loadingSuspiciousPhishing, setLoadingSuspiciousPhishing] = useState(false);

  // Load features from API
  useEffect(() => {
    loadFeatures();
    loadTrustedLinks();
    loadSuspiciousRecent();
    loadSuspiciousPhishing();
  }, []);

  const loadTrustedLinks = async () => {
    setLoadingTrustedLinks(true);
    try {
      const res = await TrustedLinkService.getAllTrustedLinks();
      if (res.success && res.data) {
        const links = Array.isArray(res.data) ? res.data : [res.data];
        // map backend shape to local TrustedLink interface used by admin (id vs linkId)
        const normalized = links.map((l: any) => ({
          id: l.linkId ?? l.id ?? 0,
          url: l.url,
          addedBy: l.source ?? 'API',
          category: l.category,
          status: l.status,
          addedDate: (l.addedDate as string) || ''
        }));
        setTrustedLinks(normalized);
      } else {
        toast.error(res.message || 'Không lấy được danh sách trusted links');
        setTrustedLinks([]);
      }
    } catch (err) {
      console.error('Load trusted links error', err);
      toast.error('Lỗi khi tải trusted links');
      setTrustedLinks([]);
    } finally {
      setLoadingTrustedLinks(false);
    }
  };

  const loadFeatures = async () => {
    setLoadingFeatures(true);
    try {
      const response = await FeatureService.getAllFeatures();
      if (response.success && response.data) {
        const featuresData = Array.isArray(response.data) ? response.data : [response.data];
        setFeatures(featuresData);
      } else {
        toast.error(response.message || 'Không lấy được danh sách features');
        setFeatures([]);
      }
    } catch (error) {
      toast.error('Lỗi khi tải danh sách features');
      setFeatures([]);
    } finally {
      setLoadingFeatures(false);
    }
  };

  const loadSuspiciousRecent = async () => {
    setLoadingSuspiciousRecent(true);
    try {
      const res = await SuspiciousLinkService.getRecent(100);
      if (res.success && res.data) setSuspiciousRecent(res.data as RecentSuspicious[]);
      else setSuspiciousRecent([]);
    } catch (err) {
      console.error(err);
      setSuspiciousRecent([]);
    } finally {
      setLoadingSuspiciousRecent(false);
    }
  };

  const loadSuspiciousPhishing = async () => {
    setLoadingSuspiciousPhishing(true);
    try {
      const res = await SuspiciousLinkService.getPhishingList();
      if (res.success && res.data) setSuspiciousPhishing(res.data as PhishingSuspicious[]);
      else setSuspiciousPhishing([]);
    } catch (err) {
      console.error(err);
      setSuspiciousPhishing([]);
    } finally {
      setLoadingSuspiciousPhishing(false);
    }
  };

  // promote recent -> create phishing (api 5)
  const handlePromoteToPhishing = async (url: string) => {
    try {
      const res = await SuspiciousLinkService.createPhishingFromUrl({ url });
      if (res.success) {
        toast.success(res.message || 'Đã mark thành phishing');
        await loadSuspiciousRecent();
        await loadSuspiciousPhishing();
      } else {
        toast.error(res.message || 'Không thể chuyển sang phishing');
      }
    } catch (err) {
      console.error(err);
      toast.error('Lỗi khi chuyển sang phishing');
    }
  };

  // update phishing status (Active <-> Inactive) (api 6)
  const handleUpdatePhishingStatus = async (suspiciousId: number, status: string) => {
    try {
      const res = await SuspiciousLinkService.updatePhishingStatus(suspiciousId, status);
      if (res.success) {
        toast.success(res.message || 'Cập nhật trạng thái thành công');
        await loadSuspiciousPhishing();
      } else {
        toast.error(res.message || 'Cập nhật trạng thái thất bại');
      }
    } catch (err) {
      console.error(err);
      toast.error('Lỗi khi cập nhật trạng thái');
    }
  };

  // report link (api 1)
  const handleReportLink = async (payload: { url: string; pageTitle?: string; reason?: string }) => {
    try {
      const res = await SuspiciousLinkService.reportLink(payload);
      if (res.success) {
        toast.success(res.message || 'Báo cáo thành công');
        await loadSuspiciousRecent();
      } else {
        toast.error(res.message || 'Báo cáo thất bại');
      }
    } catch (err) {
      console.error(err);
      toast.error('Lỗi khi báo cáo link');
    }
  };

  const handleDeleteFeature = async (id: number) => {
    try {
      const response = await FeatureService.deleteFeature(id);
      if (response.success) {
        toast.success(response.message || 'Xóa feature thành công');
        loadFeatures(); // Reload danh sách
      } else {
        toast.error(response.message || 'Xóa feature thất bại');
      }
    } catch (error) {
      toast.error('Lỗi khi xóa feature');
    }
  };

  const handleDelete = (type: string, id: number) => {
    if (type === 'feature') {
      handleDeleteFeature(id);
      return;
    }

    if (type === 'trustedLink') {
      handleDeleteTrustedLink(id);
      return;
    }
    // Các type khác sẽ được implement sau
  };

  const handleDeleteTrustedLink = async (linkId: number) => {
    try {
      const res = await TrustedLinkService.deleteTrustedLink(linkId);
      if (res.success) {
        toast.success(res.message || 'Xóa trusted link thành công');
        await loadTrustedLinks();
      } else {
        toast.error(res.message || 'Xóa trusted link thất bại');
      }
    } catch (err) {
      console.error('Delete trusted link error', err);
      toast.error('Lỗi khi xóa trusted link');
    }
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleOpenDialog = (type: 'add' | 'edit' | 'view', item?: Feature | Subscription | SuspiciousLink | TrustedLink | Tenant) => {
    setDialogType(type);
    setSelectedItem(item || null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItem(null);
    // Reload features after dialog closes (in case of add/edit)
    if (currentTab === 0) {
      loadFeatures();
    }
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
            activeSubscriptions={subscriptions.filter(s => s.status === 'Active').length}
            suspiciousLinks={suspiciousLinks.filter(l => l.status === 'Under Review').length}
            trustedLinks={trustedLinks.length}
          />

          {/* Main Content */}
          <AdminTabs currentTab={currentTab} onTabChange={handleTabChange}>
            <TabPanel value={currentTab} index={0}>
              {loadingFeatures ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                  <CircularProgress />
                </Box>
              ) : (
                <AdminContent
                  currentTab={0}
                  onOpenDialog={handleOpenDialog}
                  features={features}
                  subscriptions={subscriptions}
                  suspiciousLinks={suspiciousLinks}
                  trustedLinks={trustedLinks}
                  tenants={tenants}
                  onDelete={handleDelete}
                />
              )}
            </TabPanel>
            <TabPanel value={currentTab} index={1}>
              <AdminContent
                currentTab={1}
                onOpenDialog={handleOpenDialog}
                features={features}
                subscriptions={subscriptions}
                suspiciousLinks={suspiciousLinks}
                trustedLinks={trustedLinks}
                tenants={tenants}
                onDelete={handleDelete}
              />
            </TabPanel>
            <TabPanel value={currentTab} index={2}>
              <AdminContent
                currentTab={2}
                onOpenDialog={handleOpenDialog}
                features={features}
                subscriptions={subscriptions}
                suspiciousRecent={suspiciousRecent}
                suspiciousPhishing={suspiciousPhishing}
                tenants={tenants}
                trustedLinks={trustedLinks}
                onDelete={handleDelete}
                onPromoteToPhishing={handlePromoteToPhishing}
                onUpdatePhishingStatus={handleUpdatePhishingStatus}
                onReportLink={handleReportLink}
                loadingSuspiciousRecent={loadingSuspiciousRecent}
                loadingSuspiciousPhishing={loadingSuspiciousPhishing}
              />
            </TabPanel>
            <TabPanel value={currentTab} index={3}>
              <AdminContent
                currentTab={3}
                onOpenDialog={handleOpenDialog}
                features={features}
                subscriptions={subscriptions}
                suspiciousLinks={suspiciousLinks}
                trustedLinks={trustedLinks}
                tenants={tenants}
                onDelete={handleDelete}
              />
            </TabPanel>
            <TabPanel value={currentTab} index={4}>
              <AdminContent
                currentTab={4}
                onOpenDialog={handleOpenDialog}
                features={features}
                subscriptions={subscriptions}
                suspiciousLinks={suspiciousLinks}
                trustedLinks={trustedLinks}
                tenants={tenants}
                onDelete={handleDelete}
              />
            </TabPanel>
            <TabPanel value={currentTab} index={5}>
              <AdminPaymentManagement />
            </TabPanel>
          </AdminTabs>

          {/* Dialog */}
          <AdminDialog
            open={openDialog}
            onClose={handleCloseDialog}
            dialogType={dialogType}
            selectedItem={selectedItem}
            currentTab={currentTab}
            onRefresh={() => {
              // gọi loader phù hợp theo tab hiện tại
              if (currentTab === 0) return loadFeatures();
              if (currentTab === 3) return loadTrustedLinks();
              // thêm các loader khác nếu có
              return Promise.resolve();
            }}
          />
        </Container>
      </Box>
    </AdminLayout>
  );
};

export default AdminDashboard;
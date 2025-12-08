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
import SubscriptionService from '../../../app/services/SubscriptionService';
import type { Subscription } from '../../../app/models/Subscription';
import TenantService from '../../../app/services/TenantService';
import type { Tenant } from '../../../app/models/Tenant';

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

const AdminDashboard: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedItem, setSelectedItem] = useState<Feature | Subscription | SuspiciousLink | TrustedLink | Tenant | null>(null);
  
  // Features from API
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loadingFeatures, setLoadingFeatures] = useState(false);

  // Subscriptions from API
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loadingSubscriptions, setLoadingSubscriptions] = useState(false);

  const [suspiciousLinks] = useState<SuspiciousLink[]>([
    { id: 1, url: 'https://fake-bank.com', reportedBy: 'John Doe', riskLevel: 'High', status: 'Under Review', reportDate: '2024-03-01' },
    { id: 2, url: 'https://phishing-site.net', reportedBy: 'Jane Smith', riskLevel: 'Critical', status: 'Blocked', reportDate: '2024-03-02' },
    { id: 3, url: 'https://suspicious-link.org', reportedBy: 'System', riskLevel: 'Medium', status: 'Approved', reportDate: '2024-03-03' }
  ]);

  const [trustedLinks, setTrustedLinks] = useState<TrustedLink[]>([]);
  const [, setLoadingTrustedLinks] = useState(false);

  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [, setLoadingTenants] = useState(false);

  // Suspicious lists from API
  const [suspiciousRecent, setSuspiciousRecent] = useState<RecentSuspicious[]>([]);
  const [loadingSuspiciousRecent, setLoadingSuspiciousRecent] = useState(false);
  const [suspiciousPhishing, setSuspiciousPhishing] = useState<PhishingSuspicious[]>([]);
  const [loadingSuspiciousPhishing, setLoadingSuspiciousPhishing] = useState(false);

  // Load features from API
  useEffect(() => {
    loadFeatures();
    loadSubscriptions();
    loadTrustedLinks();
    loadSuspiciousRecent();
    loadSuspiciousPhishing();
    loadTenants();
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

  const loadTenants = async () => {
    setLoadingTenants(true);
    try {
      const res = await TenantService.getAllTenants();
      if (res.success && res.data) {
        const tenantsData = Array.isArray(res.data) ? res.data : [res.data];
        setTenants(tenantsData);
      } else {
        toast.error(res.message || 'Không lấy được danh sách tenants');
        setTenants([]);
      }
    } catch (err) {
      console.error('Load tenants error', err);
      toast.error('Lỗi khi tải tenants');
      setTenants([]);
    } finally {
      setLoadingTenants(false);
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

  const loadSubscriptions = async () => {
    setLoadingSubscriptions(true);
    try {
      const response = await SubscriptionService.getAllSubscriptions();
      if (response.success && response.data) {
        const subsData = Array.isArray(response.data) ? response.data : [response.data];
        setSubscriptions(subsData);
      } else {
        toast.error(response.message || 'Không lấy được danh sách subscriptions');
        setSubscriptions([]);
      }
    } catch (error) {
      toast.error('Lỗi khi tải danh sách subscriptions');
      setSubscriptions([]);
    } finally {
      setLoadingSubscriptions(false);
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

    // Comment: API không có endpoint delete cho subscription
    // if (type === 'subscription') {
    //   handleCancelSubscription(id);
    //   return;
    // }

    if (type === 'trustedLink') {
      handleDeleteTrustedLink(id);
      return;
    }

    if (type === 'tenant') {
      handleDeleteTenant(id);
      return;
    }
    // Các type khác sẽ được implement sau
  };

  // Comment: API không có endpoint delete subscription, chỉ có thể update status
  // const handleCancelSubscription = async (subscriptionId: number) => {
  //   if (!window.confirm('Bạn có chắc chắn muốn hủy subscription này?')) return;
  //   
  //   try {
  //     const response = await SubscriptionService.updateSubscriptionStatus(subscriptionId, {
  //       status: 'Cancelled'
  //     });
  //     if (response.success) {
  //       toast.success(response.message || 'Hủy subscription thành công');
  //       loadSubscriptions();
  //     } else {
  //       toast.error(response.message || 'Hủy subscription thất bại');
  //     }
  //   } catch (error) {
  //     toast.error('Lỗi khi hủy subscription');
  //   }
  // };

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

  const handleDeleteTenant = async (tenantId: number) => {
    try {
      const res = await TenantService.deleteTenant(tenantId);
      if (res.success) {
        toast.success(res.message || 'Xóa tenant thành công');
        await loadTenants();
      } else {
        toast.error(res.message || 'Xóa tenant thất bại');
      }
    } catch (err) {
      console.error('Delete tenant error', err);
      toast.error('Lỗi khi xóa tenant');
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
    // Reload data after dialog closes (in case of add/edit)
    if (currentTab === 0) {
      loadFeatures();
    } else if (currentTab === 1) {
      loadSubscriptions();
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
              {loadingSubscriptions ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                  <CircularProgress />
                </Box>
              ) : (
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
              )}
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
              if (currentTab === 1) return loadSubscriptions();
              if (currentTab === 3) return loadTrustedLinks();
              if (currentTab === 4) return loadTenants();
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
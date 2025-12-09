import React, { useState, useEffect } from 'react';
import {
  Table, TableHead, TableRow, TableCell, TableBody,
  IconButton, Tooltip, Chip, Box, Dialog, DialogTitle,
  DialogContent, DialogActions, Button, Typography, Tabs, Tab, CircularProgress, TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ViewIcon from '@mui/icons-material/Visibility';

interface AdminContentProps {
  currentTab: number;
  onOpenDialog: (type: 'add' | 'edit' | 'view', item?: any) => void;
  features: any[];
  subscriptions: any[];
  suspiciousLinks?: any[];
  suspiciousRecent?: any[];
  suspiciousPhishing?: any[];
  tenants: any[];
  trustedLinks: any[];
  onDelete?: (type: string, id: number) => void;
  onPromoteToPhishing?: (url: string) => void;
  onUpdatePhishingStatus?: (suspiciousId: number, status: string) => void;
  onReportLink?: (payload: { url: string; pageTitle?: string; reason?: string }) => void;
  loadingSuspiciousRecent?: boolean;
  loadingSuspiciousPhishing?: boolean;
  loadSuspiciousRecent?: () => Promise<void>;
  loadSuspiciousPhishing?: () => Promise<void>;
}

const getRiskLevelColor = (level?: string): 'default' | 'error' | 'warning' | 'info' | 'success' => {
  if (!level) return 'default';
  const l = String(level).toLowerCase();
  if (l === 'critical') return 'error';
  if (l === 'high') return 'warning';
  if (l === 'medium') return 'info';
  if (l === 'low') return 'success';
  return 'default';
};

const AdminContent: React.FC<AdminContentProps> = ({
  currentTab,
  onOpenDialog,
  features,
  subscriptions,
  suspiciousRecent = [],
  suspiciousPhishing = [],
  tenants,
  trustedLinks,
  onDelete,
  onPromoteToPhishing,
  onUpdatePhishingStatus,
  onReportLink,
  loadingSuspiciousRecent,
  loadingSuspiciousPhishing,
  loadSuspiciousRecent,
  loadSuspiciousPhishing
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [itemToConfirm, setItemToConfirm] = useState<any | null>(null);
  const [suspiciousSubTab, setSuspiciousSubTab] = useState(0);

  // report dialog
  const [reportOpen, setReportOpen] = useState(false);
  const [reportForm, setReportForm] = useState({ url: '', pageTitle: '', reason: '' });
  const [reportLoading, setReportLoading] = useState(false);

  // track which tabs have been fetched to avoid re-fetching
  const [fetchedRecent, setFetchedRecent] = useState(false);
  const [fetchedPhishing, setFetchedPhishing] = useState(false);

  // load data only once per sub-tab when entering Suspicious Links tab
  useEffect(() => {
    if (currentTab !== 2) return; // only run on Suspicious Links tab

    if (suspiciousSubTab === 0 && !fetchedRecent) {
      // load recent only once
      loadSuspiciousRecent?.();
      setFetchedRecent(true);
    } else if (suspiciousSubTab === 1 && !fetchedPhishing) {
      // load phishing only once
      loadSuspiciousPhishing?.();
      setFetchedPhishing(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab, suspiciousSubTab]);

  const getStatusColor = (status: string) => {
    if (!status) return 'default';
    const s = String(status).toLowerCase();
    if (s === 'active') return 'success';
    if (s === 'inactive') return 'error';
    if (s === 'under review' || s === 'pending') return 'warning';
    return 'info';
  };

  const openConfirm = (type: string, id: any, name?: string) => {
    setItemToConfirm({ type, id, name });
    setConfirmOpen(true);
  };

  const cancelConfirm = () => {
    setConfirmOpen(false);
    setItemToConfirm(null);
  };

  const confirmAction = async () => {
    if (!itemToConfirm) return;
    const { type, id } = itemToConfirm;
    try {
      if (type === 'promote') {
        await onPromoteToPhishing?.(id);
      } else if (type === 'updateStatus') {
        await onUpdatePhishingStatus?.(id.suspiciousId, id.nextStatus);
      } else if (type === 'report-inline') {
        await onReportLink?.(id);
      } else {
        await onDelete?.(type, id);
      }
    } finally {
      setConfirmOpen(false);
      setItemToConfirm(null);
    }
  };

  // report dialog handlers
  const openReportDialog = (prefillUrl = '') => {
    setReportForm({ url: prefillUrl, pageTitle: '', reason: '' });
    setReportOpen(true);
  };
  const closeReportDialog = () => setReportOpen(false);
  const handleReportChange = (field: string, value: string) => setReportForm(prev => ({ ...prev, [field]: value }));
  const submitReport = async () => {
    if (!reportForm.url?.trim()) return;
    setReportLoading(true);
    try {
      await onReportLink?.({ url: reportForm.url.trim(), pageTitle: reportForm.pageTitle?.trim(), reason: reportForm.reason?.trim() });
      setReportOpen(false);
    } finally {
      setReportLoading(false);
    }
  };

  // UI helper: compact URL link with tooltip
  const UrlCell: React.FC<{ url: string }> = ({ url }) => (
    <Typography component="a" href={url} target="_blank" rel="noreferrer" sx={{
      color: 'primary.main', textDecoration: 'none', maxWidth: 520, display: 'inline-block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
    }} title={url}>
      {url}
    </Typography>
  );

  const renderSuspiciousRecentTable = () => (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Recent Reports</Typography>
        <Box>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => openReportDialog('')}>
            Report Link
          </Button>
        </Box>
      </Box>

      {loadingSuspiciousRecent ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress /></Box>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>URL</TableCell>
              <TableCell>Page Title</TableCell>
              <TableCell>Detected At</TableCell>
              <TableCell>Check Result</TableCell>
              <TableCell>Confidence</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suspiciousRecent.length === 0 ? (
              <TableRow><TableCell colSpan={6} align="center">Không có report mới</TableCell></TableRow>
            ) : suspiciousRecent.map((r: any) => (
              <TableRow key={r.linkId}>
                <TableCell><UrlCell url={r.url} /></TableCell>
                <TableCell sx={{ maxWidth: 300, wordBreak: 'break-word' }}>{r.pageTitle || '-'}</TableCell>
                <TableCell>{r.detectedAt ? new Date(r.detectedAt).toLocaleString() : '-'}</TableCell>
                <TableCell>{r.checkResult || '-'}</TableCell>
                <TableCell>
                  <Chip label={r.confidenceScore != null ? `${r.confidenceScore}%` : '-'} size="small" color={getRiskLevelColor(String(r.checkResult || ''))} />
                </TableCell>
                <TableCell>
                  <Tooltip title="Mark as Phishing">
                    <IconButton size="small" color="error" onClick={() => openConfirm('promote', r.url, r.url)}>
                      <BlockIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );

  const renderSuspiciousPhishingTable = () => (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Phishing (Verified)</Typography>
      </Box>

      {loadingSuspiciousPhishing ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress /></Box>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>URL</TableCell>
              <TableCell>Page Title</TableCell>
              <TableCell>Detected At</TableCell>
              <TableCell>Action Taken</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suspiciousPhishing.length === 0 ? (
              <TableRow><TableCell colSpan={6} align="center">Không có phishing record</TableCell></TableRow>
            ) : suspiciousPhishing.map((p: any) => (
              <TableRow key={p.suspiciousId}>
                <TableCell><UrlCell url={p.url} /></TableCell>
                <TableCell sx={{ maxWidth: 300, wordBreak: 'break-word' }}>{p.pageTitle || '-'}</TableCell>
                <TableCell>{p.detectedAt ? new Date(p.detectedAt).toLocaleString() : '-'}</TableCell>
                <TableCell>{p.actionTaken || '-'}</TableCell>
                <TableCell>
                  <Chip label={p.status || '-'} size="small" color={(p.status || '').toLowerCase() === 'active' ? 'success' : 'error'} />
                </TableCell>
                <TableCell>
                  <Tooltip title={p.status === 'Active' ? 'Set Inactive' : 'Set Active'}>
                    <IconButton
                      size="small"
                      onClick={() => openConfirm('updateStatus', { suspiciousId: p.suspiciousId, nextStatus: p.status === 'Active' ? 'Inactive' : 'Active' }, p.url)}
                    >
                      <CheckCircleIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton size="small" onClick={() => onOpenDialog('edit', p)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );

  const renderSuspiciousSection = () => (
    <>
      <Tabs value={suspiciousSubTab} onChange={(_, v) => setSuspiciousSubTab(v)} sx={{ mb: 2 }}>
        <Tab label="Recent" />
        <Tab label="Phishing" />
      </Tabs>
      {suspiciousSubTab === 0 ? renderSuspiciousRecentTable() : renderSuspiciousPhishingTable()}
    </>
  );

  const renderSuspiciousLinksTab = () => (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>Suspicious Links Management</Typography>
      </Box>
      {renderSuspiciousSection()}
    </>
  );

  const renderFeaturesTab = () => (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>Feature Management</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => onOpenDialog('add')} sx={{ bgcolor: '#7b1fa2' }}>
          Add Feature
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: '#f8fafc' }}>
            <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Feature Name</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {features.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                <Typography color="textSecondary">Không có feature nào</Typography>
              </TableCell>
            </TableRow>
          ) : (
            features.map((feature) => (
              <TableRow key={feature.featureId} hover>
                <TableCell>{feature.featureId}</TableCell>
                <TableCell>{feature.name}</TableCell>
                <TableCell>{feature.description}</TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton size="small" onClick={() => onOpenDialog('edit', feature)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton size="small" color="error" onClick={() => openConfirm('feature', feature.featureId, feature.name)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </>
  );

  const renderTrustedLinksTab = () => (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>Trusted Links</Typography>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>URL</TableCell>
            <TableCell>Added By</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!trustedLinks || trustedLinks.length === 0 ? (
            <TableRow><TableCell colSpan={5} align="center">Không có trusted links</TableCell></TableRow>
          ) : trustedLinks.map((t: any) => (
            <TableRow key={t.id}>
              <TableCell><UrlCell url={t.url} /></TableCell>
              <TableCell>{t.addedBy}</TableCell>
              <TableCell><Chip label={t.category} size="small" color="info" /></TableCell>
              <TableCell><Chip label={t.status} size="small" color={t.status?.toLowerCase() === 'active' ? 'success' : 'error'} /></TableCell>
              <TableCell>
                <Tooltip title="Edit"><IconButton size="small" onClick={() => onOpenDialog('edit', t)}><EditIcon /></IconButton></Tooltip>
                <Tooltip title="Delete"><IconButton size="small" color="error" onClick={() => openConfirm('trustedLink', t.id, t.url)}><DeleteIcon /></IconButton></Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );

  const renderSubscriptionsTab = () => (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>Subscription Management</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => onOpenDialog('add')} sx={{ bgcolor: '#f57c00' }}>
          Create Subscription
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: '#f8fafc' }}>
            <TableCell sx={{ fontWeight: 600 }}>Subscription ID</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>User ID</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Plan ID</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Start Date</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>End Date</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Auto Renew</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Payment</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subscriptions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} align="center" sx={{ py: 3 }}>
                <Typography color="textSecondary">Không có subscription nào</Typography>
              </TableCell>
            </TableRow>
          ) : (
            subscriptions.map((subscription) => (
              <TableRow key={subscription.subscriptionId} hover>
                <TableCell>{subscription.subscriptionId}</TableCell>
                <TableCell sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  <Tooltip title={subscription.userId}>
                    <span>{subscription.userId.substring(0, 8)}...</span>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={`Plan ${subscription.planId}`} 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={subscription.status} 
                    size="small" 
                    color={getStatusColor(subscription.status)} 
                  />
                </TableCell>
                <TableCell>{new Date(subscription.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(subscription.endDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Chip 
                    label={subscription.autoRenew ? 'Yes' : 'No'} 
                    size="small" 
                    color={subscription.autoRenew ? 'success' : 'default'}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  {subscription.payment ? (
                    <Tooltip title={`Status: ${subscription.payment.status} | Method: ${subscription.payment.paymentMethod}`}>
                      <Chip 
                        label={`$${subscription.payment.amount}`} 
                        size="small" 
                        color={subscription.payment.status === 'pending' ? 'warning' : 'success'}
                      />
                    </Tooltip>
                  ) : (
                    <Chip label="No Payment" size="small" color="default" variant="outlined" />
                  )}
                </TableCell>
                <TableCell>
                  <Tooltip title="View Details">
                    <IconButton size="small" onClick={() => onOpenDialog('view', subscription)}>
                      <ViewIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton size="small" onClick={() => onOpenDialog('edit', subscription)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  {/* Comment: API không có endpoint delete subscription */}
                  {/* <Tooltip title="Cancel Subscription">
                    <IconButton 
                      size="small" 
                      color="error" 
                      onClick={() => openDeleteConfirm('subscription', subscription.subscriptionId, `Subscription #${subscription.subscriptionId}`)}
                    >
                      <BlockIcon />
                    </IconButton>
                  </Tooltip> */}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </>
  );


  const renderTenantsTab = () => (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>Tenant Management</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => onOpenDialog('add')} sx={{ bgcolor: '#1976d2' }}>
          Add Tenant
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: '#f8fafc' }}>
            <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Company Name</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Domain</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Contact Phone</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tenants.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Chưa có tenant nào
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            tenants.map((tenant: any) => (
              <TableRow key={tenant.tenantId} hover>
                <TableCell>{tenant.tenantId}</TableCell>
                <TableCell sx={{ fontWeight: 500 }}>{tenant.companyName}</TableCell>
                <TableCell>
                  <Chip 
                    label={tenant.domain} 
                    size="small" 
                    color="info"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>{tenant.contactPhone || '-'}</TableCell>
                <TableCell><Chip label={tenant.status} size="small" color={getStatusColor(tenant.status)} /></TableCell>
                <TableCell>
                  <Tooltip title="View"><IconButton size="small" onClick={() => onOpenDialog('view', tenant)}><ViewIcon /></IconButton></Tooltip>
                  <Tooltip title="Edit"><IconButton size="small" onClick={() => onOpenDialog('edit', tenant)}><EditIcon /></IconButton></Tooltip>
                  <Tooltip title="Delete">
                    <IconButton 
                      size="small" 
                      color="error"
                      onClick={() => openConfirm('tenant', tenant.tenantId, tenant.companyName)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </>
  );

  const renderTabContent = () => {
    switch (currentTab) {
      case 0: return renderFeaturesTab();
      case 1: return renderSubscriptionsTab();
      case 2: return renderSuspiciousLinksTab();
      case 3: return renderTrustedLinksTab();
      case 4: return renderTenantsTab();
      default: return renderFeaturesTab();
    }
  };

  return (
    <Box>
      {renderTabContent()}

      {/* Action confirmation dialog */}
      <Dialog open={confirmOpen} onClose={cancelConfirm} maxWidth="xs" fullWidth>
        <DialogTitle>Xác nhận</DialogTitle>
        <DialogContent>
          <Typography>
            Bạn có chắc muốn thực hiện hành động trên <strong>{itemToConfirm?.name ?? itemToConfirm?.id}</strong> không?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelConfirm}>Hủy</Button>
          <Button variant="contained" color="error" onClick={confirmAction}>Xác nhận</Button>
        </DialogActions>
      </Dialog>

      {/* Report dialog */}
      <Dialog open={reportOpen} onClose={closeReportDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Report Suspicious Link</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="URL" sx={{ mb: 2, mt: 1 }} value={reportForm.url} onChange={(e) => handleReportChange('url', e.target.value)} />
          <TextField fullWidth label="Page Title" sx={{ mb: 2 }} value={reportForm.pageTitle} onChange={(e) => handleReportChange('pageTitle', e.target.value)} />
          <TextField fullWidth label="Reason" multiline rows={3} value={reportForm.reason} onChange={(e) => handleReportChange('reason', e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeReportDialog}>Cancel</Button>
          <Button variant="contained" onClick={submitReport} disabled={reportLoading}>
            {reportLoading ? 'Sending...' : 'Send Report'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminContent;

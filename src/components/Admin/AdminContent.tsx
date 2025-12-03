import React, { useState } from 'react';
import {
  Table, TableHead, TableRow, TableCell, TableBody,
  IconButton, Tooltip, Chip, Box, Dialog, DialogTitle,
  DialogContent, DialogActions, Button, Typography, Badge
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ViewIcon from '@mui/icons-material/Visibility';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PeopleIcon from '@mui/icons-material/People';

interface AdminContentProps {
  currentTab: number;
  onOpenDialog: (type: 'add' | 'edit' | 'view', item?: any) => void;
  features: any[];
  subscriptions: any[];
  suspiciousLinks: any[];
  trustedLinks: any[];
  tenants: any[];
  onDelete?: (type: string, id: number) => void;
}

const AdminContent: React.FC<AdminContentProps> = ({
  currentTab,
  onOpenDialog,
  features,
  subscriptions,
  suspiciousLinks,
  trustedLinks,
  tenants,
  onDelete
}) => {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ type: string; id: number; name?: string } | null>(null);

  const getStatusColor = (status: string) => {
    if (!status) return 'default';
    const s = String(status).toLowerCase();
    if (s === 'active') return 'success';
    if (s === 'inactive') return 'error';
    if (s === 'under review' || s === 'pending') return 'warning';
    return 'info';
  };

  // Open confirm dialog and store item
  const openDeleteConfirm = (type: string, id: number, name?: string) => {
    setItemToDelete({ type, id, name });
    setDeleteConfirmOpen(true);
  };

  const cancelDelete = () => {
    setDeleteConfirmOpen(false);
    setItemToDelete(null);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    const { type, id } = itemToDelete;
    try {
      await onDelete?.(type, id);
    } finally {
      setDeleteConfirmOpen(false);
      setItemToDelete(null);
    }
  };

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
                    <IconButton size="small" color="error" onClick={() => openDeleteConfirm('feature', feature.featureId, feature.name)}>
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

  const renderSubscriptionsTab = () => (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>Subscription Management</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => onOpenDialog('add')} sx={{ bgcolor: '#f57c00' }}>
          Add Subscription
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: '#f8fafc' }}>
            <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>User ID</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Plan</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Start Date</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>End Date</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subscriptions.map((subscription) => (
            <TableRow key={subscription.id} hover>
              <TableCell>{subscription.id}</TableCell>
              <TableCell>{subscription.userId}</TableCell>
              <TableCell><Chip label={subscription.plan} size="small" color="primary" /></TableCell>
              <TableCell><Chip label={subscription.status} size="small" color={getStatusColor(subscription.status)} /></TableCell>
              <TableCell>{subscription.startDate}</TableCell>
              <TableCell>{subscription.endDate}</TableCell>
              <TableCell>{subscription.amount}</TableCell>
              <TableCell>
                <Tooltip title="Edit"><IconButton size="small" onClick={() => onOpenDialog('edit', subscription)}><EditIcon /></IconButton></Tooltip>
                <Tooltip title="Cancel"><IconButton size="small" color="error"><BlockIcon /></IconButton></Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );

  const renderSuspiciousLinksTab = () => (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>Suspicious Links Management</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => onOpenDialog('add')} sx={{ bgcolor: '#d32f2f' }}>
          Report Link
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: '#f8fafc' }}>
            <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>URL</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Reported By</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Risk Level</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Report Date</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {suspiciousLinks.map((link) => (
            <TableRow key={link.id} hover>
              <TableCell>{link.id}</TableCell>
              <TableCell sx={{ maxWidth: 200, wordBreak: 'break-all' }}>{link.url}</TableCell>
              <TableCell>{link.reportedBy}</TableCell>
              <TableCell><Chip label={link.riskLevel} size="small" color={getRiskLevelColor(link.riskLevel)} /></TableCell>
              <TableCell><Chip label={link.status} size="small" color={getStatusColor(link.status)} /></TableCell>
              <TableCell>{link.reportDate}</TableCell>
              <TableCell>
                <Tooltip title="Review"><IconButton size="small" onClick={() => onOpenDialog('view', link)}><ViewIcon /></IconButton></Tooltip>
                <Tooltip title="Block"><IconButton size="small" color="error"><BlockIcon /></IconButton></Tooltip>
                <Tooltip title="Approve"><IconButton size="small" color="success"><CheckCircleIcon /></IconButton></Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );

  const renderTrustedLinksTab = () => (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>Trusted Links Management</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => onOpenDialog('add')} sx={{ bgcolor: '#388e3c' }}>
          Add Trusted Link
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>URL / Domain</TableCell>
            <TableCell>Added By</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trustedLinks.map((link: any) => (
            <TableRow key={link.id} hover>
              <TableCell>{link.id}</TableCell>
              <TableCell sx={{ maxWidth: 200, wordBreak: 'break-all' }}>{link.url}</TableCell>
              <TableCell>{link.addedBy}</TableCell>
              <TableCell><Chip label={link.category} size="small" color="info" /></TableCell>
              <TableCell>
                <Chip label={link.status} size="small" color={getStatusColor(link.status)} />
              </TableCell>
              <TableCell>
                <Tooltip title="Edit">
                  <IconButton size="small" onClick={() => onOpenDialog('edit', link)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => openDeleteConfirm('trustedLink', link.id, link.url)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
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
            <TableCell sx={{ fontWeight: 600 }}>Tenant Name</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Domain</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Users</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Created Date</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tenants.map((tenant) => (
            <TableRow key={tenant.id} hover>
              <TableCell>{tenant.id}</TableCell>
              <TableCell>{tenant.name}</TableCell>
              <TableCell>{tenant.domain}</TableCell>
              <TableCell><Chip label={tenant.status} size="small" color={getStatusColor(tenant.status)} /></TableCell>
              <TableCell>
                <Badge badgeContent={tenant.users} color="primary">
                  <PeopleIcon />
                </Badge>
              </TableCell>
              <TableCell>{tenant.createdDate}</TableCell>
              <TableCell>
                <Tooltip title="View"><IconButton size="small" onClick={() => onOpenDialog('view', tenant)}><ViewIcon /></IconButton></Tooltip>
                <Tooltip title="Edit"><IconButton size="small" onClick={() => onOpenDialog('edit', tenant)}><EditIcon /></IconButton></Tooltip>
                <Tooltip title="Delete"><IconButton size="small" color="error"><DeleteIcon /></IconButton></Tooltip>
              </TableCell>
            </TableRow>
          ))}
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
      
      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={cancelDelete}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <Typography>
            Bạn có chắc muốn xóa{' '}
            <strong>{itemToDelete?.name ?? itemToDelete?.id}</strong> không? Hành động này không thể hoàn tác.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>Hủy</Button>
          <Button variant="contained" color="error" onClick={confirmDelete}>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminContent;

// Helper: màu cho risk level nếu bạn hiển thị risk somewhere
const getRiskLevelColor = (level?: string): 'default' | 'error' | 'warning' | 'info' | 'success' => {
  if (!level) return 'default';
  const l = String(level).toLowerCase();
  if (l === 'critical') return 'error';
  if (l === 'high') return 'warning';
  if (l === 'medium') return 'info';
  if (l === 'low') return 'success';
  return 'default';
};

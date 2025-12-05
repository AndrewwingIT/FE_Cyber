import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { toast } from 'react-toastify';
import FeatureService from '../../app/services/FeatureService';
import TrustedLinkService from '../../app/services/TrustedLinkService';
import SubscriptionService from '../../app/services/SubscriptionService';
import TenantService from '../../app/services/TenantService';

interface AdminDialogProps {
  open: boolean;
  onClose: () => void;
  dialogType: 'add' | 'edit' | 'view';
  selectedItem?: any;
  currentTab: number;
  onRefresh?: () => void;
}

const AdminDialog: React.FC<AdminDialogProps> = ({
  open,
  onClose,
  dialogType,
  selectedItem,
  currentTab,
  onRefresh
}) => {
  const [formData, setFormData] = useState<any>({
    name: '',
    description: '',
    // trusted link fields
    domain: '',
    url: '',
    category: '',
    source: '',
    status: 'Active',
    // subscription fields
    planId: '',
    userId: '',
    autoRenew: true,
    endDate: '',
    // tenant fields
    companyName: '',
    contactPhone: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedItem && dialogType !== 'add') {
      setFormData({
        name: selectedItem.name || '',
        description: selectedItem.description || '',
        domain: selectedItem.domain || selectedItem.url || '',
        url: selectedItem.url || '',
        category: selectedItem.category || '',
        source: selectedItem.source || selectedItem.addedBy || '',
        status: selectedItem.status || 'Active',
        // subscription fields
        planId: selectedItem.planId || '',
        userId: selectedItem.userId || '',
        autoRenew: selectedItem.autoRenew ?? true,
        endDate: selectedItem.endDate ? selectedItem.endDate.split('T')[0] : '',
        // tenant fields
        companyName: selectedItem.companyName || '',
        contactPhone: selectedItem.contactPhone || '',
        address: selectedItem.address || '',
      });
    } else {
      setFormData({
        name: '',
        description: '',
        domain: '',
        url: '',
        category: '',
        source: '',
        status: 'Active',
        planId: '',
        userId: '',
        autoRenew: true,
        endDate: '',
        companyName: '',
        contactPhone: '',
        address: '',
      });
    }
  }, [selectedItem, dialogType, open]);

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev: any) => ({ 
      ...prev, 
      [field]: field === 'autoRenew' ? value === 'true' : value 
    }));
  };

  const handleSubmit = async () => {
    // Validation
    if (currentTab === 0) {
      if (!formData.name?.trim() || !formData.description?.trim()) {
        toast.error('Vui lòng điền đầy đủ thông tin');
        return;
      }
    }

    if (currentTab === 1) {
      if (dialogType === 'add' && !formData.planId) {
        toast.error('Vui lòng chọn Plan ID');
        return;
      }
    }

    if (currentTab === 3) {
      if (!formData.domain?.trim() || !formData.url?.trim()) {
        toast.error('Vui lòng điền domain và url cho trusted link');
        return;
      }
    }

    if (currentTab === 4) {
      if (!formData.companyName?.trim() || !formData.domain?.trim()) {
        toast.error('Vui lòng điền tên công ty và domain cho tenant');
        return;
      }
    }

    setLoading(true);
    try {
      let response: any;

      // Features tab
      if (currentTab === 0) {
        if (dialogType === 'add') {
          response = await FeatureService.createFeature({
            name: formData.name.trim(),
            description: formData.description.trim()
          });
        } else if (dialogType === 'edit' && selectedItem) {
          response = await FeatureService.updateFeature((selectedItem as any).featureId, {
            name: formData.name.trim(),
            description: formData.description.trim()
          });
        }
      }

      // Subscriptions tab
      if (currentTab === 1) {
        if (dialogType === 'add') {
          response = await SubscriptionService.createSubscription({
            planId: Number(formData.planId),
            userId: formData.userId?.trim() || undefined,
          });
        } else if (dialogType === 'edit' && selectedItem) {
          // Backend chỉ cho phép update status
          if (!formData.status) {
            toast.error('Vui lòng chọn status');
            return;
          }
          
          response = await SubscriptionService.updateSubscriptionStatus(
            (selectedItem as any).subscriptionId,
            { status: formData.status }
          );
        }
      }

      // Trusted Links tab
      if (currentTab === 3) {
        const payload = {
          domain: formData.domain.trim(),
          url: formData.url.trim(),
          category: formData.category?.trim() || '',
          source: formData.source?.trim() || '',
          status: formData.status || 'Active',
        };

        if (dialogType === 'add') {
          response = await TrustedLinkService.createTrustedLink(payload);
        } else if (dialogType === 'edit' && selectedItem) {
          const id = (selectedItem as any).linkId ?? (selectedItem as any).id;
          response = await TrustedLinkService.updateTrustedLink(Number(id), payload);
        }
      }

      // Tenants tab
      if (currentTab === 4) {
        if (dialogType === 'add') {
          const createPayload = {
            companyName: formData.companyName.trim(),
            domain: formData.domain.trim(),
            contactPhone: formData.contactPhone?.trim() || undefined,
            address: formData.address?.trim() || undefined,
          };
          response = await TenantService.createTenant(createPayload);
        } else if (dialogType === 'edit' && selectedItem) {
          const updatePayload = {
            companyName: formData.companyName.trim(),
            domain: formData.domain.trim(),
            contactPhone: formData.contactPhone?.trim() || undefined,
            address: formData.address?.trim() || undefined,
            status: formData.status || 'Active',
          };
          response = await TenantService.updateTenant((selectedItem as any).tenantId, updatePayload);
        }
      }

      if (response?.success) {
        toast.success(response.message || 'Thành công!');
        await onRefresh?.();
        onClose();
      } else {
        toast.error(response?.message || 'Thất bại');
      }
    } catch (error) {
      toast.error('Lỗi khi xử lý');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderFeatureForm = () => (
    <Box sx={{ pt: 2 }}>
      <TextField
        fullWidth
        label="Feature Name"
        variant="outlined"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        sx={{ mb: 2 }}
        disabled={dialogType === 'view' || loading}
        required
      />
      <TextField
        fullWidth
        label="Description"
        variant="outlined"
        value={formData.description}
        onChange={(e) => handleChange('description', e.target.value)}
        multiline
        rows={4}
        disabled={dialogType === 'view' || loading}
        required
      />
    </Box>
  );

  const renderSubscriptionForm = () => (
    <Box sx={{ pt: 2 }}>
      {dialogType === 'add' ? (
        <>
          <FormControl fullWidth sx={{ mb: 2 }} required>
            <InputLabel id="plan-id-label">Plan ID</InputLabel>
            <Select
              labelId="plan-id-label"
              label="Plan ID"
              value={formData.planId}
              onChange={(e) => handleChange('planId', String(e.target.value))}
              disabled={loading}
            >
              <MenuItem value={1}>Plan 1 - Basic ($28)</MenuItem>
              <MenuItem value={2}>Plan 2 - Plus ($35)</MenuItem>
              <MenuItem value={3}>Plan 3 - Premium ($49)</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="User ID (Optional)"
            variant="outlined"
            value={formData.userId}
            onChange={(e) => handleChange('userId', e.target.value)}
            sx={{ mb: 2 }}
            disabled={loading}
            helperText="Để trống nếu tạo cho user hiện tại"
          />
        </>
      ) : (
        <>
          <TextField
            fullWidth
            label="Subscription ID"
            variant="outlined"
            value={selectedItem?.subscriptionId || ''}
            sx={{ mb: 2 }}
            disabled
          />
          <TextField
            fullWidth
            label="Plan ID"
            variant="outlined"
            value={selectedItem?.planId || ''}
            sx={{ mb: 2 }}
            disabled
          />
          <TextField
            fullWidth
            label="User ID"
            variant="outlined"
            value={selectedItem?.userId || ''}
            sx={{ mb: 2 }}
            disabled
          />
          <TextField
            fullWidth
            label="Start Date"
            variant="outlined"
            value={selectedItem?.startDate ? new Date(selectedItem.startDate).toLocaleDateString() : ''}
            sx={{ mb: 2 }}
            disabled
          />
          <TextField
            fullWidth
            label="End Date"
            variant="outlined"
            value={selectedItem?.endDate ? new Date(selectedItem.endDate).toLocaleDateString() : ''}
            sx={{ mb: 2 }}
            disabled
          />
          <TextField
            fullWidth
            label="Auto Renew"
            variant="outlined"
            value={selectedItem?.autoRenew ? 'Yes' : 'No'}
            sx={{ mb: 2 }}
            disabled
          />
          <FormControl fullWidth sx={{ mb: 2 }} required>
            <InputLabel id="sub-status-label">Status *</InputLabel>
            <Select
              labelId="sub-status-label"
              label="Status *"
              value={formData.status}
              onChange={(e) => handleChange('status', String(e.target.value))}
              disabled={dialogType === 'view' || loading}
            >
              <MenuItem 
                value="Active"
                disabled={!selectedItem?.payment || selectedItem?.payment?.status !== 'completed'}
              >
                Active {!selectedItem?.payment || selectedItem?.payment?.status !== 'completed' ? '(Requires successful payment)' : ''}
              </MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
              <MenuItem value="Expired">Expired</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
            </Select>
          </FormControl>
          {selectedItem?.payment && (
            <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                Payment Information
              </Typography>
              <Typography variant="body2">Amount: ${selectedItem.payment.amount}</Typography>
              <Typography variant="body2">Method: {selectedItem.payment.paymentMethod}</Typography>
              <Typography variant="body2">Status: {selectedItem.payment.status}</Typography>
              <Typography variant="body2">Transaction ID: {selectedItem.payment.transactionId}</Typography>
            </Box>
          )}
        </>
      )}
    </Box>
  );

  const renderTrustedLinkForm = () => (
    <Box sx={{ pt: 2 }}>
      <TextField
        label="Domain"
        fullWidth
        value={formData.domain}
        onChange={(e) => handleChange('domain', e.target.value)}
        sx={{ mb: 2 }}
        disabled={dialogType === 'view' || loading}
        required
      />
      <TextField
        label="URL"
        fullWidth
        value={formData.url}
        onChange={(e) => handleChange('url', e.target.value)}
        sx={{ mb: 2 }}
        disabled={dialogType === 'view' || loading}
        required
      />
      <TextField
        label="Category"
        fullWidth
        value={formData.category}
        onChange={(e) => handleChange('category', e.target.value)}
        sx={{ mb: 2 }}
        disabled={dialogType === 'view' || loading}
      />
      <TextField
        label="Source"
        fullWidth
        value={formData.source}
        onChange={(e) => handleChange('source', e.target.value)}
        sx={{ mb: 2 }}
        disabled={dialogType === 'view' || loading}
      />

      {/* Status as select between Active / Inactive. Inactive shown red */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="trusted-status-label">Status</InputLabel>
        <Select
          labelId="trusted-status-label"
          label="Status"
          value={formData.status}
          onChange={(e) => handleChange('status', String(e.target.value))}
          disabled={dialogType === 'view' || loading}
          sx={{
            // if inactive -> show red text
            '& .MuiSelect-select': {
              color: formData.status === 'Inactive' ? 'error.main' : 'text.primary'
            }
          }}
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">
            <Box component="span" sx={{ color: 'error.main' }}>Inactive</Box>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );

  const renderTenantForm = () => (
    <Box sx={{ pt: 2 }}>
      <TextField
        label="Company Name"
        fullWidth
        value={formData.companyName}
        onChange={(e) => handleChange('companyName', e.target.value)}
        sx={{ mb: 2 }}
        disabled={dialogType === 'view' || loading}
        required
        helperText="Tên công ty hoặc tổ chức"
      />
      <TextField
        label="Domain"
        fullWidth
        value={formData.domain}
        onChange={(e) => handleChange('domain', e.target.value)}
        sx={{ mb: 2 }}
        disabled={dialogType === 'view' || loading}
        required
        helperText="Ví dụ: company.com"
      />
      <TextField
        label="Contact Phone"
        fullWidth
        value={formData.contactPhone}
        onChange={(e) => handleChange('contactPhone', e.target.value)}
        sx={{ mb: 2 }}
        disabled={dialogType === 'view' || loading}
        helperText="Số điện thoại liên hệ"
      />
      <TextField
        label="Address"
        fullWidth
        value={formData.address}
        onChange={(e) => handleChange('address', e.target.value)}
        sx={{ mb: 2 }}
        disabled={dialogType === 'view' || loading}
        multiline
        rows={2}
        helperText="Địa chỉ công ty"
      />

      {dialogType === 'edit' && (
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="tenant-status-label">Status</InputLabel>
          <Select
            labelId="tenant-status-label"
            label="Status"
            value={formData.status}
            onChange={(e) => handleChange('status', String(e.target.value))}
            disabled={dialogType === 'view' || loading}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
      )}

      {dialogType === 'view' && selectedItem && (
        <>
          {/* <TextField
            label="Tenant ID"
            fullWidth
            value={(selectedItem as any).tenantId || ''}
            sx={{ mb: 2 }}
            disabled
          />
          <TextField
            label="Created At"
            fullWidth
            value={(selectedItem as any).createdAt ? new Date((selectedItem as any).createdAt).toLocaleString() : ''}
            sx={{ mb: 2 }}
            disabled
          /> */}
          <TextField
            label="Status"
            fullWidth
            value={(selectedItem as any).status || ''}
            sx={{ mb: 2 }}
            disabled
          />
        </>
      )}
    </Box>
  );

  const getTitle = () => {
    if (currentTab === 0) {
      if (dialogType === 'add') return 'Add New Feature';
      if (dialogType === 'edit') return 'Edit Feature';
      if (dialogType === 'view') return 'View Feature Details';
    }
    if (currentTab === 1) {
      if (dialogType === 'add') return 'Create New Subscription';
      if (dialogType === 'edit') return 'Edit Subscription';
      if (dialogType === 'view') return 'View Subscription Details';
    }
    if (currentTab === 3) {
      if (dialogType === 'add') return 'Add Trusted Link';
      if (dialogType === 'edit') return 'Edit Trusted Link';
      if (dialogType === 'view') return 'View Trusted Link';
    }
    if (currentTab === 4) {
      if (dialogType === 'add') return 'Add New Tenant';
      if (dialogType === 'edit') return 'Edit Tenant';
      if (dialogType === 'view') return 'View Tenant Details';
    }
    return 'Item Details';
  };

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>{getTitle()}</DialogTitle>
      <DialogContent>
        {currentTab === 0 && renderFeatureForm()}
        {currentTab === 1 && renderSubscriptionForm()}
        {currentTab === 3 && renderTrustedLinkForm()}
        {currentTab === 4 && renderTenantForm()}
        {currentTab !== 0 && currentTab !== 1 && currentTab !== 3 && currentTab !== 4 && (
          <Box sx={{ pt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Form chưa được triển khai cho tab này.
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        {dialogType !== 'view' && (
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Đang xử lý...' : (dialogType === 'add' ? 'Add' : 'Save')}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AdminDialog;

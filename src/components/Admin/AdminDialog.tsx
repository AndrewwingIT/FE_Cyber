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
      });
    }
  }, [selectedItem, dialogType, open]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    // Validation
    if (currentTab === 0) {
      if (!formData.name?.trim() || !formData.description?.trim()) {
        toast.error('Vui lòng điền đầy đủ thông tin');
        return;
      }
    }

    if (currentTab === 3) {
      if (!formData.domain?.trim() || !formData.url?.trim()) {
        toast.error('Vui lòng điền domain và url cho trusted link');
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

  const getTitle = () => {
    if (currentTab === 0) {
      if (dialogType === 'add') return 'Add New Feature';
      if (dialogType === 'edit') return 'Edit Feature';
      if (dialogType === 'view') return 'View Feature Details';
    }
    if (currentTab === 3) {
      if (dialogType === 'add') return 'Add Trusted Link';
      if (dialogType === 'edit') return 'Edit Trusted Link';
      if (dialogType === 'view') return 'View Trusted Link';
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
        {currentTab === 3 && renderTrustedLinkForm()}
        {currentTab !== 0 && currentTab !== 3 && (
          <Box sx={{ pt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Form cho tab này sẽ được implement sau.
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

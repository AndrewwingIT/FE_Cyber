import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Alert,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography
} from '@mui/material';

interface AdminDialogProps {
  open: boolean;
  onClose: () => void;
  dialogType: 'add' | 'edit' | 'view';
  selectedItem?: any;
}

const AdminDialog: React.FC<AdminDialogProps> = ({
  open,
  onClose,
  dialogType,
  selectedItem
}) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        {dialogType === 'add' && 'Add New Item'}
        {dialogType === 'edit' && 'Edit Item'}
        {dialogType === 'view' && 'View Item Details'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <Alert severity="info" sx={{ mb: 2 }}>
            This is a placeholder dialog. Implement specific forms based on the selected tab and action.
            {selectedItem && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">
                  Selected item: {JSON.stringify(selectedItem, null, 2)}
                </Typography>
              </Box>
            )}
          </Alert>
          <TextField
            fullWidth
            label="Sample Field"
            variant="outlined"
            sx={{ mb: 2 }}
            disabled={dialogType === 'view'}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              disabled={dialogType === 'view'}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>
        {dialogType !== 'view' && (
          <Button 
            variant="contained" 
            onClick={onClose}
          >
            {dialogType === 'add' ? 'Add' : 'Save'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AdminDialog;

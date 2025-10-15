import React from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Tooltip,
  Badge
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Visibility as ViewIcon,
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon,
  People as PeopleIcon
} from '@mui/icons-material';

interface AdminContentProps {
  currentTab: number;
  onOpenDialog: (type: 'add' | 'edit' | 'view', item?: any) => void;
  users: any[];
  features: any[];
  subscriptions: any[];
  suspiciousLinks: any[];
  trustedLinks: any[];
  tenants: any[];
}

const AdminContent: React.FC<AdminContentProps> = ({
  currentTab,
  onOpenDialog,
  users,
  features,
  subscriptions,
  suspiciousLinks,
  trustedLinks,
  tenants
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Inactive': return 'default';
      case 'Blocked': return 'error';
      case 'Under Review': return 'warning';
      case 'Expired': return 'error';
      default: return 'default';
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'Critical': return 'error';
      case 'High': return 'warning';
      case 'Medium': return 'info';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  const renderUsersTab = () => (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>User Management</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => onOpenDialog('add')} sx={{ bgcolor: '#1976d2' }}>
          Add User
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f8fafc' }}>
              <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Created Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip label={user.role} size="small" color={user.role === 'Admin' ? 'primary' : 'default'} />
                </TableCell>
                <TableCell>
                  <Chip label={user.status} size="small" color={getStatusColor(user.status)} />
                </TableCell>
                <TableCell>{user.createdAt}</TableCell>
                <TableCell>
                  <Tooltip title="View"><IconButton size="small" onClick={() => onOpenDialog('view', user)}><ViewIcon /></IconButton></Tooltip>
                  <Tooltip title="Edit"><IconButton size="small" onClick={() => onOpenDialog('edit', user)}><EditIcon /></IconButton></Tooltip>
                  <Tooltip title="Delete"><IconButton size="small" color="error"><DeleteIcon /></IconButton></Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f8fafc' }}>
              <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Feature Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {features.map((feature) => (
              <TableRow key={feature.id} hover>
                <TableCell>{feature.id}</TableCell>
                <TableCell>{feature.name}</TableCell>
                <TableCell>{feature.description}</TableCell>
                <TableCell><Chip label={feature.type} size="small" color="primary" /></TableCell>
                <TableCell><Chip label={feature.status} size="small" color={getStatusColor(feature.status)} /></TableCell>
                <TableCell>
                  <Tooltip title="Edit"><IconButton size="small" onClick={() => onOpenDialog('edit', feature)}><EditIcon /></IconButton></Tooltip>
                  <Tooltip title="Delete"><IconButton size="small" color="error"><DeleteIcon /></IconButton></Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
      <TableContainer>
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
      </TableContainer>
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
      <TableContainer>
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
      </TableContainer>
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
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f8fafc' }}>
              <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>URL</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Added By</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Added Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trustedLinks.map((link) => (
              <TableRow key={link.id} hover>
                <TableCell>{link.id}</TableCell>
                <TableCell sx={{ maxWidth: 200, wordBreak: 'break-all' }}>{link.url}</TableCell>
                <TableCell>{link.addedBy}</TableCell>
                <TableCell><Chip label={link.category} size="small" color="info" /></TableCell>
                <TableCell><Chip label={link.status} size="small" color={getStatusColor(link.status)} /></TableCell>
                <TableCell>{link.addedDate}</TableCell>
                <TableCell>
                  <Tooltip title="Edit"><IconButton size="small" onClick={() => onOpenDialog('edit', link)}><EditIcon /></IconButton></Tooltip>
                  <Tooltip title="Delete"><IconButton size="small" color="error"><DeleteIcon /></IconButton></Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
      <TableContainer>
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
      </TableContainer>
    </>
  );

  const renderTabContent = () => {
    switch (currentTab) {
      case 0: return renderUsersTab();
      case 1: return renderFeaturesTab();
      case 2: return renderSubscriptionsTab();
      case 3: return renderSuspiciousLinksTab();
      case 4: return renderTrustedLinksTab();
      case 5: return renderTenantsTab();
      default: return renderUsersTab();
    }
  };

  return <>{renderTabContent()}</>;
};

export default AdminContent;

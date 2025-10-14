import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Avatar,
  Tooltip,
  Badge,
  Alert
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Visibility as ViewIcon,
  Security as SecurityIcon,
  Link as LinkIcon,
  People as PeopleIcon,
  Subscriptions as SubscribeIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Block as BlockIcon
} from '@mui/icons-material';
import AdminLayout from '../../layouts/AdminLayout';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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

  const getRiskLevelColor = (level: string): 'error' | 'warning' | 'info' | 'success' | 'default' => {
    switch (level) {
      case 'Critical': return 'error';
      case 'High': return 'warning';
      case 'Medium': return 'info';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string): 'success' | 'default' | 'error' | 'warning' => {
    switch (status) {
      case 'Active': return 'success';
      case 'Inactive': return 'default';
      case 'Blocked': return 'error';
      case 'Under Review': return 'warning';
      case 'Expired': return 'error';
      default: return 'default';
    }
  };

  // Dashboard Stats Component
  const DashboardStats = () => (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, gap: 3, mb: 4 }}>
      <Card sx={{ bgcolor: '#e3f2fd' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                {users.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Users
              </Typography>
            </Box>
            <Avatar sx={{ bgcolor: '#1976d2' }}>
              <PeopleIcon />
            </Avatar>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ bgcolor: '#f3e5f5' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#7b1fa2' }}>
                {subscriptions.filter(s => s.status === 'Active').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active Subscriptions
              </Typography>
            </Box>
            <Avatar sx={{ bgcolor: '#7b1fa2' }}>
              <SubscribeIcon />
            </Avatar>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ bgcolor: '#fff3e0' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#f57c00' }}>
                {suspiciousLinks.filter(l => l.status === 'Under Review').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Suspicious Links
              </Typography>
            </Box>
            <Avatar sx={{ bgcolor: '#f57c00' }}>
              <WarningIcon />
            </Avatar>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ bgcolor: '#e8f5e8' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#388e3c' }}>
                {trustedLinks.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Trusted Links
              </Typography>
            </Box>
            <Avatar sx={{ bgcolor: '#388e3c' }}>
              <CheckCircleIcon />
            </Avatar>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );

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
          <DashboardStats />

          {/* Main Content */}
        <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={currentTab} 
              onChange={handleTabChange}
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

          {/* Users Tab */}
          <TabPanel value={currentTab} index={0}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                User Management
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog('add')}
                sx={{ bgcolor: '#1976d2' }}
              >
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
                        <Chip 
                          label={user.role} 
                          size="small"
                          color={user.role === 'Admin' ? 'primary' : 'default'}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={user.status} 
                          size="small"
                          color={getStatusColor(user.status)}
                        />
                      </TableCell>
                      <TableCell>{user.createdAt}</TableCell>
                      <TableCell>
                        <Tooltip title="View">
                          <IconButton size="small" onClick={() => handleOpenDialog('view', user)}>
                            <ViewIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton size="small" onClick={() => handleOpenDialog('edit', user)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton size="small" color="error">
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          {/* Features Tab */}
          <TabPanel value={currentTab} index={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Feature Management
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog('add')}
                sx={{ bgcolor: '#7b1fa2' }}
              >
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
                      <TableCell>
                        <Chip 
                          label={feature.type} 
                          size="small"
                          color="primary"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={feature.status} 
                          size="small"
                          color={getStatusColor(feature.status)}
                        />
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Edit">
                          <IconButton size="small" onClick={() => handleOpenDialog('edit', feature)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton size="small" color="error">
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          {/* Subscriptions Tab */}
          <TabPanel value={currentTab} index={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Subscription Management
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog('add')}
                sx={{ bgcolor: '#f57c00' }}
              >
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
                      <TableCell>
                        <Chip 
                          label={subscription.plan} 
                          size="small"
                          color="primary"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={subscription.status} 
                          size="small"
                          color={getStatusColor(subscription.status)}
                        />
                      </TableCell>
                      <TableCell>{subscription.startDate}</TableCell>
                      <TableCell>{subscription.endDate}</TableCell>
                      <TableCell>{subscription.amount}</TableCell>
                      <TableCell>
                        <Tooltip title="Edit">
                          <IconButton size="small" onClick={() => handleOpenDialog('edit', subscription)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Cancel">
                          <IconButton size="small" color="error">
                            <BlockIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          {/* Suspicious Links Tab */}
          <TabPanel value={currentTab} index={3}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Suspicious Links Management
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog('add')}
                sx={{ bgcolor: '#d32f2f' }}
              >
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
                      <TableCell sx={{ maxWidth: 200, wordBreak: 'break-all' }}>
                        {link.url}
                      </TableCell>
                      <TableCell>{link.reportedBy}</TableCell>
                      <TableCell>
                        <Chip 
                          label={link.riskLevel} 
                          size="small"
                          color={getRiskLevelColor(link.riskLevel)}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={link.status} 
                          size="small"
                          color={getStatusColor(link.status)}
                        />
                      </TableCell>
                      <TableCell>{link.reportDate}</TableCell>
                      <TableCell>
                        <Tooltip title="Review">
                          <IconButton size="small" onClick={() => handleOpenDialog('view', link)}>
                            <ViewIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Block">
                          <IconButton size="small" color="error">
                            <BlockIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Approve">
                          <IconButton size="small" color="success">
                            <CheckCircleIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          {/* Trusted Links Tab */}
          <TabPanel value={currentTab} index={4}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Trusted Links Management
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog('add')}
                sx={{ bgcolor: '#388e3c' }}
              >
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
                      <TableCell sx={{ maxWidth: 200, wordBreak: 'break-all' }}>
                        {link.url}
                      </TableCell>
                      <TableCell>{link.addedBy}</TableCell>
                      <TableCell>
                        <Chip 
                          label={link.category} 
                          size="small"
                          color="info"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={link.status} 
                          size="small"
                          color={getStatusColor(link.status)}
                        />
                      </TableCell>
                      <TableCell>{link.addedDate}</TableCell>
                      <TableCell>
                        <Tooltip title="Edit">
                          <IconButton size="small" onClick={() => handleOpenDialog('edit', link)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton size="small" color="error">
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          {/* Tenants Tab */}
          <TabPanel value={currentTab} index={5}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Tenant Management
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog('add')}
                sx={{ bgcolor: '#1976d2' }}
              >
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
                      <TableCell>
                        <Chip 
                          label={tenant.status} 
                          size="small"
                          color={getStatusColor(tenant.status)}
                        />
                      </TableCell>
                      <TableCell>
                        <Badge badgeContent={tenant.users} color="primary">
                          <PeopleIcon />
                        </Badge>
                      </TableCell>
                      <TableCell>{tenant.createdDate}</TableCell>
                      <TableCell>
                        <Tooltip title="View">
                          <IconButton size="small" onClick={() => handleOpenDialog('view', tenant)}>
                            <ViewIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton size="small" onClick={() => handleOpenDialog('edit', tenant)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton size="small" color="error">
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </Paper>

        {/* Generic Dialog for Add/Edit/View */}
        <Dialog 
          open={openDialog} 
          onClose={handleCloseDialog}
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
            <Button onClick={handleCloseDialog}>
              Cancel
            </Button>
            {dialogType !== 'view' && (
              <Button 
                variant="contained" 
                onClick={handleCloseDialog}
              >
                {dialogType === 'add' ? 'Add' : 'Save'}
              </Button>
            )}
          </DialogActions>
        </Dialog>
        </Container>
      </Box>
    </AdminLayout>
  );
};

export default AdminDashboard;
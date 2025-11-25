import React from 'react';
import { Box, Card, CardContent, Typography, Avatar } from '@mui/material';
import {
  People as PeopleIcon,
  Subscriptions as SubscribeIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

interface DashboardStatsProps {
  totalUsers: number;
  activeSubscriptions: number;
  suspiciousLinks: number;
  trustedLinks: number;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
  totalUsers,
  activeSubscriptions,
  suspiciousLinks,
  trustedLinks
}) => {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, gap: 3, mb: 4 }}>
      <Card sx={{ bgcolor: '#e3f2fd' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                {totalUsers}
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
                {activeSubscriptions}
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
                {suspiciousLinks}
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
                {trustedLinks}
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
};

export default DashboardStats;

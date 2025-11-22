import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Users, AlertTriangle, Shield, TrendingUp, Clock } from 'lucide-react';

// Mock activity data for admin view
const mockActivityLogs = [
  {
    id: '1',
    timestamp: new Date('2024-11-22T10:30:00'),
    user: 'john@demo.com',
    action: 'login',
    details: 'Successful login from Chrome on Windows',
    severity: 'info',
  },
  {
    id: '2',
    timestamp: new Date('2024-11-22T09:15:00'),
    user: 'jane@demo.com',
    action: 'profile_update',
    details: 'Updated medical allergies',
    severity: 'info',
  },
  {
    id: '3',
    timestamp: new Date('2024-11-22T08:45:00'),
    user: 'robert@demo.com',
    action: 'failed_login',
    details: 'Multiple failed login attempts',
    severity: 'warning',
  },
  {
    id: '4',
    timestamp: new Date('2024-11-21T16:20:00'),
    user: 'maria@demo.com',
    action: 'consent_given',
    details: 'Provided consent for data usage',
    severity: 'info',
  },
];

const mockStats = {
  totalUsers: 156,
  activeToday: 42,
  newThisWeek: 8,
  securityAlerts: 2,
  complianceRate: 94,
};

const AdminDashboard = () => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'warning':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'error':
        return 'text-destructive bg-destructive/10 border-destructive/20';
      default:
        return 'text-primary bg-primary/10 border-primary/20';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Monitor system activity and user management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6 text-primary" />
              <span className="text-2xl font-bold text-foreground">{mockStats.totalUsers}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Activity className="w-6 h-6 text-success" />
              <span className="text-2xl font-bold text-foreground">{mockStats.activeToday}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">New This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-accent" />
              <span className="text-2xl font-bold text-foreground">{mockStats.newThisWeek}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Security Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-warning" />
              <span className="text-2xl font-bold text-foreground">{mockStats.securityAlerts}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-success" />
              <span className="text-2xl font-bold text-foreground">{mockStats.complianceRate}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Log */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Recent Activity
          </CardTitle>
          <CardDescription>System-wide user actions and security events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockActivityLogs.map((log) => (
              <div
                key={log.id}
                className={`p-4 rounded-lg border ${getSeverityColor(log.severity)}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-foreground capitalize">
                        {log.action.replace('_', ' ')}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {log.user}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{log.details}</p>
                  </div>
                  <div className="text-right text-xs text-muted-foreground whitespace-nowrap">
                    {log.timestamp.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security & Compliance */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              HIPAA Compliance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg border border-success/20">
              <span className="text-sm font-medium">Data Encryption</span>
              <Badge className="bg-success text-success-foreground">Active</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg border border-success/20">
              <span className="text-sm font-medium">Access Logging</span>
              <Badge className="bg-success text-success-foreground">Active</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg border border-success/20">
              <span className="text-sm font-medium">User Consent</span>
              <Badge className="bg-success text-success-foreground">Required</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-primary" />
              Security Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-warning/10 rounded-lg border border-warning/20">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-warning mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Multiple Failed Logins</p>
                  <p className="text-xs text-muted-foreground">robert@demo.com - 3 attempts</p>
                </div>
              </div>
            </div>
            <div className="p-3 bg-warning/10 rounded-lg border border-warning/20">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-warning mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Unusual Access Pattern</p>
                  <p className="text-xs text-muted-foreground">New device login detected</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Age Demographics */}
      <Card>
        <CardHeader>
          <CardTitle>User Demographics by Age Group</CardTitle>
          <CardDescription>Patient age distribution for targeted wellness programs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { range: '18-30', count: 32, percentage: 20 },
              { range: '31-45', count: 58, percentage: 37 },
              { range: '46-60', count: 48, percentage: 31 },
              { range: '60+', count: 18, percentage: 12 },
            ].map((group) => (
              <div key={group.range}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-foreground">{group.range} years</span>
                  <span className="text-muted-foreground">
                    {group.count} users ({group.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-smooth"
                    style={{ width: `${group.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;

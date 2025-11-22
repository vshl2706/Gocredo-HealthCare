import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Activity, CheckCircle2, AlertCircle } from 'lucide-react';

// Mock patient data for doctor view
const mockPatients = [
  {
    id: '1',
    name: 'John Doe',
    age: 35,
    lastVisit: '2024-11-15',
    complianceScore: 85,
    overdueCheckups: false,
    conditions: ['Hypertension'],
    status: 'good',
  },
  {
    id: '2',
    name: 'Jane Smith',
    age: 42,
    lastVisit: '2024-10-20',
    complianceScore: 60,
    overdueCheckups: true,
    conditions: ['Diabetes Type 2'],
    status: 'needs-attention',
  },
  {
    id: '3',
    name: 'Robert Johnson',
    age: 28,
    lastVisit: '2024-11-18',
    complianceScore: 92,
    overdueCheckups: false,
    conditions: [],
    status: 'excellent',
  },
  {
    id: '4',
    name: 'Maria Garcia',
    age: 55,
    lastVisit: '2024-09-10',
    complianceScore: 45,
    overdueCheckups: true,
    conditions: ['High Cholesterol', 'Hypertension'],
    status: 'needs-attention',
  },
];

const DoctorDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Provider Dashboard</h1>
        <p className="text-muted-foreground mt-1">Monitor patient wellness and compliance</p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="w-8 h-8 text-primary" />
              <span className="text-3xl font-bold text-foreground">{mockPatients.length}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Good Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-8 h-8 text-success" />
              <span className="text-3xl font-bold text-foreground">
                {mockPatients.filter((p) => p.complianceScore >= 70).length}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Needs Attention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-8 h-8 text-warning" />
              <span className="text-3xl font-bold text-foreground">
                {mockPatients.filter((p) => p.overdueCheckups).length}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Patient List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Assigned Patients
          </CardTitle>
          <CardDescription>Monitor compliance and preventive care status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockPatients.map((patient) => (
              <div
                key={patient.id}
                className="p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-smooth cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg text-foreground">{patient.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {patient.age} years
                      </Badge>
                      {patient.overdueCheckups && (
                        <Badge variant="destructive" className="text-xs">
                          Overdue
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span>Last visit: {new Date(patient.lastVisit).toLocaleDateString()}</span>
                      {patient.conditions.length > 0 && (
                        <span>Conditions: {patient.conditions.join(', ')}</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground mb-1">Compliance</div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`text-2xl font-bold ${
                          patient.complianceScore >= 80
                            ? 'text-success'
                            : patient.complianceScore >= 60
                            ? 'text-warning'
                            : 'text-destructive'
                        }`}
                      >
                        {patient.complianceScore}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Future Features Note */}
      <Card className="border-accent/30 bg-accent/5">
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Coming Soon:</strong> Detailed patient records, appointment
            scheduling, prescription management, and real-time wellness monitoring.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorDashboard;

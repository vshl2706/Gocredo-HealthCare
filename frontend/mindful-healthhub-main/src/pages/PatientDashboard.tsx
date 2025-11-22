import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useHealthData } from '@/contexts/HealthDataContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Droplet,
  Footprints,
  Dumbbell,
  Moon,
  Calendar,
  TrendingUp,
  Lightbulb,
  Bell,
  User,
} from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const PatientDashboard = () => {
  const { user } = useAuth();
  const { wellnessGoals, getTodayLog, addDailyLog, getHealthTip, reminders } = useHealthData();
  const { toast } = useToast();
  const navigate = useNavigate();

  const todayLog = getTodayLog();
  const healthTip = getHealthTip();

  const [logData, setLogData] = useState({
    waterIntake: todayLog?.waterIntake || 0,
    steps: todayLog?.steps || 0,
    yogaMinutes: todayLog?.yogaMinutes || 0,
    sleepHours: todayLog?.sleepHours || 0,
  });

  const iconMap: Record<string, any> = {
    droplet: Droplet,
    footprints: Footprints,
    dumbbell: Dumbbell,
    moon: Moon,
  };

  const getProgress = (goalId: string) => {
    const goal = wellnessGoals.find((g) => g.id === goalId);
    if (!goal) return 0;

    let current = 0;
    switch (goal.name) {
      case 'Water Intake':
        current = logData.waterIntake;
        break;
      case 'Steps':
        current = logData.steps;
        break;
      case 'Yoga/Exercise':
        current = logData.yogaMinutes;
        break;
      case 'Sleep':
        current = logData.sleepHours;
        break;
    }

    return Math.min((current / goal.target) * 100, 100);
  };

  const handleSaveLog = () => {
    addDailyLog({
      date: new Date().toISOString().split('T')[0],
      ...logData,
    });
    toast({
      title: 'Progress saved!',
      description: 'Your daily wellness log has been updated.',
    });
  };

  const pendingReminders = reminders.filter((r) => r.status === 'pending');

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-muted-foreground mt-1">Track your wellness journey</p>
        </div>
        <Button variant="outline" onClick={() => navigate('/profile')}>
          <User className="w-4 h-4 mr-2" />
          Profile
        </Button>
      </div>

      {/* Health Tip of the Day */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Health Tip of the Day</h3>
              <p className="text-muted-foreground">{healthTip}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wellness Goals Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {wellnessGoals.map((goal) => {
          const Icon = iconMap[goal.icon];
          const progress = getProgress(goal.id);
          let current = 0;
          switch (goal.name) {
            case 'Water Intake':
              current = logData.waterIntake;
              break;
            case 'Steps':
              current = logData.steps;
              break;
            case 'Yoga/Exercise':
              current = logData.yogaMinutes;
              break;
            case 'Sleep':
              current = logData.sleepHours;
              break;
          }

          return (
            <Card key={goal.id} className="shadow-card">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${goal.color}15` }}>
                    <Icon className="w-5 h-5" style={{ color: goal.color }} />
                  </div>
                  <Badge variant={progress >= 100 ? 'default' : 'secondary'} className="bg-success text-success-foreground">
                    {Math.round(progress)}%
                  </Badge>
                </div>
                <CardTitle className="text-base mt-2">{goal.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Progress value={progress} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    {current} / {goal.target} {goal.unit}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Log Today's Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Log Today's Progress
          </CardTitle>
          <CardDescription>Update your daily wellness activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="water">Water (glasses)</Label>
              <Input
                id="water"
                type="number"
                min="0"
                value={logData.waterIntake}
                onChange={(e) => setLogData({ ...logData, waterIntake: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="steps">Steps</Label>
              <Input
                id="steps"
                type="number"
                min="0"
                value={logData.steps}
                onChange={(e) => setLogData({ ...logData, steps: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yoga">Yoga/Exercise (min)</Label>
              <Input
                id="yoga"
                type="number"
                min="0"
                value={logData.yogaMinutes}
                onChange={(e) => setLogData({ ...logData, yogaMinutes: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sleep">Sleep (hours)</Label>
              <Input
                id="sleep"
                type="number"
                min="0"
                max="24"
                step="0.5"
                value={logData.sleepHours}
                onChange={(e) => setLogData({ ...logData, sleepHours: parseFloat(e.target.value) || 0 })}
              />
            </div>
          </div>
          <Button onClick={handleSaveLog} className="gradient-health text-primary-foreground">
            Save Progress
          </Button>
        </CardContent>
      </Card>

      {/* Preventive Care Reminders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            Preventive Care Reminders
          </CardTitle>
          <CardDescription>Stay on top of your health checkups</CardDescription>
        </CardHeader>
        <CardContent>
          {pendingReminders.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">All caught up! No pending reminders.</p>
          ) : (
            <div className="space-y-3">
              {pendingReminders.map((reminder) => (
                <div key={reminder.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                  <Calendar className="w-5 h-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{reminder.title}</h4>
                    <p className="text-sm text-muted-foreground">{reminder.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Due: {new Date(reminder.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {reminder.category}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientDashboard;

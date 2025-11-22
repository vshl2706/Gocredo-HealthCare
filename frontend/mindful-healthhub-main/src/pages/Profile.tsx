import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useHealthData } from '@/contexts/HealthDataContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { User, Phone, Calendar, FileText, AlertCircle, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { user } = useAuth();
  const { patientProfile, updatePatientProfile } = useHealthData();
  const { toast } = useToast();

  const [profileData, setProfileData] = useState({
    allergies: patientProfile?.allergies?.join(', ') || '',
    medications: patientProfile?.medications?.join(', ') || '',
    chronicConditions: patientProfile?.chronicConditions?.join(', ') || '',
    emergencyName: patientProfile?.emergencyContact?.name || '',
    emergencyPhone: patientProfile?.emergencyContact?.phone || '',
    emergencyRelationship: patientProfile?.emergencyContact?.relationship || '',
  });

  const handleSave = () => {
    if (!user) return;

    updatePatientProfile({
      userId: user.id,
      allergies: profileData.allergies
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      medications: profileData.medications
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      chronicConditions: profileData.chronicConditions
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      emergencyContact: {
        name: profileData.emergencyName,
        phone: profileData.emergencyPhone,
        relationship: profileData.emergencyRelationship,
      },
    });

    toast({
      title: 'Profile updated!',
      description: 'Your health information has been saved.',
    });
  };

  if (!user) return null;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your personal and health information</p>
      </div>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <div>
            <Label className="text-muted-foreground">Full Name</Label>
            <p className="text-foreground font-medium mt-1">
              {user.firstName} {user.lastName}
            </p>
          </div>
          <div>
            <Label className="text-muted-foreground">Email</Label>
            <p className="text-foreground font-medium mt-1">{user.email}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Age</Label>
            <p className="text-foreground font-medium mt-1">{user.age} years</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Mobile</Label>
            <p className="text-foreground font-medium mt-1">{user.mobile}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Role</Label>
            <Badge className="mt-1 capitalize bg-primary text-primary-foreground">{user.role}</Badge>
          </div>
          <div>
            <Label className="text-muted-foreground">Member Since</Label>
            <p className="text-foreground font-medium mt-1 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Medical Information */}
      {user.role === 'patient' && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Medical Information
              </CardTitle>
              <CardDescription>Keep your health information up to date</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="allergies">Allergies</Label>
                <Input
                  id="allergies"
                  placeholder="e.g., Penicillin, Peanuts, Latex (comma-separated)"
                  value={profileData.allergies}
                  onChange={(e) => setProfileData({ ...profileData, allergies: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medications">Current Medications</Label>
                <Textarea
                  id="medications"
                  placeholder="e.g., Aspirin 81mg daily, Lisinopril 10mg (comma-separated)"
                  value={profileData.medications}
                  onChange={(e) => setProfileData({ ...profileData, medications: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="conditions">Chronic Conditions</Label>
                <Input
                  id="conditions"
                  placeholder="e.g., Hypertension, Diabetes, Asthma (comma-separated)"
                  value={profileData.chronicConditions}
                  onChange={(e) => setProfileData({ ...profileData, chronicConditions: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary" />
                Emergency Contact
              </CardTitle>
              <CardDescription>Who should we contact in case of emergency?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyName">Contact Name</Label>
                  <Input
                    id="emergencyName"
                    placeholder="Full name"
                    value={profileData.emergencyName}
                    onChange={(e) => setProfileData({ ...profileData, emergencyName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Contact Phone</Label>
                  <Input
                    id="emergencyPhone"
                    type="tel"
                    placeholder="+1234567890"
                    value={profileData.emergencyPhone}
                    onChange={(e) => setProfileData({ ...profileData, emergencyPhone: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="relationship">Relationship</Label>
                <Input
                  id="relationship"
                  placeholder="e.g., Spouse, Parent, Sibling"
                  value={profileData.emergencyRelationship}
                  onChange={(e) =>
                    setProfileData({ ...profileData, emergencyRelationship: e.target.value })
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleSave} size="lg" className="gradient-health text-primary-foreground">
            Save Profile
          </Button>
        </>
      )}

      {/* Consent Status */}
      <Card className="border-success/30 bg-success/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-success mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">Data Usage Consent</h3>
              <p className="text-sm text-muted-foreground">
                You have consented to the collection and use of your health information. Your data is protected
                according to HIPAA guidelines.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;

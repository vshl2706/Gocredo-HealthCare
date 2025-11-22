import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, signup, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [mode, setMode] = useState<'login' | 'signup'>(
    searchParams.get('mode') === 'signup' ? 'signup' : 'login'
  );
  const [loading, setLoading] = useState(false);

  // Login form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Signup form
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    age: '',
    mobile: '',
    hasConsent: false,
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        toast({
          title: 'Welcome back!',
          description: 'Successfully logged in.',
        });
        navigate('/dashboard');
      } else {
        toast({
          variant: 'destructive',
          title: 'Login failed',
          description: result.error || 'Invalid credentials',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Passwords do not match',
        description: 'Please ensure both password fields match.',
      });
      return;
    }

    if (!signupData.hasConsent) {
      toast({
        variant: 'destructive',
        title: 'Consent required',
        description: 'You must agree to the terms to create an account.',
      });
      return;
    }

    setLoading(true);

    try {
      const result = await signup({
        email: signupData.email,
        password: signupData.password,
        firstName: signupData.firstName,
        lastName: signupData.lastName,
        age: parseInt(signupData.age),
        mobile: signupData.mobile,
        hasConsent: signupData.hasConsent,
      });

      if (result.success) {
        toast({
          title: 'Account created!',
          description: 'Welcome to HealthCare Portal.',
        });
        navigate('/dashboard');
      } else {
        toast({
          variant: 'destructive',
          title: 'Signup failed',
          description: result.error || 'Could not create account',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-wellness flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to home */}
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="shadow-card">
          <CardHeader className="text-center">
            <div className="w-12 h-12 rounded-lg gradient-health flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl font-display">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </CardTitle>
            <CardDescription>
              {mode === 'login'
                ? 'Sign in to access your wellness dashboard'
                : 'Start your wellness journey today'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {mode === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="bg-muted/50 p-3 rounded-lg text-sm text-muted-foreground">
                  <p className="font-medium mb-1">Demo Credentials:</p>
                  <p>Patient: patient@demo.com / demo123</p>
                  <p>Doctor: doctor@demo.com / demo123</p>
                  <p>Admin: admin@demo.com / demo123</p>
                </div>

                <Button type="submit" className="w-full gradient-health text-primary-foreground" disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>

                <div className="text-center text-sm">
                  <span className="text-muted-foreground">Don't have an account? </span>
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className="text-primary hover:underline font-medium"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={signupData.firstName}
                      onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={signupData.lastName}
                      onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signupEmail">Email</Label>
                  <Input
                    id="signupEmail"
                    type="email"
                    placeholder="you@example.com"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      min="18"
                      max="120"
                      value={signupData.age}
                      onChange={(e) => setSignupData({ ...signupData, age: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile</Label>
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder="+1234567890"
                      value={signupData.mobile}
                      onChange={(e) => setSignupData({ ...signupData, mobile: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signupPassword">Password</Label>
                  <Input
                    id="signupPassword"
                    type="password"
                    placeholder="••••••••"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                    required
                  />
                </div>

                <div className="flex items-start space-x-2 bg-muted/50 p-3 rounded-lg">
                  <Checkbox
                    id="consent"
                    checked={signupData.hasConsent}
                    onCheckedChange={(checked) =>
                      setSignupData({ ...signupData, hasConsent: checked === true })
                    }
                  />
                  <label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer">
                    I consent to the collection and use of my health information as described in the Privacy Policy. I understand my data will be protected according to HIPAA guidelines.
                  </label>
                </div>

                <Button type="submit" className="w-full gradient-health text-primary-foreground" disabled={loading}>
                  {loading ? 'Creating account...' : 'Create Account'}
                </Button>

                <div className="text-center text-sm">
                  <span className="text-muted-foreground">Already have an account? </span>
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-primary hover:underline font-medium"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;

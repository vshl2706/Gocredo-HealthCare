import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Activity, Shield, Users, ArrowRight, CheckCircle2 } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Activity,
      title: 'Track Wellness Goals',
      description: 'Monitor daily habits like water intake, steps, yoga, and sleep hours',
    },
    {
      icon: Heart,
      title: 'Preventive Care Reminders',
      description: 'Never miss important health checkups and screenings',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'HIPAA-conscious measures to protect your health information',
    },
    {
      icon: Users,
      title: 'Healthcare Provider Access',
      description: 'Share your wellness data with your healthcare team',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg gradient-health flex items-center justify-center">
              <Heart className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">HealthCare Portal</span>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate('/auth')}>
              Sign In
            </Button>
            <Button onClick={() => navigate('/auth?mode=signup')} className="gradient-health text-primary-foreground">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="gradient-wellness py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-6">
              Your Wellness Journey <br />
              <span className="gradient-health bg-clip-text text-transparent">Starts Here</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Track your health goals, manage preventive care, and take control of your wellness with our comprehensive healthcare portal.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/auth?mode=signup')}
              className="gradient-health text-primary-foreground text-lg px-8 h-12"
            >
              Start Your Journey <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              Everything You Need for Better Health
            </h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive tools to support your wellness journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-xl border border-border shadow-card hover:shadow-lg transition-smooth"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg text-card-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 gradient-wellness">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
              Why Choose Our Portal?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Easy daily goal tracking',
                'Personalized health insights',
                'Secure data encryption',
                'HIPAA-conscious design',
                'Multi-factor authentication',
                'Role-based access control',
                'Preventive care scheduling',
                'Healthcare provider collaboration',
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-4xl font-bold text-card-foreground mb-4">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of users managing their wellness journey
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/auth?mode=signup')}
            className="gradient-health text-primary-foreground text-lg px-8 h-12"
          >
            Create Free Account
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">© 2025 HealthCare Portal. All rights reserved.</span>
            </div>
            <div className="flex gap-6">
              <a href="#privacy" className="text-muted-foreground hover:text-primary transition-smooth">
                Privacy Policy
              </a>
              <a href="#terms" className="text-muted-foreground hover:text-primary transition-smooth">
                Terms of Service
              </a>
              <a href="#about" className="text-muted-foreground hover:text-primary transition-smooth">
                About
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

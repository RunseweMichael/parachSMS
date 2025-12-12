// src/components/OnboardingModal.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import Router Hook
import { 
  X, CheckCircle, Calendar, BarChart3, Mail, 
  BookOpen, Target, CreditCard, ListTodo, ShieldAlert 
} from 'lucide-react';

const OnboardingModal = ({ type = 'post-signup', isOpen, onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(isOpen);
  const navigate = useNavigate(); // 2. Initialize Hook

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  // Post-signup onboarding (unchanged)
  const postSignupSteps = [
    {
      title: "🎉 Registration Successful!",
      description: "Welcome to Parach ICT Academy! We've sent a 6-digit verification code to your email.",
      icon: <Mail className="w-16 h-16 text-blue-500" />,
      highlight: "Check your email inbox (and spam folder) for the OTP code",
      tip: "The code expires in 10 minutes"
    },
    {
      title: "What's Next?",
      description: "After verifying your email, you'll get access to your personalized dashboard.",
      icon: <BookOpen className="w-16 h-16 text-purple-500" />,
      features: ["Access your course materials", "Track your progress", "Complete weekly tasks"],
      cta: true
    }
  ];

  // =========================================================
  //  MODIFIED: Post-verification (Payment -> Tasks Flow)
  // =========================================================
  const postVerificationSteps = [
    {
      title: "Welcome to Your Dashboard! 🚀",
      description: "Before you begin learning, we need to finalize your account status. Features are currently locked.",
      icon: <ShieldAlert className="w-16 h-16 text-red-500" />,
      highlight: "Let's check your payment status first.",
      ctaLabel: "Go to Payment",
      // When clicking next, go to payment
      nextRoute: "/student/payment" 
    },
    {
      title: "Payment & Account Status",
      description: "This is where you manage your tuition. Your Dashboard and Internship details remain locked until overdue balances are cleared.",
      icon: <CreditCard className="w-16 h-16 text-blue-600" />,
      highlight: "Clear your balance to unlock all features instantly.",
      ctaLabel: "Next: View Tasks",
      // When clicking next, go to tasks
      nextRoute: "/student/task" 
    },
    {
      title: "Your Workspace: The Task Hub",
      description: "We focus on practical application. Instead of passive video watching, you will complete weekly tasks here.",
      icon: <ListTodo className="w-16 h-16 text-indigo-600" />,
      highlight: "This is your main classroom.",
      tip: "You will spend 90% of your time on this page."
    },
    {
      title: "How to Progress 📈",
      description: "1. Select a Module.\n2. Choose the current Week.\n3. Complete the Quiz/Assignment to unlock the next week.",
      icon: <Target className="w-16 h-16 text-green-500" />,
      features: ["Modules are on the left (or top)", "Scores are tracked automatically", "You must pass to proceed"],
      final: true,
      ctaLabel: "Start Learning"
    }
  ];

  // Course details onboarding (unchanged)
  const courseDetailsSteps = [
    {
      title: "Your Course Dashboard",
      description: "Welcome to your course! Here you'll find all lessons, materials, and assignments organized by modules.",
      icon: <BookOpen className="w-16 h-16 text-blue-500" />,
    },
    {
      title: "Weekly Tasks",
      description: "Each week, you'll have tasks to complete. These help reinforce what you've learned and track your progress.",
      icon: <Target className="w-16 h-16 text-orange-500" />,
      features: ["Complete tasks before deadlines", "Earn points for on-time completion", "Track your progress"],
      tip: "Tasks reset every Monday - plan ahead!"
    },
    {
      title: "Stay Consistent",
      description: "Regular study and timely task completion are key to success. Set aside dedicated time each week for learning.",
      icon: <Calendar className="w-16 h-16 text-green-500" />,
      highlight: "Consistency beats intensity - study a little every day",
      final: true
    }
  ];

  const getCurrentSteps = () => {
    switch (type) {
      case 'post-signup':
        return postSignupSteps;
      case 'post-verification':
        return postVerificationSteps;
      case 'course-details':
        return courseDetailsSteps;
      default:
        return postSignupSteps;
    }
  };

  const steps = getCurrentSteps();
  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  // =========================================================
  //  MODIFIED: Navigation Logic in HandleNext
  // =========================================================
  const handleNext = () => {
    // Check if the CURRENT step has a route instruction for the NEXT step
    if (currentStepData.nextRoute) {
      navigate(currentStepData.nextRoute);
    }

    if (isLastStep) {
      setIsVisible(false);
      if (onComplete) onComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSkip = () => {
    setIsVisible(false);
    if (onSkip) onSkip();
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      // Optional: If you want 'Previous' to also navigate back, 
      // you would need to store previous routes or map steps to routes explicitly.
      // For now, we keep it simple (modal content changes, user stays on current page).
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fadeIn">
        {/* Modal */}
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto z-[101] animate-slideUp">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 flex-1 rounded-full transition-all ${
                      index <= currentStep ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500">
                Step {currentStep + 1} of {steps.length}
              </p>
            </div>
            <button
              onClick={handleSkip}
              className="text-gray-400 hover:text-gray-600 transition ml-4"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Icon */}
            {currentStepData.icon && (
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gray-50 rounded-full">
                  {currentStepData.icon}
                </div>
              </div>
            )}

            {/* Title */}
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
              {currentStepData.title}
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-600 text-center mb-6 whitespace-pre-line">
              {currentStepData.description}
            </p>

            {/* Highlight Box */}
            {currentStepData.highlight && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
                <p className="text-blue-800 font-semibold text-center">
                  {currentStepData.highlight}
                </p>
              </div>
            )}

            {/* Features List */}
            {currentStepData.features && (
              <div className="space-y-3 mb-6 bg-gray-50 p-5 rounded-xl">
                {currentStepData.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tip */}
            {currentStepData.tip && (
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 rounded-r-lg">
                <p className="text-sm text-amber-900">
                  <span className="font-bold">💡 Pro Tip: </span>
                  {currentStepData.tip}
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 flex justify-between items-center bg-gray-50 rounded-b-2xl">
            <button
              onClick={handleSkip}
              className="text-gray-500 hover:text-gray-700 font-medium transition px-4 py-2"
            >
              Skip Tour
            </button>

            <div className="flex gap-3">
              {currentStep > 0 && (
                <button
                  onClick={handlePrevious}
                  className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-white transition"
                >
                  Previous
                </button>
              )}
              <button
                onClick={handleNext}
                className={`px-8 py-2.5 rounded-xl font-bold transition shadow-lg transform active:scale-95 ${
                  currentStepData.cta || currentStepData.final || currentStepData.nextRoute
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isLastStep 
                  ? (currentStepData.ctaLabel || 'Get Started')
                  : (currentStepData.ctaLabel || 'Next')}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </>
  );
};

export default OnboardingModal;
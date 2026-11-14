'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  X, 
  AlertTriangle, 
  Lightbulb, 
  Clock, 
  Sparkles,
  Star,
  Check
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useKitchen } from '@/context/KitchenContext';
import { useNotification } from '@/context/NotificationContext';
import { initialRecipes } from '@/data/seedData';
import { CookingTimer } from '@/components/recipe/CookingTimer';

export default function StepByStepCookingPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const { t, getLocalized } = useLanguage();
  const { getProgress, updateProgress, completeCooking } = useKitchen();
  const { showToast } = useNotification();

  const recipe = initialRecipes.find((r) => r.slug === slug);

  // Resume progress if user was previously cooking this recipe
  const savedProgress = recipe ? getProgress(recipe.id) : null;
  const initialStep = savedProgress ? savedProgress.currentStep : 1;

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(initialStep - 1);
  const [completedSteps, setCompletedSteps] = useState<number[]>(
    savedProgress?.completedSteps || []
  );
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [showSkipConfirm, setShowSkipConfirm] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(5);

  useEffect(() => {
    if (recipe && savedProgress) {
      if (savedProgress.completed) {
        setIsFinished(true);
      }
    }
  }, [recipe, savedProgress]);

  if (!recipe) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-serif text-3xl font-bold text-charcoal">Recipe Not Found</h1>
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-deep-green text-white text-xs font-bold rounded-full"
        >
          <ArrowLeft className="w-4 h-4" /> Explore Recipes
        </Link>
      </div>
    );
  }

  const title = getLocalized(recipe.title);
  const totalSteps = recipe.steps.length;
  const currentStep = recipe.steps[currentStepIndex] || recipe.steps[0];
  const stepNumber = currentStepIndex + 1;
  const isFinalStep = stepNumber === totalSteps;
  const progressPercent = Math.round((stepNumber / totalSteps) * 100);

  const saveCurrentStepState = (newStepIdx: number, updatedCompleted: number[]) => {
    updateProgress(recipe.id, {
      currentStep: newStepIdx + 1,
      completedSteps: updatedCompleted,
    });
  };

  const handleNextStep = () => {
    const updatedCompleted = Array.from(new Set([...completedSteps, stepNumber]));
    setCompletedSteps(updatedCompleted);

    if (isFinalStep) {
      // Completed full recipe!
      handleFinishRecipe(updatedCompleted);
    } else {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      saveCurrentStepState(nextIndex, updatedCompleted);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
      saveCurrentStepState(prevIndex, completedSteps);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSkipStep = () => {
    setShowSkipConfirm(false);
    if (!isFinalStep) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      saveCurrentStepState(nextIndex, completedSteps);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleFinishRecipe(completedSteps);
    }
  };

  const handleRestart = () => {
    if (window.confirm('Restart cooking from Step 1?')) {
      setCurrentStepIndex(0);
      setCompletedSteps([]);
      setIsFinished(false);
      updateProgress(recipe.id, { currentStep: 1, completedSteps: [], completed: false });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFinishRecipe = (finalCompleted: number[]) => {
    setIsFinished(true);
    updateProgress(recipe.id, { completed: true, completedSteps: finalCompleted });
    completeCooking(recipe.id, title, recipe.coverImage);
    showToast(`Congratulations! You prepared ${title}!`, 'success');

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#55765C', '#F3D9C8', '#BD765B', '#294B35', '#F59E0B'],
      });
    } catch (e) {
      console.warn('Confetti error', e);
    }
  };

  const stepTitle = typeof currentStep.title === 'string' ? currentStep.title : getLocalized(currentStep.title);

  // COMPLETION SCREEN
  if (isFinished) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center space-y-8 animate-in fade-in duration-500">
        <div className="relative aspect-video max-w-lg mx-auto rounded-3xl overflow-hidden shadow-lifted border border-[#EAE7DF] bg-sage-100">
          <Image
            src={recipe.coverImage}
            alt={title}
            fill
            priority
            sizes="500px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-xs uppercase tracking-wider font-semibold text-peach">
              Dish Mastered
            </span>
            <h2 className="font-serif text-2xl font-bold">{title}</h2>
          </div>
        </div>

        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>{t('congratsTitle')}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-charcoal">
            {t('congratsSubtitle')} {title}!
          </h1>

          <p className="text-sm text-charcoal-muted max-w-md mx-auto leading-relaxed">
            {t('serveAndEnjoy')}
          </p>
        </div>

        {/* Rating feedback */}
        <div className="bg-white p-6 rounded-3xl border border-[#EAE7DF] shadow-subtle max-w-md mx-auto space-y-3">
          <p className="text-xs font-bold text-charcoal">{t('rateThisRecipe')}</p>
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="p-1 hover:scale-110 transition-transform"
                aria-label={`Rate ${star} stars`}
              >
                <Star
                  className={`w-7 h-7 ${
                    star <= rating
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-charcoal-light hover:text-amber-300'
                  }`}
                />
              </button>
            ))}
          </div>
          <p className="text-[11px] text-emerald-700 font-semibold">
            {t('saveCookingRecord')}
          </p>
        </div>

        {/* Next Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/explore"
            className="px-6 py-3.5 rounded-full bg-deep-green hover:bg-deep-hover text-white text-xs sm:text-sm font-bold shadow-lifted transition-all"
          >
            {t('cookAnother')}
          </Link>

          <Link
            href="/my-kitchen"
            className="px-6 py-3.5 rounded-full bg-white hover:bg-sage-50 text-deep-green border border-sage-200 text-xs sm:text-sm font-bold shadow-xs transition-all"
          >
            {t('viewMyKitchen')}
          </Link>
        </div>
      </div>
    );
  }

  // ACTIVE STEP-BY-STEP DISTRACTION-FREE VIEW
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-20">
      
      {/* Distraction-Free Header */}
      <div className="bg-white p-4 rounded-3xl border border-[#EAE7DF] shadow-subtle flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href={`/recipe/${recipe.slug}`}
            className="p-2 rounded-full hover:bg-sage-100 text-charcoal-muted hover:text-charcoal transition-colors"
            title={t('exitCooking')}
            aria-label="Exit cooking mode"
          >
            <X className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="font-serif font-bold text-sm sm:text-base text-charcoal truncate max-w-[200px] sm:max-w-md">
              {title}
            </h2>
            <p className="text-[11px] text-charcoal-muted">
              {t('step')} {stepNumber} {t('of')} {totalSteps}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRestart}
            className="text-xs text-charcoal-muted hover:text-terracotta flex items-center gap-1 font-semibold p-1.5"
            title={t('restartRecipe')}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Restart</span>
          </button>
        </div>
      </div>

      {/* Top Multi-step Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-deep-green">
            Step {stepNumber} of {totalSteps}
          </span>
          <span className="text-charcoal-muted font-medium">
            {progressPercent}% Complete
          </span>
        </div>
        <div className="w-full bg-[#EAE7DF] h-2.5 rounded-full overflow-hidden">
          <div
            className="h-full bg-deep-green transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Step Presentation Card */}
      <div className="bg-white rounded-3xl border border-[#EAE7DF] overflow-hidden shadow-lifted p-6 sm:p-8 space-y-6">
        
        {/* Step Title & Meta */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F1EFEA]">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-sage-100 text-deep-green font-serif font-bold text-sm flex items-center justify-center border border-sage-200">
              {stepNumber}
            </span>
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">
              {stepTitle}
            </h1>
          </div>

          {currentStep.estimatedMinutes && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-50 text-deep-green text-xs font-semibold border border-sage-200">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span>{currentStep.estimatedMinutes} mins est.</span>
            </div>
          )}
        </div>

        {/* Step Visual Imagery (if present) */}
        {currentStep.imageUrl && (
          <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-sage-50 border border-[#EAE7DF]">
            <Image
              src={currentStep.imageUrl}
              alt={stepTitle}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover"
            />
          </div>
        )}

        {/* Cooking Step Instructions */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-muted">
            Instructions
          </h3>

          <div className="space-y-3">
            {currentStep.instructions.map((instruction, idx) => (
              <div key={idx} className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#FAF8F2] border border-[#F1EFEA]">
                <span className="w-6 h-6 rounded-full bg-white text-deep-green font-bold text-xs flex items-center justify-center shrink-0 border border-[#E0DCCE]">
                  {idx + 1}
                </span>
                <p className="text-sm sm:text-base text-charcoal leading-relaxed pt-0.5">
                  {instruction}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Integrated Live Timer (if step has timer duration) */}
        {currentStep.timerSeconds && (
          <div className="pt-2">
            <CookingTimer
              durationSeconds={currentStep.timerSeconds}
              timerLabel={`Timer for Step ${stepNumber}`}
            />
          </div>
        )}

        {/* Kitchen Tip (if applicable) */}
        {currentStep.tips && currentStep.tips.length > 0 && (
          <div className="p-4 rounded-2xl bg-sage-50 border border-sage-200 text-xs text-charcoal space-y-1.5">
            <div className="flex items-center gap-1.5 text-deep-green font-bold uppercase tracking-wider text-[10px]">
              <Lightbulb className="w-3.5 h-3.5 text-primary" />
              <span>{t('stepTip')}</span>
            </div>
            {currentStep.tips.map((tip, idx) => (
              <p key={idx} className="leading-relaxed font-medium">{tip}</p>
            ))}
          </div>
        )}

        {/* Safety Warning (if applicable) */}
        {currentStep.warnings && currentStep.warnings.length > 0 && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-900 space-y-1.5">
            <div className="flex items-center gap-1.5 text-red-700 font-bold uppercase tracking-wider text-[10px]">
              <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
              <span>{t('stepWarning')}</span>
            </div>
            {currentStep.warnings.map((warn, idx) => (
              <p key={idx} className="leading-relaxed font-medium">{warn}</p>
            ))}
          </div>
        )}
      </div>

      {/* Fixed Sticky Controls Bar */}
      <div className="sticky bottom-16 lg:bottom-4 z-30 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-[#EAE7DF] shadow-lifted flex items-center justify-between gap-3">
        
        {/* Previous Button */}
        <button
          onClick={handlePrevStep}
          disabled={currentStepIndex === 0}
          className="flex items-center gap-1.5 px-4 py-3 rounded-full border border-[#E0DCCE] text-xs sm:text-sm font-semibold text-charcoal hover:bg-sage-50 disabled:opacity-30 disabled:hover:bg-white transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">{t('previousStep')}</span>
        </button>

        {/* Skip Step Trigger */}
        <button
          onClick={() => setShowSkipConfirm(true)}
          className="text-xs text-charcoal-muted hover:text-charcoal underline font-semibold px-2"
        >
          {t('skipStep')}
        </button>

        {/* Complete Step & Next Button */}
        <button
          onClick={handleNextStep}
          className="flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full bg-deep-green hover:bg-deep-hover text-white text-xs sm:text-sm font-bold shadow-lifted transition-all"
        >
          {isFinalStep ? (
            <>
              <Check className="w-4 h-4" />
              <span>{t('finishRecipe')}</span>
            </>
          ) : (
            <>
              <span>{t('nextStep')}</span>
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {/* Skip Step Confirmation Modal */}
      {showSkipConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-lifted border border-[#EAE7DF] animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-serif font-bold text-base text-charcoal">Skip Step {stepNumber}?</h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                {t('skipConfirm')}
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowSkipConfirm(false)}
                className="flex-1 py-2.5 rounded-full border border-[#E0DCCE] text-xs font-semibold text-charcoal hover:bg-sage-50"
              >
                Continue Step
              </button>
              <button
                onClick={handleSkipStep}
                className="flex-1 py-2.5 rounded-full bg-terracotta text-white text-xs font-bold hover:bg-terracotta-hover"
              >
                Yes, Skip
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

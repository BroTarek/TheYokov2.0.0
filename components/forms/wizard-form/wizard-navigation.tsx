'use client';

import { ChevronRight } from 'lucide-react';

interface WizardNavigationProps {
    currentStep: number;
    totalSteps: number;
    onNext: () => void;
    onPrevious: () => void;
    onComplete: () => void;
    isValid?: boolean;
}

export function WizardNavigation({
    currentStep,
    totalSteps,
    onNext,
    onPrevious,
    onComplete,
    isValid = true,
}: WizardNavigationProps) {
    const isFirstStep = currentStep === 1;
    const isLastStep = currentStep === totalSteps;

    return (
        <div className="flex gap-4 justify-between mt-10">
            <button
                onClick={onPrevious}
                disabled={isFirstStep}
                className={`px-6 py-3 rounded-full font-semibold transition-all border ${isFirstStep
                    ? 'bg-secondary-grey text-white border-transparent cursor-not-allowed'
                    : 'bg-kaizen-red text-white -pointer hover:bg-kaizen-red/90'
                    }`}
                aria-label="Go to previous step"
            >
                BACK
            </button>

            <button
                onClick={isLastStep ? onComplete : onNext}
                disabled={!isValid}
                className={`px-8 py-3.5 rounded-full font-bold text-sm tracking-wider uppercase text-white transition-all flex items-center gap-2 ${!isValid
                    ? 'bg-red-200 cursor-not-allowed'
                    : 'bg-kaizen-red cursor-pointer hover:bg-kaizen-red/90'
                    }`}
                aria-label={isLastStep ? 'Complete form' : 'Go to next step'}
            >
                {isLastStep ? 'Complete' : 'Next'}
                {!isLastStep && <ChevronRight className="w-4 h-4" />}
            </button>
        </div>
    );
}

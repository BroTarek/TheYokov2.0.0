'use client';

import { useEffect, useState } from 'react';
import { WizardHeader } from './wizard-header';
import { WizardProgress } from './wizard-progress';
import { WizardNavigation } from './wizard-navigation';
import { BasicInfoStep } from './steps/basic-info-step';
import { ExperienceStep } from './steps/experience-step';
import { AboutMeStep } from './steps/about-me-step';
import { DocumentsStep } from './steps/documents-step';
import { ReviewStep } from './steps/review-step';
import { WIZARD_STEPS } from '@/components/forms/wizard-form/lib/constants';
import { useCreateApplicant } from '@/features/applicants/hooks';

export function WizardForm() {
    // Wizard state
    const [currentStep, setCurrentStep] = useState(1);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [referralSource, setReferralSource] = useState<string>('');
    const [countryCode, setCountryCode] = useState('+20');
    const [phoneNumber, setPhoneNumber] = useState('');

    // Form state - Experience

    const [selectedExperience, setSelectedExperience] = useState<string>('0-5');
    const [selectedFields, setSelectedFields] = useState<string[]>([]); // Keep as array
    const [selectedFieldId, setSelectedFieldId] = useState<string>(""); // Single ID


    // Form state - About Me
    const [selectedPosition, setSelectedPosition] = useState<string>('');
    const [company, setCompany] = useState('');
    const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
    const [experienceDescription, setExperienceDescription] = useState('');
    const [googleDriveUrl, setGoogleDriveUrl] = useState('');
    const [jobTitleLabel, setJobTitleLabel] = useState('');
    const [referralSourceLabel, setReferralSourceLabel] = useState('');

    // Navigation handlers
    const isStepValid = (step: number) => {
        switch (step) {
            case 1:
                return firstName.trim() !== '' && lastName.trim() !== '' && email.trim() !== '' && phoneNumber.trim() !== '' && referralSource !== '';
            case 2:
                return selectedExperience !== '' && selectedFieldId !== '';
            case 3:
                return selectedPosition !== '' && company.trim() !== '' && selectedCountries.length > 0 && experienceDescription.trim() !== '';
            case 4:
                return googleDriveUrl.trim() !== '';
            default:
                return true;
        }
    };

    const handleNext = () => {
        if (currentStep < WIZARD_STEPS.length && isStepValid(currentStep)) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const { mutate: createApplicant, isPending } = useCreateApplicant();

    const handleComplete = async () => {
        const formData: any = {
            firstName,
            lastName,
            email,
            phone: `${countryCode}${phoneNumber}`,
            yearsOfExperience: selectedExperience,
            jobFieldId: selectedFieldId,
            jobTitleId: selectedPosition,
            referralSourceId: referralSource,
            regions: selectedCountries,
            status: 'unseen',
            experienceDescription,
            googleDriveUrl,
            lastCompany: company,
        };

        console.log('Submitting applicant:', formData);

        createApplicant(formData, {
            onSuccess: () => {
                alert('Application submitted successfully!');
                // You might want to redirect here
            },
            onError: (error: any) => {
                console.error('Submission error:', error);
                alert('Failed to submit application: ' + (error.response?.data?.error || error.message));
            }
        });
    };

    const handleStepClick = (stepId: number) => {
        if (stepId < currentStep) {
            setCurrentStep(stepId);
        } else if (stepId === currentStep + 1 && isStepValid(currentStep)) {
            setCurrentStep(stepId);
        }
    };

    // Render current step content
    const renderFormContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <BasicInfoStep
                        firstName={firstName}
                        setFirstName={setFirstName}
                        lastName={lastName}
                        setLastName={setLastName}
                        email={email}
                        setEmail={setEmail}
                        referralSource={referralSource}
                        setReferralSource={setReferralSource}
                        setReferralSourceLabel={setReferralSourceLabel}
                        countryCode={countryCode}
                        setCountryCode={setCountryCode}
                        phoneNumber={phoneNumber}
                        setPhoneNumber={setPhoneNumber}
                    />
                );
            case 2:
                return (
                    <ExperienceStep
                        selectedExperience={selectedExperience}
                        setSelectedExperience={setSelectedExperience}
                        selectedFields={selectedFieldId} // Pass the single ID
                        setSelectedFields={setSelectedFields} // Keep for array updates
                        setSelectedFieldId={setSelectedFieldId}
                    />
                );
            case 3:
                return (
                    <AboutMeStep
                        selectedPosition={selectedPosition}
                        setSelectedPosition={setSelectedPosition}
                        setJobTitleLabel={setJobTitleLabel}
                        company={company}
                        setCompany={setCompany}
                        selectedCountries={selectedCountries}
                        setSelectedCountries={setSelectedCountries}
                        experienceDescription={experienceDescription}
                        setExperienceDescription={setExperienceDescription}
                        selectedFieldId={selectedFieldId}
                    />
                );
            case 4:
                return (
                    <DocumentsStep
                        googleDriveUrl={googleDriveUrl}
                        setGoogleDriveUrl={setGoogleDriveUrl}
                    />
                );
            case 5:
                return (
                    <ReviewStep
                        data={{
                            firstName,
                            lastName,
                            email,
                            experience: selectedExperience,
                            countries: selectedCountries,
                            position: selectedPosition,
                            company,
                            googleDriveUrl,
                            jobTitleLabel,
                            referralSourceLabel,
                        }}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-white p-4 sm:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header removed as requested */}
                <div className="mb-8">
                    {/* Progress Indicator */}
                    <WizardProgress
                        steps={WIZARD_STEPS}
                        currentStep={currentStep}
                        onStepClick={handleStepClick}
                    />
                </div>

                {/* Form Content */}
                <div className="rounded-[1px] shadow-lg p-8 bg-white">
                    {renderFormContent()}

                    {/* Navigation Buttons */}
                    <WizardNavigation
                        currentStep={currentStep}
                        totalSteps={WIZARD_STEPS.length}
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                        onComplete={handleComplete}
                        isValid={isStepValid(currentStep)}
                    />
                </div>
            </div>
        </div>
    );
}

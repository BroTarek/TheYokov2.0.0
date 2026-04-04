'use client';

import { FORM_FIELD_IDS } from '@/components/forms/wizard-form/lib/constants';
import { useRouter } from 'next/navigation';

interface DocumentsStepProps {
    googleDriveUrl: string;
    setGoogleDriveUrl: (value: string) => void;
}

export function DocumentsStep({ googleDriveUrl, setGoogleDriveUrl }: DocumentsStepProps) {
    // const router = useRouter();

    const handleRedirectToUpload = () => {
        window.open('https://yokoadmin2025-my.sharepoint.com/personal/omar_theyoko_com/_layouts/15/onedrive.aspx?p=26&s=aHR0cHM6Ly95b2tvYWRtaW4yMDI1LW15LnNoYXJlcG9pbnQuY29tLzpmOi9nL3BlcnNvbmFsL29tYXJfdGhleW9rb19jb20vSWdER0JOdl9OUm9aU3E0YTZxdXhITkNmQVo2QUUzUzhnNUdpSWhDWHpIbXU5eGM'); // Adjust this path as needed
    };

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-sm">
                    <p className="font-medium mb-1 text-primary-text">Document Upload</p>
                    <p className="mb-3">Click the button below to upload any documents you find relevant for your application.</p>
                    <button
                        onClick={handleRedirectToUpload}
                        className="px-8 py-3.5 rounded-full font-bold text-sm tracking-wider uppercase text-white transition-all flex items-center gap-2 bg-kaizen-red cursor-pointer hover:bg-kaizen-red/90 "
                    >
                        Upload Documents
                    </button>
                </div>
            </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                    id={FORM_FIELD_IDS.TERMS_CONFIRMATION}
                    type="checkbox"
                    value={googleDriveUrl}
                    onChange={(e) => setGoogleDriveUrl("I have uploaded all the required documents")}
                    className="w-4 h-4 rounded accent-kaizen-red"
                />
                <span className="text-small text-primary-text">
                    I confirm that I upladed all the required documents
                </span>
            </label>

        </div>
    );
}

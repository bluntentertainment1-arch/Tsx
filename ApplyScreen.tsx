import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobsApi, Job } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const ApplyScreen: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (jobId) {
      loadJobDetails();
    }
  }, [jobId]);

  const loadJobDetails = async () => {
    if (!jobId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await jobsApi.getAll();
      
      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        const foundJob = response.data.find(j => j.id === jobId);
        if (foundJob) {
          setJob(foundJob);
          handleRedirect(foundJob);
        } else {
          setError('Job not found');
        }
      }
    } catch (err) {
      setError('Failed to load job details');
    } finally {
      setLoading(false);
    }
  };

  const getApplyUrl = (job: Job): string => {
    const applyUrl = job.apply_url;

    if (!applyUrl) return '';

    let fullUrl = applyUrl.trim();
    
    if (!fullUrl.startsWith('http://') && !fullUrl.startsWith('https://')) {
      fullUrl = `https://${fullUrl}`;
    }

    fullUrl = fullUrl.replace(/https?:\/\/(kid87cryz|kidkv2sn6)\.lastapp\.dev/gi, 'https://globalworkvisajobs.pages.dev');

    return fullUrl;
  };

  const handleRedirect = (job: Job) => {
    const applyUrl = getApplyUrl(job);
    
    if (applyUrl) {
      setIsRedirecting(true);
      setTimeout(() => {
        const newWindow = window.open(applyUrl, '_blank', 'noopener,noreferrer');
        if (newWindow) {
          newWindow.opener = null;
        }
        setTimeout(() => {
          navigate(-1);
        }, 500);
      }, 1000);
    } else {
      setError('Application link not available');
    }
  };

  const handleBackToJobs = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !job || !job.apply_url) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="card p-8 text-center max-w-md w-full">
          <i className="fa fa-exclamation-circle text-5xl text-red-500 mb-4"></i>
          <p className="text-slate-600 mb-6">{error || 'Application link not available'}</p>
          <button onClick={handleBackToJobs} className="btn-primary">
            <i className="fa fa-arrow-left mr-2"></i>
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="card p-8 text-center max-w-md w-full">
        {isRedirecting ? (
          <>
            <div className="mb-6">
              <i className="fa fa-external-link-alt text-5xl text-blue-600 animate-pulse"></i>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Opening Application</h2>
            <p className="text-slate-600 mb-6">
              The job application page is opening in a new tab...
            </p>
            <div className="flex justify-center mb-6">
              <LoadingSpinner />
            </div>
            <button 
              onClick={handleBackToJobs}
              className="btn-secondary w-full"
            >
              <i className="fa fa-arrow-left mr-2"></i>
              Back to Job Listing
            </button>
          </>
        ) : (
          <>
            <div className="mb-6">
              <i className="fa fa-spinner fa-spin text-5xl text-blue-600"></i>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Preparing Application</h2>
            <p className="text-slate-600">
              Please wait while we prepare your application...
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplyScreen;
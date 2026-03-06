import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobsApi, savedJobsApi, Job } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import AdSense from '../components/AdSense'; // Added AdSense

const JobDetails: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);

  useEffect(() => {
    if (jobId) loadJobDetails();
  }, [jobId]);

  const loadJobDetails = async () => {
    if (!jobId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await jobsApi.getAll();
      if (response.error) setError(response.error);
      else if (response.data) {
        const foundJob = response.data.find(j => j.id === jobId);
        if (foundJob) {
          setJob(foundJob);
          setIsSaved(savedJobsApi.isSaved(jobId));
        } else setError('Job not found');
      }
    } catch (err) {
      setError('Failed to load job details');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveJob = () => {
    if (!jobId) return;
    if (isSaved) {
      savedJobsApi.unsaveJob(jobId);
      setIsSaved(false);
    } else {
      savedJobsApi.saveJob(jobId);
      setIsSaved(true);
    }
  };

  const handleApply = () => {
    if (jobId) navigate(`/apply/${jobId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="card p-8 text-center max-w-md w-full">
          <i className="fa fa-exclamation-circle text-5xl text-red-500 mb-4"></i>
          <p className="text-slate-600 mb-6">{error || 'Job not found'}</p>
          <button onClick={() => navigate(-1)} className="btn-primary">
            <i className="fa fa-arrow-left mr-2"></i> Go Back
          </button>
        </div>
      </div>
    );
  }

  const isFeatured = job.featured === 'Yes';

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="glass-effect shadow-xl sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-xl bg-white shadow-md hover:shadow-lg transition-all flex items-center justify-center text-blue-600"
              aria-label="Go back"
            >
              <i className="fa fa-arrow-left text-lg"></i>
            </button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Job Details
            </h1>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSaveJob}
                className="w-10 h-10 rounded-xl bg-white shadow-md hover:shadow-lg transition-all flex items-center justify-center"
                aria-label={isSaved ? 'Unsave job' : 'Save job'}
              >
                <i className={`fa ${isSaved ? 'fa-bookmark' : 'fa-bookmark-o'} text-xl ${isSaved ? 'text-blue-600' : 'text-slate-400'}`}></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Top Banner Ad */}
      <div className="my-4">
        <AdSense slot="8509863911" format="auto" responsive="true" className="w-full max-w-7xl mx-auto px-4" />
      </div>

      <main className="container mx-auto px-4 py-6 pb-32">
        <div className={`card p-6 mb-6 ${isFeatured ? 'border-2 border-amber-400 bg-gradient-to-br from-amber-50 to-yellow-50' : ''}`}>
          {isFeatured && (
            <div className="flex items-center space-x-2 mb-4">
              <i className="fa fa-star text-amber-500"></i>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">Featured Job</span>
            </div>
          )}

          <h2 className="text-2xl font-bold text-slate-800 mb-4">{job.title}</h2>

          <div className="space-y-3 mb-6">
            <div className="flex items-center text-slate-700">
              <i className="fa fa-briefcase mr-3 text-blue-600 w-5"></i>
              <span className="font-medium">Category:</span>
              <span className="ml-2">{job.category}</span>
            </div>
            <div className="flex items-center text-slate-700">
              <i className="fa fa-map-marker-alt mr-3 text-blue-600 w-5"></i>
              <span className="font-medium">Location:</span>
              <span className="ml-2">{job.location}</span>
            </div>
            {job.salary && (
              <div className="flex items-center text-emerald-600 font-semibold">
                <i className="fa fa-money-bill-wave mr-3 w-5"></i>
                <span className="font-medium">Salary:</span>
                <span className="ml-2">{job.salary}</span>
              </div>
            )}
          </div>

          <div className="border-t border-slate-200 pt-6">
            <h3 className="text-lg font-bold text-slate-800 mb-3">Job Description</h3>
            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{job.description}</p>
          </div>
        </div>
      </main>

      {/* Multiplex Ad above Apply */}
      <div className="mb-4 px-4">
        <AdSense slot="4634556878" format="autorelaxed" className="w-full max-w-7xl mx-auto" />
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg p-4">
        <div className="container mx-auto">
          <button
            onClick={handleApply}
            disabled={!job.apply_url}
            className="btn-primary w-full py-4 text-lg"
          >
            <i className="fa fa-paper-plane mr-2"></i>
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;

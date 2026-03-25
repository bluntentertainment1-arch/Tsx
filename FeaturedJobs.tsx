import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobsApi, savedJobsApi, Job } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import JobCard from '../components/JobCard';

const FeaturedJobs: React.FC = () => {
  const navigate = useNavigate();
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFeaturedJobs();
  }, []);

  const loadFeaturedJobs = async () => {
    setLoading(true);
    setError(null);

    const response = await jobsApi.getFeatured();

    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      setFeaturedJobs(response.data);
    }

    setLoading(false);
  };

  const handleSaveJob = (jobId: string) => {
    if (savedJobsApi.isSaved(jobId)) {
      savedJobsApi.unsaveJob(jobId);
    } else {
      savedJobsApi.saveJob(jobId);
    }
    setFeaturedJobs([...featuredJobs]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="glass-effect shadow-xl sticky top-0 z-10 safe-top">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="w-10 h-10 rounded-xl bg-white shadow-md hover:shadow-lg transition-all flex items-center justify-center text-blue-600"
              aria-label="Go back"
            >
              <i className="fa fa-arrow-left text-lg"></i>
            </button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
              Featured Jobs
            </h1>
            <div className="w-10"></div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="card p-6 text-center">
            <i className="fa fa-exclamation-circle text-4xl text-red-500 mb-4"></i>
            <p className="text-slate-600">{error}</p>
            <button onClick={loadFeaturedJobs} className="btn-primary mt-4">
              Try Again
            </button>
          </div>
        ) : featuredJobs.length === 0 ? (
          <div className="card p-8 text-center">
            <i className="fa fa-star-o text-5xl text-slate-300 mb-4"></i>
            <p className="text-slate-500 text-lg">No featured jobs available at the moment</p>
            <button
              onClick={() => navigate('/')}
              className="btn-primary mt-4"
            >
              Browse All Jobs
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {featuredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isSaved={savedJobsApi.isSaved(job.id)}
                onApply={() => {}}
                onSave={() => handleSaveJob(job.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default FeaturedJobs;
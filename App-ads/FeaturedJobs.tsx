import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobsApi, savedJobsApi, Job } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import JobCard from '../components/JobCard';

// AdSense banner component
const AdBanner: React.FC = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block', margin: '1rem 0' }}
      data-ad-client="ca-pub-1819215492028258"
      data-ad-slot="8509863911"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

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

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="card p-6 text-center">
        <i className="fa fa-exclamation-circle text-4xl text-red-500 mb-4"></i>
        <p className="text-slate-600">{error}</p>
        <button onClick={loadFeaturedJobs} className="btn-primary mt-4">
          Try Again
        </button>
      </div>
    );
  }

  if (featuredJobs.length === 0) {
    return (
      <div className="card p-8 text-center">
        <i className="fa fa-star-o text-5xl text-slate-300 mb-4"></i>
        <p className="text-slate-500 text-lg">No featured jobs available at the moment</p>
        <button onClick={() => navigate('/')} className="btn-primary mt-4">
          Browse All Jobs
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 container mx-auto px-4 py-6">
      {featuredJobs.map((job, index) => (
        <React.Fragment key={job.id}>
          <JobCard
            job={job}
            isSaved={savedJobsApi.isSaved(job.id)}
            onApply={() => {}}
            onSave={() => handleSaveJob(job.id)}
          />
          {/* Insert AdSense banner after the 3rd job */}
          {index === 2 && <AdBanner />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default FeaturedJobs;

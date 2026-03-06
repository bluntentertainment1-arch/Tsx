import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobsApi, savedJobsApi, Job } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import JobCard from '../components/JobCard';
import AdSense from '../components/AdSense';

const JobListing: React.FC = () => {
  const { country } = useParams<{ country: string }>();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadJobs();
  }, [country]);

  const loadJobs = async () => {
    if (!country) return;

    setLoading(true);
    setError(null);

    const response = await jobsApi.getByCountry(country);

    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      const allJobs = response.data;
      const featured = allJobs.filter(job => job.featured === 'Yes');
      const nonFeatured = allJobs.filter(job => job.featured !== 'Yes');

      setFeaturedJobs(featured);
      setJobs(nonFeatured);
    }

    setLoading(false);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center mt-12">{error}</div>;

  const combinedJobs = [...featuredJobs, ...jobs];
  
  return (
    <div className="container mx-auto px-4 py-6">
      {combinedJobs.map((job, index) => (
        <React.Fragment key={job.id}>
          <JobCard
            job={job}
            isSaved={savedJobsApi.isSaved(job.id)}
            onSave={() => {
              if (savedJobsApi.isSaved(job.id)) savedJobsApi.unsaveJob(job.id);
              else savedJobsApi.saveJob(job.id);
              setJobs([...jobs]);
            }}
            onApply={() => navigate(`/apply/${job.id}`)}
          />

          {/* Insert a display ad every 6 jobs */}
          {index > 0 && (index + 1) % 6 === 0 && (
            <div className="my-6">
              <AdSense slot="8509863911" format="auto" responsive="true" className="w-full max-w-4xl mx-auto px-4" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default JobListing;

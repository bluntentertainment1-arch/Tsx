import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobsApi, savedJobsApi, Job } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import JobCard from '../components/JobCard';
import AdSense from '../components/AdSense';
import BottomNav from '../components/BottomNav';

type SortOption = 'date' | 'jobType' | 'salaryHighLow';

const JobListing: React.FC = () => {
  const { country } = useParams<{ country: string }>();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [categories, setCategories] = useState<string[]>(['All']);
  const [showFiltersDropdown, setShowFiltersDropdown] = useState(false);

  useEffect(() => { loadJobs(); }, [country]);
  useEffect(() => { filterAndSortJobs(); }, [jobs, selectedCategory, searchQuery, sortBy]);

  const isSalarySpecified = (salary: string): boolean => {
    if (!salary) return false;
    const normalizedSalary = salary.toLowerCase().trim();
    if (normalizedSalary === 'not specified' || normalizedSalary === '') return false;
    return /\d/.test(salary);
  };

  const loadJobs = async () => {
    if (!country) return;
    setLoading(true);
    setError(null);
    const response = await jobsApi.getByCountry(country);
    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      const allJobs = response.data;
      const featured = allJobs.filter(job => job.featured === 'Yes' && isSalarySpecified(job.salary));
      const nonFeatured = allJobs.filter(job => !(job.featured === 'Yes' && isSalarySpecified(job.salary)));
      setFeaturedJobs(featured);
      setJobs(nonFeatured);
      const uniqueCategories = ['All', ...new Set(allJobs.map(job => job.category).filter(Boolean))];
      setCategories(uniqueCategories);
    }
    setLoading(false);
  };

  const parseSalary = (salaryString: string): number => {
    if (!salaryString) return 0;
    const cleanedString = salaryString.replace(/[^0-9.]/g, '');
    const numbers = cleanedString.match(/\d+\.?\d*/g);
    if (!numbers || numbers.length === 0) return 0;
    const firstNumber = parseFloat(numbers[0]);
    return salaryString.toLowerCase().includes('k') ? firstNumber * 1000 : firstNumber;
  };

  const filterAndSortJobs = () => {
    let filtered = jobs;
    if (selectedCategory !== 'All') filtered = filtered.filter(job => job.category === selectedCategory);
    if (searchQuery) filtered = filtered.filter(job =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    let sorted = [...filtered];
    switch (sortBy) {
      case 'date': sorted.sort((a, b) => (parseInt(b.id) || 0) - (parseInt(a.id) || 0)); break;
      case 'jobType': sorted.sort((a, b) => (a.category || '').localeCompare(b.category || '')); break;
      case 'salaryHighLow': sorted.sort((a, b) => parseSalary(b.salary || '') - parseSalary(a.salary || '')); break;
    }
    setFilteredJobs(sorted);
  };

  const handleSaveJob = (jobId: string) => {
    if (savedJobsApi.isSaved(jobId)) savedJobsApi.unsaveJob(jobId);
    else savedJobsApi.saveJob(jobId);
    setJobs([...jobs]);
    setFeaturedJobs([...featuredJobs]);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <p className="text-red-600">{error}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <main className="container mx-auto px-4 py-6">
        {/* Featured Jobs */}
        {featuredJobs.map(job => (
          <JobCard
            key={job.id}
            job={job}
            isSaved={savedJobsApi.isSaved(job.id)}
            onSave={() => handleSaveJob(job.id)}
            onApply={() => navigate(`/apply/${job.id}`)}
          />
        ))}

        {/* Non-Featured Jobs with Ads every 3 jobs */}
        {filteredJobs.map((job, idx) => (
          <React.Fragment key={job.id}>
            <JobCard
              job={job}
              isSaved={savedJobsApi.isSaved(job.id)}
              onSave={() => handleSaveJob(job.id)}
              onApply={() => navigate(`/apply/${job.id}`)}
            />
            {(idx + 1) % 3 === 0 && (
              <div className="my-6 flex justify-center">
                <AdSense
                  slot="8509863911"
                  format="auto"
                  responsive="true"
                  className="w-full max-w-7xl px-4"
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab="home" />
    </div>
  );
};

export default JobListing;

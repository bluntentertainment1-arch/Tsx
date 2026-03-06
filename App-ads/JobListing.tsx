import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobsApi, savedJobsApi, Job } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import JobCard from '../components/JobCard';
import { TopBannerAd, MultiplexAd } from '../components/AdUnits';

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

  useEffect(() => {
    loadJobs();
  }, [country]);

  useEffect(() => {
    filterAndSortJobs();
  }, [jobs, selectedCategory, searchQuery, sortBy]);

  const isSalarySpecified = (salary: string): boolean => {
    if (!salary) return false;
    const normalizedSalary = salary.toLowerCase().trim();
    if (normalizedSalary === 'not specified' || normalizedSalary === '') return false;
    const hasNumber = /\d/.test(salary);
    return hasNumber;
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
      const featured = allJobs.filter(job => 
        job.featured === 'Yes' && isSalarySpecified(job.salary)
      );
      const nonFeatured = allJobs.filter(job => 
        !(job.featured === 'Yes' && isSalarySpecified(job.salary))
      );
      
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
    
    if (salaryString.toLowerCase().includes('k')) {
      return firstNumber * 1000;
    }
    
    return firstNumber;
  };

  const filterAndSortJobs = () => {
    let filtered = jobs;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(job => job.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    let sorted = [...filtered];
    
    switch (sortBy) {
      case 'date':
        sorted.sort((a, b) => {
          const idA = parseInt(a.id) || 0;
          const idB = parseInt(b.id) || 0;
          return idB - idA;
        });
        break;
      
      case 'jobType':
        sorted.sort((a, b) => {
          const categoryA = a.category || '';
          const categoryB = b.category || '';
          return categoryA.localeCompare(categoryB);
        });
        break;
      
      case 'salaryHighLow':
        sorted.sort((a, b) => {
          const salaryA = parseSalary(a.salary || '');
          const salaryB = parseSalary(b.salary || '');
          return salaryB - salaryA;
        });
        break;
    }

    setFilteredJobs(sorted);
  };

  const handleSaveJob = (jobId: string) => {
    if (savedJobsApi.isSaved(jobId)) {
      savedJobsApi.unsaveJob(jobId);
    } else {
      savedJobsApi.saveJob(jobId);
    }
    setJobs([...jobs]);
    setFeaturedJobs([...featuredJobs]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Top Banner Ad */}
      <TopBannerAd />

      {/* Featured Jobs */}
      {featuredJobs.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Featured Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredJobs.map(job => (
              <JobCard key={job.id} job={job} onSave={handleSaveJob} />
            ))}
          </div>
        </div>
      )}

      {/* Interstitial Banner Ad */}
      <div className="my-6">
        <TopBannerAd />
      </div>

      {/* Regular Jobs */}
      {filteredJobs.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">All Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredJobs.map(job => (
              <JobCard key={job.id} job={job} onSave={handleSaveJob} />
            ))}
          </div>
        </div>
      )}

      {/* Bottom Multiplex Ad */}
      <div className="mt-12">
        <MultiplexAd />
      </div>
    </div>
  );
};

export default JobListing;

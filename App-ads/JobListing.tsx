import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobsApi, savedJobsApi, Job } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import JobCard from '../components/JobCard';

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

  const getSortLabel = (option: SortOption): string => {
    switch (option) {
      case 'date':
        return 'Date Added (Newest)';
      case 'jobType':
        return 'Job Type (A-Z)';
      case 'salaryHighLow':
        return 'Salary (High to Low)';
      default:
        return 'Sort By';
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <header className="glass-effect shadow-xl sticky top-0 z-10 safe-top">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => navigate('/')}
              className="w-10 h-10 rounded-xl bg-white shadow-md hover:shadow-lg transition-all flex items-center justify-center text-blue-600"
              aria-label="Go back to home"
            >
              <i className="fa fa-home text-lg"></i>
            </button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent capitalize">
              {country?.replace('-', ' ')} Jobs
            </h1>
            <div className="relative">
              <button
                onClick={() => setShowFiltersDropdown(!showFiltersDropdown)}
                className="w-10 h-10 rounded-xl bg-white shadow-md hover:shadow-lg transition-all flex items-center justify-center text-blue-600"
                aria-label="Filters and Sort"
              >
                <i className="fa fa-sliders-h text-lg"></i>
              </button>
              {showFiltersDropdown && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-lg w-80 z-20 border border-slate-200 max-h-96 overflow-y-auto">
                  <div className="p-4 space-y-4">
                    <div>
                      <label className="text-xs font-medium text-slate-700 mb-2 block">Search Jobs</label>
                      <input
                        type="text"
                        placeholder="Enter keyword..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-700 mb-2 block">Filter by Category</label>
                      <div className="space-y-1 max-h-40 overflow-y-auto">
                        {categories.map((category) => (
                          <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`w-full px-3 py-2 text-left hover:bg-slate-50 transition-colors text-sm rounded-lg ${
                              selectedCategory === category ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-700'
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-700 mb-2 block">Sort By</label>
                      <div className="space-y-1">
                        <button
                          onClick={() => setSortBy('date')}
                          className={`w-full px-3 py-2 text-left hover:bg-slate-50 transition-colors text-sm rounded-lg ${
                            sortBy === 'date' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-700'
                          }`}
                        >
                          Date Added (Newest)
                        </button>
                        <button
                          onClick={() => setSortBy('jobType')}
                          className={`w-full px-3 py-2 text-left hover:bg-slate-50 transition-colors text-sm rounded-lg ${
                            sortBy === 'jobType' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-700'
                          }`}
                        >
                          Job Type (A-Z)
                        </button>
                        <button
                          onClick={() => setSortBy('salaryHighLow')}
                          className={`w-full px-3 py-2 text-left hover:bg-slate-50 transition-colors text-sm rounded-lg ${
                            sortBy === 'salaryHighLow' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-700'
                          }`}
                        >
                          Salary (High to Low)
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowFiltersDropdown(false)}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-semibold"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {featuredJobs.length > 0 && (
            <div className="mb-2">
              <button
                onClick={() => navigate(`/jobs/${country}/featured`)}
                className="w-full px-3 py-2 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 text-amber-700 hover:from-amber-100 hover:to-yellow-100 shadow-md flex items-center justify-between text-sm font-semibold"
              >
                <span className="flex items-center">
                  <i className="fa fa-star mr-2"></i>
                  View {featuredJobs.length} Featured Jobs
                </span>
                <i className="fa fa-chevron-right text-xs"></i>
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="card p-6 text-center">
            <i className="fa fa-exclamation-circle text-4xl text-red-500 mb-4"></i>
            <p className="text-slate-600">{error}</p>
            <button onClick={loadJobs} className="btn-primary mt-4">
              Try Again
            </button>
          </div>
        ) : (
          <>
            {filteredJobs.length === 0 && featuredJobs.length === 0 ? (
              <div className="card p-8 text-center">
                <i className="fa fa-inbox text-5xl text-slate-300 mb-4"></i>
                <p className="text-slate-500 text-lg">
                  {searchQuery || selectedCategory !== 'All'
                    ? 'No jobs found matching your criteria'
                    : 'No jobs available at the moment'}
                </p>
              </div>
            ) : filteredJobs.length > 0 ? (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    isSaved={savedJobsApi.isSaved(job.id)}
                    onApply={() => {}}
                    onSave={() => handleSaveJob(job.id)}
                  />
                ))}
              </div>
            ) : null}
          </>
        )}
      </main>
    </div>
  );
};

export default JobListing;
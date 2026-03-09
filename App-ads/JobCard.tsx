import React, { useState } from 'react';
import { Job, jobsApi } from '../services/api';
import { useNavigate } from 'react-router-dom';

interface JobCardProps {
  job: Job;
  isSaved: boolean;
  onApply: () => void;
  onSave: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, isSaved, onSave }) => {
  const navigate = useNavigate();
  const [showFeaturedBadge, setShowFeaturedBadge] = useState(false);

  const featuredCategories = ['warehouse', 'driver', 'sales', 'courier', 'cook', 'agriculture', 'support'];
  const category = job.category.toLowerCase().trim();
  const isFeaturedByCategory = featuredCategories.some(featuredCat => category.includes(featuredCat));

  const isFeatured =
    (job.featured &&
      job.featured.toLowerCase() === 'yes' &&
      job.salary &&
      job.salary.trim() !== '' &&
      job.salary.toLowerCase() !== 'not specified') ||
    isFeaturedByCategory;

  const [showToast, setShowToast] = useState(false);

  const handleCardClick = () => {
    navigate(`/job/${job.id}`);
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSave();

    if (!isSaved) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  /* GOOGLE JOB STRUCTURED DATA */

  const jobSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.date_added || new Date().toISOString(),
    employmentType: "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: "Global Work Visa Jobs",
      sameAs: "https://globalworkvisajobs.com",
      logo: "https://globalworkvisajobs.com/favicon-32x32.png"
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: job.location
      }
    },
    baseSalary: job.salary && job.salary !== "Not specified"
      ? {
          "@type": "MonetaryAmount",
          currency: "EUR",
          value: {
            "@type": "QuantitativeValue",
            value: job.salary
          }
        }
      : undefined,
    identifier: {
      "@type": "PropertyValue",
      name: "Global Work Visa Jobs",
      value: job.id
    },
    url: `https://globalworkvisajobs.com/job/${job.id}`
  };

  return (
    <>
      {/* GOOGLE JOB SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }}
      />

      <div
        onClick={handleCardClick}
        className={`card p-6 hover:scale-[1.02] transition-all cursor-pointer ${
          isFeatured
            ? 'border-2 border-amber-400 bg-gradient-to-br from-amber-50 to-yellow-50'
            : ''
        }`}
      >
        {(isFeatured || showFeaturedBadge) && (
          <div className="flex items-center space-x-2 mb-3">
            <i className="fa fa-star text-amber-500"></i>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">
              {showFeaturedBadge ? 'Featured Job - Unlocked!' : 'Featured Job'}
            </span>
          </div>
        )}

        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-800 mb-2">{job.title}</h3>

            <p className="text-sm text-slate-600 mb-2 flex items-center">
              <i className="fa fa-briefcase mr-2 text-blue-600"></i>
              {job.category}
            </p>

            <p className="text-sm text-slate-600 mb-2 flex items-center">
              <i className="fa fa-map-marker-alt mr-2 text-blue-600"></i>
              {job.location}
            </p>

            {job.salary && job.salary.toLowerCase() !== 'not specified' && (
              <p className="text-sm text-emerald-600 font-semibold mb-2 flex items-center">
                <i className="fa fa-money-bill-wave mr-2"></i>
                {job.salary}
              </p>
            )}

            {job.date_added && (
              <p className="text-xs text-slate-500 flex items-center">
                <i className="fa fa-clock mr-2"></i>
                Posted {jobsApi.formatJobDate(job.date_added)}
              </p>
            )}
          </div>

          <button
            onClick={handleSaveClick}
            className="w-12 h-12 rounded-xl bg-white hover:bg-slate-50 transition-all flex items-center justify-center border-2 border-blue-600 shadow-md hover:shadow-lg"
            aria-label={isSaved ? 'Unsave job' : 'Save job'}
          >
            <i
              className={`fa ${
                isSaved ? 'fa-bookmark' : 'fa-bookmark-o'
              } text-xl text-blue-600`}
            ></i>
          </button>
        </div>

        <p className="text-slate-700 text-sm mb-4 line-clamp-3">
          {job.description}
        </p>

        <div className="flex items-center justify-between flex-wrap gap-3">
          <span
            className={`px-4 py-2 rounded-xl text-xs font-semibold shadow-sm ${
              job.visa_tag === 'Visa Sponsored'
                ? 'bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border border-emerald-200'
                : 'bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 border border-amber-200'
            }`}
          >
            <i
              className={`fa ${
                job.visa_tag === 'Visa Sponsored'
                  ? 'fa-check-circle'
                  : 'fa-info-circle'
              } mr-1`}
            ></i>
            {job.visa_tag}
          </span>
        </div>
      </div>

      {showToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          <div className="flex items-center space-x-2">
            <i className="fa fa-check-circle"></i>
            <span>Job saved</span>
          </div>
        </div>
      )}
    </>
  );
};

export default JobCard;

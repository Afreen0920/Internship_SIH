import React from 'react';
import InternshipCard from '../InternshipCard/InternshipCard';

const mockInternships = [
  {
    id: 1,
    title: 'Software Engineering Intern',
    company: 'Google',
    location: 'Mountain View, CA',
    description: 'Work on exciting projects at Google.'
  },
  {
    id: 2,
    title: 'Product Manager Intern',
    company: 'Facebook',
    location: 'Menlo Park, CA',
    description: 'Help build the future of social media.'
  },
  {
    id: 3,
    title: 'Data Science Intern',
    company: 'Netflix',
    location: 'Los Gatos, CA',
    description: 'Analyze data to improve the user experience.'
  }
];

const InternshipList: React.FC = () => {
  return (
    <div className="container mt-5">
      <h2>Recommended Internships</h2>
      <div className="row">
        {mockInternships.map(internship => (
          <div className="col-md-4" key={internship.id}>
            <InternshipCard internship={internship} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InternshipList;

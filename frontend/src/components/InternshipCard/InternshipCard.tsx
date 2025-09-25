import React from 'react';

interface Internship {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
}

interface InternshipCardProps {
  internship: Internship;
}

const InternshipCard: React.FC<InternshipCardProps> = ({ internship }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{internship.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{internship.company} - {internship.location}</h6>
        <p className="card-text">{internship.description}</p>
        <button className="btn btn-primary">Save to Cart</button>
      </div>
    </div>
  );
};

export default InternshipCard;

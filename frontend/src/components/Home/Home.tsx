import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="container mt-5">
      <div className="jumbotron">
        <h1 className="display-4">AI-Based Internship Recommendation Engine</h1>
        <p className="lead">Find your dream internship with the power of AI.</p>
        <hr className="my-4" />
        <p>Upload your resume to get started.</p>
        <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
      </div>
    </div>
  );
};

export default Home;

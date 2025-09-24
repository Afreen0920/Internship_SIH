import React, { useState, useRef } from 'react';
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import { Badge } from "./components/ui/badge";

const PMInternshipFinder = () => {
  const [currentSlide, setCurrentSlide] = useState('home');
  const [selectedInternships, setSelectedInternships] = useState([]);
  const [appliedInternships, setAppliedInternships] = useState([]);
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: "Hi there! I'm Pip, your PM Internship Pal! I'm here to help you find the perfect Project Management internship tailored just for you!" }
  ]);
  const [userMessage, setUserMessage] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [userType, setUserType] = useState('');
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [currentApplication, setCurrentApplication] = useState(null);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    education: '',
    skills: '',
    experience: '',
    preferences: ''
  });
  const [applicationForm, setApplicationForm] = useState({
    coverLetter: '',
    availability: '',
    questions: ''
  });
  const fileInputRef = useRef(null);

  // Sample internship data with enhanced details
  const internships = [
    {
      id: 1,
      title: "Technical Project Management Intern",
      company: "TechCorp Inc.",
      location: "San Francisco, CA (On-site)",
      duration: "3 months",
      type: "Full-time",
      stipend: "$25 per hour",
      skills: ["Agile", "Scrum", "JIRA", "Communication", "Technical Documentation"],
      description: "Work on real tech projects and learn Agile methodologies. Gain hands-on experience with project management tools and team coordination.",
      matchScore: 95,
      applicationDeadline: "2024-02-15"
    },
    {
      id: 2,
      title: "Product Management Intern",
      company: "Innovate Labs",
      location: "New York, NY (Hybrid)",
      duration: "6 months",
      type: "Full-time",
      stipend: "$4,500 monthly",
      skills: ["Product Strategy", "User Research", "Roadmapping", "Market Analysis"],
      description: "Assist in product development lifecycle, conduct market research, and collaborate with cross-functional teams.",
      matchScore: 88,
      applicationDeadline: "2024-03-01"
    },
    {
      id: 3,
      title: "Project Coordinator Intern",
      company: "BuildRight Construction",
      location: "Chicago, IL (On-site)",
      duration: "4 months",
      type: "Part-time",
      stipend: "$20 per hour",
      skills: ["Construction Management", "Budgeting", "Scheduling", "Vendor Coordination"],
      description: "Learn project coordination in construction industry with focus on scheduling, budgeting, and stakeholder communication.",
      matchScore: 76,
      applicationDeadline: "2024-02-28"
    },
    {
      id: 4,
      title: "Digital Project Manager Intern",
      company: "WebSolutions Agency",
      location: "Remote",
      duration: "3 months",
      type: "Full-time",
      stipend: "$22 per hour",
      skills: ["Digital Marketing", "Client Management", "WordPress", "SEO", "Analytics"],
      description: "Manage digital projects for clients, coordinate with creative teams, and ensure project delivery timelines.",
      matchScore: 92,
      applicationDeadline: "2024-02-20"
    },
    {
      id: 5,
      title: "Agile Project Management Intern",
      company: "SoftDev Solutions",
      location: "Austin, TX (Remote)",
      duration: "5 months",
      type: "Part-time",
      stipend: "$18 per hour",
      skills: ["Agile Methodologies", "Sprint Planning", "Retrospectives", "Team Leadership"],
      description: "Participate in agile development processes, facilitate sprint ceremonies, and learn agile project management.",
      matchScore: 85,
      applicationDeadline: "2024-03-15"
    },
    {
      id: 6,
      title: "Healthcare Project Management Intern",
      company: "MedTech Innovations",
      location: "Boston, MA (On-site)",
      duration: "6 months",
      type: "Full-time",
      stipend: "$5,000 monthly + housing",
      skills: ["Healthcare Compliance", "Regulatory Knowledge", "Stakeholder Management", "Process Improvement"],
      description: "Work on healthcare technology projects with focus on compliance, regulatory requirements, and patient safety.",
      matchScore: 79,
      applicationDeadline: "2024-02-25"
    }
  ];

  const addToCart = (internship) => {
    if (!selectedInternships.find(item => item.id === internship.id)) {
      setSelectedInternships([...selectedInternships, internship]);
    }
  };

  const removeFromCart = (id) => {
    selectedInternships.filter(item => item.id !== id);
  };

  const applyForInternship = (internship) => {
    setCurrentApplication(internship);
    setShowApplicationForm(true);
  };

  const submitApplication = () => {
    if (currentApplication) {
      setAppliedInternships([...appliedInternships, currentApplication.id]);
      setShowApplicationForm(false);
      setApplicationForm({
        coverLetter: '',
        availability: '',
        questions: ''
      });
      
      // Add success message
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Great! I've submitted your application for ${currentApplication.title} at ${currentApplication.company}. I'll notify you when they respond!` 
      }]);
    }
  };

  const handleChatSend = () => {
    if (userMessage.trim()) {
      const newMessage = { role: 'user', content: userMessage };
      setChatMessages([...chatMessages, newMessage]);
      setUserMessage('');
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = generateAIResponse(userMessage);
        setChatMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
      }, 1000);
    }
  };

  const generateAIResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('skill') || lowerMessage.includes('qualification')) {
      return "Based on your resume, I recommend focusing on internships that value your strong communication and organizational skills. The Technical Project Management and Digital Project Manager roles would be excellent matches!";
    } else if (lowerMessage.includes('remote') || lowerMessage.includes('location')) {
      return "I see you're interested in remote opportunities. The Digital Project Manager Intern position at WebSolutions Agency is fully remote and might be perfect for you!";
    } else if (lowerMessage.includes('apply') || lowerMessage.includes('process')) {
      return "The application process typically involves submitting your resume, a cover letter, and sometimes completing a skills assessment. I can help you prepare for each step!";
    } else if (lowerMessage.includes('salary') || lowerMessage.includes('stipend')) {
      return "PM internships typically offer stipends ranging from $15-25 per hour depending on location and company size. Most also provide valuable mentorship and networking opportunities.";
    } else if (lowerMessage.includes('interview') || lowerMessage.includes('prepare')) {
      return "For PM interviews, focus on your communication skills, problem-solving abilities, and any relevant experience. Practice explaining projects you've worked on and how you handled challenges.";
    }
    
    return "I'd be happy to help you find the perfect PM internship! Could you tell me more about your specific skills, preferred location, or any particular companies you're interested in?";
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Simulate resume processing
      setTimeout(() => {
        setResumeText("Resume processed successfully! Found skills: Project Management, Communication, Leadership, Agile Methodology, Team Collaboration");
        setChatMessages(prev => [...prev, { 
          role: 'assistant', 
          content: "I've analyzed your resume! Your skills match well with Technical Project Management and Product Management roles. Would you like me to show you specific recommendations?" 
        }]);
      }, 2000);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      {/* Navigation */}
      <nav className="bg-background border-b border-border py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">PM Internship Pro</h1>
          <div className="flex space-x-2">
            <Button 
              variant={currentSlide === 'home' ? 'default' : 'outline'}
              onClick={() => setCurrentSlide('home')}
            >
              Home
            </Button>
            <Button 
              variant={currentSlide === 'about' ? 'default' : 'outline'}
              onClick={() => setCurrentSlide('about')}
            >
              About Us
            </Button>
            <Button 
              variant={currentSlide === 'internships' ? 'default' : 'outline'}
              onClick={() => setCurrentSlide('internships')}
            >
              Internships
            </Button>
            <Button 
              variant={currentSlide === 'jobs' ? 'default' : 'outline'}
              onClick={() => setCurrentSlide('jobs')}
            >
              Jobs
            </Button>
            <Button 
              variant={currentSlide === 'blogs' ? 'default' : 'outline'}
              onClick={() => setCurrentSlide('blogs')}
            >
              Blogs
            </Button>
            <Button 
              variant={currentSlide === 'profile' ? 'default' : 'outline'}
              onClick={() => setCurrentSlide('profile')}
            >
              Profile
            </Button>
            <Button 
              variant={currentSlide === 'assistant' ? 'default' : 'outline'}
              onClick={() => setCurrentSlide('assistant')}
            >
              AI Assistant
            </Button>
            <Button 
              variant={currentSlide === 'saved' ? 'default' : 'outline'}
              onClick={() => setCurrentSlide('saved')}
            >
              Saved ({selectedInternships.length})
            </Button>
          </div>
        </div>
      </nav>

      {/* Application Form Modal */}
      {showApplicationForm && currentApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>Apply for {currentApplication.title}</CardTitle>
              <CardDescription>at {currentApplication.company}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Why are you interested in this position?</Label>
                <Textarea 
                  value={applicationForm.coverLetter}
                  onChange={(e) => setApplicationForm({...applicationForm, coverLetter: e.target.value})}
                  placeholder="Tell us why you'd be a great fit for this internship..."
                  rows={4}
                />
              </div>
              <div>
                <Label>Availability</Label>
                <Input 
                  value={applicationForm.availability}
                  onChange={(e) => setApplicationForm({...applicationForm, availability: e.target.value})}
                  placeholder="When can you start and what's your availability?"
                />
              </div>
              <div>
                <Label>Questions for us?</Label>
                <Textarea 
                  value={applicationForm.questions}
                  onChange={(e) => setApplicationForm({...applicationForm, questions: e.target.value})}
                  placeholder="Any questions about the role or company?"
                  rows={2}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setShowApplicationForm(false)}>
                Cancel
              </Button>
              <Button onClick={submitApplication}>
                Submit Application
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Home Slide */}
        {currentSlide === 'home' && (
          <div className="text-center py-12">
            <h2 className="text-4xl font-bold mb-6">Welcome to PM Internship Pro</h2>
            <p className="text-xl mb-8 text-muted-foreground">Your gateway to the perfect Project Management internship experience</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle>AI-Powered Matching</CardTitle>
                </CardHeader>
                <CardContent>
                  <img 
                    src="https://placeholder-image-service.onrender.com/image/200x200?prompt=AI brain with connecting nodes and internship icons&id=ai-matching-001" 
                    alt="AI-powered matching system with brain network connecting to internship opportunities"
                    className="mx-auto mb-4 rounded-lg"
                  />
                  <p>Smart algorithm matches your skills with ideal PM internships</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Pip - Your AI Assistant</CardTitle>
                </CardHeader>
                <CardContent>
                  <img 
                    src="https://placeholder-image-service.onrender.com/image/200x200?prompt=Friendly robot assistant with graduation cap and helpful expression&id=ai-assistant-001" 
                    alt="Friendly AI assistant robot named Pip ready to help with internship search"
                    className="mx-auto mb-4 rounded-lg"
                  />
                  <p>Get personalized guidance from our AI assistant Pip</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Career Development</CardTitle>
                </CardHeader>
                <CardContent>
                  <img 
                    src="https://placeholder-image-service.onrender.com/image/200x200?prompt=Career growth ladder with internship steps leading to success&id=career-growth-001" 
                    alt="Career development ladder showing progression from internship to professional success"
                    className="mx-auto mb-4 rounded-lg"
                  />
                  <p>Build your career path with our comprehensive resources</p>
                </CardContent>
              </Card>
            </div>
            <div className="space-x-4">
              <Button onClick={() => setCurrentSlide('profile')} size="lg">
                Get Started - Create Profile
              </Button>
              <Button onClick={() => setCurrentSlide('assistant')} variant="outline" size="lg">
                Talk to AI Assistant
              </Button>
            </div>
          </div>
        )}

        {/* Profile Creation Slide */}
        {currentSlide === 'profile' && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Create Your Profile</CardTitle>
              <CardDescription>Tell us about yourself to get personalized recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label>Are you a Student or Organization?</Label>
                  <RadioGroup value={userType} onValueChange={setUserType} className="flex space-x-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="student" id="student" />
                      <Label htmlFor="student">Student</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="organization" id="organization" />
                      <Label htmlFor="organization">Organization</Label>
                    </div>
                  </RadioGroup>
                </div>

                {userType === 'student' && (
                  <>
                    <div>
                      <Label>Full Name</Label>
                      <Input 
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input 
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        placeholder="Enter your email"
                        type="email"
                      />
                    </div>
                    <div>
                      <Label>Education</Label>
                      <Input 
                        value={profileData.education}
                        onChange={(e) => setProfileData({...profileData, education: e.target.value})}
                        placeholder="Current degree/university"
                      />
                    </div>
                    <div>
                      <Label>Skills</Label>
                      <Textarea 
                        value={profileData.skills}
                        onChange={(e) => setProfileData({...profileData, skills: e.target.value})}
                        placeholder="List your skills (e.g., Agile, Scrum, Communication)"
                      />
                    </div>
                    <div>
                      <Label>Experience</Label>
                      <Textarea 
                        value={profileData.experience}
                        onChange={(e) => setProfileData({...profileData, experience: e.target.value})}
                        placeholder="Any previous experience or projects"
                      />
                    </div>
                    <div>
                      <Label>Preferences</Label>
                      <Textarea 
                        value={profileData.preferences}
                        onChange={(e) => setProfileData({...profileData, preferences: e.target.value})}
                        placeholder="Preferred location, stipend expectations, full-time/part-time"
                      />
                    </div>
                  </>
                )}

                {userType === 'organization' && (
                  <div>
                    <p className="text-primary">Organization portal coming soon! You'll be able to post internships and review applications.</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setCurrentSlide('internships')} className="w-full">
                {userType === 'student' ? 'Save Profile & Continue' : 'Continue'}
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* About Us Slide */}
        {currentSlide === 'about' && (
          <div className="max-w-4xl mx-auto p-8 rounded-lg border border-border">
            <h2 className="text-3xl font-bold mb-6">About PM Internship Pro</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>We are dedicated to connecting aspiring project managers with life-changing internship opportunities. Our AI-powered platform ensures perfect matches between students' skills and organizational needs.</p>
              <p>Founded by experienced PM professionals, we understand what it takes to succeed in the dynamic field of project management.</p>
              <img 
                src="https://placeholder-image-service.onrender.com/image/600x300?prompt=Professional team collaborating in modern office environment&id=about-team-001" 
                alt="Professional team collaborating in modern office environment for project management"
                className="w-full rounded-lg my-6"
              />
            </div>
          </div>
        )}

        {/* Internships Slide */}
        {currentSlide === 'internships' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Recommended PM Internships</h2>
              <p className="text-muted-foreground">Based on your profile and skills</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {internships.map((internship) => (
                <Card key={internship.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{internship.title}</CardTitle>
                    <CardDescription>{internship.company} • {internship.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <Badge variant={internship.matchScore > 90 ? "default" : "secondary"}>
                        {internship.matchScore}% Match
                      </Badge>
                    </div>
                    <p className="mb-4 text-sm">{internship.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {internship.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Duration: {internship.duration}</span>
                      <span>{internship.stipend}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-2">
                    <Button 
                      className="w-full"
                      onClick={() => applyForInternship(internship)}
                      disabled={appliedInternships.includes(internship.id)}
                    >
                      {appliedInternships.includes(internship.id) ? 'Applied' : 'Apply Now'}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => addToCart(internship)}
                      disabled={selectedInternships.some(item => item.id === internship.id)}
                    >
                      {selectedInternships.some(item => item.id === internship.id) ? 'Saved' : 'Save for Later'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Jobs Slide */}
        {currentSlide === 'jobs' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Project Management Jobs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Junior Project Manager</CardTitle>
                  <CardDescription>TechStart Inc. • New York, NY • Full-time</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">$55,000 - $65,000 per year • Requires 1-2 years experience</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary">Agile</Badge>
                    <Badge variant="secondary">Scrum</Badge>
                    <Badge variant="secondary">JIRA</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Apply Now</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Project Coordinator</CardTitle>
                  <CardDescription>BuildRight Co. • Chicago, IL • Part-time</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">$25-30 per hour • Flexible hours</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary">Coordination</Badge>
                    <Badge variant="secondary">Scheduling</Badge>
                    <Badge variant="secondary">Communication</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Apply Now</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}

        {/* Blogs Slide */}
        {currentSlide === 'blogs' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">PM Career Blog</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>5 Essential Skills for PM Interns</CardTitle>
                  <CardDescription>Posted: Jan 15, 2024 • 5 min read</CardDescription>
                </CardHeader>
                <CardContent>
                  <img 
                    src="https://placeholder-image-service.onrender.com/image/300x200?prompt=Project management skills infographic with communication and leadership icons&id=blog-pm-skills-001" 
                    alt="Infographic showing essential project management skills for interns"
                    className="w-full rounded mb-4"
                  />
                  <p>Discover the key skills that will make you stand out as a project management intern...</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Read More</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Remote Internship Success Tips</CardTitle>
                  <CardDescription>Posted: Dec 20, 2023 • 7 min read</CardDescription>
                </CardHeader>
                <CardContent>
                  <img 
                    src="https://placeholder-image-service.onrender.com/image/300x200?prompt=Person working remotely with laptop and organized workspace&id=blog-remote-work-001" 
                    alt="Professional working remotely with organized digital workspace"
                    className="w-full rounded mb-4"
                  />
                  <p>How to excel in your PM internship while working remotely...</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Read More</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}

        {/* Pip AI Assistant Slide */}
        {currentSlide === 'assistant' && (
          <div>
            <div className="flex items-center mb-6">
              <img 
                src="https://placeholder-image-service.onrender.com/image/40x40?prompt=Friendly robot assistant with graduation cap&id=ai-avatar-001" 
                alt="Pip the AI assistant avatar"
                className="mr-3 rounded-full"
              />
              <h2 className="text-2xl font-bold">Pip - Your PM Internship Assistant</h2>
            </div>
            
            <Card className="h-96 overflow-hidden">
              <CardHeader className="bg-muted py-3">
                <CardTitle className="text-lg">How can I help you today?</CardTitle>
                <CardDescription>Ask about internships, applications, or career advice</CardDescription>
              </CardHeader>
              <CardContent className="h-64 overflow-y-auto p-4">
                <div className="space-y-4">
                  {chatMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md rounded-lg px-4 py-2 ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground border'
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="bg-muted py-3">
                <div className="flex w-full gap-2">
                  <Input
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="Ask about internships, skills, or application process..."
                    onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                    className="flex-1"
                  />
                  <Button onClick={handleChatSend}>Send</Button>
                </div>
              </CardFooter>
            </Card>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-muted">
                <CardHeader className="py-3">
                  <CardTitle className="text-sm">Quick Questions</CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="space-y-2">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-xs h-8"
                      onClick={() => setUserMessage("What skills do I need for a PM internship?")}
                    >
                      Required skills for PM internships
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-xs h-8"
                      onClick={() => setUserMessage("How should I prepare for PM interviews?")}
                    >
                      Interview preparation tips
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-xs h-8"
                      onClick={() => setUserMessage("What's the average stipend for PM interns?")}
                    >
                      Stipend information
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Saved Internships Slide */}
        {currentSlide === 'saved' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Your Saved Internships</h2>
            
            {selectedInternships.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">No internships saved yet. Browse recommendations and save your favorites!</p>
                  <Button onClick={() => setCurrentSlide('internships')} className="mt-4">
                    Browse Internships
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {selectedInternships.map((internship) => (
                  <Card key={internship.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{internship.title}</CardTitle>
                          <CardDescription>{internship.company} • {internship.location}</CardDescription>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(internship.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-3">{internship.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {internship.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Duration: {internship.duration}</span>
                        <span>{internship.stipend}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full"
                        onClick={() => applyForInternship(internship)}
                        disabled={appliedInternships.includes(internship.id)}
                      >
                        {appliedInternships.includes(internship.id) ? 'Applied' : 'Apply Now'}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Resume Upload Slide */}
        {currentSlide === 'resume' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Upload Your Resume</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Resume Analysis</CardTitle>
                <CardDescription>Upload your resume for personalized internship matching</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                    />
                    <div className="mb-4">
                      <img 
                        src="https://placeholder-image-service.onrender.com/image/64x64?prompt=Document upload icon with paper sheet and upward arrow&id=upload-icon-001" 
                        alt="Document upload icon showing a paper sheet with upward pointing arrow"
                        className="mx-auto"
                      />
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Upload your resume (PDF or DOCX)
                    </p>
                    <Button onClick={triggerFileInput}>
                      Choose File
                    </Button>
                  </div>

                  {resumeText && (
                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Resume Analysis Results:</h3>
                      <p>{resumeText}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-muted border-t border-border py-6 px-4 mt-12">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            PM Internship Pro • AI-Powered Project Management Career Platform • Connecting Students with Perfect Opportunities
          </p>
          <div className="flex justify-center space-x-6 mt-4">
            <Button variant="ghost" size="sm">Privacy Policy</Button>
            <Button variant="ghost" size="sm">Terms of Service</Button>
            <Button variant="ghost" size="sm">Contact Us</Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PMInternshipFinder;
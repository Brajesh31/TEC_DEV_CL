import React, { useState, useEffect } from 'react';
import { MapPin, Linkedin, Github, Globe, Mail, Filter, Search } from 'lucide-react';

// Import ambassador data
// This will be loaded from a JSON file in the /data folder
interface Ambassador {
  id: string;
  name: string;
  role: string;
  region: string;
  country: string;
  bio: string;
  image: string;
  social: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
    email?: string;
  };
  achievements: string[];
  joinedDate: string;
}

const Ambassadors: React.FC = () => {
  const [ambassadors, setAmbassadors] = useState<Ambassador[]>([]);
  const [filteredAmbassadors, setFilteredAmbassadors] = useState<Ambassador[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Load ambassador data from JSON file
    // In a real implementation, this would be an API call or import
    const loadAmbassadors = async () => {
      try {
        // For demonstration, we're creating sample data
        // In production, you would fetch this from your API or import from JSON
        const sampleAmbassadors: Ambassador[] = [
              // ---- Core Members ----
              {
                id: '1',
                name: 'Kumar Gaurav Tiwari',
                role: 'Founder',
                region: 'Asia',
                country: 'India',
                bio: 'Passionate technologist and community builder with expertise in Python, Web Development, and Machine Learning. Founded Tech Dev Club to create a supportive environment for developers to learn and grow together.',
                image: '/core/kumar-gaurav-tiwari-founder.jpg',
                social: {
                  linkedin: 'https://www.linkedin.com/in/kumar-gaurav-tiwari-22b04027a/',
                  github: 'https://github.com/kumargauravtiwari',
                  email: 'techdevclub2025@gmail.com'
                },
                achievements: [
                  'Founded Tech Dev Club',
                  'Built a global developer community',
                  'Led multiple tech initiatives'
                ],
                joinedDate: '2025-06-01'
              },
              {
                id: '2',
                name: 'Brajesh Kumar',
                role: 'Co-Founder',
                region: 'Asia',
                country: 'India',
                bio: 'Creative CSE undergrad and Co-Founder of Tech Dev Club. I specialize in scalable, impactful solutions at the intersection of AI, web, and community building. Dedicated to empowering developers through inclusive tech initiatives, open-source projects, and global mentorship.',
                image: '/core/brajesh-kumar.jpg',
                social: {
                  linkedin: 'https://linkedin.com/in/brajesh-kumar-9b58651a8',
                  github: 'https://github.com/Brajesh31',
                  email: 'bk117134@gmail.com'
                },
                achievements: [
                  'Invited participant at OpenAI Academy Launch 2025 (Delhi)',
                  'Co-founded and scaled Tech Dev Club to a global community',
                  'Selected as Script Summer of Code (SSOC) Season 4 Contributor',
                  'Achieved 200K+ LinkedIn impressions for tech community engagement'
                ],
                joinedDate: '2025-06-01'
              },
              {
                id: '3',
                name: 'Vani Sen',
                role: 'Community Manager',
                region: 'Asia',
                country: 'India',
                bio: 'Experienced community manager passionate about AI and machine learning. Dedicated to fostering an inclusive and supportive environment for developers of all skill levels.',
                image: '/core/vani_community_manager.jpg',
                social: {
                  linkedin: 'https://www.linkedin.com/in/vani-sen-037b2422a/',
                  github: 'https://github.com/Vani412',
                  email: 'vanisen@techdevclub.com'
                },
                achievements: [
                  'Founder of AI4Tomorrow',
                  'Featured as a TOP CXO on Impaakt',
                  'Published Author & Youth Fellow UNESCO'
                ],
                joinedDate: '2025-06-01'
              },
              {
                id: '4',
                name: 'Bhavya Shukla',
                role: 'Team Leader',
                region: 'Asia',
                country: 'India',
                bio: 'IoT enthusiast and Computer Science student. Passionate about problem-solving, cloud platforms, and full-stack project development. Strives to boost innovation and collaboration within the Tech Dev Club community.',
                image: '/core/bhavya_team_leader.jpg',
                social: {
                  linkedin: 'https://www.linkedin.com/in/thebhavyashukla/',
                  github: 'https://github.com/bhavya21A',
                  email: 'bhavya@techdevclub.com'
                },
                achievements: [
                  'Qualified first round of Smart India Hackathon 2023',
                  'Student Ambassador at Viral Fission',
                  'Increased brand participation by 25%'
                ],
                joinedDate: '2025-06-01'
              },
              // ---- Volunteers (role set to "volunteer") ----
              {
                id: '5',
                name: 'Ishika Patel',
                role: 'volunteer',
                region: 'Asia',
                country: 'India',
                bio: 'Motivated and curious Computer Science & Design undergraduate passionate about software development, UI/UX design, and problem-solving. Skilled in both frontend and backend development with a keen interest in building innovative and real-world solutions.',
                image: '/volunteer/ishika_patel.jpg',
                social: {
                  linkedin: 'https://www.linkedin.com/in/ishika-patel-4682ab231/',
                  github: '',
                  email: ''
                },
                achievements: [
                  'Qualified in the first round of the Smart India Hackathon 2023',
                  'Developed Evidence-Based Drug & Formulation Recommender (2023)',
                  'Created University Entrepreneurship Platform (2024)'
                ],
                joinedDate: '2025-06-01'
              },
              {
                id: '6',
                name: 'Palak Srivastava',
                role: 'volunteer',
                region: 'Asia',
                country: 'India',
                bio: 'Computer Science student specializing in AI, passionate about tech, problem-solving, and innovation. Explores AI through prompt engineering and actively seeks new learning opportunities.',
                image: '/volunteer/palak_srivastava.jpg',
                social: {
                  linkedin: 'https://www.linkedin.com/in/palak-srivastava-b75482329',
                  github: '',
                  email: ''
                },
                achievements: [
                  'Participated in dance and various college events',
                  'Attended numerous tech events for continuous learning'
                ],
                joinedDate: '2025-06-01'
              },
              {
                id: '7',
                name: 'Anushka Parmar',
                role: 'volunteer',
                region: 'Asia',
                country: 'India',
                bio: 'B.Tech CSE student at GNIOT with a passion for coding and innovation. Committed to continuous learning, exploring new ideas, and growing through teamwork and self-improvement.',
                image: '/volunteer/anushka_parmar.jpg',
                social: {
                  linkedin: 'https://www.linkedin.com/in/anushka-parmar-233640328',
                  github: '',
                  email: ''
                },
                achievements: [
                  'Participated in singing and multiple college events',
                  'Actively explored tech events to learn and grow'
                ],
                joinedDate: '2025-06-01'
              },
              {
                id: '8',
                name: 'Aman Jyoti Jha',
                role: 'volunteer',
                region: 'Asia',
                country: 'India',
                bio: 'Computer Science student specializing in AI, passionate about tech, problem-solving, and innovation. Builds full-stack projects, works with cloud platforms, and explores AI through prompt engineering.',
                image: '/volunteer/aman_jyoti_jha.jpg',
                social: {
                  linkedin: 'https://www.linkedin.com/in/aman-jyoti-jha-583611307/',
                  github: '',
                  email: ''
                },
                achievements: [
                  'Second Prize in Inter-Branch Poster Making Competition',
                  'Developed AI-Based Smart Home Automation System',
                  'Created Amazon E-commerce Website Clone',
                  'Built Wireless Sensor Network for Agriculture'
                ],
                joinedDate: '2025-06-01'
              },
              {
                id: '9',
                name: 'Aditya Dhanraj',
                role: 'volunteer',
                region: 'Asia',
                country: 'India',
                bio: 'Tech-driven Computer Science (AI specialization) student with hands-on experience in sensor-based systems and IoT solutions. Passionate about solving real-world problems through innovative technologies and automation.',
                image: '/volunteer/aditya_dhanraj.jpg',
                social: {
                  linkedin: 'https://www.linkedin.com/in/aditya-dhanraj-55932235b',
                  github: '',
                  email: ''
                },
                achievements: [
                  'Developed Wireless Sensor Network for Agriculture',
                  'Created AI-powered Smart Home Automation System'
                ],
                joinedDate: '2025-06-01'
              },
              {
                id: '10',
                name: 'Aadarsh Kumar',
                role: 'volunteer',
                region: 'Asia',
                country: 'India',
                bio: 'B.Tech student in CSE-AI at GNIOT, with interests in cybersecurity, smart systems, and wireless sensor networks. Builds scalable, low-power, and AI-driven solutions to real-world problems.',
                image: '/volunteer/aadarsh_kumar.jpg',
                social: {
                  linkedin: 'https://www.linkedin.com/in/aadarsh-kumar-aa4a40278',
                  github: '',
                  email: ''
                },
                achievements: [
                  'Developed an efficient IoT network topology',
                  'Integrated advanced power-saving methods for autonomous operation',
                  'Built AI-Powered Smart Home Automation System'
                ],
                joinedDate: '2025-06-01'
              },
              {
                id: '11',
                name: 'Priyam Kumar',
                role: 'volunteer',
                region: 'Asia',
                country: 'India',
                bio: 'Passionate Computer Science student specializing in IoT. Experienced in web development, cloud platforms, and team collaboration. Constantly seeks to innovate and build impactful tech solutions.',
                image: '/volunteer/priyam_kumar.jpg',
                social: {
                  linkedin: 'https://linkedin.com/in/priyam-kumar-71b602285',
                  github: 'https://github.com/PriyamKumar1215',
                  email: ''
                },
                achievements: [
                  'Qualified the first round of Smart India Hackathon 2023',
                  'Organized a large-scale E-Sport Championship at GNIOT',
                  'Developed Smart Security Platform for IoT using ESP32',
                  'Created Campus Connect – Student Collaboration Platform'
                ],
                joinedDate: '2025-06-01'
              },
              {
                id: '12',
                name: 'Nikhil Sagar',
                role: 'volunteer',
                region: 'Asia',
                country: 'India',
                bio: 'Passion-driven individual with a deep appetite for technology. Contributes to innovative web interfaces and robust APIs. Always eager to grow technical skills and collaborate.',
                image: '/volunteer/nikhil_sagar.jpg',
                social: {
                  linkedin: 'https://www.linkedin.com/in/nikhil-sagar-b36521251',
                  github: 'https://github.com/curiouslad7',
                  email: ''
                },
                achievements: [
                  'Coordinator for the E-Sports Tech Event at college',
                  'Developed Smart Security Platform for IoT using ESP32',
                  'Created Campus Connect – Student Collaboration Platform',
                  'Worked on IoT-Based Power Failure Monitoring System',
                  'Earned certification in Power BI and AI Dashboard',
                  'Certified in Artificial Intelligence',
                  'Worked on multiple cutting-edge real-life projects'
                ],
                joinedDate: '2025-06-01'
              },
              {
                id: '13',
                name: 'Udit Singh',
                role: 'volunteer',
                region: 'Asia',
                country: 'India',
                bio: 'B.Tech student at GNIOT with experience in Vue.js, React, and Django. Led major frontend projects and published research on tech for students with special needs. Advocates accessible, user-focused development.',
                image: '/volunteer/udit_singh.jpg',
                social: {
                  linkedin: 'https://www.linkedin.com/in/udit-singh-86863025b',
                  github: 'https://github.com/Udit-Singh-34567',
                  email: ''
                },
                achievements: [
                  'Published research on “Web-Ecosystem for Students with Special Needs”',
                  'Top 15 at AM Hacks 2025 national hackathon',
                  'Delivered and maintained 3+ active web projects'
                ],
                joinedDate: '2025-06-01'
              },
              {
                id: '14',
                name: 'Vanshika Singh',
                role: 'volunteer',
                region: 'Asia',
                country: 'India',
                bio: 'First-year AI/ML undergrad passionate about robotics, emerging trends, and campus tech engagement. Dedicated to growing a connected, innovative community.',
                image: '/volunteer/vanshika_singh.jpg',
                social: {
                  linkedin: 'https://www.linkedin.com/in/vanshika-singh-94465933b',
                  github: '',
                  email: ''
                },
                achievements: [
                  'Participated in Yukti – NRI Startup Competition',
                  'Attended multiple tech and AI/ML events',
                  'Active student ambassador and campus collaborator'
                ],
                joinedDate: '2025-06-01'
              },
              {
                id: '15',
                name: 'Atharv Dwivedi',
                role: 'volunteer',
                region: 'Asia',
                country: 'India',
                bio: 'ECE student at JSS Noida specializing in videography and electronic circuits. Bridges technology with creative visual storytelling for campus and club initiatives.',
                image: '/volunteer/atharv_dwivedi.jpg',
                social: {
                  linkedin: 'https://www.linkedin.com/in/atharv-dwivedi-88ab01303',
                  github: '',
                  email: ''
                },
                achievements: [
                  'Produced official event after-movies for JSS Noida fests',
                  'Awarded Best Short Film in intra-college contest',
                  'Covered major campus events as a photographer'
                ],
                joinedDate: '2025-06-01'
              }
            ];
        
        setAmbassadors(sampleAmbassadors);
        setFilteredAmbassadors(sampleAmbassadors);
        setLoading(false);
      } catch (error) {
        console.error('Error loading ambassador data:', error);
        setLoading(false);
      }
    };

    loadAmbassadors();
  }, []);

  // Filter ambassadors when region or search term changes
  useEffect(() => {
    const filtered = ambassadors.filter(ambassador => {
      const matchesRegion = selectedRegion === 'all' || ambassador.region === selectedRegion;
      const matchesSearch = 
        ambassador.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ambassador.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ambassador.country.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesRegion && matchesSearch;
    });
    
    setFilteredAmbassadors(filtered);
  }, [selectedRegion, searchTerm, ambassadors]);

  // Get unique regions for filter
  const regions = ['all', ...new Set(ambassadors.map(a => a.region))];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Ambassadors</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Meet the passionate leaders helping us grow Tech Dev Club.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Region Filter */}
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-400 mr-2" />
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
              >
                <option value="all">All Regions</option>
                {regions.filter(r => r !== 'all').map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search ambassadors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:text-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Ambassadors Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredAmbassadors.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">No ambassadors found</h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAmbassadors.map(ambassador => (
                <div key={ambassador.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <img 
                        src={ambassador.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(ambassador.name)}&background=random`} 
                        alt={ambassador.name} 
                        className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-blue-500"
                      />
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{ambassador.name}</h3>
                        <p className="text-blue-600 dark:text-blue-400">{ambassador.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{ambassador.country}, {ambassador.region}</span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {ambassador.bio}
                    </p>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Key Achievements:</h4>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 text-sm">
                        {ambassador.achievements.map((achievement, index) => (
                          <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex space-x-3 mt-4">
                      {ambassador.social.linkedin && (
                        <a href={ambassador.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500">
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                      {ambassador.social.github && (
                        <a href={ambassador.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                          <Github className="h-5 w-5" />
                        </a>
                      )}
                      {ambassador.social.website && (
                        <a href={ambassador.social.website} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500">
                          <Globe className="h-5 w-5" />
                        </a>
                      )}
                      {ambassador.social.email && (
                        <a href={`mailto:${ambassador.social.email}`} className="text-gray-400 hover:text-red-500">
                          <Mail className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                    
                    <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                      Ambassador since {new Date(ambassador.joinedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long'
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Become an Ambassador CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Become an Ambassador</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Passionate about tech and community building? Join our ambassador program and help grow Tech Dev Club in your region.
          </p>
          <a
              href="https://forms.gle/2mzR82W746Jd7S6G6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-blue-700 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors duration-300 shadow-lg"
          >
            Apply Now
          </a>

        </div>
      </section>
    </div>
  );
};

export default Ambassadors;
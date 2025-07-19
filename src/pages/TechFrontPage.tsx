import React from "react";
import { Clock, MapPin, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const TechFrontPage: React.FC = () => {
    const speakers = [
        {
            id: 1,
            name: "Arghya Kamal Guha",
            title: "Management Consultant | AI & Automation Strategist",
            company: "Protiviti Global Consulting",
            avatar: "/speakers/arghya_kamal_guha.jpg",
            linkedin: "https://www.linkedin.com/in/arghyakg",
        },
        {
            id: 2,
            name: "Aashi Gupta",
            title: "Senior AI Engineer",
            company: "Marsh McLennan",
            avatar: "/speakers/aashi_gupta.jpg",
            linkedin: "https://linkedin.com/in/aashigupta",
        },
        {
            id: 3,
            name: "Arun Kumar Yadav",
            title: "Blockchain Developer",
            company: "Independent / Blockchain Community",
            avatar: "/speakers/arun_kumar_yadav.jpg",
            linkedin: "https://www.linkedin.com/in/arrnaya?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        },
        {
            id: 4,
            name: "Mukul Goyal",
            title: "Tech Entrepreneur | AI & Blockchain Strategist | Founder – DIMRAJ",
            company: "DIMRAJ | Community Leader",
            avatar: "/speakers/mukul_goyal.jpg",
            linkedin: "https://www.linkedin.com/in/mukul-goyl/",
        },
    ];

    const organizers = [
        {
            id: 1,
            name: "Kumar Gaurav Tiwari",
            title: "Founder",
            location: "India",
            avatar: "/core/kumar-gaurav-tiwari-founder.jpg",
            linkedin: "https://www.linkedin.com/in/kumar-gaurav-tiwari-22b04027a/",
        },
        {
            id: 2,
            name: "Brajesh Kumar",
            title: "Co-Founder",
            location: "India",
            avatar: "/core/brajesh-kumar.jpg",
            linkedin: "https://www.linkedin.com/in/brajesh-kumar-9b58651a8/",
        },
        {
            id: 3,
            name: "Vani Sen",
            title: "Community Manager",
            location: "India",
            avatar: "/core/vani_community_manager.jpg",
            linkedin: "https://www.linkedin.com/in/vani-sen-037b2422a/",
        },
        {
            id: 4,
            name: "Bhavya Shukla",
            title: "Team Leader",
            location: "India",
            avatar: "/core/bhavya_team_leader.jpg",
            linkedin: "https://www.linkedin.com/in/thebhavyashukla/",
        },
    ];

    const volunteers = [
        {
            id: 1,
            name: "Ishika Patel",
            title: "Full Stack Developer",
            location: "India",
            avatar: "/volunteer/ishika_patel.jpg",
            linkedin: "https://www.linkedin.com/in/ishika-patel-4682ab231/",
        },
        {
            id: 2,
            name: "Palak Srivastava",
            title: "CSE-AI Student",
            location: "India",
            avatar: "/volunteer/palak_srivastava.jpg",
            linkedin: "https://www.linkedin.com/in/palak-srivastava-b75482329",
        },
        {
            id: 3,
            name: "Anushka Parmar",
            title: "CSE Student",
            location: "India",
            avatar: "/volunteer/anushka_parmar.jpg",
            linkedin: "https://www.linkedin.com/in/anushka-parmar-233640328",
        },
        {
            id: 4,
            name: "Aman Jyoti Jha",
            title: "Full Stack Developer",
            location: "India",
            avatar: "/volunteer/aman_jyoti_jha.jpg",
            linkedin: "https://www.linkedin.com/in/aman-jyoti-jha-583611307/",
        },
        {
            id: 5,
            name: "Aditya Dhanraj",
            title: "Technical Consultant",
            location: "India",
            avatar: "/volunteer/aditya_dhanraj.jpg",
            linkedin: "https://www.linkedin.com/in/aditya-dhanraj-55932235b",
        },
        {
            id: 6,
            name: "Aadarsh Kumar",
            title: "Cyber Security Enthusiast",
            location: "India",
            avatar: "/volunteer/aadarsh_kumar.jpg",
            linkedin: "https://www.linkedin.com/in/aadarsh-kumar-aa4a40278",
        },
        {
            id: 7,
            name: "Priyam Kumar",
            title: "Frontend Developer",
            location: "India",
            avatar: "/volunteer/priyam_kumar.jpg",
            linkedin: "https://linkedin.com/in/priyam-kumar-71b602285",
        },
        {
            id: 8,
            name: "Nikhil Sagar",
            title: "Full-stack Developer | CSE IoT Student",
            location: "India",
            avatar: "/volunteer/nikhil_sagar.jpg",
            linkedin: "https://www.linkedin.com/in/nikhil-sagar-b36521251",
        },
        {
            id: 9,
            name: "Udit Singh",
            title: "Full-Stack Developer | Aspiring AI Engineer | Data Science Undergraduate",
            location: "India",
            avatar: "/volunteer/udit_singh.jpg",
            linkedin: "https://www.linkedin.com/in/udit-singh-86863025b",
        },
        {
            id: 10,
            name: "Vanshika Singh",
            title: "AI-ML Student | Machine Learning Enthusiast",
            location: "India",
            avatar: "/volunteer/vanshika_singh.jpg",
            linkedin: "https://www.linkedin.com/in/vanshika-singh-94465933b",
        },
        {
            id: 11,
            name: "Atharv Dwivedi",
            title: "Videographer | Photographer | Video Editor | ECE Undergrad",
            location: "India",
            avatar: "/volunteer/atharv_dwivedi.jpg",
            linkedin: "https://www.linkedin.com/in/atharv-dwivedi-88ab01303",
        },
        {
            id: 12,
            name: "Khushi Sharma",
            title: "Frontend Developer | UI/UX Enthusiast | Community Builder",
            location: "India",
            avatar: "/volunteer/khushi_sharma.jpg",
            linkedin: "https://www.linkedin.com/in/khushi-sharma245/"
        },
        {
            id: 13,
            name: "Satyam Singh",
            title: "CSE Core Student | Computer Science Enthusiast",
            location: "India",
            avatar: "/volunteer/satyam_singh.jpg",
            linkedin: "https://www.linkedin.com/in/satyam-singh-724938189"
        }
    ];

    return (
        <div className="max-w-5xl mx-auto py-16 px-6 sm:px-8 lg:px-12">
            {/* Banner */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-xl mb-8 shadow overflow-hidden flex items-center justify-center">
                <img
                    src="/event/techfront-banner-unstop.jpg"
                    alt="TechFront AI and Blockchain"
                    className="w-full max-h-[360px] object-contain"
                />
            </div>

            {/* Title & Date/Time/Location */}
            <h1 className="text-4xl font-bold mb-4">TechFront AI and Blockchain</h1>
            <div className="mb-6 text-gray-700 dark:text-gray-300 text-lg">
                <p>
                    <b>Date:</b> July 12, 2025<br />
                    <b>Time:</b> 9:00 AM – 4:00 PM IST<br />
                    <b>Location:</b> THOUGHTWORK, GURUGRAM
                </p>
            </div>

            {/* Description */}
            <p className="mb-8 text-lg text-gray-700 dark:text-gray-300 whitespace-pre-line">
                Step into the epicenter of innovation at , where trailblazers in Artificial Intelligence and Blockchain converge for a day of inspiration, learning, and connection.
            </p>
            {/* Why Attend */}
            <div className="mb-10">
                <h2 className="text-2xl font-semibold mb-2">Why Attend?</h2>
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                    Join us at the intersection of innovation and impact! TechFront 2025 brings together AI and Blockchain pioneers to share their insights, demos, and visions. You'll witness firsthand how cutting-edge technologies are solving real-world problems, from decentralized finance and smart contracts to generative AI and NLP. Whether you're looking to boost your knowledge, connect with experts, or collaborate on your next big idea, this event is your gateway to future tech leadership.
                </p>
            </div>

            {/* Highlights */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Highlights</h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                    <li>Visionary Talks from industry leaders</li>
                    <li>Hands-on AI & Blockchain Workshops</li>
                    <li>Thought-provoking Panel Discussions</li>
                    <li>Showcase Arena for project demos</li>
                    <li>Networking Lounges with top talent</li>
                    <li>Exclusive Swag & Prizes for attendees</li>
                </ul>
            </div>
            {/* Event Timeline */}
            <div className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Event Timeline</h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                    <li>🕙 10:00 – 10:15 AM — Welcome Address & Club Introduction</li>
                    <li>🎙 10:15 – 11:00 AM — Arghya Kamal Guha: AI in ERP and Marketing Tech</li>
                    <li>🤖 11:05 – 11:50 AM — Aashi Gupta: Responsible GenAI in Enterprises</li>
                    <li>🌍 11:55 – 12:40 PM — Arun Kumar Yadav: Blockchain for the Next Billion</li>
                    <li>🔗 12:45 – 1:30 PM — Mukul Goyal: Blockchain Beyond Crypto</li>
                    <li>🍱 1:30 – 2:30 PM — Networking Lunch + Demos + Meet the Speakers</li>
                    <li>🎯 2:30 – 3:15 PM — Tech Quiz, Community Games & Swag Distribution</li>
                    <li>📸 3:15 – 4:00 PM — Closing Remarks + Group Photos + Feedback</li>
                </ul>
            </div>

            {/* What You'll Experience */}
            <div className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">What You'll Experience</h2>
                <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
                    TechFront is not your typical tech meetup. It's a full-sensory, interactive experience designed to inspire action, provoke curiosity, and foster genuine collaboration.
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                    <li>⚙️ Live walkthroughs of enterprise-grade AI & Blockchain tools</li>
                    <li>🧪 Interactive booths featuring open-source prototypes & MVPs</li>
                    <li>🎙 Fireside chats with founders and tech leaders</li>
                    <li>📸 Community wall & social spotlight zones</li>
                    <li>🎁 Tech quizzes, mini-games, and real-time leaderboard giveaways</li>
                </ul>
            </div>
            {/* Who Should Attend */}
            <div className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Who Should Attend</h2>
                <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
                    Whether you're exploring AI for the first time or deploying dApps at scale — this summit has something tailored for you.
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                    <li>👩‍💻 Students looking to explore cutting-edge career paths</li>
                    <li>🏗 Developers eager to build with AI, LLMs, or smart contracts</li>
                    <li>🧠 Researchers diving into GenAI, LangChain, or diffusion models</li>
                    <li>💼 Founders & startup teams exploring decentralized ecosystems</li>
                    <li>🎓 Community builders, design thinkers, and open-source lovers</li>
                </ul>
            </div>
            {/* Tech Domains Covered */}
            <div className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Tech Domains Covered</h2>
                <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
                    Our sessions span across impactful technologies that are redefining how we learn, build, and innovate.
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                    <li>🤖 Generative AI (LLMs, LangGraph, LangChain)</li>
                    <li>🌐 Blockchain Infrastructure & DeFi Protocols</li>
                    <li>🧩 Hybrid AI x Blockchain Applications</li>
                    <li>🔍 NLP, Text-to-SQL, and Enterprise Search</li>
                    <li>⚡ MLOps, Model Monitoring, and Feedback Loops</li>
                    <li>🔐 Smart Contracts, DAO frameworks, and Identity Systems</li>
                </ul>
            </div>




            {/* Speakers */}
            <div className="mb-10">
                <h2 className="text-2xl font-semibold mb-6 text-center">Speakers</h2>
                <div className="grid md:grid-cols-4 gap-6">
                    {speakers.map(({ id, avatar, name, title, company, linkedin }) => (
                        <div key={id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow text-center flex flex-col items-center">
                            <img src={avatar} alt={name} className="w-28 h-28 rounded-full object-cover mb-4" />
                            <div className="font-semibold text-lg text-gray-900 dark:text-white">{name}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{title}</div>
                            {company && <div className="text-xs text-gray-500">{company}</div>}
                            {linkedin && (
                                <a href={linkedin} target="_blank" rel="noopener noreferrer"
                                   className="mt-4 inline-flex items-center gap-2 rounded bg-blue-700 px-4 py-2 text-white hover:bg-blue-800 transition">
                                    <Linkedin size={18} /> LinkedIn
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Organizers */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6 text-center">Organizers</h2>
                <div className="grid md:grid-cols-4 gap-6">
                    {organizers.map(({ id, avatar, name, title, location, linkedin }) => (
                        <div key={id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow text-center flex flex-col items-center">
                            <img src={avatar} alt={name} className="w-28 h-28 rounded-full object-cover mb-4" />
                            <div className="font-semibold text-lg text-gray-900 dark:text-white">{name}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{title}</div>
                            <div className="text-xs text-gray-500">{location}</div>
                            {linkedin && (
                                <a href={linkedin} target="_blank" rel="noopener noreferrer"
                                   className="mt-4 inline-flex items-center gap-2 rounded bg-blue-700 px-4 py-2 text-white hover:bg-blue-800 transition">
                                    <Linkedin size={18} /> LinkedIn
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Sponsors */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6 text-center">Sponsors & Partners</h2>
                <div className="flex flex-wrap justify-center items-center gap-10">

                    {/* Devnovate */}
                    <div className="flex flex-col items-center">
                        <img src="/sponsor/devnovate-logo.jpg" alt="Devnovate Logo" className="w-48 object-contain" />
                        <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">Platform Partner</p>
                    </div>


                    {/* TruScholar */}
                    <div className="flex flex-col items-center">
                        <img src="/sponsor/truscholar-logo.png" alt="TruScholar Logo" className="w-48 object-contain" />
                        <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">Credential Partner</p>
                    </div>

                    {/* Physics Wallah */}
                    <div className="flex flex-col items-center">
                        <img src="/sponsor/pw-logo.png" alt="Physics Wallah Logo" className="w-48 object-contain" />
                        <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">Title Sponsor</p>
                    </div>

                </div>
            </div>


            {/* Volunteers */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6 text-center">Volunteers</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {volunteers.map(({ id, avatar, name, title, location, linkedin }) => (
                        <div key={id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow text-center flex flex-col items-center">
                            <img src={avatar} alt={name} className="w-24 h-24 rounded-full object-cover mb-4" />
                            <div className="font-semibold text-lg text-gray-900 dark:text-white">{name}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{title}</div>
                            <div className="text-xs text-gray-500">{location}</div>
                            {linkedin && (
                                <a href={linkedin} target="_blank" rel="noopener noreferrer"
                                   className="mt-4 inline-flex items-center gap-2 rounded bg-blue-700 px-4 py-2 text-white hover:bg-blue-800 transition">
                                    <Linkedin size={18} /> LinkedIn
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <a
                    href="https://devnovate.co/event/techfront-ai-and-blockchain-summit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition text-center w-full sm:w-auto"
                >
                    Register / RSVP
                </a>
                <Link
                    to="/events"
                    className="inline-block px-6 py-3 rounded-lg border border-primary-600 text-primary-600 font-semibold hover:bg-primary-100 hover:text-primary-700 transition text-center w-full sm:w-auto"
                >
                    ← Back to All Events
                </Link>
            </div>
        </div>
    );
};

export default TechFrontPage;
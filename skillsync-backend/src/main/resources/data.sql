CREATE TABLE IF NOT EXISTS invitations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    sender_id BIGINT,
    receiver_id BIGINT,
    event_id BIGINT,
    status VARCHAR(20) DEFAULT 'PENDING'
);

-- Insert Mock Hackathons
INSERT INTO events (title, date, mode, type, description) VALUES 
('HackTheFuture 2026', 'Oct 15 - Oct 17', 'Hybrid', 'Hackathon', 'Build innovative solutions for web3 and decentralized platforms. Top prizes for best UI and smartest contract execution.'),
('Open Source October Fest', 'Oct 20 - Oct 25', 'Online', 'Hackathon', 'Contribute to widely used open source repositories. Perfect for beginners to learn Git and version control.'),
('Web Development Sprint', 'Oct 28', 'In-Person', 'Coding Sprint', 'A 12-hour intensive sprint to build a fully functional e-commerce website from scratch using modern frameworks.'),
('PBL Semester 4 Final', 'Nov 10', 'In-Person', 'PBL Project', 'Final project submissions for Semester 4. Forming a balanced team of frontend, backend, and documentation is critical.'),
('Cybersecurity Crackdown', 'Nov 15 - Nov 16', 'Hybrid', 'CTF Event', 'Capture the Flag style event focusing on network security, cryptography, and reverse engineering.'),
('App Innovation Challenge', 'Nov 22 - Nov 24', 'Online', 'Hackathon', 'Design and develop mobile applications that solve real-world accessibility issues. Android and iOS tracks available.'),
('AI for Good Challenge', 'Dec 01 - Dec 05', 'Online', 'Global Hack', 'Use machine learning and data sets to tackle climate change or healthcare problems.'),
('Code For Charity', 'Dec 12 - Dec 14', 'In-Person', 'Hackathon', 'Build software tools for local non-profits and charities. Focus on UX design and scalable database architecture.'),
('Winter Game Jam', 'Dec 20 - Dec 22', 'Online', 'Game Jam', 'Create a 2D or 3D indie game from scratch within 48 hours based on a secret theme announced at the start.');

-- Insert required skills for events
-- Event 1: HackTheFuture
INSERT INTO event_skills (event_id, skill) VALUES (1, 'React'), (1, 'Blockchain'), (1, 'UI/UX'), (1, 'Node.js');
-- Event 2: Open Source October
INSERT INTO event_skills (event_id, skill) VALUES (2, 'Git'), (2, 'Java'), (2, 'Python'), (2, 'C++');
-- Event 3: Web Dev Sprint
INSERT INTO event_skills (event_id, skill) VALUES (3, 'HTML/CSS'), (3, 'JavaScript'), (3, 'React'), (3, 'Figma');
-- Event 4: PBL
INSERT INTO event_skills (event_id, skill) VALUES (4, 'Java'), (4, 'Spring Boot'), (4, 'SQL'), (4, 'HTML/CSS');
-- Event 5: Cyber
INSERT INTO event_skills (event_id, skill) VALUES (5, 'Linux'), (5, 'Networking'), (5, 'Python'), (5, 'Cryptography');
-- Event 6: App Challenge
INSERT INTO event_skills (event_id, skill) VALUES (6, 'Flutter'), (6, 'Swift'), (6, 'Kotlin'), (6, 'Firebase');
-- Event 7: AI Challenge
INSERT INTO event_skills (event_id, skill) VALUES (7, 'Python'), (7, 'TensorFlow'), (7, 'Data Analysis');
-- Event 8: Code Charity
INSERT INTO event_skills (event_id, skill) VALUES (8, 'Node.js'), (8, 'MongoDB'), (8, 'React'), (8, 'System Design');
-- Event 9: Game Jam
INSERT INTO event_skills (event_id, skill) VALUES (9, 'Unity'), (9, 'C#'), (9, 'Godot'), (9, 'Game Design');

-- Insert Mock Users
INSERT INTO users (name, email, password, role, avatar, level, projects_completed) VALUES
('Admin Master', 'admin@skillsync.edu', 'admin123', 'Admin', 'https://i.pravatar.cc/150?img=68', 99, 999),
('Priyanka S.', 'priyanka@skillsync.edu', 'password123', 'Frontend Specialist', 'https://i.pravatar.cc/150?img=5', 14, 12),
('Rahul M.', 'rahul@skillsync.edu', 'password123', 'Machine Learning Engineer', 'https://i.pravatar.cc/150?img=11', 18, 8),
('Ananya K.', 'ananya@skillsync.edu', 'password123', 'Full Stack Developer', 'https://i.pravatar.cc/150?img=9', 10, 5),
('Vikram D.', 'vikram@skillsync.edu', 'password123', 'DevOps / Cloud', 'https://i.pravatar.cc/150?img=14', 15, 9);

-- Insert user skills
-- Priyanka
INSERT INTO user_skills (user_id, skill) VALUES (1, 'React'), (1, 'UI/UX'), (1, 'Tailwind'), (1, 'HTML/CSS');
-- Rahul
INSERT INTO user_skills (user_id, skill) VALUES (2, 'Python'), (2, 'TensorFlow'), (2, 'Data Sci');
-- Ananya
INSERT INTO user_skills (user_id, skill) VALUES (3, 'Node.js'), (3, 'React'), (3, 'MongoDB'), (3, 'Java');
-- Vikram
INSERT INTO user_skills (user_id, skill) VALUES (4, 'AWS'), (4, 'Docker'), (4, 'CI/CD'), (4, 'Linux');

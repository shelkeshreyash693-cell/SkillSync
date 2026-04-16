/* =========================================================================
   SkillSync Mock Data & View Management
   ========================================================================= */

// Backend API Base URL
const API_BASE_URL = 'https://skillsync-vvtm.onrender.com/api';

// View Switching Logic
function switchView(viewId) {
    // Basic routing
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active-view');
    });
    document.getElementById(viewId).classList.add('active-view');

    // Update Navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.dataset.view === viewId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Admin Mode trigger
    if (viewId === 'admin-view') {
        fetchAdminData();
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Attach Event Listeners to Nav
document.addEventListener("DOMContentLoaded", () => {
    // Navigation listener
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetView = link.dataset.view;
            switchView(targetView);
        });
    });

    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check for saved user preference, if any, on load of the website
    const savedTheme = localStorage.getItem('skillsync-theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'light') {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        let newTheme = 'light';
        
        if (currentTheme === 'light') {
            newTheme = 'dark';
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('skillsync-theme', newTheme);
    });

    // Render Events
    renderEvents();
    
    // Check Authentication State
    checkAuthStatus();
});


// Render Events dynamically from Spring Boot Backend
async function renderEvents() {
    const container = document.getElementById('events-container');
    container.innerHTML = '<p class="text-center" style="grid-column: 1 / -1;"><i class="fa-solid fa-spinner fa-spin"></i> Loading events from backend...</p>';

    try {
        const response = await fetch(`${API_BASE_URL}/events`);
        if (!response.ok) throw new Error('Backend not available');
        const loadedEvents = await response.json();
        
        container.innerHTML = '';
        
        if (loadedEvents.length === 0) {
            container.innerHTML = '<p class="text-center" style="grid-column: 1 / -1;">No events found in the database.</p>';
            return;
        }

        // Group by month
        const eventsByMonth = {};
        const monthMap = {
            'Jan': 'January', 'Feb': 'February', 'Mar': 'March', 'Apr': 'April',
            'May': 'May', 'Jun': 'June', 'Jul': 'July', 'Aug': 'August', 
            'Sep': 'September', 'Oct': 'October', 'Nov': 'November', 'Dec': 'December'
        };

        loadedEvents.forEach(event => {
            const shortMonth = event.date.split(' ')[0];
            const fullMonth = monthMap[shortMonth] || shortMonth;
            
            if (!eventsByMonth[fullMonth]) {
                eventsByMonth[fullMonth] = [];
            }
            eventsByMonth[fullMonth].push(event);
        });

        // Loop through each grouped month and render separately
        for (const [month, monthEvents] of Object.entries(eventsByMonth)) {
            
            // Month Header spanning all columns
            const monthHeader = `
                <div style="grid-column: 1 / -1; margin-top: 2rem; margin-bottom: 0.5rem; border-bottom: 2px solid rgba(255, 255, 255, 0.05); padding-bottom: 0.5rem; display: flex; align-items: center; gap: 0.75rem;">
                    <i class="fa-regular fa-calendar-days text-gradient" style="font-size: 1.5rem;"></i>
                    <h2 style="font-size: 1.8rem; font-weight: 700; margin: 0; color: var(--text-primary); letter-spacing: -0.5px;">${month}</h2>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', monthHeader);

            // Render each event belonging to this month
            monthEvents.forEach(event => {
                // Simulated Match Score for the current user against this event
                const simulatedMatchScore = Math.floor(Math.random() * 40) + 50; 
                
                let badgeColor = "var(--success)";
                let badgeBg = "rgba(16, 185, 129, 0.15)";
                
                if (simulatedMatchScore < 60) {
                    badgeColor = "var(--text-muted)";
                    badgeBg = "rgba(100, 116, 139, 0.15)";
                } else if (simulatedMatchScore < 80) {
                    badgeColor = "var(--warning)";
                    badgeBg = "rgba(245, 158, 11, 0.15)";
                }

                const reqSkillsHTML = event.requiredSkills ? event.requiredSkills.map(s => `<span class="badge" style="border-radius: 4px; font-size: 0.7rem; padding: 0.2rem 0.5rem;">${s}</span>`).join('') : '';

                const cardHTML = `
                    <div class="feature-card glass-panel event-card">                    
                        <div class="match-badge" style="color: ${badgeColor}; border-color: ${badgeColor}; background: ${badgeBg}">
                            <span><i class="fa-solid fa-bolt"></i> Match Score</span>
                            <span class="match-score">${simulatedMatchScore}%</span>
                        </div>
                        
                        <h3 class="event-title">${event.title}</h3>
                        
                        <div class="event-meta" style="margin-bottom: 0.5rem; gap: 1rem;">
                            <span><i class="fa-regular fa-calendar"></i> ${event.date}</span>
                            <span><i class="fa-solid fa-location-dot"></i> ${event.mode}</span>
                        </div>
                        
                        <span class="badge" style="margin-bottom: 1rem; align-self: flex-start; background: rgba(168, 85, 247, 0.15); color: var(--accent-secondary); border-color: rgba(168, 85, 247, 0.3); font-weight: 500;">${event.type}</span>
                        
                        <p class="event-desc">${event.description}</p>
                        
                        <div class="mb-3">
                            <p class="text-sm text-gray mb-1">Required Skills:</p>
                            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                                ${reqSkillsHTML}
                            </div>
                        </div>

                        <button class="btn btn-outline" style="width: 100%; margin-top: auto;" onclick="openTeamFinder(${event.id}, '${event.title.replace(/'/g, "\\'")}')">
                            View & Find Team
                        </button>
                    </div>
                `;
                container.insertAdjacentHTML('beforeend', cardHTML);
            });
        }
    } catch (error) {
        console.error("Error fetching events:", error);
        container.innerHTML = `
            <div class="glass-panel text-center" style="grid-column: 1 / -1; padding: 3rem;">
                <i class="fa-solid fa-server text-danger" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <h3>Backend Not Connected</h3>
                <p class="text-secondary mt-2">Could not fetch events. Ensure your Spring Boot server is running on http://localhost:8080.</p>
            </div>
        `;
    }
}

// Open Team Finder for a specific event
async function openTeamFinder(eventId, eventTitle) {
    document.getElementById('team-finder-title').innerText = `Finding Teammates for ${eventTitle}`;
    
    const container = document.getElementById('teammates-container');
    container.innerHTML = '<p class="text-center" style="grid-column: 1 / -1;"><i class="fa-solid fa-spinner fa-spin"></i> Analyzing matches...</p>';
    switchView('teammates-view');

    try {
        const response = await fetch(`${API_BASE_URL}/matches/${eventId}`);
        if (!response.ok) throw new Error('Match engine not available');
        const matchedData = await response.json();
        
        container.innerHTML = '';

        if (matchedData.length === 0) {
            container.innerHTML = '<p class="text-center" style="grid-column: 1 / -1;">No matching students found for this event.</p>';
            return;
        }

        matchedData.forEach(matchInfo => {
            const student = matchInfo.user;
            const simulatedMatch = matchInfo.matchScore;
            
            let badgeColor = "var(--success)";
            let badgeBg = "rgba(16, 185, 129, 0.15)";
            
            if (simulatedMatch < 65) {
                badgeColor = "var(--text-muted)";
                badgeBg = "rgba(100, 116, 139, 0.15)";
            } else if (simulatedMatch < 85) {
                badgeColor = "var(--warning)";
                badgeBg = "rgba(245, 158, 11, 0.15)";
            }

            const skillsHTML = student.skills ? student.skills.map(skill => `<span class="badge" style="border-radius: 4px; font-size: 0.7rem; padding: 0.2rem 0.5rem;">${skill}</span>`).join('') : '';

            const studentCard = `
                <div class="feature-card glass-panel teammate-card">
                    <div class="match-badge" style="position: absolute; top: 1rem; right: 1rem; color: ${badgeColor}; border-color: ${badgeColor}; background: ${badgeBg}">
                        <span>${simulatedMatch}% Match</span>
                    </div>
                    
                    <img src="${student.avatar || 'https://i.pravatar.cc/150?img=1'}" alt="${student.name}" class="teammate-avatar">
                    <h3>${student.name}</h3>
                    <span class="teammate-role">${student.role}</span>
                    
                    <div class="teammate-stat-row">
                        <div class="p-stat">
                            <span class="stat-val text-primary">Lvl ${student.level}</span>
                        </div>
                        <div class="p-stat">
                            <span class="stat-val">${student.projects}</span>
                            <span class="stat-label">Projects</span>
                        </div>
                    </div>
                    
                    <div class="mb-3" style="width: 100%;">
                        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: center;">
                            ${skillsHTML}
                        </div>
                    </div>

                    <div style="display: flex; gap: 0.5rem; width: 100%; margin-top: auto;">
                        <button class="btn btn-primary btn-sm" style="flex: 1;" onclick="alert('Invite sent to ${student.name}!')">Send Invite</button>
                        <button class="btn btn-secondary btn-sm" title="View Profile"><i class="fa-solid fa-user"></i></button>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', studentCard);
        });

    } catch(err) {
        console.error("Match engine error:", err);
        container.innerHTML = '<p class="text-center text-danger" style="grid-column: 1 / -1;">Failed to connect to the smart matching engine.</p>';
    }
}

// =========================================================================
// Authentication & Session Management
// =========================================================================

function openAuthModal(mode) {
    document.getElementById('auth-modal').classList.remove('hidden');
    switchAuthTab(mode);
}

function closeAuthModal() {
    document.getElementById('auth-modal').classList.add('hidden');
    document.getElementById('auth-error-msg').classList.add('hidden');
}

function switchAuthTab(mode) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(f => f.classList.add('hidden'));
    document.getElementById('auth-error-msg').classList.add('hidden');
    
    document.getElementById(`tab-${mode}`).classList.add('active');
    document.getElementById(`${mode}-form`).classList.remove('hidden');
}

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorMsg = document.getElementById('auth-error-msg');
    
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        if (!response.ok) {
            const errText = await response.text();
            throw new Error(errText || 'Invalid credentials');
        }
        
        const user = await response.json();
        localStorage.setItem('skillsync-user', JSON.stringify(user));
        
        closeAuthModal();
        checkAuthStatus();
        
        if(document.getElementById('dashboard-view').classList.contains('active-view')) {
            switchView('dashboard-view');
        }
    } catch (err) {
        errorMsg.innerText = err.message;
        errorMsg.classList.remove('hidden');
    }
}

async function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const role = document.getElementById('signup-role').value;
    const errorMsg = document.getElementById('auth-error-msg');
    
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role })
        });
        
        if (!response.ok) {
            const errText = await response.text();
            throw new Error(errText || 'Registration failed');
        }
        
        const user = await response.json();
        localStorage.setItem('skillsync-user', JSON.stringify(user));
        
        closeAuthModal();
        checkAuthStatus();
    } catch (err) {
        errorMsg.innerText = err.message;
        errorMsg.classList.remove('hidden');
    }
}

function handleLogout() {
    localStorage.removeItem('skillsync-user');
    checkAuthStatus();
    switchView('landing-view');
}

function checkAuthStatus() {
    const userJson = localStorage.getItem('skillsync-user');
    const authButtons = document.getElementById('auth-buttons');
    const profileBadge = document.getElementById('user-profile-badge');
    
    if (userJson && authButtons && profileBadge) {
        const user = JSON.parse(userJson);
        authButtons.style.display = 'none';
        profileBadge.style.display = 'flex';
        document.getElementById('nav-avatar').src = user.avatar || 'https://i.pravatar.cc/150?img=1';
        document.getElementById('nav-username').innerText = user.name;
        document.getElementById('nav-role').innerText = user.role || 'Student';
        
        // Show Admin Nav Link if Role is Admin
        if (user.role === 'Admin') {
            document.getElementById('nav-admin-link').style.display = 'block';
        } else {
            document.getElementById('nav-admin-link').style.display = 'none';
        }
        
        const dbName = document.querySelector('.profile-name');
        if(dbName) dbName.innerText = user.name;
        const dbRole = document.querySelector('.profile-role');
        if(dbRole) dbRole.innerText = user.role;
        const dbAvatar = document.querySelector('.profile-avatar');
        if(dbAvatar) dbAvatar.src = user.avatar || 'https://i.pravatar.cc/150?img=1';
        
    } else if (authButtons && profileBadge) {
        authButtons.style.display = 'flex';
        profileBadge.style.display = 'none';
        if (document.getElementById('nav-admin-link')) {
            document.getElementById('nav-admin-link').style.display = 'none';
        }
    }
}

// =========================================================================
// Admin Dashboard Logic
// =========================================================================

async function fetchAdminData() {
    try {
        // Fetch Users
        const usersResp = await fetch(`${API_BASE_URL}/admin/users`);
        if (usersResp.ok) {
            const users = await usersResp.json();
            const usersTbody = document.querySelector('#admin-users-table tbody');
            usersTbody.innerHTML = '';
            users.forEach(u => {
                usersTbody.innerHTML += `
                    <tr>
                        <td>#${u.id}</td>
                        <td>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <img src="${u.avatar}" style="width:24px; height:24px; border-radius:50%; object-fit:cover;"> ${u.name}
                            </div>
                        </td>
                        <td>${u.email}</td>
                        <td><span class="badge" style="background:transparent; border-color:var(--glass-border)">${u.role}</span></td>
                        <td>
                            ${u.role === 'Admin' ? '<span class="text-sm text-gray"><i class="fa-solid fa-lock"></i> Master</span>' : `<button class="btn-danger-sm" onclick="deleteUser(${u.id})"><i class="fa-solid fa-trash"></i> Delete</button>`}
                        </td>
                    </tr>
                `;
            });
        }

        // Fetch Events
        const eventsResp = await fetch(`${API_BASE_URL}/events`);
        if (eventsResp.ok) {
            const events = await eventsResp.json();
            const eventsTbody = document.querySelector('#admin-events-table tbody');
            eventsTbody.innerHTML = '';
            events.forEach(e => {
                eventsTbody.innerHTML += `
                    <tr>
                        <td>#${e.id}</td>
                        <td style="color: var(--text-primary); font-weight: 500;">${e.title}</td>
                        <td>${e.mode}</td>
                        <td>${e.type}</td>
                        <td><button class="btn-danger-sm" onclick="deleteEvent(${e.id})"><i class="fa-solid fa-trash"></i> Delete</button></td>
                    </tr>
                `;
            });
        }
    } catch(err) {
        console.error("Failed to load admin data", err);
    }
}

async function deleteUser(id) {
    if(!confirm("Are you sure you want to permanently delete this student account?")) return;
    try {
        await fetch(`${API_BASE_URL}/admin/users/${id}`, { method: 'DELETE' });
        fetchAdminData();
    } catch(err) { console.error(err); }
}

async function deleteEvent(id) {
    if(!confirm("Are you sure you want to permanently delete this hackathon?")) return;
    try {
        await fetch(`${API_BASE_URL}/admin/events/${id}`, { method: 'DELETE' });
        fetchAdminData();
        renderEvents(); 
    } catch(err) { console.error(err); }
}

async function handleCreateEvent(e) {
    e.preventDefault();
    const title = document.getElementById('admin-ev-title').value;
    const date = document.getElementById('admin-ev-date').value;
    const mode = document.getElementById('admin-ev-mode').value;
    const type = document.getElementById('admin-ev-type').value;
    const description = document.getElementById('admin-ev-desc').value;
    const skillsRaw = document.getElementById('admin-ev-skills').value;
    const requiredSkills = skillsRaw.split(',').map(s => s.trim()).filter(s => s !== '');

    const payload = { title, date, mode, type, description, requiredSkills };

    try {
        const resp = await fetch(`${API_BASE_URL}/admin/events`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (resp.ok) {
            alert("Hackathon Created Successfully!");
            document.getElementById('admin-create-event-form').reset();
            fetchAdminData();
            renderEvents();
        } else {
            alert("Failed to create hackathon.");
        }
    } catch(err) {
        console.error("Network Error forming Event: ", err);
        alert("Network Error.");
    }
}

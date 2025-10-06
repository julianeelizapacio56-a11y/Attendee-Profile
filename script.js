    }
];

// Render Attendee Cards
function renderAttendeeCards(attendeesList) {
    const directory = document.getElementById('attendees-directory');
    directory.innerHTML = '';
    attendeesList.forEach(attendee => {
        const card = document.createElement('div');
        card.classList.add('attendee-card');
        card.innerHTML = `
            <img src="${attendee.photo}" alt="Photo" class="attendee-photo">
            <h3>${attendee.name}</h3>
            <p>${attendee.department}</p>
            <p class="serial-number">Serial: ${attendee.id}</p>
        `;
        card.addEventListener('click', () => showAttendeeProfile(attendee));
        directory.appendChild(card);
    });
}

// Show Attendee Profile
function showAttendeeProfile(attendee) {
    document.getElementById('attendee-name').innerText = attendee.name;
    document.getElementById('serial-number').innerText = attendee.id;
    document.getElementById('department').innerText = attendee.department;
    document.getElementById('work-position').innerText = attendee.workPosition;
    document.getElementById('attendee-photo-img').src = attendee.photo;

    const attendanceTable = document.getElementById('attendance-table').getElementsByTagName('tbody')[0];
    attendanceTable.innerHTML = '';
    attendee.attendance.forEach(record => {
        const row = attendanceTable.insertRow();
        row.innerHTML = `
            <td>${record.event}</td>
            <td>${record.login}</td>
            <td>${record.logout}</td>
            <td>${record.date}</td>
            <td>${record.remarks}</td>
        `;
    });

    const sessionReportTable = document.getElementById('session-report-table').getElementsByTagName('tbody')[0];
    sessionReportTable.innerHTML = '';
    attendee.sessionReports.forEach(report => {
        const row = sessionReportTable.insertRow();
        row.innerHTML = `
            <td>${report.date}</td>
            <td>${report.activity}</td>
            <td>${report.notes}</td>
        `;
    });

    // Make the profile scrollable
    document.getElementById('attendee-profile-modal').style.display = 'block';
}

// Event listener for the close button on modal
document.getElementById('close-modal').onclick = function() {
    document.getElementById('attendee-profile-modal').style.display = 'none';
}

// Event listener for search input field
document.getElementById('search-bar').addEventListener('input', function(e) {
    const searchText = e.target.value.toLowerCase();
    const filteredAttendees = attendees.filter(attendee => {
        return (
            attendee.name.toLowerCase().includes(searchText) ||
            attendee.id.toLowerCase().includes(searchText)
        );
    });
    renderAttendeeCards(filteredAttendees);
});

// Toggle current attendance view/editing
document.getElementById('attendance-btn').addEventListener('click', () => {
    alert("You can now mark or view current attendance here.");
});

// Initial render of all attendees
renderAttendeeCards(attendees);

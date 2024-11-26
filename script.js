// Function to save the entry to local storage
function saveEntry(mood, notes) {
    const entries = getEntries();
    const entry = {
        mood: mood,
        notes: notes,
        date: new Date().toLocaleString()
    };
    entries.push(entry);
    localStorage.setItem('moodDiaryEntries', JSON.stringify(entries));
}

// Function to get all diary entries from local storage
function getEntries() {
    const entries = localStorage.getItem('moodDiaryEntries');
    return entries ? JSON.parse(entries) : [];
}

// Function to render all diary entries
function renderEntries() {
    const entriesList = document.getElementById('entries-list');
    const entries = getEntries();
    entriesList.innerHTML = ''; // Clear existing entries
    
    entries.forEach(entry => {
        const entryItem = document.createElement('li');
        entryItem.classList.add('entry');
        entryItem.innerHTML = `
            <div class="mood">${entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}</div>
            <div class="date">${entry.date}</div>
            <div class="notes">${entry.notes}</div>
        `;
        entriesList.appendChild(entryItem);
    });
}

// Handle form submission
document.getElementById('mood-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const mood = document.getElementById('mood').value;
    const notes = document.getElementById('notes').value.trim();

    if (notes) {
        saveEntry(mood, notes);
        document.getElementById('notes').value = ''; // Clear the text area
        renderEntries();
    } else {
        alert('Please write some notes before saving!');
    }
});

// Initial render of diary entries when the page loads
window.onload = renderEntries;

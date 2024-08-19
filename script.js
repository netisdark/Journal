document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('journal-form');
    const entriesDiv = document.getElementById('entries');
    const darkModeToggle = document.getElementById('darkModeToggle');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const date = document.getElementById('date').value;
        const title = document.getElementById('title').value;
        const entry = document.getElementById('entry').value;

        const journalEntry = {
            date,
            title,
            entry
        };

        saveEntry(journalEntry);
        displayEntries();
        form.reset();
    });

    const saveEntry = (entry) => {
        let entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        entries.push(entry);
        localStorage.setItem('journalEntries', JSON.stringify(entries));
    };

    const displayEntries = () => {
        let entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        entriesDiv.innerHTML = '';
        entries.forEach((entry, index) => {
            const entryDiv = document.createElement('div');
            entryDiv.className = 'entry';
            entryDiv.innerHTML = `
                <h3>${entry.date}</h3>
                <h4>${entry.title}</h4>
                <pre>${entry.entry}</pre>
                <button class="btn btn-danger" onclick="deleteEntry(${index})">Delete</button>
            `;
            entriesDiv.appendChild(entryDiv);
        });
    };

    window.deleteEntry = (index) => {
        let entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        entries.splice(index, 1);
        localStorage.setItem('journalEntries', JSON.stringify(entries));
        displayEntries();
    };

    darkModeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
    });

    displayEntries();
});

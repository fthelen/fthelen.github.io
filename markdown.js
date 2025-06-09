// Basic markdown parser
function parseMarkdown(text) {
    return text
        // Headers
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        
        // Bold and italic
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        
        // Links
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
        
        // Paragraphs (double line breaks)
        .split('\n\n')
        .map(para => para.trim() ? `<p>${para.replace(/\n/g, '<br>')}</p>` : '')
        .join('')
        
        // Clean up headers in paragraphs
        .replace(/<p>(<h[1-6]>.*<\/h[1-6]>)<\/p>/g, '$1');
}

// Handle markdown link clicks
function loadMarkdown(url) {
    fetch(url)
        .then(response => response.text())
        .then(markdown => {
            document.body.innerHTML = `
                <a href="index.html">&larr; Back to Blog</a>
                <hr>
                ${parseMarkdown(markdown)}
                <hr>
                <a href="index.html">&larr; Back to Blog</a>
            `;
        })
        .catch(err => {
            document.body.innerHTML = `<p>Error loading article. <a href="index.html">Back to Blog</a></p>`;
        });
}

// Intercept markdown links
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' && e.target.href.endsWith('.md')) {
            e.preventDefault();
            loadMarkdown(e.target.href);
        }
    });
});
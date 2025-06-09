// Basic markdown parser for simple cases
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
        
        // Line breaks
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>')
        
        // Wrap in paragraphs
        .replace(/^(.+)/gm, '<p>$1</p>')
        
        // Clean up extra paragraph tags
        .replace(/<\/p><p><h/g, '</p><h')
        .replace(/<\/h([1-6])><p>/g, '</h$1><p>');
}

// Auto-render markdown files when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.endsWith('.md')) {
        fetch(window.location.pathname)
            .then(response => response.text())
            .then(markdown => {
                document.body.innerHTML = parseMarkdown(markdown);
            });
    }
});
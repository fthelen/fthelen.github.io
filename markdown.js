// Comprehensive markdown parser with 90s web aesthetic
function parseMarkdown(text) {
    // Escape HTML to prevent injection
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Process text line by line for better control
    const lines = text.split('\n');
    const result = [];
    let inCodeBlock = false;
    let codeBlockLang = '';
    let codeBlockContent = [];
    let inList = false;
    let listItems = [];
    let listType = '';
    
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        
        // Handle code blocks (fenced with ```)
        if (line.trim().startsWith('```')) {
            if (!inCodeBlock) {
                inCodeBlock = true;
                codeBlockLang = line.trim().slice(3).trim();
                codeBlockContent = [];
            } else {
                inCodeBlock = false;
                const code = codeBlockContent.join('\n');
                result.push(`<pre><code class="language-${codeBlockLang}">${escapeHtml(code)}</code></pre>`);
                codeBlockContent = [];
            }
            continue;
        }
        
        if (inCodeBlock) {
            codeBlockContent.push(line);
            continue;
        }
        
        // Handle lists (unordered and ordered)
        const unorderedMatch = line.match(/^(\s*)[-*+]\s+(.+)$/);
        const orderedMatch = line.match(/^(\s*)\d+\.\s+(.+)$/);
        
        if (unorderedMatch || orderedMatch) {
            const isOrdered = !!orderedMatch;
            const content = (unorderedMatch || orderedMatch)[2];
            const indent = (unorderedMatch || orderedMatch)[1].length;
            
            if (!inList || listType !== (isOrdered ? 'ol' : 'ul')) {
                if (inList) {
                    result.push(`</${listType}>`);
                }
                inList = true;
                listType = isOrdered ? 'ol' : 'ul';
                result.push(`<${listType}>`);
            }
            
            result.push(`<li>${parseInlineMarkdown(content)}</li>`);
            continue;
        } else if (inList) {
            if (line.trim() === '') {
                continue; // Allow empty lines in lists
            } else {
                result.push(`</${listType}>`);
                inList = false;
                listType = '';
            }
        }
        
        // Handle horizontal rules
        if (/^-{3,}$|^\*{3,}$|^_{3,}$/.test(line.trim())) {
            result.push('<hr>');
            continue;
        }
        
        // Handle blockquotes
        if (line.startsWith('> ')) {
            const quoteContent = line.slice(2);
            result.push(`<blockquote><p>${parseInlineMarkdown(quoteContent)}</p></blockquote>`);
            continue;
        }
        
        // Handle headers
        const headerMatch = line.match(/^(#{1,6})\s+(.+)$/);
        if (headerMatch) {
            const level = headerMatch[1].length;
            const content = headerMatch[2];
            result.push(`<h${level}>${parseInlineMarkdown(content)}</h${level}>`);
            continue;
        }
        
        // Handle inline code
        line = line.replace(/`([^`]+)`/g, '<code>$1</code>');
        
        // Handle empty lines (paragraph breaks)
        if (line.trim() === '') {
            if (result[result.length - 1] !== '<br>') {
                result.push('<br>');
            }
            continue;
        }
        
        // Regular paragraph
        result.push(`<p>${parseInlineMarkdown(line)}</p>`);
    }
    
    // Close any open lists
    if (inList) {
        result.push(`</${listType}>`);
    }
    
    return result.join('\n');
}

// Parse inline markdown elements
function parseInlineMarkdown(text) {
    return text
        // Bold (strong emphasis)
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/__(.*?)__/g, '<strong>$1</strong>')
        
        // Italic (emphasis)
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/_(.*?)_/g, '<em>$1</em>')
        
        // Strikethrough
        .replace(/~~(.*?)~~/g, '<del>$1</del>')
        
        // Inline code
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        
        // Links
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
        
        // Auto-link URLs (90s style - basic but functional)
        .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1">$1</a>');
}

// Enhanced markdown loader with better error handling and navigation
function loadMarkdown(url) {
    // Show loading indicator (90s style)
    document.body.innerHTML = `
        <p><a href="index.html">&larr; Back to Blog</a></p>
        <hr>
        <p><em>Loading article...</em></p>
    `;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(markdown => {
            // Extract title from first header for page title
            const titleMatch = markdown.match(/^#\s+(.+)$/m);
            const title = titleMatch ? titleMatch[1] : 'Article';
            document.title = `${title} - Francis Thelen's Blog`;
            
            document.body.innerHTML = `
                <p><a href="index.html">&larr; Back to Blog</a></p>
                <hr>
                ${parseMarkdown(markdown)}
                <hr>
                <p><a href="index.html">&larr; Back to Blog</a></p>
            `;
            
            // Scroll to top
            window.scrollTo(0, 0);
        })
        .catch(err => {
            document.body.innerHTML = `
                <p><a href="index.html">&larr; Back to Blog</a></p>
                <hr>
                <h1>Error Loading Article</h1>
                <p><strong>Error:</strong> ${err.message}</p>
                <p>The requested article could not be loaded. Please check the URL and try again.</p>
                <hr>
                <p><a href="index.html">&larr; Back to Blog</a></p>
            `;
        });
}

// Visitor counter functionality - classic 90s style
function initVisitorCounter() {
    const visitCountElement = document.getElementById('visit-count');
    if (!visitCountElement) return;
    
    // Get current count from localStorage (simulating server-side counter)
    let visits = localStorage.getItem('blog-visits');
    if (!visits) {
        visits = Math.floor(Math.random() * 8543) + 1000; // Start with a "realistic" 90s number
    } else {
        visits = parseInt(visits) + 1;
    }
    
    // Store the new count
    localStorage.setItem('blog-visits', visits);
    
    // Display with leading zeros (classic 90s style)
    visitCountElement.textContent = visits.toString().padStart(6, '0');
}

// Enhanced link interception with better URL handling
document.addEventListener('DOMContentLoaded', function() {
    // Initialize visitor counter
    initVisitorCounter();
    document.addEventListener('click', function(e) {
        // Handle markdown file links
        if (e.target.tagName === 'A' && e.target.href.endsWith('.md')) {
            e.preventDefault();
            loadMarkdown(e.target.href);
            return;
        }
        
        // Handle navigation with browser history
        if (e.target.tagName === 'A' && e.target.href.endsWith('index.html')) {
            e.preventDefault();
            window.location.href = 'index.html';
            return;
        }
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(e) {
        if (window.location.pathname.endsWith('.md')) {
            loadMarkdown(window.location.href);
        }
    });
});
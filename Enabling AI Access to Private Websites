# Enabling AI Access to Private Websites

## The Challenge

Many developers want to keep their websites private from general web crawling while still allowing AI systems to access specific content. A common approach is using `robots.txt` to block most crawlers but allow AI bots:

```
User-agent: *
Disallow: /

User-agent: anthropic-ai
Allow: /ai-ethics.txt
```

**However, this doesn't always work.** Some AI tools have additional restrictions that prevent access even when explicitly allowed by robots.txt.

## The Gap

AI tools like Claude's web fetch can only access URLs that are:
1. Directly provided by users, or  
2. Found in web search results

Even with perfect robots.txt permissions, if the content isn't discoverable through search, AI systems may still be blocked by their own tool restrictions.

## The Solution: The Footer Link Strategy

Instead of relying solely on robots.txt, create a small "bridge" that makes your AI-accessible content discoverable:

### Implementation
1. **Add a minimal footer link** to your main page:
   ```html
   <footer>
     <a href="/ai-access.html">AI Access</a>
   </footer>
   ```

2. **Create a simple AI access page** (`/ai-access.html`):
   ```html
   <h1>AI Access Portal</h1>
   <p>Available resources for AI systems:</p>
   <ul>
     <li><a href="/ai-ethics.txt">Ethics Guidelines</a></li>
   </ul>
   ```

3. **Update robots.txt** to allow the access page:
   ```
   User-agent: *
   Disallow: /
   Allow: /ai-access.html
   Allow: /ai-ethics.txt
   ```

### Why This Works
- Your main site remains private from general crawling
- The small access page becomes discoverable through web search
- AI systems can find it when searching for your site
- From there, they can access your intended content via the links

## Key Insight

**Don't rely solely on robots.txt permissions.** AI tools operate within web search ecosystems, so making content discoverable through normal search channels is often more effective than relying on crawler directives alone.

This approach bridges the gap between your privacy intentions and the practical constraints of how AI systems actually access web content.

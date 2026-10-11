# Publishing a Dev Log

Blog posts are Markdown files in this folder. You do not need to edit React components or generated HTML.

## Publish a post

1. Create a new `.md` file in `content/blog/`, for example `my-new-project.md`.
2. Copy this frontmatter and replace the values:

```yaml
---
title: "What I Built This Week"
date: "2026-10-12"
summary: "A short description of what the post covers."
tags: ["Web Development", "Learning"]
project: "optional-project-name"
status: "published"
---
```

3. Write the article below the second `---`. Use `##` for headings, `- ` for bullet points, `**bold**`, `code`, fenced code blocks, and links like `[GitHub](https://github.com/)`.
4. Commit and push the file to the production branch (currently `main`) or open a pull request and merge it.
5. Vercel runs `npm run build`, which generates the blog archive, each article's HTML page, the TypeScript index used by the homepage, and the sitemap.

## Drafts

Set `status: "draft"` to keep a post out of the published archive and generated pages. Change it to `status: "published"` when it is ready.

## Images

For now, place image files in `public/blog/images/` and reference them in Markdown with a root-relative path. Example:

`![Screenshot of the app](/blog/images/my-app.png)`

Create the `public/blog/images/` folder if it does not exist. Use descriptive alt text and make images reasonably small.

## Important

- Use a unique filename for every post. It becomes the URL slug.
- Use the actual publication date.
- Keep summaries concise and specific.
- Do not publish API keys, private user data, or unsupported claims about project results.
- The generated `blogPosts.ts` and `public/blog/` pages are build outputs. Edit the Markdown source files, not generated files.

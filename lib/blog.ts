import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export interface BlogFrontmatter {
  title: string;
  slug: string;
  metaDescription: string;
  publishedDate: string;
  updatedDate?: string;
  category: string;
  keywords: string[];
  coverImage?: string;
  author: string;
  excerpt: string;
}

export interface BlogPost extends BlogFrontmatter {
  content: string;
  readingTime: string;
}

export interface BlogPostMeta extends BlogFrontmatter {
  readingTime: string;
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));

  return files
    .map((filename) => {
      const filePath = path.join(BLOG_DIR, filename);
      const raw = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(raw);
      const stats = readingTime(content);

      return {
        ...(data as BlogFrontmatter),
        readingTime: `${Math.ceil(stats.minutes)} min read`,
      };
    })
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    ...(data as BlogFrontmatter),
    content,
    readingTime: `${Math.ceil(stats.minutes)} min read`,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''));
}

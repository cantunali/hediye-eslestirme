import React from 'react';
import { notFound } from 'next/navigation';
import { blogPosts } from '../../../src/data/blogPosts';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    return {
      title: 'Yazı Bulunamadı',
    };
  }
  return {
    title: `${post.title} - HediyeEşleştir`,
    description: post.excerpt,
    alternates: {
      canonical: `https://hediyeeslestir.com/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://hediyeeslestir.com/blog/${slug}`,
      type: 'article',
      images: [
        {
          url: post.image,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const postIndex = blogPosts.findIndex((p) => p.slug === slug);
  if (postIndex === -1) {
    notFound();
  }

  const post = blogPosts[postIndex];
  const nextPost = blogPosts[postIndex + 1];
  const prevPost = blogPosts[postIndex - 1];
  const PostComponent = post.component;

  return (
    <div className="blog-post-wrapper">
      <PostComponent />
      
      {/* Post Navigation */}
      <section className="section" style={{ paddingTop: '0', paddingBottom: '5rem' }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            gap: '2rem',
            paddingTop: '3rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            flexWrap: 'wrap'
          }}>
            {prevPost ? (
              <Link href={`/blog/${prevPost.slug}`} className="btn btn-outline" style={{ flex: '1', minWidth: '250px', justifyContent: 'flex-start', textAlign: 'left' }}>
                <ArrowLeft size={20} />
                <div>
                  <span style={{ fontSize: '0.75rem', opacity: 0.7, display: 'block' }}>Önceki Yazı</span>
                  <span style={{ fontSize: '0.9rem' }}>{prevPost.title}</span>
                </div>
              </Link>
            ) : <div style={{ flex: '1' }} />}

            {nextPost ? (
              <Link href={`/blog/${nextPost.slug}`} className="btn btn-outline" style={{ flex: '1', minWidth: '250px', justifyContent: 'flex-end', textAlign: 'right' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', opacity: 0.7, display: 'block' }}>Sonraki Yazı</span>
                  <span style={{ fontSize: '0.9rem' }}>{nextPost.title}</span>
                </div>
                <ArrowRight size={20} />
              </Link>
            ) : <div style={{ flex: '1' }} />}
          </div>
        </div>
      </section>
    </div>
  );
}

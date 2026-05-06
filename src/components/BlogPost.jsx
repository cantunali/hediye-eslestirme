import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { ArrowLeft, ArrowRight, ChevronLeft } from 'lucide-react';

const BlogPost = () => {
    const { slug } = useParams();
    
    // Find the current post
    const postIndex = blogPosts.findIndex(p => p.slug === slug);
    const post = blogPosts[postIndex];

    // Scroll to top on mount or slug change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!post) {
        return <Navigate to="/blog" replace />;
    }

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
                            <Link to={`/blog/${prevPost.slug}`} className="btn btn-outline" style={{ flex: '1', minWidth: '250px', justifyContent: 'flex-start', textAlign: 'left' }}>
                                <ArrowLeft size={20} />
                                <div>
                                    <span style={{ fontSize: '0.75rem', opacity: 0.7, display: 'block' }}>Önceki Yazı</span>
                                    <span style={{ fontSize: '0.9rem' }}>{prevPost.title}</span>
                                </div>
                            </Link>
                        ) : <div style={{ flex: '1' }} />}

                        {nextPost ? (
                            <Link to={`/blog/${nextPost.slug}`} className="btn btn-outline" style={{ flex: '1', minWidth: '250px', justifyContent: 'flex-end', textAlign: 'right' }}>
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
};

export default BlogPost;

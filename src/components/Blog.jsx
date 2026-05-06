import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, User, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { blogPosts as posts } from '../data/blogPosts';

const Blog = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    // Pagination Logic
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(posts.length / postsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="animate-fade-in">
            <Helmet>
                <title>Blog - HediyeEşleştir | Hediye Rehberi ve İpuçları</title>
                <meta name="description" content="Hediye seçimi, etkinlik planlama ve hediye listesi oluşturma konularında en güncel ipuçları ve rehberler." />
                <link rel="canonical" href="https://hediyeeslestir.com/blog" />
                <meta property="og:title" content="HediyeEşleştir Blog | Hediye Rehberleri" />
                <meta property="og:description" content="Hediyeleşme sanatına dair ipuçları, rehberler ve ilham verici içerikler." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://hediyeeslestir.com/blog" />
            </Helmet>

            <section className="section" style={{ textAlign: 'center', paddingBottom: '3rem' }}>
                <div className="container">
                    <h1 className="hero-title gradient-text">Hediye Rehberi Blog</h1>
                    <p style={{ color: 'var(--on-surface-variant)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
                        En doğru hediyeyi seçmek ve sevdiklerinizi mutlu etmek için ihtiyacınız olan tüm rehberler burada.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
                        {currentPosts.map((post) => (
                            <Link
                                key={post.id}
                                to={`/blog/${post.slug}`}
                                className="card animate-reveal"
                                style={{
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    padding: '0',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%'
                                }}
                            >
                                <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                        className="blog-image"
                                    />
                                    <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'var(--primary)', color: 'white', padding: '0.4rem 1rem', borderRadius: '2rem', fontSize: '0.75rem', fontWeight: '700' }}>
                                        Rehber
                                    </div>
                                </div>
                                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                    <div style={{ display: 'flex', gap: '1rem', color: 'var(--on-surface-variant)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Calendar size={14} /> {post.date}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><User size={14} /> {post.author}</span>
                                    </div>
                                    <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem', lineHeight: '1.3', color: 'var(--on-surface)' }}>{post.title}</h3>
                                    <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                                        {post.excerpt}
                                    </p>
                                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: '700', fontSize: '0.95rem' }}>
                                        Yazıyı Oku <ArrowRight size={18} />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '4rem' }}>
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="btn btn-outline"
                                style={{ padding: '0.6rem 1rem' }}
                            >
                                <ChevronLeft size={20} /> Önceki
                            </button>
                            
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => paginate(i + 1)}
                                        className={`btn ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline'}`}
                                        style={{ width: '2.5rem', height: '2.5rem', padding: '0', borderRadius: 'var(--radius-md)' }}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="btn btn-outline"
                                style={{ padding: '0.6rem 1rem' }}
                            >
                                Sonraki <ChevronRight size={20} />
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Blog;

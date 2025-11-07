import React, { useState } from 'react'
import styles from './header.module.css'
import { Phone, Bed, LogOut, User, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user, logout } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
        setMobileMenuOpen(false);
    };

    const handleSignUp = () => {
        navigate('/register');
        setMobileMenuOpen(false);
    };

    const handleLogin = () => {
        navigate('/login');
        setMobileMenuOpen(false);
    };

    const handleProfile = () => {
        navigate('/profile');
        setMobileMenuOpen(false);
    };

    return (
        <div>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    {/* Logo */}
                    <div className={styles.logo} onClick={() => navigate('/')}>
                        <Bed size={32} className={styles.logoIcon} />
                        <span className={styles.logoText}>Agiza<span className={styles.logoAccent}>hosteli</span></span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className={styles.nav}>
                        <a href="/" className={styles.navLink}>Home</a>
                        <a href="/rooms" className={styles.navLink}>Find Hostels</a>
                        <a href="#" className={styles.navLink}>Destinations</a>
                        <a href="#" className={styles.navLink}>About</a>
                        <a href="#" className={styles.navLink}>Contact</a>
                    </nav>

                    {/* Desktop Actions */}
                    <div className={styles.headerActions}>
                        <div className={styles.phoneNumber}>
                            <Phone size={16} className={styles.phoneIcon} />
                            <span><a href="tel:+256744755572">+256 744755572</a></span>
                        </div>

                        {isAuthenticated ? (
                            <div className={styles.userMenu}>
                                <div className={styles.userInfo}>
                                    <User size={18} />
                                    <span>{user?.firstName}</span>
                                </div>
                                <div className={styles.userDropdown}>
                                    <button onClick={handleProfile} className={styles.dropdownItem}>
                                        <User size={16} />
                                        My Profile
                                    </button>
                                    <button onClick={handleLogout} className={styles.dropdownItem}>
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.authButtons}>
                                <button onClick={handleLogin} className={styles.loginButton}>
                                    Login
                                </button>
                                <button onClick={handleSignUp} className={styles.ctaButton}>
                                    Sign Up
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className={styles.mobileMenuButton}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className={styles.mobileMenu}>
                        <nav className={styles.mobileNav}>
                            <a href="/" className={styles.mobileNavLink}>Home</a>
                            <a href="/rooms" className={styles.mobileNavLink}>Find Hostels</a>
                            <a href="#" className={styles.mobileNavLink}>Destinations</a>
                            <a href="#" className={styles.mobileNavLink}>About</a>
                            <a href="#" className={styles.mobileNavLink}>Contact</a>
                        </nav>

                        <div className={styles.mobileActions}>
                            {isAuthenticated ? (
                                <>
                                    <button onClick={handleProfile} className={styles.mobileActionButton}>
                                        <User size={16} />
                                        My Profile
                                    </button>
                                    <button onClick={handleLogout} className={styles.mobileActionButton}>
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button onClick={handleLogin} className={styles.mobileActionButton}>
                                        Login
                                    </button>
                                    <button onClick={handleSignUp} className={styles.mobileActionButton}>
                                        Sign Up
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </header>
        </div>
    )
}

export default Header
<template>
    <div class="ecom-minimal">
        <!-- Header / Navigation -->
        <header class="ecom-header">
            <div class="ecom-logo">ShopLogo</div>
            <nav class="ecom-nav">
                <a href="#" class="ecom-link">Home</a>
                <a href="#" class="ecom-link">Shop</a>
                <a href="#" class="ecom-link">About</a>
                <a href="#" class="ecom-link">Contact</a>
            </nav>
            <div class="ecom-cart">
                <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" class="feather feather-shopping-cart">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
            </div>
        </header>

        <!-- Hero Section -->
        <section class="ecom-hero">
            <div class="ecom-hero-content">
                <h1 class="ecom-hero-title">Minimal & Modern<br> E-commerce</h1>
                <p class="ecom-hero-desc">Discover the best products in a clean, distraction-free shopping experience.
                </p>
                <button class="ecom-hero-btn">Shop Now</button>
            </div>
            <div class="ecom-hero-image">
                <img src="https://source.unsplash.com/600x600/?clothes" alt="Hero Product" />
            </div>
        </section>

        <!-- Best Sellers Section -->
        <section class="ecom-best-sellers">
            <div class="ecom-best-sellers-header">
                <h2 class="ecom-best-sellers-title">Best Sellers</h2>
                <button class="ecom-best-sellers-showall">Show All</button>
            </div>
            <div class="ecom-best-sellers-tabs">
                <button class="ecom-best-sellers-tab active">All Products</button>
                <button class="ecom-best-sellers-tab">T-Shirt</button>
                <button class="ecom-best-sellers-tab">Hoodies</button>
                <button class="ecom-best-sellers-tab">Jacket</button>
            </div>
            <div class="ecom-best-sellers-products">
                <div class="ecom-best-sellers-card">
                    <div class="ecom-best-sellers-img-wrap">
                        <span class="ecom-best-sellers-badge hot">HOT</span>
                        <img src="https://source.unsplash.com/600x600/?clothes" alt="Basic Dress Green" />
                    </div>
                    <div class="ecom-best-sellers-info">
                        <div class="ecom-best-sellers-name">Basic Dress Green</div>
                        <div class="ecom-best-sellers-category">Dress</div>
                        <div class="ecom-best-sellers-prices">
                            <span class="new">$236.00</span>
                        </div>
                    </div>
                </div>
                <div class="ecom-best-sellers-card">
                    <div class="ecom-best-sellers-img-wrap">
                        <img src="https://source.unsplash.com/600x600/?clothes" alt="Nike Sportswear Futura Luxe" />
                    </div>
                    <div class="ecom-best-sellers-info">
                        <div class="ecom-best-sellers-name">Nike Sportswear Futura Luxe</div>
                        <div class="ecom-best-sellers-category">Bag</div>
                        <div class="ecom-best-sellers-prices">
                            <span class="new">$130.00</span>
                        </div>
                    </div>
                </div>
                <div class="ecom-best-sellers-card">
                    <div class="ecom-best-sellers-img-wrap">
                        <span class="ecom-best-sellers-badge sale">SALE</span>
                        <img src="https://source.unsplash.com/600x600/?clothes" alt="Yellow Reserved Hoodie" />
                    </div>
                    <div class="ecom-best-sellers-info">
                        <div class="ecom-best-sellers-name">Yellow Reserved Hoodie</div>
                        <div class="ecom-best-sellers-category">Dress</div>
                        <div class="ecom-best-sellers-prices">
                            <span class="old">$364.00</span>
                            <span class="new">$155.00</span>
                        </div>
                    </div>
                </div>
                <div class="ecom-best-sellers-card">
                    <div class="ecom-best-sellers-img-wrap">
                        <span class="ecom-best-sellers-badge sale">SALE</span>
                        <img src="https://source.unsplash.com/600x600/?clothes" alt="Nike Air Zoom Pegasus" />
                    </div>
                    <div class="ecom-best-sellers-info">
                        <div class="ecom-best-sellers-name">Nike Air Zoom Pegasus</div>
                        <div class="ecom-best-sellers-category">Shoe</div>
                        <div class="ecom-best-sellers-prices">
                            <span class="old">$220.00</span>
                            <span class="new">$198.00</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Category/Collection Banners -->
        <section class="ecom-categories">
            <div class="ecom-category-grid">
                <div class="ecom-category-card" v-for="cat in 3" :key="cat">
                    <img class="ecom-category-img" :src="`https://source.unsplash.com/600x400/?fashion,${cat}`"
                        alt="Category" />
                    <div class="ecom-category-label">Category {{ cat }}</div>
                </div>
            </div>
        </section>

        <!-- Product Grid -->
        <section class="ecom-products">
            <h2 class="ecom-section-title">Featured Products</h2>
            <div class="ecom-product-grid">
                <div class="ecom-product-card" v-for="i in 6" :key="i">
                    <img class="ecom-product-img" :src="`https://source.unsplash.com/600x600/?clothes,${i}`"
                        alt="Product" />
                    <div class="ecom-product-info">
                        <h3 class="ecom-product-title">Product Name {{ i }}</h3>
                        <p class="ecom-product-price">$49.99</p>
                        <button class="ecom-product-btn">Add to Cart</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Brand Logos -->
        <section class="ecom-brands">
            <div class="ecom-brand-logos">
                <img v-for="i in 5" :key="i" :src="`https://dummyimage.com/120x40/eee/222&text=Brand+${i}`"
                    alt="Brand Logo" />
            </div>
        </section>

        <!-- Testimonials -->
        <section class="ecom-testimonials">
            <h2 class="ecom-section-title">What Our Customers Say</h2>
            <div class="ecom-testimonial-grid">
                <div class="ecom-testimonial-card" v-for="i in 3" :key="i">
                    <div class="ecom-testimonial-quote">“This shop is amazing! The products are top quality and the
                        design is beautiful.”</div>
                    <div class="ecom-testimonial-user">
                        <img class="ecom-testimonial-avatar"
                            :src="`https://randomuser.me/api/portraits/men/${i + 10}.jpg`" alt="User" />
                        <div>
                            <div class="ecom-testimonial-name">John Doe {{ i }}</div>
                            <div class="ecom-testimonial-role">Verified Buyer</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Newsletter Signup -->
        <section class="ecom-newsletter">
            <div class="ecom-newsletter-inner">
                <h2 class="ecom-newsletter-title">Stay in the loop</h2>
                <p class="ecom-newsletter-desc">Get updates about new products and special offers.</p>
                <form class="ecom-newsletter-form" @submit.prevent>
                    <input type="email" placeholder="Your email address" required />
                    <button type="submit">Subscribe</button>
                </form>
            </div>
        </section>

        <!-- Footer -->
        <footer class="ecom-footer">
            <div class="ecom-footer-content">
                <div class="ecom-footer-logo">ShopLogo</div>
                <nav class="ecom-footer-nav">
                    <a href="#" class="ecom-footer-link">Home</a>
                    <a href="#" class="ecom-footer-link">Shop</a>
                    <a href="#" class="ecom-footer-link">About</a>
                    <a href="#" class="ecom-footer-link">Contact</a>
                </nav>
                <div class="ecom-footer-socials">
                    <a href="#" class="ecom-footer-social"><svg width="20" height="20" fill="currentColor">
                            <circle cx="10" cy="10" r="10" />
                        </svg></a>
                    <a href="#" class="ecom-footer-social"><svg width="20" height="20" fill="currentColor">
                            <rect x="2" y="2" width="16" height="16" rx="4" />
                        </svg></a>
                    <a href="#" class="ecom-footer-social"><svg width="20" height="20" fill="currentColor">
                            <polygon points="10,2 18,18 2,18" />
                        </svg></a>
                </div>
            </div>
            <div class="ecom-footer-copy">© 2024 ShopLogo. All rights reserved.</div>
        </footer>
    </div>
</template>

<script setup>

</script>

<style scoped>
.ecom-minimal {
    font-family: 'Poppins', Arial, sans-serif;
    background: #fafbfc;
    color: #222;
    min-height: 100vh;
}

.ecom-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem 3vw 1.5rem 3vw;
    background: #fff;
    border-bottom: 1px solid #eee;
    position: sticky;
    top: 0;
    z-index: 10;
}

.ecom-logo {
    font-weight: 700;
    font-size: 1.5rem;
    letter-spacing: 0.05em;
}

.ecom-nav {
    display: flex;
    gap: 2rem;
}

.ecom-link {
    color: #222;
    text-decoration: none;
    font-weight: 500;
    font-size: 1rem;
    transition: color 0.2s;
}

.ecom-link:hover {
    color: #559cad;
}

.ecom-cart {
    color: #222;
    cursor: pointer;
}

.ecom-hero {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4rem 3vw 2rem 3vw;
    gap: 2rem;
    background: #f5f7fa;
    flex-wrap: wrap;
}

.ecom-hero-content {
    flex: 1 1 320px;
    max-width: 500px;
}

.ecom-hero-title {
    font-size: 2.8rem;
    font-weight: 700;
    margin-bottom: 1.2rem;
    line-height: 1.1;
}

.ecom-hero-desc {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 2rem;
}

.ecom-hero-btn {
    background: #222;
    color: #fff;
    border: none;
    padding: 0.9rem 2.2rem;
    border-radius: 2rem;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
}

.ecom-hero-btn:hover {
    background: #559cad;
}

.ecom-hero-image {
    flex: 1 1 320px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.ecom-hero-image img {
    width: 100%;
    max-width: 400px;
    border-radius: 1.5rem;
    box-shadow: 0 8px 32px rgba(85, 156, 173, 0.08);
}

.ecom-categories {
    padding: 3rem 3vw 2rem 3vw;
}

.ecom-category-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 2rem;
}

.ecom-category-card {
    position: relative;
    border-radius: 1.2rem;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(85, 156, 173, 0.07);
    background: #fff;
    min-height: 180px;
    display: flex;
    align-items: flex-end;
}

.ecom-category-img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    display: block;
}

.ecom-category-label {
    position: absolute;
    left: 1.2rem;
    bottom: 1.2rem;
    background: rgba(255, 255, 255, 0.92);
    color: #222;
    font-weight: 600;
    font-size: 1.1rem;
    padding: 0.5rem 1.2rem;
    border-radius: 1.2rem;
    box-shadow: 0 2px 8px rgba(85, 156, 173, 0.07);
}

.ecom-products {
    padding: 3rem 3vw 4rem 3vw;
}

.ecom-section-title {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 2rem;
    text-align: center;
}

.ecom-product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 2.5rem;
}

.ecom-product-card {
    background: #fff;
    border-radius: 1.2rem;
    box-shadow: 0 2px 12px rgba(85, 156, 173, 0.07);
    padding: 1.5rem 1.2rem 1.2rem 1.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: box-shadow 0.2s, transform 0.2s;
}

.ecom-product-card:hover {
    box-shadow: 0 6px 24px rgba(85, 156, 173, 0.13);
    transform: translateY(-4px) scale(1.02);
}

.ecom-product-img {
    width: 100%;
    max-width: 200px;
    border-radius: 1rem;
    margin-bottom: 1.2rem;
    object-fit: cover;
    aspect-ratio: 1/1;
}

.ecom-product-info {
    text-align: center;
}

.ecom-product-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.ecom-product-price {
    color: #559cad;
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 1rem;
}

.ecom-product-btn {
    background: #559cad;
    color: #fff;
    border: none;
    padding: 0.6rem 1.5rem;
    border-radius: 1.5rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
}

.ecom-product-btn:hover {
    background: #222;
}

.ecom-brands {
    padding: 2rem 3vw 2rem 3vw;
    background: #fff;
}

.ecom-brand-logos {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.5rem;
    flex-wrap: wrap;
}

.ecom-brand-logos img {
    height: 40px;
    width: auto;
    opacity: 0.7;
    filter: grayscale(1);
    transition: opacity 0.2s;
}

.ecom-brand-logos img:hover {
    opacity: 1;
    filter: none;
}

.ecom-testimonials {
    padding: 3rem 3vw 3rem 3vw;
    background: #f5f7fa;
}

.ecom-testimonial-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
}

.ecom-testimonial-card {
    background: #fff;
    border-radius: 1.2rem;
    box-shadow: 0 2px 12px rgba(85, 156, 173, 0.07);
    padding: 2rem 1.5rem 1.5rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    align-items: flex-start;
}

.ecom-testimonial-quote {
    font-size: 1.1rem;
    color: #333;
    font-style: italic;
    margin-bottom: 0.5rem;
}

.ecom-testimonial-user {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.ecom-testimonial-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #eee;
}

.ecom-testimonial-name {
    font-weight: 600;
    font-size: 1rem;
}

.ecom-testimonial-role {
    color: #888;
    font-size: 0.95rem;
}

.ecom-newsletter {
    padding: 3rem 3vw 3rem 3vw;
    background: #fff;
    display: flex;
    justify-content: center;
}

.ecom-newsletter-inner {
    max-width: 480px;
    width: 100%;
    text-align: center;
}

.ecom-newsletter-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.7rem;
}

.ecom-newsletter-desc {
    color: #666;
    margin-bottom: 1.5rem;
}

.ecom-newsletter-form {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
}

.ecom-newsletter-form input[type="email"] {
    padding: 0.7rem 1.2rem;
    border-radius: 1.5rem;
    border: 1px solid #eee;
    font-size: 1rem;
    outline: none;
    width: 60%;
}

.ecom-newsletter-form button {
    background: #559cad;
    color: #fff;
    border: none;
    padding: 0.7rem 1.5rem;
    border-radius: 1.5rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
}

.ecom-newsletter-form button:hover {
    background: #222;
}

.ecom-footer {
    background: #222;
    color: #fff;
    padding: 2.5rem 3vw 1.2rem 3vw;
}

.ecom-footer-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 2rem;
    margin-bottom: 1.2rem;
}

.ecom-footer-logo {
    font-weight: 700;
    font-size: 1.3rem;
    letter-spacing: 0.05em;
}

.ecom-footer-nav {
    display: flex;
    gap: 2rem;
}

.ecom-footer-link {
    color: #fff;
    text-decoration: none;
    font-weight: 500;
    font-size: 1rem;
    transition: color 0.2s;
}

.ecom-footer-link:hover {
    color: #559cad;
}

.ecom-footer-socials {
    display: flex;
    gap: 1.2rem;
}

.ecom-footer-social {
    color: #fff;
    opacity: 0.7;
    transition: opacity 0.2s;
}

.ecom-footer-social:hover {
    opacity: 1;
}

.ecom-footer-copy {
    text-align: center;
    color: #aaa;
    font-size: 0.95rem;
}

@media (max-width: 900px) {
    .ecom-hero {
        flex-direction: column;
        text-align: center;
        padding: 2.5rem 2vw 1.5rem 2vw;
    }

    .ecom-hero-content,
    .ecom-hero-image {
        max-width: 100%;
    }

    .ecom-footer-content {
        flex-direction: column;
        align-items: flex-start;
        gap: 1.2rem;
    }

    .ecom-brand-logos {
        gap: 1.2rem;
    }
}

.ecom-best-sellers {
    margin: 0 auto 3rem auto;
    padding: 3rem 3vw 2rem 3vw;
}

.ecom-best-sellers-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.ecom-best-sellers-title {
    font-size: 2.4rem;
    font-weight: 700;
    text-align: center;
    flex: 1;
}

.ecom-best-sellers-showall {
    background: #222;
    color: #fff;
    border: none;
    padding: 0.5rem 1.5rem;
    border-radius: 0.3rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    margin-left: 1rem;
}

.ecom-best-sellers-tabs {
    display: flex;
    gap: 2rem;
    justify-content: flex-start;
    margin-bottom: 2rem;
    margin-left: 1rem;
}

.ecom-best-sellers-tab {
    background: none;
    border: none;
    font-size: 1.1rem;
    color: #888;
    font-weight: 500;
    cursor: pointer;
    padding: 0.3rem 0.7rem;
    border-radius: 0.2rem;
    transition: color 0.2s, background 0.2s;
}

.ecom-best-sellers-tab.active {
    color: #222;
    background: #f5f7fa;
    font-weight: 700;
}

.ecom-best-sellers-products {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 2.5rem;
    align-items: stretch;
}

.ecom-best-sellers-card {
    background: #f7f7f7;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(85, 156, 173, 0.07);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    transition: box-shadow 0.2s, transform 0.2s;
    position: relative;
}

.ecom-best-sellers-card:hover {
    box-shadow: 0 6px 24px rgba(85, 156, 173, 0.13);
    transform: translateY(-4px) scale(1.02);
}

.ecom-best-sellers-img-wrap {
    width: 100%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 320px;
    position: relative;
}

.ecom-best-sellers-img-wrap img {
    width: 100%;
    max-width: 220px;
    object-fit: contain;
    margin: 0 auto;
    display: block;
}

.ecom-best-sellers-badge {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: #e74c3c;
    color: #fff;
    font-size: 0.85rem;
    font-weight: 700;
    padding: 0.2rem 0.8rem;
    border-radius: 0.3rem;
    z-index: 2;
    letter-spacing: 0.05em;
}

.ecom-best-sellers-badge.sale {
    background: #222;
}

.ecom-best-sellers-info {
    padding: 1.2rem 1.2rem 1.2rem 1.2rem;
    width: 100%;
}

.ecom-best-sellers-name {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.2rem;
}

.ecom-best-sellers-category {
    color: #888;
    font-size: 0.98rem;
    margin-bottom: 0.7rem;
}

.ecom-best-sellers-prices {
    font-size: 1.1rem;
    font-weight: 500;
}

.ecom-best-sellers-prices .old {
    color: #aaa;
    text-decoration: line-through;
    margin-right: 0.7rem;
    font-size: 1rem;
}

.ecom-best-sellers-prices .new {
    color: #e74c3c;
    font-weight: 700;
}
</style>

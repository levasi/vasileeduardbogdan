<template>
    <div class="container">
        <header class="header">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com">
            <link
                href="https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                rel="stylesheet">
            <div class="top-navigation flex justify-between items-center sticky-left">
                <span>

                </span>
                <nav>
                    <ul class="navigation p-1">
                        <li>
                            <NuxtLink to="/">HOME</NuxtLink>
                        </li>
                    </ul>
                </nav>
                <span></span>
            </div>
        </header>
    </div>
    <div class="">
        <slot />
    </div>
</template>

<style scoped>
/* Sticky left navigation */
.sticky-left {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 220px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    z-index: 1000;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.04);
}

.top-navigation {
    width: auto;

    a {
        color: #fff;
    }
}
</style>

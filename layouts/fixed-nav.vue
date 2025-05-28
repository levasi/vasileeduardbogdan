<template>
    <div class="container">
        <header class="header">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com">
            <link
                href="https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                rel="stylesheet">
            <div class="p-4 fixed-nav flex justify-center items-center text-romance">
                <NuxtLink to="/">HOME</NuxtLink>
            </div>
        </header>
    </div>
    <div class="">
        <slot />
    </div>
</template>

<style>
.fixed-nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    background-color: transparent;
}
</style>
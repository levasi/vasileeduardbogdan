<template>
    <header class="header">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link
            href="https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet">
    </header>
    <div class="fixed-nav-home-button">
        <NuxtLink to="/">
            < Back</NuxtLink>
    </div>

    <div class="">
        <slot />
    </div>
</template>

<style>
.fixed-nav-home-button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007BFF;
    color: white;
    text-align: center;
    border-radius: 25px;
    text-decoration: none;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s ease;
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 1000;
}

.fixed-nav-home-button:hover {
    background-color: #0056b3;
}
</style>
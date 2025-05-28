<template>
    <div class="portofolio-section p-4">
        <div class="heading mb-18">
            <h2 class="font-bold text-2xl mb-3">Testing things</h2>
            <p>Loading ...</p>
        </div>

        <div class="portofolio-section__content grid grid-cols-4 gap-6">
            <NuxtLink to="/lamp"
                class="portofolio-section__item h-40 cursor-pointer flex-col p-4 bg-white shadow-md rounded-lg flex items-center justify-center">
                <h3>Lamp</h3>
                <p>Lamp import.</p>
            </NuxtLink>
            <NuxtLink to="/light-balls"
                class="portofolio-section__item h-40 cursor-pointer flex-col p-4 bg-white shadow-md rounded-lg flex items-center justify-center">
                <h3>Light Balls</h3>
                <p>Using Rapier physics.</p>
            </NuxtLink>
            <NuxtLink to="/wormhole"
                class="portofolio-section__item h-40 cursor-pointer flex-col p-4 bg-white shadow-md rounded-lg flex items-center justify-center">
                <h3>Wormhole</h3>
                <p>Simulation.</p>
            </NuxtLink>
            <NuxtLink to="/earth"
                class="portofolio-section__item h-40 cursor-pointer flex-col p-4 bg-white shadow-md rounded-lg flex items-center justify-center">
                <h3>Earth</h3>
                <p>Simulation.</p>
            </NuxtLink>
            <NuxtLink to="/cube"
                class="portofolio-section__item h-40 cursor-pointer flex-col p-4 bg-white shadow-md rounded-lg flex items-center justify-center">
                <h3>Cube</h3>
                <p>Starter template.</p>
            </NuxtLink>
            <NuxtLink to="/demo"
                class="portofolio-section__item cursor-pointer flex-col p-4 bg-white shadow-md rounded-lg flex items-center justify-center">
                <h3>Demo</h3>
                <p>Demo project</p>
            </NuxtLink>
            <NuxtLink to="/with-react-well"
                class="portofolio-section__item h-40 cursor-pointer flex-col p-4 bg-white shadow-md rounded-lg flex items-center justify-center">
                <h3>With React well</h3>
                <p>React translation</p>
            </NuxtLink>
        </div>
    </div>
</template>

<style scoped lang="scss">
.portofolio-section {

    .heading {
        text-align: center;
    }
}

.portofolio-section__content {
    .portofolio-section__item {
        height: 240px;
        box-shadow: 0px 0px 5px 2px #78dcca57;
    }
}
</style>
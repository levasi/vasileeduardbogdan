<template>
    <div class="portofolio-section container">
        <div class="heading">
            <h2 class="font-bold text-2xl">Testing things</h2>
            <p>Loading ...</p>
        </div>

        <div class="portofolio-section__content gap-5">
              <NuxtLink to="/earth"
                class="portofolio-section__item cursor-pointer flex-col p-4 bg-white shadow-md rounded-lg flex items-center justify-center">
                <h3>Earth</h3>
                <p>Earth simulation.</p>
            </NuxtLink>
            <NuxtLink to="/cube"
                class="portofolio-section__item cursor-pointer flex-col p-4 bg-white shadow-md rounded-lg flex items-center justify-center">
                <h3>Cube</h3>
                <p>Starter template.</p>
            </NuxtLink>
            <NuxtLink to="/demo"
                class="portofolio-section__item cursor-pointer flex-col p-4 bg-white shadow-md rounded-lg flex items-center justify-center">
                <h3>Demo</h3>
                <p>Demo project</p>
            </NuxtLink>
            <NuxtLink to="/with-react-well"
                class="portofolio-section__item cursor-pointer flex-col p-4 bg-white shadow-md rounded-lg flex items-center justify-center">
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
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  grid-template-rows: masonry;

    .portofolio-section__item {
        height: 150px;
    }
}
</style>
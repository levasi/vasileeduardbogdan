<script setup>
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three';
import { TresCanvas } from '@tresjs/core';
import { OrbitControls } from '@tresjs/cientos';
import Text from './text.vue'

const gl = {
    clearColor: '#82DBC5',
    shadows: true,
    alpha: false,
    shadowMapType: BasicShadowMap,
    outputColorSpace: SRGBColorSpace,
    toneMapping: NoToneMapping,
};
</script>

<template>
    <TresCanvas window-size v-bind="gl">
        <TresPerspectiveCamera :position="[2, 2, 9]" />
        <OrbitControls />
        <Suspense>
            <Text />
        </Suspense>
        <TresDirectionalLight :position="[0, 2, 4]" :intensity="1.2" cast-shadow />
    </TresCanvas>
</template>

<style>
html,
body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
}

#app {
    height: 100%;
    width: 100%;
    background-color: #000;
}
</style>
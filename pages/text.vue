<script setup>
import { useTexture } from '@tresjs/core'
import { Text3D } from '@tresjs/cientos'
const matcapTexture = await useTexture([
    'https://raw.githubusercontent.com/Tresjs/assets/main/textures/matcaps/7.png',
]);
</script>

<template>
    <Text3D :position="[-1, 0, 0]" ref="textRef"
        font="https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json">
        Three js text loader
        <TresMeshMatcapMaterial :matcap="matcapTexture" />
    </Text3D>
</template>
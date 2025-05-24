<script setup>
import { BasicShadowMap, NoToneMapping } from 'three';
import { reactive } from 'vue';
import { extend, useTresContext } from '@tresjs/core'
import { OrbitControls } from 'three/addons/controls/OrbitControls'
import { TextGeometry } from 'three/addons/geometries/TextGeometry'

extend({ TextGeometry })

// const { camera, renderer } = useTresContext()
extend({ OrbitControls })

const state = reactive({
    clearColor: '#201919',
    shadows: true,
    alpha: false,
    shadowMapType: BasicShadowMap,
    toneMapping: NoToneMapping,
});

function onClick(ev) {
    if (ev) {
        ev.object.material.color.set('#008080');
    }
}

function onPointerEnter(ev) {
    if (ev) {
        ev.object.material.color.set('#DFFF45');
        setTimeout(() => {
            ev.object.material.color.set('#efefef');
        }, 1000);
    }
}

function onPointerLeave(ev) {
    if (ev) {
        /*  ev.object.material.color.set('#efefef') */
    }
}
</script>

<template>
    <TresCanvas v-bind="state">
        <TresMesh>
            <TresTextGeometry :args="['TresJS']" center />
        </TresMesh>
        <TresPerspectiveCamera :position="[11, 11, 11]" :fov="45" :near="0.1" :far="1000" :look-at="[-8, 3, -3]" />
        <TresOrbitControls v-if="renderer" :args="[camera, renderer?.domElement]" />

    </TresCanvas>
</template>

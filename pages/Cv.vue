<template>
    <section class="container cv-section">
        <!-- Mobile floating buttons -->
        <div class="mobile-fixed-buttons hidden md:hidden">
            <button class="mobile-btn tools-btn" @click="openToolsPanel">Tools</button>
            <button class="mobile-btn experiment-btn" @click="openExperimentPanel">Experimentation Tools</button>
            <button class="mobile-btn languages-btn" @click="openLanguagesPanel">Languages</button>
        </div>
        <!-- Mobile slide panels -->
        <transition name="slide-panel">
            <div v-if="openPanel === 'tools'" class="mobile-panel">
                <button class="close-btn" @click="closePanel">×</button>
                <h2 class="section-title">Tools</h2>
                <ul class="tools-list">
                    <li v-for="tool in cv.productionTools" :key="tool.name">
                        {{ tool.name }} <span v-if="tool.level">({{ tool.level }})</span>
                    </li>
                </ul>
            </div>
        </transition>
        <transition name="slide-panel">
            <div v-if="openPanel === 'experiment'" class="mobile-panel">
                <button class="close-btn" @click="closePanel">×</button>
                <h2 class="section-title">Experimentation Tools</h2>
                <ul class="tools-list">
                    <li v-for="tool in cv.experimentTools" :key="tool.name">
                        {{ tool.name }} <span v-if="tool.level">({{ tool.level }})</span>
                    </li>
                </ul>
            </div>
        </transition>
        <transition name="slide-panel">
            <div v-if="openPanel === 'languages'" class="mobile-panel">
                <button class="close-btn" @click="closePanel">×</button>
                <h2 class="section-title">Languages</h2>
                <ul>
                    <li v-for="language in cv.languages" :key="language.name">
                        {{ language.name }} ({{ language.level }})
                    </li>
                </ul>
            </div>
        </transition>
        <!-- Main content -->
        <div class="left">
            <div class="left-top md:mb-5">
                <img ref="meImage" class="relative rounded-full mx-auto w-32 h-32 object-cover"
                    src="~/assets/images/eu.jpg" alt="">
            </div>
            <div class="left-bottom hidden md:block">
                <div class="tools left-bottom-section">
                    <h2 class="section-title text-md">Tools</h2>
                    <ul class="tools-list pl-0">
                        <li class="tool-item flex items-center justify-between" v-for="tool in cv.productionTools"
                            :key="tool.name">{{ tool.name }}
                            <span v-if="tool.level" class="text-gray-500 text-sm">
                                ({{ tool.level }})
                            </span>
                        </li>
                    </ul>
                </div>
                <div class="tools left-bottom-section">
                    <h2 class="section-title text-md">Experimentation tools</h2>
                    <ul class="tools-list p-0">
                        <li class="tool-item flex items-center justify-between" v-for="tool in cv.experimentTools"
                            :key="tool.name">{{ tool.name }}
                            <span v-if="tool.level" class="text-gray-500 text-sm">
                                ({{ tool.level }})
                            </span>
                        </li>
                    </ul>
                </div>
                <div class="languages left-bottom-section">
                    <h2 class="section-title">Languages</h2>
                    <ul>
                        <li v-for="language in cv.languages" :key="language.name">
                            {{ language.name }} ({{ language.level }})
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="right-top text-center">
                <h1 class="h1 m-0">{{ cv.firstName }}
                    <span>{{ cv.lastName }}</span>
                </h1>
                <h3 class="text-md mb-4">{{ cv.description.title }}</h3>
                <p>{{ cv.description.text }}</p>
                <p>Email:
                    <a class="email-link" href="mailto:{{ cv.email }}">{{ cv.email }}</a>
                </p>
            </div>
            <div class="right-experiences pb-30">
                <h2 class="section-title">Experiences</h2>
                <div v-for="(experience, i) in cv.experiences" :key="experience.company" class="experience-card"
                    ref="experienceCards">
                    <div class="experience-card-header">
                        <div class="position-and-company">
                            <h3 class="company leading-none">{{ experience.company }}</h3>
                            <p class="position">{{ experience.position }}</p>
                        </div>
                        <span class="section-date">{{ experience.startDate }} - {{ experience.endDate }}</span>
                    </div>
                    <div class="responsibilities mb-5">
                        <h4 class="responsibilities-title mb-5">Responsibilities:</h4>
                        <ul class="responsibilities-list">
                            <li v-for="responsibility in experience.responsibilities" :key="responsibility">
                                {{ responsibility }}
                            </li>
                        </ul>
                    </div>
                    <div class="tools">
                        <h4 class="tools-title mb-5">Tools Used:</h4>
                        <ul class="tools-list">
                            <li v-for="tool in experience.tools" :key="tool">
                                {{ tool }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useCvStore } from '~/stores/cv'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const cv = useCvStore()
const name = cv.name;

// Mobile panel state
const openPanel = ref(null)
const openToolsPanel = () => {
    openPanel.value = openPanel.value === 'tools' ? null : 'tools';
}
const openExperimentPanel = () => {
    openPanel.value = openPanel.value === 'experiment' ? null : 'experiment';
}
const openLanguagesPanel = () => {
    openPanel.value = openPanel.value === 'languages' ? null : 'languages';
}
const closePanel = () => openPanel.value = null

// Experience card animation
const experienceCards = ref([])
onMounted(async () => {
    await nextTick()
    experienceCards.value.forEach((el) => {
        if (el) {
            gsap.fromTo(el,
                { opacity: 0, y: 60, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 90%',
                        end: 'top 30%',
                        scrub: true,
                        onUpdate: self => {
                            // Optionally, you can log or debug progress here
                        }
                    }
                }
            )
        }
    })
})
</script>
<style scoped lang="scss">
.email-link {
    color: #DEC802;
    text-decoration: underline;
    cursor: pointer;
    font-weight: bold;
    transition: color 0.3s ease;

    &:hover {
        color: #FFD700;
    }
}

.experience-card {
    margin-bottom: 1.5rem;
    padding: 1.5rem;
    border: 1px solid #ddd;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
    }

    .section-date {
        font-weight: bold;
        color: #888;
        font-size: 0.9rem;
    }

    .company {
        font-size: 1.5rem;
        font-weight: bold;
        color: #333;
    }

    .position {
        font-style: italic;
        color: #555;
        font-size: 1rem;
    }

    .responsibilities-list {
        list-style-type: disc;
        padding-left: 20px;
        margin-top: 0.5rem;

        li {
            margin-bottom: 0.6rem;
            line-height: 1.5;
        }
    }

    .tools-list {
        list-style-type: none;
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
        gap: 0.5rem;

        li {
            padding: 0.3rem 0.6rem;
            background-color: #eaeaea;
            border-radius: 4px;
            font-size: 0.9rem;
            color: #555;
            white-space: nowrap;
        }
    }

    .tools-title,
    .responsibilities-title {
        font-weight: bold;
        color: #444;
    }

    .experience-card-header {
        margin-bottom: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }
}

.container {
    display: flex;
    gap: 36px;

    .left {
        flex: 1;
        background-color: #f4f4f4;
        padding: 1.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
}

.right {
    flex: 3;
}

.right-top {
    margin-bottom: 1.5rem;

    h1 {
        font-size: 2.5rem;
        color: #333;
        line-height: 1;
    }

    h3 {
        font-size: 1.75rem;
        color: #444;
    }

    p {
        margin: 0.25rem 0;
        color: #555;
    }

    a {
        color: #DEC802;
        text-decoration: none;
        font-weight: bold;
        transition: color 0.3s ease;

        &:hover {
            color: #FFD700;
        }
    }
}

.left-top {
    img {
        border: 4px solid #DEC802;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
}

.section-title {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #DEC802;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.left-bottom-section {
    margin-bottom: 1.5rem;

    ul {
        li {
            margin-bottom: 0.5rem;
            font-size: 1rem;
            color: #555;
        }
    }
}

@media (max-width: 768px) {
    .container.cv-section {
        flex-direction: column;
        gap: 20px;
        padding: 1rem;
    }

    .left,
    .right {
        flex: unset;
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
        padding: 1rem;
    }

    .experience-card {
        padding: 1rem;
    }

    .right-top h1 {
        font-size: 2rem;
    }

    .right-top h3 {
        font-size: 1.2rem;
    }

    .mobile-fixed-buttons {
        display: flex !important;
        flex-direction: column !important;
        position: fixed;
        top: 50%;
        right: 0;
        z-index: 2002;
        transform: translateY(-50%);
        gap: 10px;
    }

    .mobile-btn {
        writing-mode: vertical-rl;
        transform: rotate(-180deg);
        padding: 15px 0;
        min-width: 27px;
        min-height: 90px;
        text-align: center;
        border-radius: 0 12px 12px 0;
        font-size: 1rem;
        letter-spacing: 0.1em;
        white-space: nowrap;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        background: #DEC802;
        color: #fff;
        border: none;
        font-weight: bold;
        transition: background 0.2s;
        outline: none;
        cursor: pointer;
        border-left: 4px solid #fff;
        box-shadow: -2px 0 8px rgba(0, 0, 0, 0.08);
        font-size: 14px;
    }

    .mobile-btn:active,
    .mobile-btn:focus {
        background: #FFD700;
    }

    .mobile-panel {
        position: fixed;
        top: 0;
        left: 0;
        width: 80vw;
        max-width: 320px;
        height: 100vh;
        background: #fff;
        z-index: 2001;
        box-shadow: 2px 0 16px rgba(0, 0, 0, 0.12);
        padding: 2.2rem 1.2rem 1.2rem 1.2rem;
        display: flex;
        flex-direction: column;
        animation: slideInPanel 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .close-btn {
        position: absolute;
        top: 10px;
        right: 16px;
        background: none;
        border: none;
        font-size: 2rem;
        color: #DEC802;
        cursor: pointer;
        z-index: 1003;
        padding: 0;
        line-height: 1;
    }

    .mobile-panel .section-title {
        margin-top: 0.5rem;
        margin-bottom: 1rem;
        font-size: 1.2rem;
    }

    .mobile-panel ul {
        padding-left: 0;
        list-style: none;
    }

    .mobile-panel li {
        margin-bottom: 0.7rem;
        font-size: 1rem;
        color: #444;
    }

    // Hide the left-bottom sections on mobile
    .left-bottom {
        display: none;
    }
}

// Slide panel animation
@keyframes slideInPanel {
    from {
        transform: translateX(-100%);
    }

    to {
        transform: translateX(0);
    }
}

.slide-panel-enter-active,
.slide-panel-leave-active {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s;
}

.slide-panel-enter-from,
.slide-panel-leave-to {
    transform: translateX(-100%);
    opacity: 0;
}

.slide-panel-enter-to,
.slide-panel-leave-from {
    transform: translateX(0);
    opacity: 1;
}
</style>
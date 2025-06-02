<template>
    <section class="container cv-section">
        <div class="left">
            <div class="left-top">
                <img ref="meImage" class="relative rounded-full" src="~/assets/images/eu.jpg" alt="">
            </div>
            <div class="left-bottom">
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
                <h1 class="h1">{{ cv.firstName }}
                    <span>{{ cv.lastName }}</span>
                </h1>
                <p>{{ cv.occupation }}</p>
                <p>Email:
                    <a class="email-link" href="mailto:{{ cv.email }}">{{ cv.email }}</a>
                </p>
            </div>
            <div class="right-experiences">
                <h2 class="section-title">Experiences</h2>
                <div v-for="experience in cv.experiences" :key="experience.company" class="experience-card">
                    <div class="experience-card-header">
                        <div class="position-and-company">
                            <h3 class="company">{{ experience.company }}</h3>
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
import { useCvStore } from '~/stores/cv'

const cv = useCvStore()
const name = cv.name;

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
        margin-bottom: 0.5rem;
        color: #333;
    }

    h3 {
        font-size: 1.75rem;
        margin-bottom: 0.5rem;
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
    margin-bottom: 21px;

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
</style>
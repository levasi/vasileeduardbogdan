import { defineStore } from 'pinia'

export const useCvStore = defineStore('cv', {
    state: () => {
        return {
            firstName: 'Bogdan',
            lastName: 'Eduard Vasile',
            email: 'vasileeduardbogdan@gmail.com',
            occupation: 'Front-end Developer',
            description: 'I am a passionate front-end developer with a keen interest in creating dynamic and responsive web applications. I enjoy working with modern JavaScript frameworks and libraries to build user-friendly interfaces.',
            productionTools: [
                { name: 'HTML', level: 'Advanced' },
                { name: 'CSS', level: 'Advanced' },
                { name: 'JavaScript', level: 'Advanced' },
                { name: 'Vue.js', level: 'Advanced' },
                { name: 'Nuxt', level: 'Advanced' },
                { name: 'Gsap', level: 'Intermediate' },
                { name: 'Shopware', level: 'Intermediate' },
                { name: 'Tailwind CSS', level: 'Intermediate' },
                { name: 'Bootstrap', level: 'Intermediate' },
                { name: 'SCSS', level: 'Advanced' },
                { name: 'Figma', level: 'Intermediate' },
                { name: 'Storybook', level: 'Intermediate' },
                { name: 'Jira', level: 'Intermediate' },
                { name: 'Git', level: 'Advanced' },
                { name: 'Bitbucket', level: 'Intermediate' },
                { name: 'TWIG Templating', level: 'Intermediate' }
            ],
            experimentTools: [
                { name: 'Three.js', level: 'Advanced' }
            ],
            experiences: [

                {
                    company: 'Valantic Romania',
                    position: 'Frontend Developer',
                    startDate: 'June 2021',
                    endDate: 'Present',
                    location: 'Bucharest, Romania',
                    responsibilities: [
                        'Implemented user interfaces for online shops using the Shopware platform, ensuring responsive and visually engaging e-commerce experiences.',
                        'Extended the administration of Shopware stores by developing new CMS components, elements, and features.'
                    ],
                    tools: [
                        'Shopware',
                        'JavaScript',
                        'Twig templates',
                        'HTML',
                        'SCSS',
                        'Vue.js',
                        'Jira'
                    ]
                },
                {
                    company: 'Encode Expert',
                    position: 'Frontend Developer',
                    startDate: 'March 2020',
                    endDate: 'April 2021',
                    location: 'Bucharest, Romania',
                    responsibilities: [
                        'Contributed to the development of an online dating application, focusing on user experience, functionality, and performance optimization.',
                        'Implemented the application’s user interface and logical workflow to ensure a seamless and intuitive user experience.',
                        'Developed and maintained a scalable Storybook-based design system to streamline UI consistency and accelerate development.'
                    ],
                    tools: [
                        'JavaScript',
                        'Vue.js',
                        'Vuex',
                        'Nuxt',
                        'Bootstrap-vue',
                        'Storybook',
                        'sockets.io',
                        'Figma',
                        'Nanocosmos'
                    ]
                },
                {
                    company: 'STEP TO WEB Agency',
                    position: 'Frontend Developer',
                    startDate: 'May 2018',
                    endDate: 'March 2020',
                    location: 'Bucharest, Romania',
                    responsibilities: [
                        'Contributed to the development of Zion Builder, a custom page builder plugin for WordPress, focused on delivering a flexible and user-friendly site-building experience.',
                        'Implemented new features and enhanced existing functionality to meet evolving user needs.',
                        'Translated UI/UX designs into responsive and interactive interfaces.',
                        'Optimized application performance for faster load times and improved user experience.'
                    ],
                    tools: [
                        'JavaScript',
                        'Vue.js',
                        'Vuex',
                        'Jira',
                        'Bitbucket',
                        'Git',
                        'Adobe Photoshop',
                        'Adobe XD',
                        'Webpack',
                        'AJAX'
                    ],
                    projectUrl: 'https://demo.zionbuilder.io'
                },
                {
                    company: 'SC XFACTORAPP SRL',
                    position: 'Frontend Developer',
                    startDate: 'May 2016', // Add start date if known
                    endDate: 'February 2018',   // Add end date if known
                    location: 'Bucharest, Romania',
                    responsibilities: [
                        'Developed fully functional, responsive front-end prototypes aligned with business requirements and design specifications.'
                    ],
                    tools: [
                        'HTML/HTML5',
                        'CSS3',
                        'SCSS',
                        'Bootstrap',
                        'JavaScript',
                        'jQuery'
                    ]
                },
                {
                    company: 'Connect Promotions',
                    position: 'Designer 3D',
                    startDate: 'October 2014',
                    endDate: 'May 2016',
                    location: 'Bucharest, Romania',
                    responsibilities: [
                        'Produced photorealistic 3D renders of exhibition stands for client presentations and marketing materials.',
                        'Created precise technical drawings to support production and assembly.',
                        'Designed promotional materials for both print and digital platforms, ensuring brand consistency and visual impact.'
                    ],
                    tools: [
                        '3dsMax',
                        'v-ray',
                        'keyshot',
                        'Autocad',
                        'Adobe Photoshop',
                        'Adobe Illustrator'
                    ]
                },
                {
                    company: 'Ferca Medical',
                    position: 'DTP Grafician / HTML Editor',
                    startDate: 'July 2012',
                    endDate: 'August 2014',
                    location: 'Bucharest, Romania',
                    responsibilities: [
                        'Designed graphic assets for advertising materials across print and digital media, aligning with brand and campaign goals.',
                        'Developed responsive HTML emails for online marketing campaigns, ensuring cross-client compatibility and engagement.'
                    ],
                    tools: [
                        'Adobe Photoshop',
                        'Adobe Illustrator',
                        'Corel Draw',
                        'InDesign',
                        'HTML',
                        'CSS',
                        'Javascript'
                    ]
                },
                {
                    company: 'Easy-Print',
                    position: 'Printer operator/Graphic designer, digital department',
                    startDate: 'May 2010',
                    endDate: 'July 2012',
                    location: 'Bucharest, Romania',
                    responsibilities: [
                        'Worked as a Printing Operator and Graphic Designer in the digital department of an advertising company, handling the design and personalization of promotional materials for various clients.'
                    ],
                    tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Corel Draw', 'Adobe InDesign']
                }
            ],
            education: [
                {
                    institution: 'University of Technology',
                    degree: 'Bachelor of Science in Computer Science',
                    startDate: '2014-09-01',
                    endDate: '2018-06-30',
                    description: 'Studied computer science with a focus on web development and software engineering.'
                }
            ],
            projects: [
                {
                    title: 'Portfolio Website',
                    description: 'A personal portfolio website showcasing my projects and skills.',
                    url: 'https://example.com/portfolio',
                    technologies: ['HTML', 'CSS', 'JavaScript', 'Vue.js']
                },
                {
                    title: 'E-commerce Platform',
                    description: 'An e-commerce platform built with React and Node.js.',
                    url: 'https://example.com/ecommerce',
                    technologies: ['React', 'Node.js', 'Express', 'MongoDB']
                }
            ],
            certifications: [
                {
                    title: 'Certified Front-end Developer',
                    institution: 'Web Development Academy',
                    date: '2021-05-01',
                    description: 'Certification in front-end development focusing on modern web technologies.'
                },
                {
                    title: 'JavaScript Mastery',
                    institution: 'Online Learning Platform',
                    date: '2020-10-01',
                    description: 'Advanced JavaScript course covering ES6+ features and best practices.'
                }
            ],
            languages: [
                { name: 'Romanian', level: 'Native' },
                { name: 'English', level: 'Fluent' }
            ],
            hobbies: [
                'Coding',
                'Reading',
                'Traveling',
                'Photography'
            ],
            socialLinks: {
                linkedin: 'https://www.linkedin.com/in/vasileeduardbogdan',
                github: 'https://github.com/vasileeduardbogdan'
            }
        }
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
        increment() {
        },
    },
})
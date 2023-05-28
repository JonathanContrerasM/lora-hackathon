<template>
    <div>
        <nav :class="{'hidden': scrolledDown}">
            <a href="#">Home</a>
            <a href="#where">Where</a>
            <a href="#what">What</a>
            <a href="#when">When+Where</a>
            <a href="#suggestion">Suggestion</a>
        </nav>
        <home @device="log" @mobile="logmobile"></home>
        <where :dev="selectedDevice" :mobile="mobile"></where>
        <what @findings="logfindings"></what>
        <when :dev="selectedDevice"></when>
        <suggestion :dev="selectedDevice" :findings="findings"></suggestion>
        <LinkedIn></LinkedIn>
        <LinkedIn_Test></LinkedIn_Test>

    </div>
</template>

<script>
import Home from './Home.vue'
import Suggestion from './Suggestion.vue'
import Where from './Where.vue'
import When from './When.vue'
import What from './What.vue'
import LinkedIn from "./LinkedIn.vue";
import LinkedIn_Test from "@/LinkedIn_Test.vue";


export default {
    name: 'App',
    data: function () {
        return {
            selectedDevice: '',
            mobile: '',
            findings: {},
            scrolledDown: false
        }
    },
    components: {
        home: Home,
        what: What,
        where: Where,
        suggestion: Suggestion,
        when: When,
        LinkedIn: LinkedIn,
        LinkedIn_Test: LinkedIn_Test
    },
    methods: {
        logfindings: function (findings) {
            console.log('app fidings:', findings)
            this.findings = findings
        },
        log: function (device) {
            this.selectedDevice = device
            console.log('home: device changed', this.selectedDevice)
        },
        logmobile: function (mobile) {
            this.mobile = mobile
            console.log('home: mobile changed', this.mobile)
        },
        handleScroll() {
            const currentScrollPosition = window.pageYOffset;
            if (currentScrollPosition > this.lastScrollPosition) {
                this.scrolledDown = true;
            } else {
                this.scrolledDown = false;
            }
            this.lastScrollPosition = currentScrollPosition;
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll)
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll)
    }
}
</script>


<style scoped>
nav {
    position: fixed;
    top: 0;
    width: 100%;
    padding: 10px 40px;
    margin-top: 20px;
    background-color: hsl(195, 85%, 41%);
    color: white;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1;
    transition: top 0.3s ease-in-out;
}

.hidden {
    top: -60px;
}

nav a {
    color: white;
    text-decoration: none;
    margin-right: 20px;
    font-weight: bold;
    font-size: 16px;
}

nav a:hover {
    color: #0b273d;
}
</style>




<template>
    <div class="wrapper" id="where">
        <div class="map-container">
            <iframe v-if="iframeurl" scrolling="no" marginheight="0" marginwidth="0"
                    :src="iframeurl" width="100%" height="100%" frameborder="0">
            </iframe>
        </div>
    </div>
</template>

<script>
export default {
    name: 'WhereView',
    data: function() {
        return {}
    },
    watch: {
        dev: function () {
            console.log('selectedDevice in where', this.dev)
        }
    },
    components: {},
    computed: {
        iframeurl: function () {
            if(!this.dev) { return '' }
            console.log('iframeurl', this.mobile)
            var staticMap = this.mobile ? 'dynamic': 'static'
            return `http://localhost:5002/location_map_${staticMap}?device=${this.dev}`
            //return staticMap
        }
    },
    props: ['dev', 'mobile'],
    mounted: function () {
        console.log(this.dev)
    }
}
</script>

<style scoped>
.wrapper {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.map-container {
    height: 80%;
    width: 80%;
    padding: 1em;
    min-height: 0; /* Fix for Firefox and IE */
}

iframe {
    height: 100%;
    width: 100%;
    border: none;
}
</style>

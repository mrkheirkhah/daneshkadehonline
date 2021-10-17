<template>
    <div class="chart">
        <p class="chart-title">
            <skeleton class="skeleton" width="180px" height="40px" borderRadius='5px'/>
        </p>
        <div class="pie-container">
            <skeleton class="skeleton " width="180px" height="180px" type='circle' />
        </div>
    </div>
</template>

<script>
import skeleton from '@/components/skeleton-components/skeletonCreator'
export default {
    components:{skeleton}
}
</script>
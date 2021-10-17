<template>
    <span class="aside-items-skeleton">
        <div>
            <skeleton class="skeleton" width="64px" height="66px" borderRadius='5px'/>
        </div>
        <div>
            <skeleton class="skeleton" width="120px" height="25px" borderRadius='5px'/>
            <br>
            <skeleton class="skeleton" width="80px" height="11px" borderRadius='5px'/>
        </div>
    </span>
</template>

<script>
import skeleton from '@/components/skeleton-components/skeletonCreator'
export default {
    components:{skeleton}
}
</script>
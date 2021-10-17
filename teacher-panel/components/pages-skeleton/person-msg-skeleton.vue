<template>
    <div class="person-message">
        <span class="person-message__image">
            <skeleton class="skeleton " width="79px" height="79px" type='circle' />
        </span>
        <div class="person-message__info msg-text-skeleton">
            <span class="person-name">
                <skeleton class="skeleton" width="100px" height="30px" borderRadius='5px'/>
            </span>
            <span class="person-text">
                <br>
                <skeleton class="skeleton" width="200px" height="15px" borderRadius='5px'/>
                <br>
                <skeleton class="skeleton" width="200px" height="15px" borderRadius='5px'/>
            </span>
        </div>
        <div class="person-message__sidebox">
            <skeleton class="skeleton" width="60px" height="13px" borderRadius='5px'/>
            
        </div>
    </div>
</template>

<script>
import skeleton from '@/components/skeleton-components/skeletonCreator'
export default {
    components:{skeleton},
}
</script>
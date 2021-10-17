<template>
    <div>
        <header class="table-row table-header" >
            <span v-for="i in 5" :key="i">
                <skeleton class="skeleton" width="50px" height="20px" borderRadius='5px'/>
            </span>
        </header>
        <div class="table-row">
            <span class="course-image course-image-skeleton">
                <skeleton class="skeleton" width="60px" height="60px" borderRadius='5px'/>
            </span>
            <span v-for="i in 4" :key="i">
                <skeleton class="skeleton" width="50px" height="15px" borderRadius='5px'/>
            </span>
        </div>
        <!-- <div class="table-row">
            <span class="course-image course-image-skeleton">
                <skeleton class="skeleton" width="60px" height="60px" borderRadius='5px'/>
            </span>
            <span v-for="i in 4" :key="i">
                <skeleton class="skeleton" width="50px" height="15px" borderRadius='5px'/>
            </span>
        </div> -->
        <footer>
            <hr>
             <skeleton class="skeleton" width="150px" height="30px" borderRadius='5px'/>
        </footer>
    </div>
</template>

<script>
import skeleton from '@/components/skeleton-components/skeletonCreator'
export default {
    components:{skeleton},
    
}
</script>
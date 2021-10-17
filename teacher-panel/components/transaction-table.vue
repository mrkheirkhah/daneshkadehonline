<template>
    <div class="table-row">
        <span class="course-owner">{{name}}</span>
        <span>{{course}}</span>
        <span class="persian-number">{{date}}</span>
        <span class="persian-number">{{time}}</span>
        <span class="persian-number">{{price}}</span>
    </div>
</template>

<script>
export default {
    name:'transaction-table',
    props:['name' , 'course' , 'date' , 'time' , 'price']
}
</script>
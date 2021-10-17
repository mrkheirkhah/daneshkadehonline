<template>
    <li class="discount-code-item">
        <p class="discount-code-title">
            عنوان کد تخفیف
        </p>
        <small class="discount-code-amount">50%</small>
        <p class="course-name">
            برای دوره خاص
        </p>
        <footer class="options">
        <p>
            <a href="#">حذف</a>
            /
            <a href="#">ویرایش</a>
            /
            <a href="#">نمایش</a>
        </p>
        </footer>
    </li>
</template>

<script>
export default {
    name:'discount-li',
    props:['discount-title' , 'course-name' , 'discount-amount']
}
</script>
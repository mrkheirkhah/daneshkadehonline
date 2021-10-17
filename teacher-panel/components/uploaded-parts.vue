<template>
    <div class="form-row">
        <div class="form-row-col">
            <div class="separator pseudo-form-input">
                <span>قسمت پنجم (نام فایل)</span>
                <span>
                    <button class="cover-btn delete" type="button">حذف</button>
                    <button class="cover-btn" type="button">مشاهده</button>
                </span>
            </div>
        </div>

        <label class="form-row-col guide-section">
            <label :for='`part-${part}-to-free`' class="checkbox-label">
                <span class="checkbox-container">
                    <input type="checkbox" name="" class="form-checkbox" :id='`part-${part}-to-free`'>
                    <img src="@/static/panel-teacher-icons/check-mark.svg" class="check-mark" alt="check-icon">
                </span>
                انتخاب بعنوان قسمت رایگان
            </label>
        </label>
    </div>
</template>

<script>
export default {
    name:'uploaded-parts',
    props:{
        name:{
            type: String,
            required:true
        },
        part:{
            type: String,
        }
    }
}
</script>
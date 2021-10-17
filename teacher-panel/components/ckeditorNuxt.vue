<template>
  <ckeditor
    :editor="editor"
    :value="value"
    :config="config"
    :tagName="tagName"
    :disabled="disabled"
    @input="(event) => $emit('input', event)"
  />
</template>
<script>
let classicEditor;
let CKEditor;

if (process.client) {
  classicEditor = require("~/plugins/ckeditor");
  classicEditor.defaultConfig = {
    toolbar: {
      items: [
        "heading",

        "|",
        "bold",
        "italic",
        "underline",
        "link",
        "bulletedList",
        "numberedList",
        "fontColor",
        "fontBackgroundColor",
        "fontFamily",
        "fontSize",
        "|",
        "outdent",
        "indent",
        "|",
        "uploadImage",
        "insertTable",
        "todoList",
        "highlight",
        "undo",
        "redo",
      ],
    },
    image: {
      toolbar: [
        "imageStyle:inline",
        "imageStyle:block",
        "imageStyle:side",
        "|",
        "toggleImageCaption",
        "imageTextAlternative",
      ],
    },
    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
    },
    // This value must be kept in sync with the language defined in webpack.config.js.
    language: "en",
  };
  CKEditor = require("@ckeditor/ckeditor5-vue2");
} else {
  CKEditor = { component: { template: "<div></div>" } };
}

export default {
  components: {
    ckeditor: CKEditor.component,
  },
  props: {
    value: {
      type: String,
      required: false,
    },
    tagName: {
      type: String,
      required: false,
      default: "div",
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    config: {
      type: Object,
      required: false,
      default: function () {},
    },
  },
  data() {
    return {
      editor: classicEditor,
    };
  },
};
</script>

<template>
  <div>
    <!-- 编辑器 样式 -->
    <link rel="stylesheet" href="/js/editor.md/css/editormd.min.css" />
    <!-- 编辑器 -->
    <div id="editorDom"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref,watch } from "vue";
import $scriptjs from "scriptjs/dist/script.js";

export default defineComponent({
  props:["value","content"],
  setup(props,{emit}) {
    const readOnly = ref(false);
    const editor:any=ref(null)
    const content=props.value
    async function reloadJs() {
      return new Promise((resolve: any) => {
        $scriptjs.path("/js/editor.md/");
        $scriptjs("jquery-3.5.1.js", function () {
          console.log("加载完成1");
          $scriptjs('lib/codemirror/codemirror.min.js', function () {
          //   $scriptjs('lib/codemirror/modes.min.js', function () {
          //     $scriptjs('lib/raphael.min.js', function () {
          //       $scriptjs('lib/underscore.min.js', function () {
          //         $scriptjs('lib/sequence-diagram.min.js', function () {
          //           $scriptjs('lib/flowchart.min.js', function () {
          //             $scriptjs('lib/jquery.flowchart.min.js', function () {

          $scriptjs("editormd.min.js", function () {
            resolve();
          });

          //           })
          //         })
          //       })
          //     })
          //   })
          // })
          })
        });
      });
    }
    watch(()=>props.value,(newVal)=>{
      newVal === editor.value.getMarkdown()|| editor.value.setMarkdown(newVal || '')
    },{deep:true})
    onMounted(() => {
      if ((window as any).editormd) {
        setEditorMd();
      } else {
        reloadJs().then(() => {
          setEditorMd();
        });
      }

      // setTimeout(() => {
      //   editor.value.setMarkdown("### 1111")
      //   console.log(editor.value.getMarkdown());
      //   console.log(editor.value.getPreviewedHTML());
        
      // }, 2000);
    });

    function setEditorMd() {
      let config:any = {
        width: "90%",
        height: 500,
        markdown: content,
        path: "/js/editor.md/lib/",
        saveHTMLToTextarea:true,
        //dialogLockScreen : false,   // 设置弹出层对话框不锁屏，全局通用，默认为 true
        //dialogShowMask : false,     // 设置弹出层对话框显示透明遮罩层，全局通用，默认为 true
        //dialogDraggable : false,    // 设置弹出层对话框不可拖动，全局通用，默认为 true
        //dialogMaskOpacity : 0.4,    // 设置透明遮罩层的透明度，全局通用，默认值为 0.1
        //dialogMaskBgColor : "#000", // 设置透明遮罩层的背景颜色，全局通用，默认为 #fff
        imageUpload: true,
        imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
        imageUploadURL: "blogApi/upload/mdimg",
        autoFocus : false,
        onchange:function() {
          let MarkdownContent=editor.value.getMarkdown()
          // console.log(editor.value.getPreviewedHTML());
          
          emit("update:value",MarkdownContent)
          emit("update:content",gethtml())
        },
        onload:function () {
          // editor.value.setValue(content)
        }
      };
      
       editor.value=(window as any).editormd("editorDom", config);
    }
    function gethtml() {
      return editor.value.getPreviewedHTML()
    }

    function setMarkdown(val:any) {
      editor.value.setMarkdown(val)
    }
    return {
      readOnly,
      gethtml,
    };
  },
});
</script>

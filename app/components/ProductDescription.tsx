'use client'
import { EditorContent, JSONContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"


export default function ProductDescription({content}: {content: JSONContent}) {
    const editor = useEditor({
        editable:false,
        extensions:[StarterKit],
        content:content,
        editorProps:{
            attributes:{
                class:'prose prose-sm sm:prose-base'
            }
        }
    })

    if(!editor){
        return null
    }

  return (
    <>
        <EditorContent editor={editor} />
    </>
  )
}

import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
/**
 * @description 富文本编辑器
 */
export default class richTextEdit extends Component {
  state = {
    editorState: EditorState.createEmpty()
  };
  constructor(props){
    super(props)
    const html = this.props.preDetail
    if(!html){return}
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
      };
    }
  }
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  getInputData=()=>{
    const { editorState } = this.state;
    return draftToHtml(convertToRaw(editorState.getCurrentContent()))
  }
  uploadImageCallBack = (file)=> {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/manage/img/upload');
        // xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
        const data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          const {status,data}=response
          if(status===0){
            resolve({data:{link:data.url}});
          }
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );
  }
  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          editorStyle={{border:"1px solid rgba(0, 0, 0, 0.65)",minHeight:'100px',lineHeight:'0.1rem',textIndent:'2rem'}}
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            // inline: { inDropdown: true },
            // list: { inDropdown: true },
            // textAlign: { inDropdown: true },
            // link: { inDropdown: true },
            // history: { inDropdown: true },
            image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
          }}
        />
      </div>
    );
  }
}
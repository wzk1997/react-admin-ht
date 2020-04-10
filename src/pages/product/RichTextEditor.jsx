import React, {Component} from 'react';
import {EditorState, convertToRaw, ContentState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import ProTypes from 'prop-types'
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


export default class RichTextEditor extends Component {
    static proTypes = {
        detail: ProTypes.string
    }
    state = {
        editorState: EditorState.createEmpty(),
    };

    constructor(props) {
        super(props);
        const html = this.detail;
        if (html) {
            const contentBlock = htmlToDraft(html);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                this.state = {
                    editorState,
                };
            }
        } else {
            this.state = {
                editorState: EditorState.createEmpty(),
            }
        }

    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };
    getDetail = () => {
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    }
    uploadImageCallBack = (file) => {
        return new Promise(
            (resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', '/manage/img/upload');
                const data = new FormData();
                data.append('image', file);
                xhr.send(data);
                xhr.addEventListener('load', () => {
                    const response = JSON.parse(xhr.responseText);
                    const url = response.data.url
                    resolve({data:{link:url}});
                });
                xhr.addEventListener('error', () => {
                    const error = JSON.parse(xhr.responseText);
                    reject(error);
                });
            }
        );
    }

    render() {
        const {editorState} = this.state;

        return (
            <Editor
                editorStyle={{border: '1px solid black', minHeight: 200, paddingLeft: 10}}
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={this.onEditorStateChange}
                toolbar={{
                    uploadCallback: this.uploadImageCallBack,
                    image: {uploadCallback: this.uploadImageCallBack, alt: {present: true, mandatory: true}},
                    inputAccept: 'image/git,image/jpeg,image/jpg,image/png,image/svg',
                    alt: {present: true,mandatory: true}
                }}

            />


        );
    }
}
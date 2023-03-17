import React from 'react';
import {PlainTextPlugin} from "@lexical/react/LexicalPlainTextPlugin";
import {ContentEditable} from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import {LexicalComposer} from "@lexical/react/LexicalComposer";

const LexicalEditorView = (props) => {

    return (
        <LexicalComposer initialConfig={props.initialConfig}>
            <div>
                <PlainTextPlugin
                    contentEditable={<ContentEditable />}
                    ErrorBoundary={LexicalErrorBoundary}
                />
            </div>
        </LexicalComposer>
    )
}

export default LexicalEditorView;

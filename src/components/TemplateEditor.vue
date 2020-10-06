<template>
    <article class="template-editor">
        <header>
            <h2 class="editor-heading">Twig Template editor</h2>
        </header>

        <section class="template-editor-body">
            <div class="template-editor-area template-editor-input-area">
        <textarea
                class="template-input"
                :template="template"
                v-model="template"
                placeholder="Start writing your template!"
        ></textarea>
            </div>
            <div class="template-editor-area template-editor-output-area" v-html="template"></div>
        </section>
    </article>
</template>

<script>
    import { TwingEnvironment, TwingLoaderArray } from "twing";
    export default {
        name: "TemplateEditor",
        props: {
            template: String
        },
        data() {
            return {

            };
        },

    }
</script>

<style scoped>
    .variables-heading {
        margin: 0 0 1rem;
    }
    .variable-count {
        margin-left: 0.5rem;
        padding: 0.125rem 0.5rem;
        background: #eee;
        border-radius: 4px;
        box-shadow: 0 1px 1px -1px rgba(0, 0, 0, 0.5);
    }
    .template-editor {
        max-width: 80vw;
        margin: 0 auto;
        border: 2px solid #eee;
        border-radius: 5px;
    }
    .variable-editor {
        text-align: left;
        padding: 1rem;
        border-top: 2px solid #eee;
    }
    .variables-container {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }
    .variable-field {
        display: inline-flex;
        margin: 0.25rem 0.25rem 0.25rem 0;
        padding: 0.5rem 0.5rem 0.5rem 1rem;
        border-radius: 3rem;
        background: #eee;
        box-shadow: 0 1px 1px -1px rgba(0, 0, 0, 0.5);
    }
    .variable-name {
        margin-right: 0.5rem;
        font-weight: bold;
    }
    .variable-value {
        color: #666;
        max-width: 15vw;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .remove-variable-button {
        -webkit-appearance: none;
        border: none;
        display: block;
        width: 1.2rem;
        height: 1.2rem;
        padding: 0;
        border-radius: 50%;
        margin-left: 1rem;
        background: transparent;
        transition: all 0.125s;
        text-align: center;
        line-height: 1;
    }
    .remove-variable-button:hover {
        cursor: pointer;
        background: rgba(0, 0, 0, 0.1);
    }
    .new-variable-field {
        display: inline-flex;
        align-items: center;
        margin: 0.25rem 0.25rem 0.25rem 0;
        padding: 0.25rem 0.35rem 0.25rem 1rem;
        border-radius: 3rem;
        background: #eee;
        box-shadow: 0 1px 1px -1px rgba(0, 0, 0, 0.5);
    }
    .new-variable-name,
    .new-variable-value {
        -webkit-appearance: none;
        border: none;
        background: transparent;
        outline: none;
    }
    .new-variable-name::-webkit-input-placeholder,
    .new-variable-value::-webkit-input-placeholder {
        text-shadow: 1px 1px rgba(255, 255, 255, 0.5);
    }
    .new-variable-name {
        font-weight: bold;
        color: #2c3e50;
        text-shadow: 1px 1px rgba(255, 255, 255, 0.5);
    }
    .new-variable-value {
        color: #666;
    }
    .add-variable-button {
        -webkit-appearance: none;
        border-radius: 2rem;
        border: none;
        padding: 0.35rem 1rem;
        color: #fff;
        background: #41b883;
        outline: none;
        box-shadow: 0 1px 1px -1px rgba(0, 0, 0, 0.5);
        text-shadow: -1px -1px rgba(0, 0, 0, 0.15);
        transition: all 0.125s;
    }
    .add-variable-button:hover,
    .add-variable-button:focus {
        background: #2d8b61;
        cursor: pointer;
    }
    .variable-name,
    .variable-value,
    .new-variable-name,
    .new-variable-value {
        font-size: 14px;
    }
    .template-editor-body {
        display: flex;
        align-items: stretch;
        border-top: 2px solid #eee;
    }
    .template-editor-area {
        display: flex;
        flex-direction: column;
        text-align: left;
        flex: 0 0 50%;
    }
    .template-editor-input-area {
        background: #f9f9f9;
        border-right: 2px solid #eee;
        border-bottom-left-radius: 5px;
    }
    .template-editor-output-area {
        padding: 1rem;
    }
    .template-editor-output-area:empty::after {
        content: "The rendered output will appear in here";
        color: #ddd;
        text-align: center;
        font-size: 14px;
        font-weight: thin;
    }
    .template-input {
        display: block;
        margin: 0;
        padding: 0.5rem;
        border: none;
        -webkit-appearance: none;
        background: transparent;
        resize: vertical;
        width: auto;
        min-height: 4rem;
        border-bottom-left-radius: 4px;
        transition: all 0.125s;
    }
    .template-input:focus {
        outline: none;
        box-shadow: 0 0 0 2px #6ad8a6;
    }
</style>
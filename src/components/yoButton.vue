/*
hello world.
*/
<template>
    <div>
        <button class="btn-style" @click=onConfirm>
            {{btnName}}
        </button>
    </div>
</template>
<script>
import {eventHub} from 'utils/eventHub'
    export default {
        name: 'yo-button',
        props: {
            btnName: {
                type: String,
                default: '确定'
            },

        },
        methods: {
            onConfirm: function() {
                console.log('ready to emit somthing..')
                // 废弃的用法，，
                // console.log(this)
                eventHub.$emit('toggle-result',{a:1})
            }
        }
    }
</script>
<style lang="less" scoped>
    @import '~less/variable';
    .btn-style {
        color: @register-bg;
        background-color: @title-color;
    }
</style>
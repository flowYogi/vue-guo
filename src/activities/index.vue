<template>
    <div>
        <span class="shit">
            {{shit}}
        </span>
        <yo-button :btn-name=shit @on-confirm=fn></yo-button>
        <div class="btn-style">   
            sfsdfsdfsdfsdfdfsd
        </div>
    </div>
</template>
<script>
// require.ensure('',function() {
//     const Button = require('Button')
// })
import {eventHub} from 'utils/eventHub';
import {yoButton} from 'components';
import {Popup} from 'vux';
// require.ensure(['utils/a','utils/b'],function (require){
//     const a = require('utils/a').default
//     const b = require('utils/b').default
//     console.log(a,b,'commonUtils')
// },'commonUtils')
import {b} from 'utils'
console.log(eventHub,'eventHub')
    export default {
        components: {
            yoButton
        },
        data () {
            return {
                shit: '123123'
            }
        },
        // events: {
        //     'toggle-result': (val) => {
        //         console.log(val,'toggle-result')
        //     }
        // },
        created: function (){ // events register center.
            eventHub.$on('toggle-result',function(val) {
                console.log(val,'toggle-result')
            })
        },
        methods: {
            fn: async function () {
                console.log('fn')
            }
        }
    }
</script>
<style lang="less" scoped>
    @import '~less/variable';
    .shit {
        color: @total-bg-color;
    }
</style>
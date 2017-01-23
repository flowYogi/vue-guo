import Vue from 'vue';
import App from './App';
// import Index from 'activities/index'; //no vux
//rq is done..
//router
const errLoading = function (err) {
    console.log(err)
}
System.import(`activities/${key}`).then(Module => {
  new Vue({
  el: '#app',
  render:  (h) => h(Module)
})
}).catch(errLoading)


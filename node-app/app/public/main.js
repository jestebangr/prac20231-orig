import { createApp, reactive, h, computed } from './vue.esm-browser.js'
const reactProps = reactive({
  movies: [],
  student: '',
  created: null
})

fetch("/api")
  .then(resp => resp.json())
  .then(json => {
    Object.assign(reactProps, json)
  })
  .catch( err => console.error('You need configure database parameters'))

const app = createApp(() => h({
  props: ['movies', 'student', 'created'],
  setup(props) {
    const title = 'ARSO 2023-1'
    const fmtCreated = computed( () =>  
      new Intl.DateTimeFormat('en-GB', { dateStyle: 'long', timeStyle: 'short'}).format(new Date(props.created))
    )
    return { title, fmtCreated }
  },
  template: '#main',
}, reactProps))

app.component('dbTable', {
  props: ['movies'],
  template: '#tbl-data',
})

app.component('filmCard', {
  props: ['movie'],
  template: '#film-card'
})

app.component('genRes',{
  props: ['genres'],
  template: '#gen-info'
})

app.component('box',{
  template: '#box'
})
app.mount('#app')
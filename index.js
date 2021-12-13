const App = {
    data() {
      return {
          url: 'https://highscore.everdragons.com/players.json',
          results: null
      }
    },
    mounted(){
        this.isLoaded();
    },
    watch: {
    },
    methods: {
        isLoaded(){
            axios.get(this.url)
                .then((response)=>{
                    this.results = response.data;
                })
                .catch((error)=>{this.OnError(error)});
        },
        formatScore(result){
            let timeB = this.formatTime(result.score);
            let timeA = this.formatTime(result.score + result.bonus);

            if(isNaN(result.bonus)){
                return `${timeB}`;
            }else{
                return `${timeA} (actual) - ${timeB} (bonused)`;
            }
        },
        formatTime(time){
            var minutes = Math.floor(time / 60);
            var seconds = time - minutes * 60;
            var hours = Math.floor(time / 3600);
            time = time - hours * 3600;
            var finalTime = this.str_pad_left(hours,'0',2)+':'+ this.str_pad_left(minutes,'0',2)+':'+ this.str_pad_left(seconds,'0',2);
            return finalTime;
        },
        str_pad_left(string,pad,length) {
            return (new Array(length+1).join(pad)+string).slice(-length);
        }
    }
  }
  
  Vue.createApp(App).mount('#app')
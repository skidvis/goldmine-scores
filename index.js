const App = {
    data() {
      return {
          url: 'https://highscore.everdragons.com/players.json',
          results: null, 
          datatable: null,
          timer: 10,
          isLoading: false, 
          goal: 0
      }
    },
    mounted(){
        this.isLoaded();
    },
    watch: {
    },
    methods: {
        isLoaded(){            
            this.getJson();
            this.countDown();
        },
        countDown(){
            if(this.isLoading === true) return;

            setTimeout(()=>{ 
                this.timer--;
                if(this.timer < 0){
                    this.getJson();
                    this.timer = 10;
                }

                this.countDown();
            }, 1000);
        },
        getJson(){
            this.isLoading = true;
            axios.get(this.url)
                .then((response)=>{
                    this.results = response.data;      
                    this.goal = Math.floor(this.results.length/2);
                    Vue.nextTick(()=>{
                        if(this.datatable === null) this.datatable = $(this.$refs.resultsTable).DataTable();
                        if(this.datatable !== null) this.datatable.draw();
                    });
                                  
                })
                .catch((error)=>{
                    console.log(error)
                })
                .finally(()=>{
                    this.isLoading = false;
                    //this.countDown();
                });
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
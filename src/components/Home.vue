<template>
  <div class="home">
    <div v-if="showLoading" class="bg-loading">
      <div class="loading-icon" v-if="loadingType === 1">
        <clip-loader :loading="showLoading" color="white" ></clip-loader>
      </div>
      <div class="loading-icon" v-if="loadingType === 2">
        <p>LOADING</p>
        <pulse-loader :loading="showLoading" color="white" size="5px"></pulse-loader>
      </div>
      <div class="loading-icon" v-if="loadingType === 3" style="width:15%; ">
        <b-progress style="width:100%; height: 8px;" :value="progressBar.value" :max="progressBar.max" animated></b-progress>
      </div>
      <div class="refresh-link">
        <a href="#"  @click="endTimer">Refresh here</a> , if website is not responsive 
      </div>
    </div>
    <div class="container">
      <b-container>
        <b-row style="margin-left: 61%;">
          <b-col cols="12 white" class="responsive-txt">
            <p class="txt-head1"><span style="background-color: crimson">  &nbsp; DISCOVERY &nbsp; </span> </p>
            <p class="txt-head1">NIGHT BANGKOK</p>
            <p class="txt-head2">The excited place that few people know</p>
            <button class="button-head" @click="startTimer">Where?</button>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <DialogTimer :visible="showTimer" @closeDialog="closeDialog" :time="time_sec" :type="loadingType"/>
  </div>
</template>
<script>
import { database } from "../firebase";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import moment from "moment";
import DialogTimer from "./DialogTimer";
export default {
  components: { ClipLoader, PulseLoader, DialogTimer },
  data() {
    return {
      timer: null,
      timeStart: {},
      timeEnd: {},
      showLoading: false,
      loadingType: 2,
      progressBar: {
        value: -15,
        max: 100,
        timer: null
      },
      showTimer: false,
      time_sec: null
    };
  },
  mounted() {
    if (this.$store.state.loadingType === 0) {
      this.$router.replace("/loading");
    } else {
      this.loadingType = this.$store.state.loadingType;
      console.log(this.$store.state.loadingType);

      this.progressBar.timer = setInterval(() => {
        if (this.progressBar.value >= 90) {
          clearInterval(this.timer);
        } else {
          this.progressBar.value += Math.random() * 10;
        }
      }, 200);
    }
  },
  methods: {
    startTimer() {
      setTimeout(() => {
        this.showLoading = true;
        this.progressBar = { value: -15, max: 100, timer: null };
      }, 400);
      let hour = new Date().getHours();
      let minute = new Date().getMinutes();
      let second = new Date().getSeconds();
      let milli = new Date().getMilliseconds();
      this.timeStart = { hour, minute, second, milli };
      console.log(hour + ":" + minute + ":" + second + ":" + milli);
    },
    endTimer() {
      this.progressBar = {
        value: -15,
        max: 100,
        timer: null
      };
      this.showLoading = false;
      let hour = new Date().getHours();
      let minute = new Date().getMinutes();
      let second = new Date().getSeconds();
      let milli = new Date().getMilliseconds();
      this.timeEnd = { hour, minute, second, milli };
      console.log(hour + ":" + minute + ":" + second + ":" + milli);
      let time = this.compareTime();
      time = time._data;
      const time_sec =
        time.hours * 3600 +
        time.minutes * 60 +
        time.seconds +
        time.milliseconds / 1000;
      this.time_sec = time_sec;
      console.log(time_sec);
      this.setData(this.loadingType, time_sec);
      this.showTimer = true;
    },
    compareTime() {
      var start = moment.duration({
        milliseconds: this.timeStart.milli,
        seconds: this.timeStart.second,
        minutes: this.timeStart.minute,
        hours: this.timeStart.hour
      });
      var end = moment.duration({
        milliseconds: this.timeEnd.milli,
        seconds: this.timeEnd.second,
        minutes: this.timeEnd.minute,
        hours: this.timeEnd.hour
      });
      return end.subtract(start);
    },
    closeDialog(visible) {
      this.showTimer = false;
    },
    async setData(loadingType, time_sec) {
      let update = await database
        .collection("timer")
        .doc()
        .set({ timer: time_sec, type: loadingType });
    }
  }
};
</script>

<style>
.home{
  background-image:  url("https://i.imgur.com/ejnssUC.png");
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: 0 -180px;
  height:100vh;
  position: relative;
}
.bg-loading{
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgb(10, 10, 10);
  opacity: 0.7;
  z-index: 2;
}
.loading-icon{
  display: flex;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: white;
}
.refresh-link{
  position: absolute;
  left: 50%;
  top: 95%;
  transform: translate(-50%, -50%);
  color: white;
  z-index: 50;

}
.container{
  overflow: hidden;
  padding-top: 10%;
  width: 100%
}
.txt-head1{
  font-weight: 900;
  font-size: 50px;
  margin: 0px;
  color: aliceblue;
  animation: moveToRight 0.7s ease-out;
}
.txt-head2{
  font-weight: 600;
  font-size: 1.2rem;
  color: aliceblue;
  animation: moveToLeft 0.7s ease-out;

}
@keyframes moveToRight{
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);

  }
}
@keyframes moveToLeft {
  0% {
    opacity: 0;
    transform: translateX(100px);
  }
  100% {
    opacity: 1;
    transform: translate(0);
  }
}
.button-head{
  text-decoration: none;
  font-weight: 600;
  margin-top:30px;
  color: #ea2427;
  background-color: white;
  border: none;
  padding : 8px 30px;
  border-radius: 20px;
  transition: 300ms
}
button.button-head:hover{
  transform: translateY(-3px);
}
button.button-head:active{
  transform: translateY(-1px);
}
button.button-head:focus{
  outline: none;
}
</style>
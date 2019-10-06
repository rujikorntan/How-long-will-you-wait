<template>
  <div class="result">
    <p class="header-text">Result</p>

<b-container class="bv-example-row2">
  <b-row>
    <b-col style="background-color: white"></b-col>
    <b-col><clip-loader :loading="true" color="black" ></clip-loader></b-col>
    <b-col>
      <div style="display: flex; justify-content: center;">
        <p>LOADING</p>
        <pulse-loader :loading="true" color="black" size="5px"></pulse-loader>
      </div>
    </b-col>
    <b-col>
      <div style="display: grid; align-items: center;">
        <b-progress style="width:100%; height: 8px;" :value="95" :max="100" animated></b-progress>
      </div>
    </b-col>
  </b-row>

  <b-row class="display-txt">
    <b-col>Participants</b-col>
    <b-col>{{mean[0].count}}</b-col>
    <b-col>{{mean[1].count}}</b-col>
    <b-col>{{mean[2].count}}</b-col>
  </b-row>

  <b-row class="display-txt">
    <b-col>Average Wait Time</b-col>
    <b-col>{{mean[0].mean}}</b-col>
    <b-col>{{mean[1].mean}}</b-col>
    <b-col>{{mean[2].mean}}</b-col>
  </b-row>
</b-container>

    
    <hr/>
    <el-table :data="result" class="result-table">
      <el-table-column prop="type" label="Loading type" width="180"></el-table-column>
      <el-table-column prop="timer" label="Total wait time(sec)" width="180"></el-table-column>
    </el-table>


  </div>
</template>

<script>
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { database } from "../firebase";

export default {
  components: { ClipLoader, PulseLoader },
  data() {
    return {
      result: null,
      mean: null
    };
  },
  async mounted() {
    this.result = await this.getData("timer");
    this.mean = await this.computeMean(this.result);
  },
  methods: {
    async getData(collection, field = null) {
      let docRef = await database.collection(collection);
      let doc = await docRef.get();
      return (
        (await doc) &&
        doc.docs.map(doc => (field ? doc.data()[field] : doc.data()))
      );
    },
    computeMean(results) {
      let allType = {
        1: { totalTime: 0, count: 0 },
        2: { totalTime: 0, count: 0 },
        3: { totalTime: 0, count: 0 }
      };
      results.forEach(e => {
        allType[e.type]["totalTime"] += e.timer;
        allType[e.type]["count"] += 1;
      });
      allType[1]["mean"] =
        allType[1]["count"] !== 0
          ? allType[1]["totalTime"] / allType[1]["count"]
          : 0;
      allType[2]["mean"] =
        allType[2]["count"] !== 0
          ? allType[2]["totalTime"] / allType[2]["count"]
          : 0;
      allType[3]["mean"] =
        allType[3]["count"] !== 0
          ? allType[3]["totalTime"] / allType[3]["count"]
          : 0;

      return [allType[1], allType[2], allType[3]];
    }
  }
};
</script>
<style scoped>
.result{
  text-align: center;
}
.result-table{
  width: 380px;
  margin: 60px auto;
}
.header-text{
  text-align: center;
  font-weight: 900;
  font-size: 50px;
  margin: 0px;
  margin-top: 40px;
}
.col {
  margin: 3px;
  background-color: rgb(236, 236, 236);
  display: grid;
  padding: 15px;
}
.display-txt{
  font-size: 20px;
}
.bv-example-row2{
  padding-top: 5%;
  padding-bottom: 5%
}
</style>
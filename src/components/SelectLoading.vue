<template>
  <div class="select-dialog">
    <p class="header-text">SELECT LOADING</p>
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <div :class="[{ active: isActive['1'] }, 'loading-card']" @click="selectType(1)">
            <clip-loader :loading="true" color="black" ></clip-loader>
          </div>
        </b-col>
        <b-col>
          <div :class="[{ active: isActive['2'] }, 'loading-card']" @click="selectType(2)">
            <div style="display: flex">
              <p>LOADING</p>
              <pulse-loader :loading="true" color="black" size="5px"></pulse-loader>
            </div>
          </div>
        </b-col>
        <b-col>
          <div :class="[{ active: isActive['3'] }, 'loading-card']" @click="selectType(3)">
            <div style="width:55%; ">
              <b-progress style="width:100%; height: 8px;" :value="95" :max="100" animated></b-progress>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <button class="button-go-home" @click="goHome">Select</button>
  </div>
</template>

<script>
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
export default {
  components: { ClipLoader, PulseLoader },
  data() {
    return {
      isActive: {
        1: false,
        2: false,
        3: false
      }
    };
  },
  mounted() {
    this.$store.commit("setLoadingType", 0);
  },
  methods: {
    goHome() {
      if (this.$store.state.loadingType !== 0) {
        this.$router.replace("/");
      }
    },
    selectType(type) {
      this.$store.commit("setLoadingType", type);
      console.log(this.$store.state.loadingType);
      this.isActive[1] = false;
      this.isActive[2] = false;
      this.isActive[3] = false;
      this.isActive[type] = true;
    }
  }
};
</script>

<style scoped>
.select-dialog{
  text-align: center;
}
.bv-example-row{
  padding-bottom: 50px;
  padding-top: 5%;
}
.loading-card{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background-color: rgb(247, 247, 247);
  border-radius: 20px;
  cursor: pointer;
  transition: 300ms;
  box-shadow: 2px 4px 8px 0 rgba(0, 0, 0, 0.2);
}
.loading-card:hover{
  transform: translateY(-10px);
  box-shadow: 2px 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.header-text{
  text-align: center;
  font-weight: 900;
  font-size: 50px;
  margin: 0px;
  margin-top: 40px;
}
.button-go-home{
  text-decoration: none;
  font-weight: 600;
  margin-top:30px;
  color: white;
  background-color: rgb(0, 101, 0);
  border: none;
  padding : 8px 30px;
  border-radius: 20px;
  transition: 300ms
}
.active{
  border: 4px solid green;
  /* transform: translateY(-10px); */
  box-shadow: 2px 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
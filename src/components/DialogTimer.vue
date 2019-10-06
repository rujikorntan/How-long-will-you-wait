<template>
  <div id="dialog-timer">
    <el-dialog title="How Long Will You Wait?" :visible="visible" width="30%" @close="closeDialog">
      <p>Wait time : {{time}} sec.</p>
      <p>Loading type : {{type}} ({{type === 1 ? "spinner": type === 2 ? "text" : "progress bar"}})</p>

      <div class="show-loading">
        <div v-if="type === 1">
          <clip-loader :loading="true" color="black" ></clip-loader>
        </div>
        <div v-if="type === 2" style="display: flex">
          <p>LOADING</p>
          <pulse-loader :loading="true" color="black" size="5px"></pulse-loader>
        </div>
        <div v-if="type === 3" style="width:55%; ">
          <b-progress style="width:100%; height: 8px;" :value="95" :max="100" animated></b-progress>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">Cancel</el-button>
        <el-button type="primary" @click="closeDialog">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
export default {
  components: { ClipLoader, PulseLoader },
  props: ["visible", "time", "type"],
  data() {
    return {
      dialogVisible: false
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog", false);
    }
  }
};
</script>

<style>
#dialog-timer .el-dialog__header{
  text-align: center;
  font-weight: bold;
}
#dialog-timer .el-dialog__body{
  padding: 30px 60px;
}
#dialog-timer .show-loading{
  display: flex;
  justify-content: center;
}
</style>
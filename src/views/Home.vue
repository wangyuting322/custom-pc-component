<script>
import CustomDialog from "@/components/customDialog/CustomDialog.vue";

export default {
  name: "Home",
  components: {
    CustomDialog
  },
  data() {
    return {};
  },
  methods: {
    showDialog() {
      this.$customDialog(
        "标题",
        this.renderContent,
        this.handleOk,
        this.handleCancel
      );
    },
    handleOk(value) {
      return new Promise((resolve, reject) => {
        resolve(1);
      });
    },
    handleCancel(value) {
      return new Promise((resolve, reject) => {
        resolve(1);
      });
    },
    renderContent() {
      return (
        <div>
          fsdfdgfdneir内容
          <button
            onClick={() => {
              alert("55");
            }}
          >
            dd
          </button>
        </div>
      );
    }
  },
  mounted() {},
  render() {
    return (
      <div>
        <button onClick={this.showDialog}>dd</button>
      </div>
    );
  }
};
</script>

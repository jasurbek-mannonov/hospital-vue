<!-- <template>
  <form @submit.prevent="handleFormSubmit">
    <div>
      <label>
        User ID
        <input v-model="post.userId" />
      </label>
    </div>
    <div>
      <label>
        Title
        <input v-model="post.title" />
      </label>
    </div>
    <div>
      <label>
        Body
        <textarea v-model="post.body" />
      </label>
    </div>
    <button type="submit">Submit</button>
  </form>
</template>

<script>
export default {
  name: "CreatePostPage",
  data: () => ({
    post: {
      userId: "",
      title: "",
      body: "",
    },
  }),
  methods: {
    async handleFormSubmit() {
      try {
        await this.$store.dispatch("posts/createPost", this.post);
        this.$router.push("/posts");
      } catch (e) {}
    },
  },
};
</script>

<style scoped lang="scss">
input,
textarea,
button {
  border: 1px solid grey;
  padding: 5px 10px;
}

button {
  background-color: lightblue;
}

form > div {
  margin-bottom: 20px;
}
</style> -->

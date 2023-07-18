<!-- <template>
  <h2>Long posts</h2>
  <pre>
    {{ $store.getters['posts/longPosts'].length }}
  </pre>
  <hr/>

  <h2>Short posts</h2>
  <pre>
    {{ $store.getters['posts/shortPosts'].length }}
  </pre>

  <hr/>

  <h2>All posts</h2>
  <pre>
    {{ $store.getters['posts/allPosts'].length }}
  </pre>
</template>

<script>
export default {
  name: "PostsPage",
  mounted() {
    this.$store.dispatch('posts/getPosts')
  }
}
</script> -->
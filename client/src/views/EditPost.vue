<template>
  <v-container>
    <v-row no-gutters>
      <v-col sm='10' class="mx-auto">
        <v-card class="pa-5">
          <v-card-title>Edit Post</v-card-title>
          <v-divider></v-divider>
          <v-form ref="form" @submit.prevent="updateForm" class="pa-5" enctype="mutipart/form-data">
            <v-text-field label="Title" v-model="post.title" prepend-icon="mdi-note" :rules="rules"></v-text-field>
            <v-text-field label="Category" v-model="post.category" prepend-icon="mdi-view-list" :rules="rules"></v-text-field>
            <v-textarea label="Content" v-model="post.content" prepend-icon="mdi-note-plus" :rules="rules"></v-textarea>
            <v-row sm='3'>
              <v-col sm='3'>
                <v-file-input @change='selectFile' :rules="rules" show-size counter multiple label="Select Image"></v-file-input>
              </v-col>
              <v-col sm='3'>
                <v-img :src="`/img/${post.image}`" width=120></v-img>
              </v-col>
              <v-btn type="submit" class="mt-10 ml-auto" color="success"> Update Post </v-btn>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import API from '../api'
export default {
  data(){
    return{
      rules: [(value) => !!value || "This field is required"],
      post: {
        title: '',
        category: '',
        content: '',
        image: ''
      },
      image: ''
    }
  },
  async created(){
      const response = await API.getPostById(this.$route.params.id)
      this.post = response
  },
  methods:{
    selectFile(file){
      this.image = file[0]
    },
    async updateForm(){
      const formData = new FormData()
      formData.append('image', this.image)
      formData.append('title', this.post.title)
      formData.append('category', this.post.category)
      formData.append('content', this.post.content)
      formData.append('oldImage', this.post.image)
      if(this.$refs.form.validate()){
        const response = await API.updatePost(this.$route.params.id, formData)
        this.$router.push({name: 'Home', params: {message_update: response.message}})
      }
    }
  }
}
</script>
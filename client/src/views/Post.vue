<template>
    <v-container>
        <v-row>
            <v-col sm='10' class="pa-4 mx-auto">
                <v-card class="pa-2">
                    <v-img :src="`/img/${post.image}`"></v-img>
                    <v-card-actions class="pb-0">
                        <v-row class="mt-1 mx-1">
                            <v-col sm='2'>
                                <v-btn small outlined color='primary'>
                                    {{post.category}}
                                </v-btn>
                            </v-col>
                            <v-col sm='10' class="d-flex justify-end">
                                <v-btn color='success' text :to="{name: 'edit-post', params: {id: post._id}}">Edit</v-btn>
                                <v-btn color='red' text @click="removePost(post._id)">Delete</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                    <v-card-subtitle class="headline">
                        <h3>{{ post.title }}</h3>
                    </v-card-subtitle>
                    <v-card-text class="gray-text">
                        <p>{{post.content}}</p>
                        <p>{{moment(post.created).calendar() }}</p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>       
</template>

<script>
import API from "../api"
import moment from 'moment'

export default {
    name: 'Post',
    data(){
        return {
            post: {}
        }
    },
    async created(){
        const response = await API.getPostById(this.$route.params.id)
        this.post = response
    },
    methods: {
	  moment,
      async removePost(id){
          const response = await API.deletePost(id)
          this.$router.push({name: 'Home', params:{message_delete: response.message}})
      }
	}  
}
</script>
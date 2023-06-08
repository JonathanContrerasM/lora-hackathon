<template>
  <div class="whoElse-profile">
    <div class="header-button-container">
      <h2>Full Scrape</h2>
      <button class="custom-button" @click="sendRequest" :disabled="isButtonClicked">Send Request</button>
    </div>
    <div v-if="isDataLoaded">
      <div class="profile-card" v-for="(profile, index) in data.slice(0, 10)" :key="index">
        <img :src="profile.ImageLink" alt="Profile Image" class="profile-image">
        <h3>{{ profile.Name }}</h3>
        <p><strong>Collaborations:</strong> {{ profile.Collaborations }}</p>
        <p><strong>GitHub Match:</strong> {{ profile.GitHub_Match }}</p>
        <p><strong>Institution:</strong> {{ profile.Institution }}</p>
        <p><strong>Iteration:</strong> {{ profile.Iteration }}</p>
        <p><strong>Mention Count:</strong> {{ profile.MentionCount }}</p>
        <p><strong>Match Score:</strong> {{ profile.match_score }}</p>
      </div>
    </div>
    <div v-else-if="isButtonClicked" class="loading-text">
      <p>Loading data... This is might take up to 15 Minutes</p>
    </div>
  </div>
</template>





<script>
import axios from 'axios';

export default {
  data() {
    return {
      data: null,
      isDataLoaded: false,
      isButtonClicked: false,
    };
  },

  methods: {
    sendRequest() {
      const inputData = {
        name: 'Alberto Huertas',
        key_company: 'Armasuisse'
      };
      this.isButtonClicked = true; // Set flag to true when button is clicked

      axios.post('http://localhost:5001/full', inputData)
          .then(response => {
            // Set the fetched data and update the flag
            this.data = response.data.result;
            this.isDataLoaded = true;
          })
          .catch(error => {
            // Handle any errors
            console.error(error);
          });
    },
  }
}
</script>



<style>

.whoElse-profile {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-family: Arial, sans-serif;
  margin-bottom: 4em;
}

.header-button-container {
  display: flex;
  align-items: baseline; /* Adjust the alignment to "baseline" */
  justify-content: space-between;
}

.custom-button {
  padding: 5px 10px; /* Adjust the padding as needed */
  font-size: 14px; /* Adjust the font size as needed */
  width: 120px;
}

.whoElse-profile h2 {
  font-size: 24px;
  margin-top: 0;
}

.whoElse-profile h3 {
  font-size: 20px;
  margin-bottom: 10px;
  margin-top: 5px;
}

.whoElse-profile p {
  margin: 0;
  font-size: 16px;
}

.whoElse-profile strong {
  font-weight: bold;
}

 .profile-card {
   display: flex;
   flex-direction: column;
   align-items: center;
   padding: 20px;
   border: none !important; /* Remove the border */
   margin: 20px 0;
   background-color: #0b273d;
   border-radius: 15px;
   box-shadow: 0 4px 8px 0 rgba(45, 4, 4, 0.2);
 }

.profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1em;
}

.loading-text {
  font-size: 1.2em;
  font-weight: bold;
  color: #3498db;
}
</style>




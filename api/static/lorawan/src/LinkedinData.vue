<template>
  <div class="linkedin-profile">
    <div class="header-button-container">
      <h2>Scrape LinkedIn</h2>
      <button class="custom-button" @click="sendRequest" :disabled="isDataLoaded">Send Request</button>
    </div>
    <div v-if="isDataLoaded">
      <h2>{{ data.full_name }}</h2>
      <div v-if="data.occupation">
        <p><strong>Occupation:</strong> {{ data.occupation }}</p>
      </div>
      <div v-if="data.headline">
        <p><strong>Headline:</strong> {{ data.headline }}</p>
      </div>
      <div v-if="data.country_full_name">
        <p><strong>Country:</strong> {{ data.country_full_name }}</p>
      </div>
      <div v-if="data.experiences">
        <h3>Experiences</h3>
        <div class="experience" v-for="exp in data.experiences" :key="exp.company">
          <div class="experience-title" v-if="exp.title">
            <p><strong>Title:</strong> {{ exp.title }}</p>
          </div>
          <div class="experience-company" v-if="exp.company">
            <p><strong>Company:</strong> {{ exp.company }}</p>
          </div>
          <div class="experience-description" v-if="exp.description">
            <p><strong>Description:</strong> {{ exp.description }}</p>
          </div>
        </div>
      </div>
      <div v-if="data.education">
        <h3>Education</h3>
        <div class="education" v-for="edu in data.education" :key="edu.school">
          <div class="education-field" v-if="edu.field_of_study">
            <p><strong>Field of Study:</strong> {{ edu.field_of_study }}</p>
          </div>
          <div class="education-degree" v-if="edu.degree_name">
            <p><strong>Degree Name:</strong> {{ edu.degree_name }}</p>
          </div>
          <div class="education-school" v-if="edu.school">
            <p><strong>School:</strong> {{ edu.school }}</p>
          </div>
          <div class="education-time" v-if="edu.starts_at && edu.ends_at">
            <p><strong>Time period:</strong> {{ formatDate(edu.starts_at) }} - {{ formatDate(edu.ends_at) }}
            </p>
          </div>
        </div>
      </div>
      <div>
        <button @click="toggleAccordion">Show Publications</button>
        <div v-if="isAccordionOpen && data.accomplishment_publications">
          <h3>Publications</h3>
          <div class="publications" v-for="pub in data.accomplishment_publications" :key="pub.url">
            <div v-if="pub.name">
              <p><strong>Name:</strong> {{ pub.name }}</p>
            </div>
            <div v-if="pub.publisher">
              <p><strong>Publisher:</strong> {{ pub.publisher }}</p>
            </div>
            <div v-if="pub.published_on">
              <p><strong>Published on:</strong> {{ formatDate(pub.published_on) }}</p>
            </div>
            <div v-if="pub.url">
              <p><strong>URL:</strong> <a :href="pub.url">{{ pub.url }}</a></p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="data.languages">
        <h3>Languages</h3>
        <ul>
          <li class="language" v-for="lang in data.languages" v-bind:key="lang">{{ lang }}</li>
        </ul>
      </div>
    </div>
    <div v-else>
      <p v-if="!isButtonClicked"></p> <!-- Empty space -->
      <p v-else>Loading...</p> <!-- Display "Loading..." after button click -->
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {

  methods: {
    sendRequest() {
      const inputData = {
        name: 'Alberto Huertas' // Replace with your input field value
      };
      this.isButtonClicked = true; // Set flag to true when button is clicked

      axios.post('http://localhost:5001/linkedIn', inputData)
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
    toggleAccordion() {
      this.isAccordionOpen = !this.isAccordionOpen;
    },
    formatDate(date) {
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return `${monthNames[date.month - 1]} ${date.year}`;
    }
  },

  data() {
    return {
      isAccordionOpen: false,
      data: null,
      isDataLoaded: false,
      isButtonClicked: false,
    };
  },

}
</script>


<style>
.linkedin-profile {
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

.linkedin-profile h2 {
  font-size: 24px;
  margin-top: 0;
}

.linkedin-profile h3 {
  font-size: 20px;
  margin-bottom: 10px;
  margin-top: 5px;
}

.linkedin-profile p {
  margin: 0;
  font-size: 16px;
}

.linkedin-profile strong {
  font-weight: bold;
}

.linkedin-profile .experience,
.linkedin-profile .education {
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 20px;
}

.linkedin-profile .experience-title,
.linkedin-profile .education-field {
  margin-top: 10px;
}

.linkedin-profile .experience-company,
.linkedin-profile .education-school {
  margin-top: 5px;
  font-style: italic;
  color: #555;
}

.linkedin-profile .experience-description {
  margin-top: 5px;
}

.publications {
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: transparent !important; /* Set the background color to transparent */
  border: none !important; /* Remove the border */
}


.linkedin-profile .language {
  margin-bottom: 5px;
  list-style: none;
  font-style: italic;
  color: #a1a1a1;
  font-size: 16px;

}

</style>
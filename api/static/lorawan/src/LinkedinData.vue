<template>
  <div class="linkedin-profile">
    <div class="header-button-container">
      <h2>Scrape LinkedIn</h2>
      <div class="input-button-wrapper">
        <input type="text" class="input-field" v-model="inputName" placeholder="Type a name here">
        <button class="custom-button" @click="sendRequest" :disabled="!inputName || isDataLoaded">Send Request</button>
      </div>
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
        <div class="experience" v-for="(exp, index) in data.experiences" :key="exp.company">
          <div class="experience-title" v-if="exp.title">
            <p><strong>Title:</strong> {{ exp.title }}</p>
          </div>
          <div class="experience-company"
               :class="{ 'highlight': !firstExperienceHighlighted && exp.company && index === 0 }"
               v-if="exp.company">
            <p><strong>Company:</strong> {{ exp.company }}</p>
            <template v-if="index === 0">
              <div @once="firstExperienceHighlighted = true"></div>
            </template>
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
    <div v-else class="loading-spinner">
      <p v-if="!isButtonClicked" class="empty-space"></p>
      <p v-else class="spinner"></p>
    </div>
    <CompanyProfile :linkedInName="inputName" :linkedInCompany="highlightedCompany" />

  </div>
</template>
<script>
import axios from 'axios';
import CompanyProfile from './CompanyData.vue';
export default {
  components: {
    CompanyProfile,
  },
  methods: {
    sendRequest() {
      this.isButtonClicked = true;

      axios.post('http://localhost:5001/linkedIn', { name: this.inputName })
          .then(response => {
            this.data = response.data.result;
            this.isDataLoaded = true;
            if (this.data.experiences && this.data.experiences.length > 0) {
              // Update highlightedCompany with the first company
              this.highlightedCompany = this.data.experiences[0].company;
            }
          })
          .catch(error => {
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
      inputName: 'Alberto Huertas', // This is the default value
      isAccordionOpen: false,
      data: null,
      isDataLoaded: false,
      isButtonClicked: false,
      firstExperienceHighlighted: false,
      highlightedCompany: '', // This will hold the first company name from LinkedIn experiences
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
  align-items: center;
  justify-content: space-between;
}

.custom-button {
  padding: 5px 10px; /* Adjust the padding as needed */
  font-size: 14px; /* Adjust the font size as needed */
  width: 120px;
}

.input-field {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 60%; /* You may adjust this value as needed */
  margin-right: 10px;
  font-size: 14px;
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

.experience-company.highlight {
  background-color: #c93535; /* Light grey background */
  color: #343a40; /* Dark grey font color */
  padding: 5px;
  border-radius: 5px;
}

.input-button-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.linkedin-profile .language {
  margin-bottom: 5px;
  list-style: none;
  font-style: italic;
  color: #a1a1a1;
  font-size: 16px;
}

.loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>
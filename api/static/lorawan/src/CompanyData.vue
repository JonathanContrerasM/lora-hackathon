<template>
  <div class="company-profile">
    <div class="header-button-container">
      <h2>Load Company Profile</h2>
      <button class="custom-button" @click="sendRequest" :disabled="isButtonClicked">Send Request</button>
    </div>

    <div v-if="isButtonClicked && !isDataLoaded">Loading...</div>

    <div v-if="isDataLoaded && data">
      <p><strong>Name:</strong> {{ data.Name }}</p>
      <p><strong>Email:</strong> {{ data.Email }}</p>
      <p><strong>Phone:</strong> {{ data.Phone }}</p>
      <p><strong>Fax:</strong> {{ data.Fax }}</p>

      <h3>Projects</h3>
      <div class="project" v-for="project in data.Projects" :key="project['Project Name']">
        <h4>{{ project['Project Name'] }}</h4>
        <div class="general-info">
          <p><strong>Project Duration:</strong> {{ project['General Information']['Project Duration'] }}</p>
          <p><strong>Reference:</strong> {{ project['General Information'].Reference }}</p>
          <p><strong>Source of Funding:</strong> {{ project['General Information']['Source of funding'] }}</p>
        </div>
        <div class="partners">
          <p><strong>Project Partners:</strong></p>
          <ul>
            <li v-for="partner in project['Project Partners']" :key="partner">{{ partner }}</li>
          </ul>
        </div>
        <div class="personnel">
          <p><strong>UZH Personnel:</strong></p>
          <ul>
            <li v-for="person in project['UZH Personnel']" :key="person">{{ person }}</li>
          </ul>
        </div>
      </div>

      <h3>Research Interests</h3>
      <ul>
        <li v-for="interest in data['Research Interests']" :key="interest">{{ interest }}</li>
      </ul>

      <h3>Short Bio</h3>
      <p>{{ data['Short Bio'] }}</p>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: 'CompanyProfile',
  methods: {
    sendRequest() {
      const inputData = {
        name: 'Alberto Huertas',
        company: 'University of Zurich'
      };
      this.isButtonClicked = true; // Set flag to true when button is clicked

      axios.post('http://localhost:5001/company', inputData)
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
  },

  data() {
    return {
      data: null,
      isDataLoaded: false,
      isButtonClicked: false,
    };
  }
}
</script>


<style>
.company-profile {
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

.company-profile h2 {
  font-size: 24px;
  margin-top: 0;
}

.company-profile h3 {
  font-size: 20px;
  margin-bottom: 10px;
  margin-top: 5px;
}

.company-profile p {
  margin: 0;
  font-size: 16px;
}

.company-profile strong {
  font-weight: bold;
}


</style>
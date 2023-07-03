<template>
  <div class="whoElse-profile">
    <div class="header-button-container">
      <h2>Full Scrape</h2>
      <button class="custom-button" @click="sendRequest" :disabled="isButtonClicked">Send Request</button>
    </div>

    <div class="weight-sliders">
      <div class="weight-slider">
        <label for="collab-exists-weight">Collab Exists Weight: {{ collabExistsWeight }}</label>
        <input id="collab-exists-weight" type="range" v-model.number="collabExistsWeight" min="0" max="5" step="0.01"/>
      </div>

      <div class="weight-slider">
        <label for="collab-count-weight">Collab Count Weight: {{ collabCountWeight }}</label>
        <input id="collab-count-weight" type="range" v-model.number="collabCountWeight" min="0" max="5" step="0.01"/>
      </div>

      <div class="weight-slider">
        <label for="mention-exists-weight">Mention Exists Weight: {{ mentionExistsWeight }}</label>
        <input id="mention-exists-weight" type="range" v-model.number="mentionExistsWeight" min="0" max="5"
               step="0.01"/>
      </div>

      <div class="weight-slider">
        <label for="mention-count-weight">Mention Count Weight: {{ mentionCountWeight }}</label>
        <input id="mention-count-weight" type="range" v-model.number="mentionCountWeight" min="0" max="5" step="0.01"/>
      </div>

      <div class="weight-slider">
        <label for="institution-match-weight">Institution Match Weight: {{ institutionMatchWeight }}</label>
        <input id="institution-match-weight" type="range" v-model.number="institutionMatchWeight" min="0" max="5"
               step="0.01"/>
      </div>

      <div class="weight-slider">
        <label for="github-match-weight">Github Match Weight: {{ githubMatchWeight }}</label>
        <input id="github-match-weight" type="range" v-model.number="githubMatchWeight" min="0" max="5" step="0.01"/>
      </div>

      <div class="weight-slider">
        <label for="publication-electosense-weight">Publication ElectoSense Weight: {{
            publicationElectoSenseWeight
          }}</label>
        <input id="publication-electosense-weight" type="range" v-model.number="publicationElectoSenseWeight" min="0"
               max="5" step="0.01"/>
      </div>

      <button @click="calculateMatchScores" :disabled="!data">Recalculate</button>
    </div>
    <div class="match-score-summary" v-if="data">
      <h3>Match Score Summary:</h3>
      <div v-for="(count, range) in matchScoreSummary" :key="range">
        <strong>{{ range }}:</strong> {{ count }}
      </div>
    </div>
    <div v-if="isDataLoaded">
      <div class="profile-card" v-for="(profile, index) in data" :key="index">
        <img :src="profile.ImageLink || defaultImage" alt="Profile Image" class="profile-image">
        <h3>{{ profile.Name }}</h3>
        <p><strong>Collaborations:</strong> {{ profile.Collaborations }}</p>
        <p><strong>GitHub Match:</strong> {{ profile.GitHub_Match }}</p>
        <p><strong>Institution:</strong> {{ profile.Institution }}</p>
        <p><strong>Iteration:</strong> {{ profile.Iteration }}</p>
        <p><strong>Mention Count:</strong> {{ profile.MentionCount }}</p>
        <p><strong>Match Score:{{ profile.match_score }} </strong> </p>
      </div>
    </div>

    <div v-else-if="isButtonClicked" class="loading-container">
      <div class="loading-spinner"></div>
      <div class="spinner"></div>
      <div class="loading-text">
        <p>Loading data... This might take up to 15 minutes</p>
        <p>Time passed: {{ Math.floor(timePassed / 60) }} minutes and {{ timePassed % 60 }} seconds</p>
      </div>
    </div>

  </div>
</template>


<script>
import axios from 'axios';
import _cloneDeep from 'lodash/cloneDeep';
import default_img from '../public/Avatar.png'

export default {
  data() {
    return {
      originalData: null, // Store the original data here
      data: null, // This will be a clone of the original data, used for display
      isDataLoaded: false,
      isButtonClicked: false,
      timePassed: 0,
      timer: null,
      defaultImage: default_img,
      collabExistsWeight: 3.9,
      collabCountWeight: 0.85,
      mentionExistsWeight: 1.16,
      mentionCountWeight: 0.48,
      institutionMatchWeight: 1.79,
      githubMatchWeight: 1.21,
      publicationElectoSenseWeight: 0.88,
    };
  },
  computed: {
    matchScoreSummary() {
      if (!this.data) return [];

      const minScore = Math.min(...this.data.map(profile => profile.match_score));
      const maxScore = Math.max(...this.data.map(profile => profile.match_score));
      const interval = (maxScore - minScore) / 6;

      const ranges = Array.from({ length: 6 }, (v, i) => {
        const lowerBound = minScore + i * interval;
        const upperBound = lowerBound + interval;
        return {
          range: `${lowerBound.toFixed(2)} - ${upperBound.toFixed(2)}`,
          count: 0,
        };
      });

      this.data.forEach(profile => {
        for (let i = 0; i < ranges.length; i++) {
          const { range } = ranges[i];
          const [lowerBound, upperBound] = range.split(' - ').map(Number);
          if (profile.match_score >= lowerBound && profile.match_score <= upperBound) {
            ranges[i].count++;
          }
        }
      });

      return ranges;
    },
  },


  methods: {
    sendRequest() {
      const inputData = {
        name: 'Alberto Huertas',
        key_company: 'Armasuisse',
        event_name: 'LoRa Hackathon 2022'
      };
      this.isButtonClicked = true;
      this.startTimer();

      axios.post('http://localhost:5001/full', inputData)
          .then(response => {
            this.originalData = response.data.result;
            this.calculateMatchScores();
            this.isDataLoaded = true;
            this.stopTimer();
          })
          .catch(error => {
            console.error(error);
          });
    },

    startTimer() {
      this.timer = setInterval(() => {
        this.timePassed++;
      }, 1000);
    },

    stopTimer() {
      clearInterval(this.timer);
    },

    calculateMatchScores() {
      // Clone the original data so we don't modify it directly
      this.data = _cloneDeep(this.originalData);
      const maxCollab = Math.max(...this.data.map(d => d.Collaborations));
      const maxMention = Math.max(...this.data.map(d => d.MentionCount));

      this.data.forEach(d => {
        const collabExistsScore = (d.Collaborations > 0 ? 1 : 0) * this.collabExistsWeight;
        const collabCountScore = (d.Collaborations / maxCollab || 0) * this.collabCountWeight;
        const mentionExistsScore = (d.MentionCount > 0 ? 1 : 0) * this.mentionExistsWeight;
        const mentionCountScore = (d.MentionCount / maxMention || 0) * this.mentionCountWeight;
        const institutionMatchScore = (d.InstitutionMatchStatus ? 1 : 0) * this.institutionMatchWeight;
        const githubMatchScore = (d.GitHub_Match ? 1 : 0) * this.githubMatchWeight;
        const publicationElectoSenseScore = (d.publication_ElectoSense ? 1 : 0) * this.publicationElectoSenseWeight;

        d.match_score = collabExistsScore + collabCountScore + mentionExistsScore + mentionCountScore + institutionMatchScore + githubMatchScore + publicationElectoSenseScore;
      });

      // Sort the data in descending order of match score
      this.data.sort((a, b) => b.match_score - a.match_score);
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

.weight-sliders {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1em;
}

.weight-slider {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loading-text {
  margin-top: 2vh;
  font-size: 1.2em;
  font-weight: bold;
  color: #3498db;
  text-align: center;
}

</style>




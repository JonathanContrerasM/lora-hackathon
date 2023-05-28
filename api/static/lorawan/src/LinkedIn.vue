<template>
    <div class="linkedin-profile">
        <div v-if="data">
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
            <div v-if="data.accomplishment_publications">
                <h3>Publications</h3>
                <div class="publications" v-for="pub in data.accomplishment_publications" :key="pub.url">
                    <div class="publication-name" v-if="pub.name">
                        <p><strong>Name:</strong> {{ pub.name }}</p>
                    </div>
                    <div class="publication-publisher" v-if="pub.publisher">
                        <p><strong>Publisher:</strong> {{ pub.publisher }}</p>
                    </div>
                    <div class="publication-published-on" v-if="pub.published_on">
                        <p><strong>Published on:</strong> {{ formatDate(pub.published_on) }}</p>
                    </div>
                    <div class="publication-url" v-if="pub.url">
                        <p><strong>URL:</strong> <a :href="pub.url">{{ pub.url }}</a></p>
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
            <p>No data to display.</p>
        </div>
    </div>
</template>
<script>
export default {

    methods: {
        formatDate(date) {
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            return `${monthNames[date.month - 1]} ${date.year}`;
        }
    },

    data() {
        return {
            data: {
                "public_identifier": "jonathan-contreras-7a7377170",
                "profile_pic_url": "https://s3.us-west-000.backblazeb2.com/proxycurl/person/jonathan-contreras-7a7377170/profile?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=0004d7f56a0400b0000000001%2F20230428%2Fus-west-000%2Fs3%2Faws4_request&X-Amz-Date=20230428T115401Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=ef03286688e5408069490f1f4c8ad0af441145331d65ce1fcb3982532ce8edff",
                "background_cover_image_url": null,
                "first_name": "Jonathan",
                "last_name": "Contreras",
                "full_name": "Jonathan Contreras",
                "follower_count": null,
                "occupation": "Intern Software-Engineering at adesso Schweiz AG",
                "headline": "Student Wirtschaftsinformatik Universit\u00e4t Z\u00fcrich",
                "summary": null,
                "country": "CH",
                "country_full_name": "Switzerland",
                "city": null,
                "state": null,
                "experiences": [{
                    "starts_at": {"day": 1, "month": 7, "year": 2022},
                    "ends_at": {"day": 1, "month": 9, "year": 2022},
                    "company": "adesso Schweiz AG",
                    "company_linkedin_profile_url": "https://www.linkedin.com/company/adesso-schweiz-ag/",
                    "title": "Intern Software-Engineering",
                    "description": null,
                    "location": null,
                    "logo_url": "https://s3.us-west-000.backblazeb2.com/proxycurl/company/adesso-schweiz-ag/profile?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=0004d7f56a0400b0000000001%2F20230428%2Fus-west-000%2Fs3%2Faws4_request&X-Amz-Date=20230428T115401Z&X-Amz-Expires=1800&X-Amz-SignedHeaders=host&X-Amz-Signature=c3bab9ac0b9b9a4caf0988b48f7c5d4af31270e16f039708ba320462d874b532"
                }],
                "education": [{
                    "starts_at": {"day": 1, "month": 1, "year": 2019},
                    "ends_at": {"day": 1, "month": 1, "year": 2022},
                    "field_of_study": "Wirtschaftswissenschaften",
                    "degree_name": "Wirtschaftsinformatik",
                    "school": "University of Zurich",
                    "school_linkedin_profile_url": null,
                    "description": null,
                    "logo_url": "https://media.licdn.com/dms/image/C4D0BAQEi1fl1yzka5A/company-logo_400_400/0/1553675499168?e=1690416000&v=beta&t=wP262W2fhKTGWmDZQddNdxC3K05x-JhYwHK67ee3mqE",
                    "grade": null,
                    "activities_and_societies": null
                }, {
                    "starts_at": {"day": 1, "month": 1, "year": 2018},
                    "ends_at": {"day": 1, "month": 1, "year": 2019},
                    "field_of_study": null,
                    "degree_name": "Bachelor of Science - BS, Informatik",
                    "school": "ETH Z\u00fcrich",
                    "school_linkedin_profile_url": null,
                    "description": null,
                    "logo_url": "https://media.licdn.com/dms/image/C4D0BAQHpkHDwYhEoiQ/company-logo_400_400/0/1588930627216?e=1690416000&v=beta&t=o8IEce88FITUTfY4YQd_Ulyf6yv096vJN_4U-rKm5CQ",
                    "grade": null,
                    "activities_and_societies": null
                }, {
                    "starts_at": {"day": 1, "month": 1, "year": 2014},
                    "ends_at": {"day": 1, "month": 1, "year": 2018},
                    "field_of_study": null,
                    "degree_name": "Matura",
                    "school": "Seminar Schloss Bogenhofen",
                    "school_linkedin_profile_url": null,
                    "description": null,
                    "logo_url": "https://media.licdn.com/dms/image/C4D0BAQFGwawlDLjSgA/company-logo_400_400/0/1519832080937?e=1690416000&v=beta&t=b2fJeWOraiz2TYeadXyBCtz_DUccoBz-VXPHT4qYsgg",
                    "grade": null,
                    "activities_and_societies": null
                }],
                "languages": ["Deutsch", "Englisch", "Spanisch"],
                "accomplishment_organisations": [],
                "accomplishment_publications": [],
                "accomplishment_honors_awards": [],
                "accomplishment_patents": [],
                "accomplishment_courses": [],
                "accomplishment_projects": [],
                "accomplishment_test_scores": [],
                "volunteer_work": [],
                "certifications": [],
                "connections": null,
                "people_also_viewed": [{
                    "link": "https://www.linkedin.com/in/manuel-b-9bb37915a",
                    "name": "Manuel B.",
                    "summary": "MLaw | Rechtsanwalt",
                    "location": null
                }, {
                    "link": "https://www.linkedin.com/in/alex-olivier-1480b8264",
                    "name": "alex olivier",
                    "summary": "--",
                    "location": null
                }, {
                    "link": "https://www.linkedin.com/in/samuelbohl",
                    "name": "Samuel Bohl",
                    "summary": "Student Msc Computer Science @ ETH Zurich",
                    "location": null
                }, {
                    "link": "https://www.linkedin.com/in/ashnia-sikder-07394719a",
                    "name": "Ashnia Sikder",
                    "summary": "Kaufm\u00e4nsche Angestellte bei Schmid Transporte Niederglatt AG",
                    "location": null
                }, {
                    "link": "https://www.linkedin.com/in/afghanistan-institut-paul-bucherer-45072372",
                    "name": "Afghanistan-Institut Paul Bucherer",
                    "summary": "Afghanistans Natur, Kultur und Geschichte",
                    "location": null
                }, {
                    "link": "https://www.linkedin.com/in/christoph-helmberger-64a5ab232",
                    "name": "Christoph Helmberger",
                    "summary": "Arbeitsp\u00e4dagoge | Soziale Arbeit | Handwerksmeister",
                    "location": null
                }, {
                    "link": "https://www.linkedin.com/in/kirsten-gebhard-albrecht-29073444",
                    "name": "Kirsten Gebhard-Albrecht",
                    "summary": "--",
                    "location": null
                }, {
                    "link": "https://www.linkedin.com/in/dr-bojan-godina-444a5845",
                    "name": "Dr. Bojan Godina",
                    "summary": "Dozent bei Seminar Schloss Bogenhofen",
                    "location": null
                }, {
                    "link": "https://www.linkedin.com/in/oksiyan-benov-049324250",
                    "name": "Oksiyan Benov",
                    "summary": "Money follows Attention.",
                    "location": null
                }, {
                    "link": "https://www.linkedin.com/in/manuel-hanke-1b203b75",
                    "name": "Manuel Hanke",
                    "summary": "Physiotherapeut bei Vitalhotel Die Arche GbR",
                    "location": null
                }],
                "recommendations": [],
                "activities": [],
                "similarly_named_profiles": [{
                    "name": "Jonathan Contreras",
                    "link": "https://www.linkedin.com/in/jonathan-contreras-6594a910",
                    "summary": "Supervisor at Rolling Green Inc. (SCE Contractor)",
                    "location": "Baldwin Park, CA"
                }, {
                    "name": "Jonathan Contreras",
                    "link": "https://cl.linkedin.com/in/jonathan-contreras-2b030b196",
                    "summary": "Psicopedagogo",
                    "location": "Metropolregion Santiago"
                }, {
                    "name": "Jonathan Contreras",
                    "link": "https://cl.linkedin.com/in/jonathan-contreras-2b701594",
                    "summary": "Enfermero urgencias HUAP en Hospital de urgencia asistencia publica",
                    "location": "Chile"
                }, {
                    "name": "Jonathan Contreras",
                    "link": "https://it.linkedin.com/in/jonathan-contreras-a0077741",
                    "summary": "Dise\u00f1ador industrial",
                    "location": "Bologna und Umgebung"
                }, {
                    "name": "Jonathan Contreras",
                    "link": "https://mx.linkedin.com/in/elionaz",
                    "summary": "Chief Technology Officer at Homie.mx",
                    "location": "Benito Juarez, DIF"
                }],
                "articles": [],
                "groups": [],
                "phone_numbers": [],
                "social_networking_services": [],
                "skills": ["Spring Boot", "Java", "Microsoft Office", "Python", "Adobe Photoshop", "Cinema 4D"],
                "inferred_salary": {"min": null, "max": null},
                "gender": null,
                "birth_date": null,
                "industry": null,
                "extra": {"github_profile_id": null, "twitter_profile_id": null, "facebook_profile_id": null},
                "interests": [],
                "personal_emails": [],
                "personal_numbers": []
            }
        }
    }
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
    margin-top: 10px; /* Add some spacing between each publication */
    padding: 10px; /* Add some padding to create visual separation */
    border: 1px solid #ddd; /* Add a border to the publication container */
    border-radius: 5px; /* Add some border radius to soften the edges */
    background-color: #000000; /* Add a light gray background color */
}

.linkedin-profile .language {
    margin-bottom: 5px;
    list-style: none;
    font-style: italic;
    color: #a1a1a1;
    font-size: 16px;

}

</style>
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
                "public_identifier": "alberto-huertas-a68242182",
                "profile_pic_url": "https://media.licdn.com/dms/image/C5603AQE9-8_nj6dJPg/profile-displayphoto-shrink_400_400/0/1558020609971?e=1688601600&v=beta&t=WsGTosKCQGTLqAD5pwxz2xAAQQufB8L0OsJOR0As1Zw",
                "background_cover_image_url": null,
                "first_name": "Alberto",
                "last_name": "Huertas",
                "full_name": "Alberto Huertas",
                "follower_count": null,
                "occupation": "Postdoctoral Researcher at University of Zurich",
                "headline": "Postdoctoral Researcher at University of Zurich",
                "summary": "http://webs.um.es/alberto.huertas/",
                "country": "CH",
                "country_full_name": "Switzerland",
                "city": "Zurich",
                "state": "Zurich",
                "experiences": [{
                    "starts_at": {"day": 1, "month": 10, "year": 2020},
                    "ends_at": null,
                    "company": "University of Zurich",
                    "company_linkedin_profile_url": "https://www.linkedin.com/school/uzh/",
                    "title": "Postdoctoral Researcher",
                    "description": null,
                    "location": "Zurich, Switzerland",
                    "logo_url": "https://media.licdn.com/dms/image/C4D0BAQEi1fl1yzka5A/company-logo_400_400/0/1553675499168?e=1691020800&v=beta&t=JVZiG_3kHIFT7hGXBOynbm99n0NGH7YW_JoMAF1D1s0"
                }, {
                    "starts_at": {"day": 1, "month": 6, "year": 2018},
                    "ends_at": {"day": 1, "month": 10, "year": 2020},
                    "company": "Waterford Institute of Technology",
                    "company_linkedin_profile_url": "https://www.linkedin.com/school/waterford-institute-of-technology/",
                    "title": "Postdoctoral Researcher",
                    "description": "Research topics: cybersecurity in brain-computer interfaces, continuous authentication in the IoT, machine and deep learning applied to cybersecurity in networks and clinical environments",
                    "location": null,
                    "logo_url": "https://media.licdn.com/dms/image/C4E0BAQFcP70caTZY6w/company-logo_400_400/0/1677233297838?e=1691020800&v=beta&t=_jEIn-Up9lUBPspyAsQiXyRAdOu_EIb0W9uvV_US82U"
                }, {
                    "starts_at": {"day": 1, "month": 3, "year": 2017},
                    "ends_at": {"day": 1, "month": 5, "year": 2018},
                    "company": "Computer Science Faculty, University of Murcia (FIUM)",
                    "company_linkedin_profile_url": "https://www.linkedin.com/company/facultad-de-inform-tica-de-la-universidad-de-murcia-fium-/",
                    "title": "Postdoctoral Researcher",
                    "description": "Research topics: Continuous authentication in the IoT, cybersecurity in computer networks, GDPR",
                    "location": "Murcia Area, Spain",
                    "logo_url": "https://media.licdn.com/dms/image/C560BAQE4_0M3DtlqPw/company-logo_400_400/0/1540193993218?e=1691020800&v=beta&t=c4dVYHQCv9m_-OhVLcrlCbhh0L75ms94NXViWGzR_2w"
                }, {
                    "starts_at": {"day": 1, "month": 5, "year": 2013},
                    "ends_at": {"day": 1, "month": 1, "year": 2017},
                    "company": "Computer Science Faculty, University of Murcia (FIUM)",
                    "company_linkedin_profile_url": "https://www.linkedin.com/company/facultad-de-inform-tica-de-la-universidad-de-murcia-fium-/",
                    "title": "PHD Student",
                    "description": "Main topics: cybersecurity, privacy-preserving frameworks, context-awareness, location-based services, network management, network function virtualization, software-defined networks, eHealth, integrated clinical environments,",
                    "location": "Murcia Area, Spain",
                    "logo_url": "https://media.licdn.com/dms/image/C560BAQE4_0M3DtlqPw/company-logo_400_400/0/1540193993218?e=1691020800&v=beta&t=c4dVYHQCv9m_-OhVLcrlCbhh0L75ms94NXViWGzR_2w"
                }, {
                    "starts_at": {"day": 1, "month": 11, "year": 2012},
                    "ends_at": {"day": 1, "month": 4, "year": 2013},
                    "company": "NEC Laboratories Europe GmbH",
                    "company_linkedin_profile_url": "https://www.linkedin.com/company/nec-laboratories-europe-gmbh/",
                    "title": "Computer Science Engineer",
                    "description": "Main topics: cybersecurity, searchable encryption, and homomorphic algorithms",
                    "location": "Heidelberg Area, Germany",
                    "logo_url": "https://media.licdn.com/dms/image/C4E0BAQGDhUy-enEi7g/company-logo_400_400/0/1658309576015?e=1691020800&v=beta&t=HIe_xKvT_THqjMbNHaaWQVh2gHCh4VmqCa3f293D65Y"
                }],
                "education": [{
                    "starts_at": null,
                    "ends_at": {"day": 1, "month": 1, "year": 2017},
                    "field_of_study": "Computer Science",
                    "degree_name": "Doctor of Philosophy - PhD",
                    "school": "Universidad de Murcia",
                    "school_linkedin_profile_url": null,
                    "description": null,
                    "logo_url": "https://media.licdn.com/dms/image/C560BAQEHbI47eks5cA/company-logo_400_400/0/1591439694648?e=1691020800&v=beta&t=adnkOCxbqCNmxMF-DHTRRmdIFJm_x0fkWG3cDCZodmk",
                    "grade": null,
                    "activities_and_societies": null
                }, {
                    "starts_at": null,
                    "ends_at": {"day": 1, "month": 1, "year": 2012},
                    "field_of_study": "Computer Science",
                    "degree_name": "Master's degree",
                    "school": "Universidad de Murcia",
                    "school_linkedin_profile_url": null,
                    "description": null,
                    "logo_url": "https://media.licdn.com/dms/image/C560BAQEHbI47eks5cA/company-logo_400_400/0/1591439694648?e=1691020800&v=beta&t=adnkOCxbqCNmxMF-DHTRRmdIFJm_x0fkWG3cDCZodmk",
                    "grade": null,
                    "activities_and_societies": null
                }, {
                    "starts_at": null,
                    "ends_at": {"day": 1, "month": 1, "year": 2011},
                    "field_of_study": "Computer Science",
                    "degree_name": "Engineer's degree",
                    "school": "Universidad de Murcia",
                    "school_linkedin_profile_url": null,
                    "description": null,
                    "logo_url": "https://media.licdn.com/dms/image/C560BAQEHbI47eks5cA/company-logo_400_400/0/1591439694648?e=1691020800&v=beta&t=adnkOCxbqCNmxMF-DHTRRmdIFJm_x0fkWG3cDCZodmk",
                    "grade": null,
                    "activities_and_societies": null
                }],
                "languages": ["English", "Italian", "Spanish"],
                "accomplishment_organisations": [],
                "accomplishment_publications": [{
                    "name": "Dynamic Network Slicing Management of Multimedia Scenarios for Future Remote Healthcare",
                    "publisher": "Multimedia Tools and Applications",
                    "published_on": {"day": 1, "month": 1, "year": 2019},
                    "description": null,
                    "url": "https://doi.org/10.1007/s11042-019-7283-3"
                }, {
                    "name": "Intelligent and Dynamic Ransomware Spread Detection and Mitigation in Integrated Clinical Environments",
                    "publisher": "Sensors",
                    "published_on": {"day": 1, "month": 1, "year": 2019},
                    "description": null,
                    "url": "https://doi.org/10.3390/s19051114"
                }, {
                    "name": "Mitigation of Cyber Threats: Protection Mechanisms in Federated SDN/NFV Infrastructures for 5G within FIRE+",
                    "publisher": "Concurrency and Computation",
                    "published_on": {"day": 1, "month": 1, "year": 2019},
                    "description": null,
                    "url": "https://doi.org/10.1002/cpe.5132"
                }, {
                    "name": "Dynamic Management of a Deep Learning-Based Anomaly Detection System for 5G Networks",
                    "publisher": "Journal of Ambient Intelligence and Humanized Computing",
                    "published_on": {"day": 1, "month": 1, "year": 2018},
                    "description": null,
                    "url": "https://doi.org/10.1007/s12652-018-0813-4"
                }, {
                    "name": "Improving the Security and QoE in Mobile Devices through an Intelligent and Adaptive Continuous Authentication System",
                    "publisher": "Sensors",
                    "published_on": {"day": 1, "month": 1, "year": 2018},
                    "description": null,
                    "url": "https://doi.org/10.3390/s18113769"
                }, {
                    "name": "Sustainable securing of Medical Cyber-Physical Systems for the healthcare of the future",
                    "publisher": "Sustainable Computing: Informatics and Systems",
                    "published_on": {"day": 1, "month": 1, "year": 2018},
                    "description": null,
                    "url": "https://doi.org/10.1016/j.suscom.2018.02.010"
                }, {
                    "name": "Towards the autonomous provision of self-protection capabilities in 5G networks,\"",
                    "publisher": "Journal of Ambient Intelligence and Humanized Computing",
                    "published_on": {"day": 1, "month": 1, "year": 2018},
                    "description": null,
                    "url": "https://doi.org/10.1007/s12652-018-0848-6"
                }, {
                    "name": "Dynamic reconfiguration in 5G mobile networks to proactively detect and mitigate botnets",
                    "publisher": "IEEE Internet Computing",
                    "published_on": {"day": 1, "month": 1, "year": 2017},
                    "description": null,
                    "url": "https://doi.org/10.1109/MIC.2017.3481345"
                }, {
                    "name": "Enabling highly dynamic mobile scenarios with Software Defined Networking",
                    "publisher": "IEEE Communications Magazine",
                    "published_on": {"day": 1, "month": 1, "year": 2017},
                    "description": null,
                    "url": "https://doi.org/10.1109/MCOM.2017.1600117CM"
                }, {
                    "name": "Preserving patients' privacy in health scenarios through a multicontext-aware system,\" ",
                    "publisher": "Annals of Telecommunications",
                    "published_on": {"day": 1, "month": 1, "year": 2017},
                    "description": null,
                    "url": "http://dx.doi.org/10.1007/s12243-017-0582-7"
                }, {
                    "name": "Design of a recommender system based on users' behavior and collaborative localization and tracking",
                    "publisher": "Journal of Computational Science",
                    "published_on": {"day": 1, "month": 1, "year": 2016},
                    "description": null,
                    "url": "http://doi.org/10.1016/j.jocs.2015.11.010"
                }, {
                    "name": "Policy-based management for green mobile networks through Software-Defined Networking",
                    "publisher": "Mobile Networks and Applications",
                    "published_on": {"day": 1, "month": 1, "year": 2016},
                    "description": null,
                    "url": "https://doi.org/10.1007/s11036-016-0783-8"
                }, {
                    "name": "Resolving privacy-preserving relationships over outsourced encrypted data storages",
                    "publisher": " International Journal of Information Security",
                    "published_on": {"day": 1, "month": 1, "year": 2016},
                    "description": null,
                    "url": "https://doi.org/10.1109/JSYST.2013.2297707"
                }, {
                    "name": "PRECISE: Privacy-aware recommender based on context information for Cloud service environments",
                    "publisher": "IEEE Communications Magazine",
                    "published_on": {"day": 1, "month": 1, "year": 2014},
                    "description": null,
                    "url": "https://doi.org/10.1109/MCOM.2014.6871675"
                }, {
                    "name": "SeCoMan: A semantic-aware policy framework for developing privacy-preserving and context-aware smart applications",
                    "publisher": "IEEE Systems Journal",
                    "published_on": {"day": 1, "month": 1, "year": 2014},
                    "description": null,
                    "url": "https://doi.org/10.1109/JSYST.2013.2297707"
                }],
                "accomplishment_honors_awards": [],
                "accomplishment_patents": [],
                "accomplishment_courses": [],
                "accomplishment_projects": [],
                "accomplishment_test_scores": [],
                "volunteer_work": [],
                "certifications": [],
                "connections": null,
                "people_also_viewed": [{
                    "link": "https://www.linkedin.com/in/br-rodrigues",
                    "name": "Bruno Rodrigues",
                    "summary": "Senior Researcher at University of Zurich",
                    "location": null
                }, {
                    "link": "https://www.linkedin.com/in/katharina-o-e-m\u00fcller-66495213b",
                    "name": "Katharina O. E.  M\u00fcller",
                    "summary": "PhD Student and Junior Researcher at University of Zurich",
                    "location": null
                }, {
                    "link": "https://www.linkedin.com/in/chao-feng-177b171a2",
                    "name": "Chao Feng",
                    "summary": "Research Assistant at CSG",
                    "location": null
                }, {
                    "link": "https://www.linkedin.com/in/vonderassen",
                    "name": "Jan von der Assen",
                    "summary": "Research Assistant",
                    "location": null
                }, {
                    "link": "https://www.linkedin.com/in/murielfranco",
                    "name": "Muriel Figueredo Franco",
                    "summary": "Ph.D. | Cybersecurity | Risk Assessment | Computer Networks | Cybersecurity Economics | Project Management",
                    "location": null
                }, {
                    "link": "https://www.linkedin.com/in/eryk-schiller-a460744",
                    "name": "Eryk Schiller",
                    "summary": "Senior Researcher in Wireless Communications, Cloud Computing, Distributed Systems, and Blockchain",
                    "location": null
                }, {
                    "link": "https://www.linkedin.com/in/pchrysostomou",
                    "name": "Panayiotis C.",
                    "summary": "Technical Contractor",
                    "location": null
                }, {
                    "link": "https://www.linkedin.com/in/christiankiller",
                    "name": "Christian Killer",
                    "summary": "Web3 Security Researcher, Founder, PhD Candidate",
                    "location": null
                }, {
                    "link": "https://www.linkedin.com/in/robertomagancarrion",
                    "name": "Roberto Mag\u00e1n Carri\u00f3n",
                    "summary": "Assistant Professor at Universidad de Granada",
                    "location": null
                }, {
                    "link": "https://www.linkedin.com/in/javier-viadel-moreno-44752a107",
                    "name": "JAVIER VIADEL MORENO",
                    "summary": "CONTABLE Y FINANCIERO EN IN SIDE LOGISTICS SL",
                    "location": null
                }],
                "recommendations": [],
                "activities": [],
                "similarly_named_profiles": [],
                "articles": [],
                "groups": [],
                "phone_numbers": [],
                "social_networking_services": [],
                "skills": ["Brain-computer Interfaces", "Network Function Virtualization", "eHealth", "Machine Learning", "General Data Protection Regulation (GDPR)", "Deep Learning", "Network Security", "Cybersecurity", "Data Privacy", "Privacy Policies", "Virtualization"],
                "inferred_salary": {"min": 45000.0, "max": 35000.0},
                "gender": "male",
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
<template>
  <div class="container pt-2">
    <div class="row">
      <div class="col-12 col-md-3 offset-md-2">
            <img
              :src="getImage(patientInfo.profile_picture)"
              alt="profile_picture"
              class="profile-picture__resize">
      </div>
        <div class="col-12 col-md-4">
            <p> {{ patientInfo.first_name + ' ' + patientInfo.last_name + ' - ' + patientInfo.gender}}</p>
            <p> {{ patientInfo.date_of_birth }}
              <a :href='"mailto:" + patientInfo.email'>{{patientInfo.email}}</a>
            </p>
            <p>{{patientInfo.practice_centre_id}}</p>
        </div>
      </div>
      <!-- .row -->
      <div class="row">
        <div class="col-6 col-md-3 offset-md-2">
            <a class="dark-link" href="" @click.prevent="patientModalCall()">Edit profile</a>
            <patientDetailsModal :acl="acl"/>
        </div>
         <div class="col-6 col-md-4">
        <a class="dark-link" href="" @click.prevent="clinicalNoteModalCall()">Clinical Notes</a><br>
        <clinicalNotesModal :note.sync ="patientInfo.note" :acl="acl"/>
        </div>
      </div>
      <!-- .row -->
  </div>
</template>

<script>
import EventBus from '../../../EventBus'
import { mapGetters } from 'vuex'
export default {
  name: 'DentistPatientDetails',
  props: {
    acl: {
      type: String,
      required: true,
      default: 'view'
    }
  },
  components: {
    clinicalNotesModal: () => import('./ClinicalNotesModal'),
    patientDetailsModal: () => import('../Patients/PatientsModal')
  },
  data () {
    return {
      // isModalActive: false
    }
  },
  computed: {
    ...mapGetters(['patientInfo'])
  },
  methods: {
    getImage (pic) {
      if (typeof pic !== 'undefined') {
        if (pic !== '') {
          return require('../../../assets/' + pic)
        } else {
          return require('../../../assets/profile_picture.svg')
        }
      } else {
        return require('../../../assets/profile_picture.svg')
      }
    },
    patientModalCall () {
      EventBus.$emit('PATIENT_MODAL')
    },
    clinicalNoteModalCall () {
      EventBus.$emit('CLINICAL_NOTE_MODAL')
    }
  },
  mounted () {
    EventBus.$on('SAVE_CLINICAL_NOTE', payload => {
      this.$store.dispatch('EDIT_PATIENT', this.patientInfo)
    })
  },
  created () {
    this.$store.dispatch('LOAD_PATIENT_INFO', this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>
.profile{
  &-picture{
    &__resize{
      width: 6rem;
    }
  }
}
</style>
